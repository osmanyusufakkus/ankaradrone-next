import catalog from "@/lib/youtube-catalog.json";
import { PROJECT_OVERRIDES, type ProjectOverride } from "@/lib/project-overrides";

// TEK VERİ KAYNAĞI.
//
// Ana sayfadaki Referanslar duvarı ile /projeler sayfası aynı diziden beslenir:
// duvar `showAsReference` işaretli kayıtları müşteri adıyla gösterir,
// /projeler tamamını listeler. Bir referans kartının gideceği sayfanın var
// olmaması veri düzeyinde imkânsız.
//
// Kayıtlar elle yazılmıyor, YouTube kanalından üretiliyor:
//   1. lib/youtube-catalog.json — `npm run sync:youtube` ile kanaldan çekilir
//      (kimlik, başlık, dikey/yatay, yayın tarihi, açıklamanın projeye özel kısmı)
//   2. lib/project-overrides.ts — elle verilen bilgiler (duvarda gösterme,
//      sıra, firma adı, sektör, logo…)
// Kanala yeni video yüklediğinizde komutu çalıştırmanız yeterli; yeni iş
// /projeler'e ve referans duvarına kendiliğinden eklenir.

export type ProjectClient = {
  name: string;
  sector: string;
  /** Logo dosyası yoksa gösterilen baş harf rozeti. */
  code: string;
  /** Baş harf rozetinin arka plan rengi. */
  color: string;
  /** public/images/references/ altındaki logo — yalnızca izin alınmış logolar. */
  logoUrl?: string;
};

export type Project = {
  slug: string;
  title: string;
  /** ProjectCover'ın kapak görseli yokken kullandığı vurgu rengi. */
  accentColor: string;
  /** İşin YouTube id'si — kapak, önizleme ve lightbox hep bundan türer. */
  youtubeId?: string;
  /** 9:16 (Shorts) yükleme mi? Kapak varyantını ve kutu oranını belirler. */
  youtubeVertical?: boolean;
  /** Önizlemenin başlayacağı saniye — girişteki yavaş açılışı atlar. */
  previewStart?: number;
  /** Henüz YouTube'a yüklenmemiş işler için geçici yerel klip. */
  videoSrc?: string;
  coverImage?: string;
  description?: string;
  location?: string;
  date?: string;
  /** Proje sayfasında "Hizmet" — YouTube başlığındaki tür (ör. "Villa Projesi Tanıtım Filmi"). */
  service?: string;
  gallery?: string[];
  /** İş bir müşteri için yapıldıysa — Referanslar duvarında bu bilgiyle görünür. */
  client?: ProjectClient;
  /** Ana sayfadaki Referanslar duvarında gösterilsin mi (sıra bu dizideki sıra). */
  showAsReference?: boolean;
};

type CatalogVideo = {
  id: string;
  title: string;
  name: string;
  type: string | null;
  slug: string;
  vertical: boolean;
  /** Kapak adresi — videonun yönünden bağımsız (bkz. scripts/sync-youtube.mjs → probeCover). */
  cover: string;
  publishedAt: string | null;
  summary: string | null;
};

/** Önizleme, girişteki logo/yavaş açılışı atlayıp bu saniyeden başlar. */
const DEFAULT_PREVIEW_START = 3;

/** Kart rozetleri ve vurgu renkleri sırayla bu paletten dağıtılır. */
const PALETTE = [
  "rgba(33,150,243,.25)",
  "rgba(255,150,0,.2)",
  "rgba(76,175,80,.2)",
  "rgba(233,30,99,.2)",
  "rgba(255,87,34,.2)",
  "rgba(156,39,176,.2)",
  "rgba(0,188,212,.2)",
  "rgba(255,193,7,.2)",
];

/** Başlıktaki türden sektör etiketi; ilk eşleşen kazanır (loft, konuttan önce). */
const SECTOR_RULES: [RegExp, string][] = [
  [/villa/i, "Villa"],
  [/ofis/i, "Ofis"],
  [/arsa/i, "Arsa"],
  [/karma/i, "Karma Yaşam"],
  [/rezidans/i, "Rezidans"],
  [/loft/i, "Loft Daire"],
  [/konut/i, "Konut"],
];

/** Başlıkta geçen semtlerden konum. Yalnızca adı açıkça geçenler. */
const LOCATIONS: [RegExp, string][] = [
  [/İncek/i, "İncek, Ankara"],
  [/Çayyolu/i, "Çayyolu, Ankara"],
  [/Bağlıca/i, "Bağlıca, Ankara"],
  [/Beytepe/i, "Beytepe, Ankara"],
  [/İvedik/i, "İvedik, Ankara"],
  [/Esenboğa/i, "Esenboğa, Ankara"],
  [/Gölbaşı/i, "Gölbaşı, Ankara"],
  [/Yeni Batı/i, "Yeni Batı, Ankara"],
  [/Karabük/i, "Karabük"],
];

const MONTH_YEAR = new Intl.DateTimeFormat("tr-TR", { month: "long", year: "numeric", timeZone: "UTC" });

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter((w) => /^\p{L}/u.test(w))
    .slice(0, 2)
    .map((w) => w[0].toLocaleUpperCase("tr-TR"))
    .join("");
}

function toProject(video: CatalogVideo, index: number, override: ProjectOverride): Project {
  const text = `${video.name} ${video.type ?? ""}`;
  const color = PALETTE[index % PALETTE.length];
  const name = override.clientName ?? video.name;
  const shortType = video.type?.replace(/\s*Tanıtım Filmi$/i, "");

  return {
    slug: video.slug,
    title: override.title ?? (shortType ? `${video.name} – ${shortType}` : video.name),
    accentColor: color,
    youtubeId: video.id,
    youtubeVertical: video.vertical,
    // Dikey videolarda bile 9:16 kapak her zaman yok (özel 16:9 kapak
    // yüklenmişse); kapak bu yüzden yönden türetilmiyor, katalogdan geliyor.
    coverImage: video.cover,
    previewStart: override.previewStart ?? DEFAULT_PREVIEW_START,
    description: override.description ?? video.summary ?? undefined,
    location: override.location ?? LOCATIONS.find(([re]) => re.test(text))?.[1],
    date:
      override.date ?? (video.publishedAt ? MONTH_YEAR.format(new Date(video.publishedAt)) : undefined),
    service: video.type ?? undefined,
    showAsReference: override.showAsReference ?? true,
    client: {
      name,
      sector:
        override.sector ?? SECTOR_RULES.find(([re]) => re.test(text))?.[1] ?? "Proje Tanıtımı",
      code: override.code ?? initials(name),
      color,
      logoUrl: override.logoUrl,
    },
  };
}

export const PROJECTS: Project[] = (catalog.videos as CatalogVideo[])
  .map((video, index) => ({ video, index, override: PROJECT_OVERRIDES[video.id] ?? {} }))
  .filter(({ override }) => !override.hidden)
  // Elle sırası verilenler önce (küçük önce), kalanlar kanal sırasıyla.
  .sort(
    (a, b) =>
      (a.override.order ?? Number.POSITIVE_INFINITY) - (b.override.order ?? Number.POSITIVE_INFINITY) ||
      a.index - b.index,
  )
  .map(({ video, index, override }) => toProject(video, index, override));

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((project) => project.slug === slug);
}

/**
 * Ana sayfadaki Referanslar duvarında gösterilecek işler — müşteri başına bir
 * kart. Aynı firmanın birden fazla işi varsa (ör. Türk Group'un Royal Office ve
 * Royal Skyport'u) duvar, sıralamada ilk gelen (varsayılan olarak en yeni) işi
 * gösterir; firmanın diğer işleri /projeler'de durur. Hangi işin görüneceğini
 * değiştirmek için lib/project-overrides.ts → `order`.
 */
export const REFERENCE_PROJECTS = PROJECTS.filter(
  (project) => project.showAsReference && project.client,
).filter(
  (project, i, list) =>
    list.findIndex((other) => other.client?.name === project.client?.name) === i,
);

/**
 * Vitrin panosunun açılıştaki içeriği: gerçek videosu olan ilk iş. Böylece
 * ziyaretçi hover etmeden de gerçek bir kare görür, gradyan yer tutucu değil.
 */
export const SHOWCASE_DEFAULT =
  REFERENCE_PROJECTS.find((project) => project.youtubeId) ?? REFERENCE_PROJECTS[0];
