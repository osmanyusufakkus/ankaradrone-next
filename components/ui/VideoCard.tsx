"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useMounted } from "@/hooks/useMounted";
import YouTubeEmbed from "@/components/ui/YouTubeEmbed";

type VideoCardProps = {
  /** Short hover-preview clip — always a local file, never YouTube (needs instant, flicker-free play/pause). */
  videoSrc: string;
  /**
   * Real YouTube video id for the lightbox ("watch the full video") once
   * footage is uploaded there. Leave unset to keep using `videoSrc` in the
   * lightbox too — no other code changes needed either way.
   */
  youtubeId?: string;
  /** The YouTube video above is a 9:16 (e.g. Shorts) upload — sizes the lightbox portrait instead of the 16:9 default. */
  youtubeVertical?: boolean;
  /** Content shown before hover (icon+label, or brand logo area) */
  placeholder: React.ReactNode;
  /** Small pill hint shown before hover, hidden while playing (packages only) */
  hoverHint?: React.ReactNode;
  /** Content shown only while hovering, on top of the video (references only) */
  overlayContent?: React.ReactNode;
  /** Controls aspect ratio, rounding, background gradient, border, hover transform */
  className?: string;
  /** Plays a brief glow pulse on mount to hint that the card is hoverable */
  pulseHint?: boolean;
};

export default function VideoCard({
  videoSrc,
  youtubeId,
  youtubeVertical = false,
  placeholder,
  hoverHint,
  overlayContent,
  className = "",
  pulseHint = false,
}: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const mounted = useMounted();

  useEffect(() => {
    if (!lightboxOpen) return;
    closeButtonRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [lightboxOpen]);

  const handleEnter = () => {
    videoRef.current?.play().catch(() => {});
  };

  const handleLeave = () => {
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  };

  const handleOpen = () => {
    videoRef.current?.pause();
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
      role="button"
      tabIndex={0}
      aria-label="Videoyu büyüt"
      className={`group relative cursor-pointer overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue ${pulseHint ? "animate-pulse-glow hover:[animation-play-state:paused]" : ""} ${className}`}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={handleOpen}
      onKeyDown={handleKeyDown}
    >
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="metadata"
        src={videoSrc}
        className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 transition-opacity duration-400 group-hover:opacity-0">
        {placeholder}
      </div>

      {hoverHint && (
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-pill border border-brand-blue/30 bg-brand-blue/20 px-4 py-1.5 text-[11px] font-semibold tracking-wider text-brand-blue-light uppercase backdrop-blur-md transition-opacity duration-300 group-hover:opacity-0">
          {hoverHint}
        </div>
      )}

      {overlayContent && (
        <div className="absolute inset-0 opacity-0 transition-opacity duration-400 group-hover:opacity-100">
          {overlayContent}
        </div>
      )}

      {mounted &&
        lightboxOpen &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Video önizleme"
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
                <YouTubeEmbed videoId={youtubeId} title="Proje videosu" autoplay />
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
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
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
