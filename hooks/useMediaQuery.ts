"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Bir CSS medya sorgusunu React state'i gibi okur.
 *
 * Sunucu cihazı bilemediği için `serverSnapshot` ile hangi cevabın varsayılacağı
 * belirtilir; React hydration'dan hemen sonra gerçek değerle yeniden render eder.
 */
export function useMediaQuery(query: string, serverSnapshot: boolean) {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", onChange);
      return () => list.removeEventListener("change", onChange);
    },
    [query],
  );

  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);
  const getServerSnapshot = useCallback(() => serverSnapshot, [serverSnapshot]);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/**
 * Fare/trackpad hover yapabilir, parmak yapamaz. Sunucu tarafında "dokunmatik"
 * varsayılır — iki daldan ucuz olanı, çünkü dokunmatik dalda hiç video/iframe
 * render edilmiyor.
 */
export function useHoverCapable() {
  return useMediaQuery("(hover: hover) and (pointer: fine)", false);
}

/**
 * Kullanıcı işletim sisteminde "hareketi azalt" seçtiyse true. Bu tercih çoğu
 * zaman migren veya vestibüler rahatsızlık kaynaklıdır; kendiliğinden oynayan
 * video bu kişiler için doğrudan rahatsızlık sebebidir.
 */
export function useReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)", false);
}
