"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useHoverCapable, useReducedMotion } from "@/hooks/useMediaQuery";
import YouTubeEmbed from "@/components/ui/YouTubeEmbed";
import VideoLightbox from "@/components/ui/VideoLightbox";
import { COVER_BLUR_DATA_URL, youtubeThumbnail } from "@/lib/youtube";
import type { Project } from "@/lib/projects";

const HOVER_INTENT_MS = 200;

/**
 * Logo duvarı + tek büyük vitrin panosu.
 *
 * Kartların her birinin kendi videosunu oynattığı düzenin iki sorunu vardı:
 * dikey videoda ızgara hücresi küçük kaldığı için önizleme de küçük kalıyordu,
 * ve her kart ayrı iframe demekti. Burada video alanı ızgaradan bağımsız —
 * pano 340x604, yani hücreden kat kat büyük — ve **sayfada toplam tek iframe**
 * yaşıyor: hangi logonun üzerine gelirseniz pano onu gösteriyor.
 *
 * Hover anında kapak zaten değiştiği için YouTube'un ~1 saniyelik yüklenme
 * gecikmesi hissedilmiyor; hızlı gezinirken pano kapaklarla akıcı ilerliyor,
 * video ancak imleç bir logoda kalırsa devreye giriyor.
 */
export default function ReferenceWall({ projects }: { projects: Project[] }) {
  const defaultProject = projects.find((p) => p.youtubeId) ?? projects[0];

  const [activeSlug, setActiveSlug] = useState(defaultProject?.slug);
  const [previewing, setPreviewing] = useState(false);
  const [previewReady, setPreviewReady] = useState(false);
  const [lightboxSlug, setLightboxSlug] = useState<string | null>(null);

  const intentTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastTriggerRef = useRef<HTMLElement | null>(null);

  const canHover = useHoverCapable();
  const reducedMotion = useReducedMotion();

  const active = projects.find((p) => p.slug === activeSlug) ?? defaultProject;
  const lightboxProject = projects.find((p) => p.slug === lightboxSlug) ?? null;

  const stopPreview = useCallback(() => {
    if (intentTimer.current) {
      clearTimeout(intentTimer.current);
      intentTimer.current = null;
    }
    setPreviewing(false);
    setPreviewReady(false);
  }, []);

  useEffect(() => stopPreview, [stopPreview]);

  const handleLogoEnter = (project: Project) => {
    if (!canHover) return;
    // Kapak anında değişsin; video ayrı bir zamanlayıcıyla gelsin.
    stopPreview();
    setActiveSlug(project.slug);
    if (reducedMotion || !project.youtubeId) return;
    intentTimer.current = setTimeout(() => setPreviewing(true), HOVER_INTENT_MS);
  };

  const openLightbox = (project: Project, trigger: HTMLElement | null) => {
    lastTriggerRef.current = trigger;
    stopPreview();
    setLightboxSlug(project.slug);
  };

  if (!active) return null;

  const activeCover = active.youtubeId
    ? youtubeThumbnail(active.youtubeId, active.youtubeVertical)
    : active.coverImage;
  const panelPlaying = previewing && previewReady && Boolean(active.youtubeId);

  return (
    <div className="flex gap-10 max-md:flex-col-reverse max-md:gap-8">
      {/* ---------- Vitrin panosu ---------- */}
      {/* Mobilde gizli: hover olmadığı için panoyu sürecek bir sinyal yok, ve
          dokunan kullanıcı zaten lightbox'ta videoyu tam boy görüyor. */}
      <div className="w-85 shrink-0 max-md:hidden">
        <button
          type="button"
          onClick={(e) => openLightbox(active, e.currentTarget)}
          aria-label={`${active.title} — videoyu büyüt`}
          aria-haspopup="dialog"
          className="group relative block aspect-9/16 w-full cursor-pointer overflow-hidden rounded-drone border-1.5 border-brand-blue/20 bg-brand-dark text-left shadow-[0_24px_60px_rgba(0,0,0,.5)] transition-colors duration-300 hover:border-brand-blue/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
        >
          {activeCover && (
            <Image
              key={activeCover}
              src={activeCover}
              alt=""
              aria-hidden
              fill
              sizes="340px"
              placeholder="blur"
              blurDataURL={COVER_BLUR_DATA_URL}
              className="object-cover"
            />
          )}

          {previewing && active.youtubeId && (
            <div
              className={`absolute inset-0 transition-opacity duration-500 ${previewReady ? "opacity-100" : "opacity-0"}`}
            >
              <YouTubeEmbed
                background
                vertical={active.youtubeVertical}
                videoId={active.youtubeId}
                start={active.previewStart}
                title={`${active.title} önizleme`}
                className="absolute inset-0"
                onReady={() => setPreviewReady(true)}
              />
            </div>
          )}

          {/* Marka rengi katmanı — oynarken çekiliyor. */}
          <span
            aria-hidden
            className={`absolute inset-0 transition-opacity duration-500 ${panelPlaying ? "opacity-20" : "opacity-100"}`}
            style={{
              background: `radial-gradient(ellipse 90% 60% at 50% 30%, ${active.accentColor} 0%, transparent 70%), linear-gradient(180deg, rgba(8,12,16,.45) 0%, rgba(8,12,16,.15) 45%, rgba(8,12,16,.9) 100%)`,
            }}
          />

          {/* Oynarken müşteri logosu köşe rozetine küçülüyor: marka görünür
              kalıyor ama kareyi kapatmıyor. */}
          {active.client && (
            <span
              className={`absolute top-4 left-4 flex items-center gap-2 rounded-xl border border-white/15 bg-brand-black/70 px-3 py-2 backdrop-blur-md transition-opacity duration-500 ${panelPlaying ? "opacity-100" : "opacity-0"}`}
            >
              {active.client.logoUrl ? (
                <Image
                  src={active.client.logoUrl}
                  alt={active.client.name}
                  width={64}
                  height={24}
                  className="h-5 w-auto object-contain"
                />
              ) : (
                <span className="font-display text-sm tracking-wide text-white">
                  {active.client.name}
                </span>
              )}
            </span>
          )}

          {/* Durağan hâlde iş bilgisi ve izleme ipucu. */}
          <span
            className={`absolute inset-x-0 bottom-0 flex flex-col gap-1.5 p-6 transition-opacity duration-400 ${panelPlaying ? "opacity-0" : "opacity-100"}`}
          >
            {active.client && (
              <span className="text-[10px] font-bold tracking-[3px] text-brand-blue uppercase">
                {active.client.sector}
              </span>
            )}
            <span className="font-display text-2xl leading-tight tracking-wide text-brand-white">
              {active.title}
            </span>
            <span className="mt-2 inline-flex items-center gap-2 text-[11px] font-semibold tracking-wider text-white/60 uppercase">
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-brand-blue/40 bg-brand-blue/15 text-brand-blue-light transition-colors duration-250 group-hover:bg-brand-blue group-hover:text-white">
                <svg width="11" height="11" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
              Videoyu izle
            </span>
          </span>
        </button>
      </div>

      {/* ---------- Logo duvarı ---------- */}
      {/* flex-wrap + justify-center: son sıra eksik kalsa bile ortalanır, yani
          duvar herhangi bir referans sayısıyla düzgün görünür. */}
      <ul className="flex flex-1 list-none flex-wrap content-start justify-center gap-4">
        {projects.map((project) => {
          const isActive = project.slug === active.slug;
          return (
            <li
              key={project.slug}
              className="basis-[calc((100%-1rem)/2)] md:basis-[calc((100%-3rem)/4)]"
            >
              <button
                type="button"
                onMouseEnter={() => handleLogoEnter(project)}
                onFocus={() => setActiveSlug(project.slug)}
                onClick={(e) => openLightbox(project, e.currentTarget)}
                aria-label={`${project.title} — videoyu büyüt`}
                aria-haspopup="dialog"
                className={`group relative flex aspect-square w-full cursor-pointer flex-col items-center justify-center gap-2 overflow-hidden rounded-xl border-1.5 p-3 transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue ${
                  isActive
                    ? "border-brand-blue/70 bg-brand-blue/8"
                    : "border-white/8 bg-white/4 hover:border-brand-blue/40 hover:bg-white/6"
                }`}
              >
                {project.client?.logoUrl ? (
                  <span className="relative block h-10 w-[70%] shrink-0">
                    {/* Durağan hâlde gri, hover'da renkli — logo duvarlarının
                        klasik tekniği; farklı kalitedeki logoları birbirine
                        benzetip duvarı derli toplu gösteriyor. */}
                    <Image
                      src={project.client.logoUrl}
                      alt={project.client.name}
                      fill
                      sizes="140px"
                      className={`object-contain transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100 ${
                        isActive ? "grayscale-0 opacity-100" : "opacity-60 grayscale"
                      }`}
                    />
                  </span>
                ) : (
                  <span
                    aria-hidden
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg font-display text-xl text-white transition-all duration-300 group-hover:scale-110 group-hover:opacity-100 ${isActive ? "scale-110 opacity-100" : "opacity-65 grayscale"}`}
                    style={{ background: project.client?.color }}
                  >
                    {project.client?.code}
                  </span>
                )}
                <span
                  className={`text-center font-display text-[13px] leading-tight tracking-wide transition-colors duration-300 ${isActive ? "text-brand-white" : "text-white/55 group-hover:text-brand-white"}`}
                >
                  {project.client?.name}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {lightboxProject && (
        <VideoLightbox
          open
          onClose={() => setLightboxSlug(null)}
          label={lightboxProject.title}
          youtubeId={lightboxProject.youtubeId}
          youtubeVertical={lightboxProject.youtubeVertical}
          videoSrc={lightboxProject.videoSrc}
          projectHref={`/projeler/${lightboxProject.slug}`}
          caption={lightboxProject.title}
          meta={lightboxProject.client?.sector}
          returnFocusTo={lastTriggerRef}
        />
      )}
    </div>
  );
}
