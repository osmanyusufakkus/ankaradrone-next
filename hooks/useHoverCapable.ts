"use client";

import { useSyncExternalStore } from "react";

// A mouse/trackpad can hover; a finger cannot. Anything gated behind :hover is
// simply unreachable on a phone, so components need to know which one they're
// dealing with rather than assuming a pointer exists.
const HOVER_QUERY = "(hover: hover) and (pointer: fine)";

function subscribe(onChange: () => void) {
  const query = window.matchMedia(HOVER_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

/**
 * True when the visitor's primary input can hover (desktop), false on touch.
 *
 * The server can't know the device, so it answers "touch" — the cheaper of the
 * two branches, since the touch path renders no `<video>` at all. React then
 * re-renders with the real value right after hydration.
 */
export function useHoverCapable() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(HOVER_QUERY).matches,
    () => false,
  );
}
