"use client";

import { useRef } from "react";

type VideoCardProps = {
  videoSrc: string;
  /** Content shown before hover (icon+label, or brand logo area) */
  placeholder: React.ReactNode;
  /** Small pill hint shown before hover, hidden while playing (packages only) */
  hoverHint?: React.ReactNode;
  /** Content shown only while hovering, on top of the video (references only) */
  overlayContent?: React.ReactNode;
  /** Controls aspect ratio, rounding, background gradient, border, hover transform */
  className?: string;
};

export default function VideoCard({
  videoSrc,
  placeholder,
  hoverHint,
  overlayContent,
  className = "",
}: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

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

  return (
    <div
      className={`group relative cursor-pointer overflow-hidden ${className}`}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <video
        ref={videoRef}
        muted
        loop
        playsInline
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
    </div>
  );
}
