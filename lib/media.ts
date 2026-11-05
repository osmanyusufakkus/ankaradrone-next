// TODO(içerik): Bu üçüncü parti (w3schools) örnek klip yayına ÇIKMAMALI —
// hem amatör durur hem de o sunucu yavaşlarsa/engellerse sitedeki tüm kart
// önizlemeleri bozulur. Gerçek klipleri public/videos/ altına koyup buradaki
// tek satırı değiştirmek yeterli.
//
// Stand-in clip used everywhere a real AnkaraDrone video hasn't been shot/delivered yet.
// Each data entry that needs a video (see components/sections/Packages.tsx and
// References.tsx) has its own `videoSrc` field defaulting to this — swap that one
// field per entry once the real footage is ready, no other code changes needed.
export const PLACEHOLDER_VIDEO_SRC = "https://www.w3schools.com/html/mov_bbb.mp4";

/**
 * Hero arka plan videosu — `public/video/kale_loop.mp4` kaynağından web için
 * sıkıştırılmış iki sürüm. Kaynak dosya 1080p, ~17 Mbps, 97 MB'tı; sayfa her
 * açıldığında tamamı iniyordu.
 *
 * - landscape: 1280x720, 24 fps, ~13 MB — yatay ekranlar (masaüstü, yatay tablet)
 * - portrait:  540x960 dikey kırpım, 24 fps, ~7 MB — telefonlar. Dikey ekranda
 *   yatay videonun zaten yalnızca orta şeridi görünüyordu; o şeridi ayrı
 *   kodlamak aynı görüntüyü çok daha az veriyle veriyor.
 *
 * Poster kareleri video inene kadar (ve "hareketi azalt" / veri tasarrufu açık
 * cihazlarda video hiç oynatılmadan) gösterilir.
 *
 * Videoyu değiştirirseniz iki sürümü yeniden üretin, örnek komutlar:
 *   ffmpeg -i kaynak.mp4 -an -vf "scale=1280:-2,fps=24" -c:v libx264 -crf 28 -preset slow -movflags +faststart kale_loop-720p.mp4
 *   ffmpeg -i kaynak.mp4 -an -vf "crop=ih*9/16:ih,scale=540:960,fps=24" -c:v libx264 -crf 28 -preset slow -movflags +faststart kale_loop-mobile.mp4
 */
export const HERO_VIDEO = {
  landscape: "/video/kale_loop-720p.mp4",
  portrait: "/video/kale_loop-mobile.mp4",
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
