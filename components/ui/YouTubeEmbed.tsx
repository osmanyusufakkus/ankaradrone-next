import { youtubeEmbedUrl } from "@/lib/youtube";

type YouTubeEmbedProps = {
  /** The id from a YouTube URL, e.g. https://youtube.com/watch?v=<id> */
  videoId: string;
  title: string;
  className?: string;
  /**
   * Cover-fill ambient mode: autoplay, muted, looped, no player chrome —
   * for backgrounds and hover previews. Off by default, which renders a
   * standard player with controls (for click-to-watch contexts like a lightbox).
   */
  background?: boolean;
  /** Defaults to `background` — pass explicitly to autoplay a player-mode embed too (e.g. opened via click). */
  autoplay?: boolean;
  /** Source is a 9:16 video (e.g. a Shorts upload) — flips the background cover-fill math. Ignored in player mode, where the parent container controls the box. */
  vertical?: boolean;
  /** Start playback this many seconds in — used to skip a slow intro in hover previews. */
  start?: number;
  /** Fires once the iframe has loaded, so the caller can cross-fade it in over the cover image. */
  onReady?: () => void;
};

export default function YouTubeEmbed({
  videoId,
  title,
  className = "",
  background = false,
  autoplay = background,
  vertical = false,
  start,
  onReady,
}: YouTubeEmbedProps) {
  const src = youtubeEmbedUrl({ videoId, background, autoplay, start });

  if (background) {
    // Cover-fill trick: size the iframe by the *opposite* viewport unit so it
    // never shrinks below the container in either dimension, then center +
    // clip it — same idea as object-fit: cover for a native <video>. The
    // ratio swaps depending on the source's own aspect ratio.
    const coverSize = vertical
      ? "h-[177.78vw] min-h-full w-[56.25vh] min-w-full"
      : "h-[56.25vw] min-h-full w-[177.78vh] min-w-full";

    return (
      <div className={`pointer-events-none overflow-hidden ${className}`}>
        <iframe
          src={src}
          title={title}
          allow="autoplay; encrypted-media"
          onLoad={onReady}
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${coverSize}`}
        />
      </div>
    );
  }

  return (
    <iframe
      src={src}
      title={title}
      allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
      allowFullScreen
      onLoad={onReady}
      className={`h-full w-full ${className}`}
    />
  );
}
