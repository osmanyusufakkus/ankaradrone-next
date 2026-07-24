import type { Config } from "tailwindcss";

// NOTE: Tailwind v4 is CSS-first — brand color/radius/animation tokens live in
// app/globals.css under `@theme`. This file exists as infrastructure for
// future JS-driven plugins/presets and is loaded via `@config` in globals.css.
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
