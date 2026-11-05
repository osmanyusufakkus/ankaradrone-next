#!/usr/bin/env node
// YouTube kanalındaki videoları lib/youtube-catalog.json dosyasına yazar.
//
//   npm run sync:youtube
//
// Referans duvarı ve /projeler sayfası bu dosyadan beslenir (bkz.
// lib/projects.tsx). Kanala yeni bir video yüklediğinizde komutu bir kez
// çalıştırıp çıkan değişikliği commit etmeniz yeterli. Hangi videonun duvarda
// görüneceği, sırası, sektör etiketi gibi elle verilen bilgiler
// lib/project-overrides.ts dosyasında durur; bu betik o dosyaya dokunmaz.
//
// Neden build sırasında değil de elle: YouTube sayfa yapısını değiştirirse
// Netlify build'i kırılmasın, site en son kaydedilen listeyle çalışmaya devam
// etsin. Betik bir sorun görürse (ağ hatası, beklenenden çok az video) mevcut
// dosyanın üzerine yazmadan hata vererek çıkar.
//
// Veri kaynakları (API anahtarı gerektirmez):
//   1. Kanalın /videos ve /shorts sayfaları — video kimlikleri ve başlıklar
//   2. Kanalın RSS akışı — yükleme tarihleri (YouTube yalnızca son 15 videoyu verir)
//   3. Her videonun kendi sayfası — açıklama, yayın tarihi ve gerçek boyut
//      (dikey mi yatay mı; oynatıcı verisindeki akış formatlarından)
//   4. Kapak görseli — videonun kendi oranındaki "oardefault" kapağı var mı;
//      yoksa 16:9 "maxresdefault" kullanılır (bkz. probeCover)

import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const CHANNEL_HANDLE = "ankaranin.dronecusu";
const OUTPUT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "lib", "youtube-catalog.json");

/** Mevcut kataloğun bu oranından azına düşerse dosya ezilmez — büyük ihtimalle sayfa yapısı değişti. */
const MIN_KEEP_RATIO = 0.5;

const HEADERS = {
  "user-agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36",
  "accept-language": "tr-TR,tr;q=0.9",
};

async function fetchText(url) {
  const res = await fetch(url, { headers: HEADERS });
  if (!res.ok) throw new Error(`${url} → HTTP ${res.status}`);
  return res.text();
}

/** `var ytInitialData = {...};` bloğunu, string içindeki süslü parantezlere takılmadan çıkarır. */
function extractInitialData(html, marker = "ytInitialData = ") {
  const start = html.indexOf(marker);
  if (start === -1) throw new Error(`Sayfada ${marker.trim()} bulunamadı (YouTube sayfa yapısı değişmiş olabilir).`);
  let i = html.indexOf("{", start);
  const begin = i;
  let depth = 0;
  let inString = false;
  for (; i < html.length; i++) {
    const ch = html[i];
    if (inString) {
      if (ch === "\\") i++;
      else if (ch === '"') inString = false;
    } else if (ch === '"') inString = true;
    else if (ch === "{") depth++;
    else if (ch === "}" && --depth === 0) return JSON.parse(html.slice(begin, i + 1));
  }
  throw new Error("ytInitialData JSON'u kapanmadı.");
}

/** Hem klasik video kartlarını hem Shorts kartlarını toplar: { id, title }[]. */
function collectVideos(data) {
  const found = [];
  const visit = (node) => {
    if (!node || typeof node !== "object") return;
    if (Array.isArray(node)) return node.forEach(visit);

    const vr = node.videoRenderer;
    if (vr?.videoId) {
      found.push({ id: vr.videoId, title: vr.title?.runs?.map((r) => r.text).join("") ?? "" });
    }
    const sl = node.shortsLockupViewModel;
    const shortId = sl?.onTap?.innertubeCommand?.reelWatchEndpoint?.videoId;
    if (shortId) {
      found.push({ id: shortId, title: sl.overlayMetadata?.primaryText?.content ?? sl.accessibilityText ?? "" });
    }
    const lv = node.lockupViewModel;
    if (lv?.contentId && lv.contentType === "LOCKUP_CONTENT_TYPE_VIDEO") {
      found.push({ id: lv.contentId, title: lv.metadata?.lockupMetadataViewModel?.title?.content ?? "" });
    }
    for (const key in node) visit(node[key]);
  };
  visit(data);
  return found;
}

/** RSS'ten { id → { published, title } }. */
function parseFeed(xml) {
  const map = new Map();
  for (const entry of xml.split("<entry>").slice(1)) {
    const id = entry.match(/<yt:videoId>([\w-]{11})<\/yt:videoId>/)?.[1];
    const published = entry.match(/<published>([^<]+)<\/published>/)?.[1];
    const title = entry.match(/<title>([^<]*)<\/title>/)?.[1];
    if (id) map.set(id, { published, title: title && decodeEntities(title) });
  }
  return map;
}

function decodeEntities(s) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

/** JPEG başlığından genişlik/yükseklik (SOF işaretçisi). */
function jpegSize(buf) {
  let i = 2;
  while (i < buf.length) {
    if (buf[i] !== 0xff) return null;
    const marker = buf[i + 1];
    const len = buf.readUInt16BE(i + 2);
    if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
      return { height: buf.readUInt16BE(i + 5), width: buf.readUInt16BE(i + 7) };
    }
    i += 2 + len;
  }
  return null;
}

/**
 * Videonun kendi sayfasından açıklama ve yayın tarihi. RSS yalnızca son 15
 * videoyu verdiği için asıl kaynak bu; hata olursa sessizce boş döner.
 */
async function fetchDetails(id) {
  try {
    const html = await fetchText(`https://www.youtube.com/watch?v=${id}`);
    const player = extractInitialData(html, "ytInitialPlayerResponse = ");
    const micro = player.microformat?.playerMicroformatRenderer ?? {};
    // Gerçek video boyutu: en büyük akış formatı, yoksa gömme önerisi.
    const formats = [
      ...(player.streamingData?.formats ?? []),
      ...(player.streamingData?.adaptiveFormats ?? []),
    ].filter((f) => f.width && f.height);
    const best = formats.sort((a, b) => b.width * b.height - a.width * a.height)[0] ?? micro.embed;
    return {
      description: player.videoDetails?.shortDescription ?? "",
      publishedAt: micro.publishDate ?? micro.uploadDate ?? null,
      vertical: best?.width && best?.height ? best.height > best.width : null,
    };
  } catch {
    return { description: "", publishedAt: null, vertical: null };
  }
}

/**
 * Açıklamanın projeye özel kısmı. Her videoda sonda aynı hizmet listesi
 * ("Ankara Drone olarak … için:") tekrarlanıyor; o ve sonrası atılıyor, emojiler
 * temizleniyor.
 */
function projectSummary(description) {
  const cut = description.split(/(?:^|\n)\s*Ankara ?Drone olarak/i)[0];
  return cut
    .replace(/[\p{Extended_Pictographic}\u{FE0F}\u{200D}]/gu, "")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/[ \t]{2,}/g, " ")
    .replace(/\s*…\s*$/gm, "…")
    .trim();
}

/**
 * Kapak: videonun kendi oranındaki "oardefault" varsa o, yoksa 16:9
 * "maxresdefault". Dikey videolarda bile oardefault her zaman yok — özel
 * (16:9) kapak yüklenmiş videolarda 404 döner. Bu yüzden kapak türü videonun
 * yönünden AYRI tutuluyor; yönü kapaktan çıkarmak 8 dikey videoyu yanlışlıkla
 * yatay sayıyordu.
 */
async function probeCover(id) {
  const url = `https://i.ytimg.com/vi/${id}/oardefault.jpg`;
  const res = await fetch(url, { headers: HEADERS });
  const size = res.ok ? jpegSize(Buffer.from(await res.arrayBuffer())) : null;
  if (size && size.width > 120) {
    return { cover: url, coverVertical: size.height > size.width };
  }
  return { cover: `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`, coverVertical: false };
}

/** "Leda Yedisalkım | İncek Konut Projesi Tanıtım Filmi | Ankara Drone #gayrimenkul" → { name, type } */
function parseTitle(raw) {
  const clean = raw.replace(/\s#[^\s#]+/g, "").replace(/\s+/g, " ").trim();
  const parts = clean.split("|").map((p) => p.trim()).filter(Boolean);
  const isBrand = (p) => /^ankara\s?drone$/i.test(p);
  const meaningful = parts.filter((p) => !isBrand(p));
  return { clean, name: meaningful[0] ?? clean, type: meaningful[1] ?? null };
}

const TR_MAP = { ç: "c", ğ: "g", ı: "i", İ: "i", ö: "o", ş: "s", ü: "u", â: "a", î: "i", û: "u" };
function slugify(s) {
  return s
    .replace(/[çğıİöşüâîû]/gi, (ch) => TR_MAP[ch] ?? TR_MAP[ch.toLowerCase()] ?? ch)
    .toLowerCase()
    .replace(/[’'`]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

async function main() {
  const base = `https://www.youtube.com/@${CHANNEL_HANDLE}`;
  const [videosHtml, shortsHtml] = await Promise.all([
    fetchText(`${base}/videos`),
    fetchText(`${base}/shorts`).catch(() => ""),
  ]);

  const channelId = videosHtml.match(/"externalId":"(UC[\w-]{22})"/)?.[1];
  const listed = [...collectVideos(extractInitialData(videosHtml))];
  if (shortsHtml) listed.push(...collectVideos(extractInitialData(shortsHtml)));

  // Kanal sırasını (en yeni önce) koruyarak tekilleştir; en uzun başlığı tut.
  const byId = new Map();
  for (const v of listed) {
    const prev = byId.get(v.id);
    if (!prev || v.title.length > prev.title.length) byId.set(v.id, { ...prev, ...v });
  }

  const feed = channelId
    ? parseFeed(await fetchText(`https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`).catch(() => ""))
    : new Map();

  const videos = [];
  for (const { id, title } of byId.values()) {
    const fromFeed = feed.get(id);
    const { clean, name, type } = parseTitle(fromFeed?.title || title);
    const details = await fetchDetails(id);
    const { cover, coverVertical } = await probeCover(id);
    videos.push({
      id,
      title: clean,
      name,
      type,
      slug: slugify(name),
      // Oynatıcı verisinden okunamazsa son çare olarak kapağın oranı.
      vertical: details.vertical ?? coverVertical,
      cover,
      publishedAt: (details.publishedAt ?? fromFeed?.published ?? null)?.slice(0, 10) ?? null,
      summary: projectSummary(details.description) || null,
    });
  }

  // Aynı adı taşıyan iki video olursa slug çakışmasın.
  const seen = new Map();
  for (const v of videos) {
    const n = (seen.get(v.slug) ?? 0) + 1;
    seen.set(v.slug, n);
    if (n > 1) v.slug = `${v.slug}-${n}`;
  }

  let previous = [];
  try {
    previous = JSON.parse(await readFile(OUTPUT, "utf8")).videos ?? [];
  } catch {
    // İlk çalıştırma — dosya yok.
  }
  if (videos.length === 0 || videos.length < previous.length * MIN_KEEP_RATIO) {
    throw new Error(
      `Kanalda ${videos.length} video bulundu, mevcut katalogda ${previous.length} var. ` +
        "Sayfa yapısı değişmiş olabilir; dosyanın üzerine yazılmadı.",
    );
  }

  const prevIds = new Set(previous.map((v) => v.id));
  const nextIds = new Set(videos.map((v) => v.id));
  const added = videos.filter((v) => !prevIds.has(v.id));
  const removed = previous.filter((v) => !nextIds.has(v.id));

  const catalog = {
    // Bu dosya scripts/sync-youtube.mjs tarafından üretilir — elle düzenlemeyin;
    // elle verilecek bilgiler lib/project-overrides.ts içinde.
    channel: { handle: CHANNEL_HANDLE, id: channelId ?? null, url: base },
    syncedAt: new Date().toISOString(),
    videos,
  };
  await writeFile(OUTPUT, JSON.stringify(catalog, null, 2) + "\n", "utf8");

  console.log(`✓ ${videos.length} video yazıldı → ${path.relative(process.cwd(), OUTPUT)}`);
  console.log(`  ${videos.filter((v) => v.vertical).length} dikey, ${videos.filter((v) => !v.vertical).length} yatay`);
  for (const v of added) console.log(`  + yeni: ${v.name} (${v.id})`);
  for (const v of removed) console.log(`  − kanaldan kalkmış: ${v.name} (${v.id})`);
}

main().catch((err) => {
  console.error(`✗ ${err.message}`);
  process.exit(1);
});
