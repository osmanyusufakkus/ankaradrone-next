"use client";

import { useEffect, useRef } from "react";

/**
 * Runs `handler` on scroll, but at most once per animation frame.
 *
 * A raw `scroll` listener fires far more often than the screen repaints — on a
 * trackpad or a phone that's easily 100+ calls a second, and every one of them
 * here ends in a `setState`, i.e. a React re-render. Coalescing to one call per
 * frame keeps the behaviour identical while cutting the work to what the
 * display can actually show. The handler also runs once on mount so the initial
 * state matches a page loaded mid-scroll (e.g. a refresh or a #hash landing).
 */
export function useRafScroll(handler: () => void) {
  // Kept in a ref so a caller passing an inline arrow function doesn't tear the
  // listener down and rebuild it on every render. Synced in its own effect
  // rather than during render — a ref write during render is not safe under
  // concurrent rendering, where a render can be thrown away.
  const handlerRef = useRef(handler);
  useEffect(() => {
    handlerRef.current = handler;
  });

  useEffect(() => {
    let frame = 0;

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        handlerRef.current();
      });
    };

    handlerRef.current();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);
}
