import Image from "next/image";
import type { Project } from "@/lib/projects";
import { COVER_BLUR_DATA_URL, youtubeThumbnail } from "@/lib/youtube";

type ProjectCoverProps = {
  project: Project;
  sizes: string;
  priority?: boolean;
  className?: string;
};

export default function ProjectCover({
  project,
  sizes,
  priority = false,
  className = "",
}: ProjectCoverProps) {
  // Elle verilmiş kapak varsa o kazanır; yoksa YouTube id'sinden türetilir.
  // Kapak görselini ayrıca hazırlamak gerekmiyor.
  const cover =
    project.coverImage ??
    (project.youtubeId
      ? youtubeThumbnail(project.youtubeId, project.youtubeVertical)
      : undefined);

  if (cover) {
    return (
      <Image
        src={cover}
        alt={project.title}
        fill
        sizes={sizes}
        priority={priority}
        placeholder="blur"
        blurDataURL={COVER_BLUR_DATA_URL}
        className={`object-cover ${className}`}
      />
    );
  }

  // Ne kapak ne video id'si var — vurgu rengiyle nötr bir yer tutucu.
  return (
    <div
      className={`absolute inset-0 flex items-center justify-center ${className}`}
      style={{
        background: `radial-gradient(circle at 28% 22%, ${project.accentColor} 0%, transparent 62%), linear-gradient(160deg, #0d1117 0%, #080c10 100%)`,
      }}
    >
      <svg width="40" height="40" fill="none" stroke="white" strokeOpacity={0.35} strokeWidth="1.5" viewBox="0 0 24 24">
        <polygon points="10 8 16 12 10 16 10 8" />
        <circle cx="12" cy="12" r="10" />
      </svg>
    </div>
  );
}
