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

// Set this to a real YouTube video id (the `v=` part of a youtube.com/watch
// URL) once the hero footage is uploaded there — Hero.tsx will switch from
// the local placeholder mp4 above to a YouTube background embed
// automatically, no other code changes needed.
export const HERO_YOUTUBE_ID: string | undefined = undefined;

// Set to true if the hero footage above is a 9:16 (e.g. Shorts) upload rather
// than standard 16:9 landscape — flips the background cover-fill math.
export const HERO_YOUTUBE_VERTICAL = false;
