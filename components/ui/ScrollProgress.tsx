"use client";

import { useState } from "react";
import { useRafScroll } from "@/hooks/useRafScroll";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useRafScroll(() => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    setProgress(scrollHeight > 0 ? (window.scrollY / scrollHeight) * 100 : 0);
  });

  return (
    <div aria-hidden className="fixed inset-x-0 top-0 z-101 h-0.75 bg-transparent">
      <div
        className="h-full bg-brand-blue transition-[width] duration-100 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
