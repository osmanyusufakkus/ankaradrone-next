"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";
import YouTubeEmbed from "@/components/ui/YouTubeEmbed";
import { HERO_YOUTUBE_ID, HERO_YOUTUBE_VERTICAL } from "@/lib/media";

export default function Hero() {
  const droneRef = useRef<HTMLDivElement>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

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
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-brand-black px-6 pt-35 pb-20 text-center">
      {HERO_YOUTUBE_ID ? (
        <YouTubeEmbed
          background
          vertical={HERO_YOUTUBE_VERTICAL}
          videoId={HERO_YOUTUBE_ID}
          title="AnkaraDrone tanıtım videosu"
          className="absolute inset-0 z-0 opacity-40"
        />
      ) : (
        <div className="absolute inset-0 z-0 overflow-hidden bg-brand-black">
          <video
            aria-hidden="true"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            src="/video/kale_loop.mp4"
            onPlaying={() => setIsVideoPlaying(true)}
            onError={() => setIsVideoPlaying(false)}
            className={`absolute inset-0 h-full w-full object-cover object-[center_40%] brightness-110 contrast-110 saturate-110 transition-opacity duration-[1600ms] ease-out will-change-opacity ${
              isVideoPlaying ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>
      )}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-brand-black/30 via-brand-black/35 to-brand-black/80" />

      <div className="pointer-events-none absolute inset-0 z-20 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(33,150,243,0.10)_0%,transparent_70%)]" />

      <div
        ref={droneRef}
        style={{
          transform: "translate(var(--parallax-x, 0), var(--parallax-y, 0))",
        }}
        className="pointer-events-none absolute top-[23%] right-[3%] z-20 hidden opacity-50 transition-transform duration-300 ease-out md:block">
        <div className="animate-float-drone">
          <Image
            src="/images/AnkaraDroneDüz.png"
            alt=""
            width={747}
            height={747}
            loading="eager"
            className="h-[clamp(280px,30vw,440px)] w-[clamp(280px,30vw,440px)] drop-shadow-[0_0_45px_rgba(33,150,243,.28)]"
          />
        </div>
      </div>
      <div className="relative z-30 flex flex-col items-center">
        <div
          className="mb-4 animate-hero-in md:hidden"
          style={{ animationDelay: "0.02s" }}>
          <Image
            src="/images/AnkaraDroneDüz.png"
            alt=""
            width={747}
            height={747}
            loading="eager"
            className="h-64 w-64 drop-shadow-[0_0_30px_rgba(33,150,243,.30)]"
          />
        </div>
        <div className="animate-hero-in" style={{ animationDelay: "0.05s" }}>
          <Eyebrow className="justify-center">
            Ankara · Türkiye · Hava Çekimleri
          </Eyebrow>
        </div>

        <h1
          className="section-title-glow mb-8 animate-hero-in font-display text-[clamp(64px,10vw,150px)] leading-[0.88] tracking-[1px] text-brand-white"
          style={{ animationDelay: "0.15s" }}>
          ANKARA
          <br />
          <span className="section-title-glow-accent text-brand-blue">DRONE</span>
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
