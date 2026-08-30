"use client";

import { useRef } from "react";
import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";
import YouTubeEmbed from "@/components/ui/YouTubeEmbed";
import {
  HERO_YOUTUBE_ID,
  HERO_YOUTUBE_VERTICAL,
  PLACEHOLDER_VIDEO_SRC,
} from "@/lib/media";

export default function Hero() {
  const droneRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = droneRef.current;
    if (!el) return;
    const { innerWidth, innerHeight } = window;
    const x = (e.clientX / innerWidth - 0.5) * 30;
    const y = (e.clientY / innerHeight - 0.5) * 30;
    el.style.setProperty("--parallax-x", `${x}px`);
    el.style.setProperty("--parallax-y", `${y}px`);
  };

  return (
    <section
      id="hero"
      onMouseMove={handleMouseMove}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-35 pb-20 text-center">
      {HERO_YOUTUBE_ID ? (
        <YouTubeEmbed
          background
          vertical={HERO_YOUTUBE_VERTICAL}
          videoId={HERO_YOUTUBE_ID}
          title="AnkaraDrone tanıtım videosu"
          className="absolute inset-0 z-0 opacity-40"
        />
      ) : (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          src="/video/hero-background.mp4"
          className="absolute inset-0 z-0 h-full w-full object-cover opacity-90"
        />
      )}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-brand-black/80 via-brand-black/70 to-brand-black" />
      <div className="pointer-events-none absolute inset-0 z-20 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(33,150,243,0.18)_0%,transparent_70%)]" />
      {/*
      <div
        ref={droneRef}
        style={{
          transform: "translate(var(--parallax-x, 0), var(--parallax-y, 0))",
        }}
        className="pointer-events-none absolute top-[30%] right-[6%] z-20 opacity-6 transition-transform duration-300 ease-out">
        <div className="animate-float-drone">
          <svg
            width="380"
            height="380"
            viewBox="0 0 380 380"
            fill="white"
            xmlns="http://www.w3.org/2000/svg">
            <ellipse
              cx="190"
              cy="190"
              rx="185"
              ry="185"
              fill="none"
              stroke="white"
              strokeWidth="2"
            />
            <circle
              cx="190"
              cy="190"
              r="60"
              fill="none"
              stroke="white"
              strokeWidth="3"
            />
            <circle
              cx="82"
              cy="82"
              r="48"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
            />
            <circle
              cx="298"
              cy="82"
              r="48"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
            />
            <circle
              cx="82"
              cy="298"
              r="48"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
            />
            <circle
              cx="298"
              cy="298"
              r="48"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
            />
            <line
              x1="120"
              y1="120"
              x2="160"
              y2="160"
              stroke="white"
              strokeWidth="3"
            />
            <line
              x1="260"
              y1="120"
              x2="220"
              y2="160"
              stroke="white"
              strokeWidth="3"
            />
            <line
              x1="120"
              y1="260"
              x2="160"
              y2="220"
              stroke="white"
              strokeWidth="3"
            />
            <line
              x1="260"
              y1="260"
              x2="220"
              y2="220"
              stroke="white"
              strokeWidth="3"
            />
          </svg>
        </div>
      </div>
      */}
      <div className="relative z-30 flex flex-col items-center">
        <div className="animate-hero-in" style={{ animationDelay: "0.05s" }}>
          <Eyebrow className="justify-center">
            Ankara · Türkiye · Hava Çekimleri
          </Eyebrow>
        </div>

        <h1
          className="mb-8 animate-hero-in font-display text-[clamp(64px,10vw,150px)] leading-[0.88] tracking-[1px] text-brand-white"
          style={{ animationDelay: "0.15s" }}>
          ANKARA
          <br />
          <span className="text-brand-blue">DRONE</span>
        </h1>

        <p
          className="mb-11 max-w-[560px] animate-hero-in text-[18px] leading-relaxed font-light text-brand-offwhite"
          style={{ animationDelay: "0.3s" }}>
          İnşaat, gayrimenkul ve kurumsal projeleriniz için profesyonel drone
          çekimleri, 3D modelleme ve animasyonlu videolar.
        </p>

        <div
          className="flex animate-hero-in flex-wrap justify-center gap-4"
          style={{ animationDelay: "0.45s" }}>
          <Button
            href="#packages"
            icon={
              <svg
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445z" />
              </svg>
            }>
            Paketleri İncele
          </Button>
          <Button href="#contact" variant="outline">
            Teklif Al
          </Button>
        </div>
      </div>
      <div className="absolute bottom-9.5 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-2 text-[11px] tracking-[2px] text-white/30 uppercase">
        <div className="h-9 w-0.5 animate-scroll-pulse rounded-full bg-gradient-to-b from-brand-blue/60 to-transparent" />
        <span>Kaydır</span>
      </div>
    </section>
  );
}
