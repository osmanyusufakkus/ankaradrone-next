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
