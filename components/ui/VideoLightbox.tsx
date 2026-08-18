"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { createPortal } from "react-dom";
import { useMounted } from "@/hooks/useMounted";
import YouTubeEmbed from "@/components/ui/YouTubeEmbed";

type VideoLightboxProps = {
  open: boolean;
  onClose: () => void;
  /** Ekran okuyucu etiketi ve gömülü oynatıcının başlığı. */
  label: string;
  youtubeId?: string;
  youtubeVertical?: boolean;
  /** YouTube'a yüklenmemiş işler için yerel dosya. */
  videoSrc?: string;
  /**
   * Verilirse videonun YANINDA görünür bir "Projeyi İncele" düğmesi çıkar.
   *
   * Düğme bilerek videonun üstüne konmuyor: oynatıcının kendi kontrolleri orada
   * ve üste binen bir tık hedefi duraklatmayı/ilerlemeyi engellerdi. Aynı sebeple
   * dışarı tıklamak da projeye gitmiyor — orası her arayüzde "kapat" demektir,
   * projeye götürseydi videoyu kapatmak isteyen kullanıcı kendini başka sayfada
   * bulurdu.
   */
  projectHref?: string;
  /** Düğmenin üstünde gösterilen iş/müşteri adı. */
  caption?: string;
  /** Sektör gibi ikincil bilgi. */
  meta?: string;
  /** Kapanışta odağın geri döneceği eleman. */
  returnFocusTo?: React.RefObject<HTMLElement | null>;
};

export default function VideoLightbox({
  open,
  onClose,
  label,
  youtubeId,
  youtubeVertical = false,
  videoSrc,
  projectHref,
  caption,
  meta,
  returnFocusTo,
}: VideoLightboxProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const mounted = useMounted();

  useEffect(() => {
    if (!open) return;
    const returnTo = returnFocusTo?.current;
    closeButtonRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      // Odağı lightbox'ı açan öğeye geri gönder, yoksa sayfanın başına düşer.
      returnTo?.focus();
    };
  }, [open, onClose, returnFocusTo]);

  if (!mounted || !open) return null;

  const portrait = youtubeVertical || !youtubeId;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={label}
      onClick={(e) => {
        e.stopPropagation();
        onClose();
      }}
      className="animate-modal-fade fixed inset-0 z-200 flex items-center justify-center gap-10 bg-brand-black/80 p-6 backdrop-blur-xl max-md:flex-col max-md:gap-6"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`animate-modal-pop relative shrink-0 overflow-hidden rounded-drone bg-black shadow-[0_40px_120px_rgba(0,0,0,.65)] ring-1 ring-white/10 ${
          portrait
            ? // Dikey kutuyu YÜKSEKLİK sürüyor, genişlik orandan türüyor. Hem
              // yükseklik hem genişlik sınırı aynı anda bağlanırsa oran bozulur
              // (ölçüldü: mobilde 9:16 yerine 0.51'e düşüyordu), o yüzden
              // yükseklikler genişliğin asla sınıra dayanmayacağı şekilde
              // seçildi. Mobilde daha düşük: altta "Projeyi İncele" bloğu var.
              "aspect-9/16 h-[min(74vh,660px)] max-md:h-[min(58vh,500px)] max-w-[92vw]"
            : "aspect-video w-[min(88vw,900px)]"
        }`}
      >
        {youtubeId ? (
          // Lightbox videoyu baştan oynatır — previewStart yalnızca hover önizlemesi içindir.
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
          onClick={onClose}
          aria-label="Kapat"
          className="absolute top-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md transition-colors duration-200 hover:bg-brand-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden>
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {projectHref && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="animate-modal-pop max-w-75 text-left max-md:max-w-full max-md:text-center"
        >
          {meta && (
            <span className="mb-2 block text-[11px] font-bold tracking-[3px] text-brand-blue uppercase">
              {meta}
            </span>
          )}
          {caption && (
            <span className="mb-4 block font-display text-3xl leading-tight tracking-wide text-brand-white">
              {caption}
            </span>
          )}
          <p className="mb-6 text-sm leading-relaxed font-light text-brand-offwhite max-md:hidden">
            Bu işin detayları, çekim bilgileri ve diğer kareleri proje sayfasında.
          </p>
          <Link
            href={projectHref}
            className="inline-flex items-center gap-2.5 rounded-pill bg-brand-blue px-8 py-3.5 text-sm font-bold tracking-wide text-white transition-all duration-250 hover:-translate-y-0.5 hover:bg-brand-blue-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Projeyi İncele
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden>
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      )}
    </div>,
    document.body,
  );
}
