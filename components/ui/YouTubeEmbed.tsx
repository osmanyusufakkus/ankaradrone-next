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
    // Kapak-doldurma: iframe'i *karşıt* eksenin biriminden ölçüp iki boyutta da
    // kabın altına düşmesini engelliyoruz, sonra ortalayıp kırpıyoruz — yerel
    // bir <video> için `object-fit: cover` ne yapıyorsa aynısı.
    //
    // Birimler `vw/vh` DEĞİL `cqw/cqh`: ölçü ekrandan değil kabın kendisinden
    // alınmalı. Bu kod ilk olarak tüm ekranı kaplayan Hero için yazıldığından
    // ekran birimleri doğru sonuç veriyordu; aynı bileşen 340x604'lük bir kartın
    // içine girince hesap hâlâ ekrana göre yapılıyor ve iframe 506x2560'a
    // şişiyordu (yükseklikte 4.24 kat) — yani karenin yalnızca %24'lük dar bir
    // şeridi görünüyordu. Kap birimleriyle iframe tam kabın ölçüsüne oturuyor.
    const coverSize = vertical
      ? "h-[177.78cqw] min-h-full w-[56.25cqh] min-w-full"
      : "h-[56.25cqw] min-h-full w-[177.78cqh] min-w-full";

    return (
      // `container-type: size` olmadan cqw/cqh'nin dayanacağı bir kap yok.
      <div
        className={`pointer-events-none overflow-hidden [container-type:size] ${className}`}
      >
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
