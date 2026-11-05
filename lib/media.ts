// Projelerin videoları artık YouTube kanalından geliyor (bkz. lib/projects.tsx).
// Eskiden burada duran w3schools örnek klibi (PLACEHOLDER_VIDEO_SRC) kaldırıldı;
// `videoSrc` alanı hâlâ var, YouTube'a yüklenmemiş bir iş için yerel bir mp4
// göstermek isterseniz kullanılabilir.

/**
 * Hero arka plan videosu — `public/video/kale_loop.mp4` kaynağından web için
 * sıkıştırılmış iki sürüm. Kaynak dosya 1080p, ~17 Mbps, 97 MB'tı; sayfa her
 * açıldığında tamamı iniyordu.
 *
 * - landscape: 1920x1080, 29,97 fps, ~5,6 Mbps, ~30 MB — yatay ekranlar
 * - portrait:  608x1080 dikey kırpım (kaynağın kırpılmadan verebildiği en
 *   yüksek çözünürlük), 29,97 fps, ~3,7 Mbps, ~20 MB — telefonlar. Dikey
 *   ekranda yatay videonun yalnızca orta şeridi görünüyor; o şeridi ayrı
 *   kodlamak aynı görüntüyü daha az veriyle veriyor.
 *
 * Kalite notları (ilk sürüm 24 fps / 720p / 540p'ydi ve kalitesiz duruyordu):
 * - Kare hızı kaynağın (59,94) tam yarısı olmalı. 24 fps'te kareler eşit
 *   aralıkla atlanmıyor, drone'un yavaş kaydırma hareketleri takılıyordu.
 * - Gürültü azaltma filtresi kullanmayın; ince detayı (pencereler, uzak
 *   ışıklar) siliyordu.
 * - Gece şehir görüntüsü çok detaylı: ~1,2 Mbps'de binalar bloklaşıyordu.
 *
 * Poster kareleri video inene kadar (ve "hareketi azalt" / veri tasarrufu açık
 * cihazlarda video hiç oynatılmadan) gösterilir; videonun ilk karesi, aynı
 * çözünürlükte.
 *
 * Videoyu değiştirirseniz iki sürümü yeniden üretin, örnek komutlar (libx264;
 * bu dosyalar NVIDIA h264_nvenc ile, aynı ayarlar ve hedef bit hızlarıyla
 * üretildi):
 *   ffmpeg -i kaynak.mp4 -an -vf "fps=30000/1001" -c:v libx264 -preset slow -b:v 4500k -maxrate 5500k -bufsize 11000k -movflags +faststart kale_loop-1080p.mp4
 *   ffmpeg -i kaynak.mp4 -an -vf "crop=608:1080,fps=30000/1001" -c:v libx264 -preset slow -b:v 3000k -maxrate 3600k -bufsize 7200k -movflags +faststart kale_loop-mobile-1080.mp4
 */
export const HERO_VIDEO = {
  landscape: "/video/kale_loop-1080p.mp4",
  portrait: "/video/kale_loop-mobile-1080.mp4",
  posterLandscape: "/video/kale_loop-poster.jpg",
  posterPortrait: "/video/kale_loop-poster-mobile.jpg",
} as const;

// Set this to a real YouTube video id (the `v=` part of a youtube.com/watch
// URL) once the hero footage is uploaded there — Hero.tsx will switch from
// the local placeholder mp4 above to a YouTube background embed
// automatically, no other code changes needed.
export const HERO_YOUTUBE_ID: string | undefined = undefined;

// Set to true if the hero footage above is a 9:16 (e.g. Shorts) upload rather
// than standard 16:9 landscape — flips the background cover-fill math.
export const HERO_YOUTUBE_VERTICAL = false;
