"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

// SSR-safe "has this component hydrated on the client yet" check — needed before
// using browser-only APIs like createPortal. useSyncExternalStore (rather than a
// useState+useEffect pair) avoids the extra render pass React now flags via the
// react-hooks/set-state-in-effect lint rule.
export function useMounted() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
