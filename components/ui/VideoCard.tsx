"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { useMounted } from "@/hooks/useMounted";
import { useHoverCapable, useReducedMotion } from "@/hooks/useMediaQuery";
import YouTubeEmbed from "@/components/ui/YouTubeEmbed";
import { COVER_BLUR_DATA_URL, youtubeThumbnail } from "@/lib/youtube";

/**
 * İmleç kartın üzerinden öylesine geçtiğinde önizleme tetiklenmesin diye
 * beklenen süre. Bu olmadan sayfayı hızlıca kaydıran biri arka arkaya birkaç
 * iframe oluşturup yok ederdi.
 */
const HOVER_INTENT_MS = 200;

type VideoCardProps = {
  /**
   * Yerel kısa klip — yalnızca `youtubeId` verilmediğinde (henüz YouTube'a
   * yüklenmemiş işler) hover önizlemesi için kullanılır.
   */
  videoSrc?: string;
  /** İşin YouTube id'si. Verildiğinde kapak, hover önizlemesi ve lightbox hep bundan türer. */
  youtubeId?: string;
  /** Video 9:16 (Shorts) ise true — hem kapak varyantını hem lightbox kutusunu belirler. */
  youtubeVertical?: boolean;
  /** Hover önizlemesinin başlayacağı saniye — girişteki yavaş açılışı atlayıp "vitrin anından" başlatır. */
  previewStart?: number;
  /** Kapak görselini elle vermek için. Boşsa `youtubeId`'den türetilir. */
  posterSrc?: string;
  /** next/image `sizes` değeri — kartın gerçek genişliğine göre verilmeli. */
  posterSizes?: string;
  /**
   * Kapağın üzerine binen marka rengi katmanı (Tailwind gradient sınıfı).
   * Durağan hâlde kapağı renklendirir, önizleme oynarken saydamlaşır.
   */
  tintClassName?: string;
  /** Bu kartın ne gösterdiği — ekran okuyucu etiketi ve lightbox başlığı. */
  label: string;
  /** Kapak yokken görünen içerik (ikon + etiket, veya marka logosu). */
  placeholder: React.ReactNode;
  /** Önizleme başlamadan önce görünen küçük ipucu hapı. */
  hoverHint?: React.ReactNode;
  /** Yalnızca önizleme oynarken videonun üstünde görünen içerik. */
  overlayContent?: React.ReactNode;
  /** En/boy oranı, köşe yuvarlaması, kenarlık, hover dönüşümü. */
  className?: string;
  /** Kartın etkileşimli olduğunu ima eden kısa parıltı animasyonu. */
  pulseHint?: boolean;
};

export default function VideoCard({
  videoSrc,
  youtubeId,
  youtubeVertical = false,
  previewStart,
  posterSrc,
  posterSizes = "(max-width: 768px) 100vw, 340px",
  tintClassName = "",
  label,
  placeholder,
  hoverHint,
  overlayContent,
  className = "",
  pulseHint = false,
}: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const intentTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [previewing, setPreviewing] = useState(false);
  const [previewReady, setPreviewReady] = useState(false);
  const [hovering, setHovering] = useState(false);

  const mounted = useMounted();
  const canHover = useHoverCapable();
  const reducedMotion = useReducedMotion();

  const cover = posterSrc ?? (youtubeId ? youtubeThumbnail(youtubeId, youtubeVertical) : undefined);
  // YouTube önizlemesi ancak iframe yüklendikten sonra gerçekten görünür;
  // yerel klipte böyle bir gecikme yok, hover anında oynamaya başlar.
  const playing = youtubeId ? previewing && previewReady : hovering && Boolean(videoSrc);

  const stopPreview = useCallback(() => {
    if (intentTimer.current) {
      clearTimeout(intentTimer.current);
      intentTimer.current = null;
    }
    setPreviewing(false);
    setPreviewReady(false);
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  }, []);

  useEffect(() => stopPreview, [stopPreview]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const card = cardRef.current;
    closeButtonRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      // Odağı lightbox'ı açan karta geri gönder, yoksa sayfanın başına düşer.
      card?.focus();
    };
  }, [lightboxOpen]);

  const handleEnter = () => {
    if (!canHover) return;
    setHovering(true);
    // "Hareketi azalt" seçili kullanıcıda kendiliğinden oynatma hiç başlamasın —
    // kapak ve tıklayınca açılan lightbox onlar için de çalışmaya devam eder.
    if (reducedMotion) return;

    if (youtubeId) {
      intentTimer.current = setTimeout(() => setPreviewing(true), HOVER_INTENT_MS);
    } else if (videoSrc) {
      videoRef.current?.play().catch(() => {});
    }
  };

  const handleLeave = () => {
    setHovering(false);
    stopPreview();
  };

  const handleOpen = () => {
    stopPreview();
    setLightboxOpen(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleOpen();
    }
  };

  return (
    <div
      ref={cardRef}
      role="button"
      tabIndex={0}
      aria-label={`${label} — videoyu izle`}
      aria-haspopup="dialog"
      className={`group relative cursor-pointer overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue ${pulseHint ? "animate-pulse-glow hover:[animation-play-state:paused]" : ""} ${className}`}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={handleOpen}
      onKeyDown={handleKeyDown}
    >
      {/* 1. Kapak — her zaman, her cihazda. Bölümün ilk bakışta gerçek iş
             göstermesini sağlayan katman bu. */}
      {cover && (
        <Image
          src={cover}
          alt=""
          aria-hidden
          fill
          sizes={posterSizes}
          placeholder="blur"
          blurDataURL={COVER_BLUR_DATA_URL}
          className="object-cover"
        />
      )}

      {/* 2a. YouTube önizlemesi — yalnızca hover sürerken DOM'a giriyor ve
              ayrılınca tamamen siliniyor. Aynı anda tek kart hover'landığı için
              sayfada en fazla tek iframe yaşar. */}
      {previewing && youtubeId && (
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${previewReady ? "opacity-100" : "opacity-0"}`}
        >
          <YouTubeEmbed
            background
            vertical={youtubeVertical}
            videoId={youtubeId}
            start={previewStart}
            title={`${label} önizleme`}
            className="absolute inset-0"
            onReady={() => setPreviewReady(true)}
          />
        </div>
      )}

      {/* 2b. Henüz YouTube'a yüklenmemiş işler için yerel klip. */}
      {!youtubeId && videoSrc && canHover && (
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="metadata"
          src={videoSrc}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${playing ? "opacity-100" : "opacity-0"}`}
        />
      )}

      {/* 3. Marka rengi katmanı: durağan hâlde kapağı renklendirir, önizleme
             oynarken çekilip gerçek renkleri açığa çıkarır. */}
      {tintClassName && (
        <div
          aria-hidden
          className={`absolute inset-0 transition-opacity duration-500 ${tintClassName} ${playing ? "opacity-15" : "opacity-70"}`}
        />
      )}

      {/* 4. Kapak yokken anlam taşıyan ikon/logo bloğu; kapak varsa da üstte
             durur ama önizleme başlayınca çekilir. */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 transition-opacity duration-400 ${playing ? "opacity-0" : "opacity-100"}`}
      >
        {placeholder}
      </div>

      {canHover ? (
        hoverHint && (
          <div
            className={`absolute bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-pill border border-brand-blue/30 bg-brand-blue/20 px-4 py-1.5 text-[11px] font-semibold tracking-wider text-brand-blue-light uppercase backdrop-blur-md transition-opacity duration-300 ${playing ? "opacity-0" : "opacity-100"}`}
          >
            {hoverHint}
          </div>
        )
      ) : (
        <div
          aria-hidden
          className="absolute right-3 bottom-3 flex h-10 w-10 items-center justify-center rounded-full border border-brand-blue/40 bg-brand-black/70 text-brand-blue-light backdrop-blur-md"
        >
          <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      )}

      {overlayContent && (
        <div
          className={`absolute inset-0 transition-opacity duration-400 ${playing ? "opacity-100" : "opacity-0"}`}
        >
          {overlayContent}
        </div>
      )}

      {mounted &&
        lightboxOpen &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={label}
            onClick={(e) => {
              e.stopPropagation();
              setLightboxOpen(false);
            }}
            className="animate-modal-fade fixed inset-0 z-200 flex items-center justify-center bg-brand-black/70 backdrop-blur-xl"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className={`animate-modal-pop relative overflow-hidden rounded-drone bg-black shadow-[0_40px_120px_rgba(0,0,0,.65)] ring-1 ring-white/10 ${
                youtubeId && !youtubeVertical
                  ? "aspect-video w-[min(92vw,880px)]"
                  : "aspect-9/16 w-[min(90vw,420px)]"
              }`}
            >
              {youtubeId ? (
                // Lightbox videoyu baştan oynatır — previewStart yalnızca hover içindir.
                <YouTubeEmbed videoId={youtubeId} title={label} autoplay />
              ) : (
                <video
                  autoPlay
                  loop
                  playsInline
                  controls
                  src={videoSrc}
                  className="h-full w-full bg-black object-cover"
                />
              )}
              <button
                ref={closeButtonRef}
                onClick={() => setLightboxOpen(false)}
                aria-label="Kapat"
                className="absolute top-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md transition-colors duration-200 hover:bg-brand-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
