// Stand-in clip used everywhere a real AnkaraDrone video hasn't been shot/delivered yet.
// Each data entry that needs a video (see components/sections/Packages.tsx and
// References.tsx) has its own `videoSrc` field defaulting to this — swap that one
// field per entry once the real footage is ready, no other code changes needed.
export const PLACEHOLDER_VIDEO_SRC = "https://www.w3schools.com/html/mov_bbb.mp4";
