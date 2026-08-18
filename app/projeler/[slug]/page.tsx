import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";
import ProjectCover from "@/components/ui/ProjectCover";
import VideoCard from "@/components/ui/VideoCard";
import { PROJECTS, getProjectBySlug } from "@/lib/projects";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: `${project.title} – AnkaraDrone`,
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <article className="bg-brand-black pt-40 pb-25">
      <div className="mx-auto max-w-245 px-8">
        <Link
          href="/projeler"
          className="mb-10 inline-flex items-center gap-2 rounded text-xs font-semibold tracking-wide text-brand-offwhite uppercase transition-colors duration-200 hover:text-brand-blue focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue"
        >
          ← Tüm Projeler
        </Link>

        <Eyebrow>Proje</Eyebrow>
        <h1 className="mb-10 font-display text-[clamp(40px,6vw,84px)] leading-[0.95] text-brand-white">
          {project.title}
        </h1>

        <VideoCard
          videoSrc={project.videoSrc}
          youtubeId={project.youtubeId}
          youtubeVertical={project.youtubeVertical}
          label={project.title}
          className="mb-14 aspect-video w-full overflow-hidden rounded-drone border-1.5 border-white/8"
          hoverHint="▶ Videoyu Oynat"
          placeholder={
            <div className="flex flex-col items-center gap-3">
              <div
                className="flex h-16 w-16 items-center justify-center rounded-full border-1.5 border-brand-blue/30 backdrop-blur-sm"
                style={{ background: project.accentColor }}
              >
                <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <span className="text-xs font-semibold tracking-[2px] text-white/40 uppercase">
                Örnek Video
              </span>
            </div>
          }
        />

        <div className="grid grid-cols-3 gap-14 max-md:grid-cols-1">
          <div className="col-span-2 max-md:col-span-1">
            <h2 className="mb-4 text-[11px] font-bold tracking-widest text-brand-blue uppercase">
              Proje Hakkında
            </h2>
            <p className="max-w-165 text-[15px] leading-loose font-light text-brand-offwhite">
              {project.description ?? "İçerik yakında eklenecek."}
            </p>

            {project.gallery && project.gallery.length > 0 && (
              <div className="mt-14">
                <h2 className="mb-4 text-[11px] font-bold tracking-widest text-brand-blue uppercase">
                  Galeri
                </h2>
                <div className="grid grid-cols-3 gap-4 max-sm:grid-cols-1">
                  {project.gallery.map((image) => (
                    <div
                      key={image}
                      className="relative aspect-square overflow-hidden rounded-xl border-1.5 border-white/8"
                    >
                      <ProjectCover
                        project={{ ...project, coverImage: image }}
                        sizes="(max-width: 640px) 100vw, 33vw"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div>
            <h2 className="mb-4 text-[11px] font-bold tracking-widest text-brand-blue uppercase">
              Proje Bilgileri
            </h2>
            <dl className="flex flex-col gap-4">
              <div>
                <dt className="mb-1 text-[10px] tracking-[2px] text-white/40 uppercase">
                  Konum
                </dt>
                <dd className="text-sm text-brand-offwhite">{project.location ?? "—"}</dd>
              </div>
              <div>
                <dt className="mb-1 text-[10px] tracking-[2px] text-white/40 uppercase">
                  Tarih
                </dt>
                <dd className="text-sm text-brand-offwhite">{project.date ?? "—"}</dd>
              </div>
              <div>
                <dt className="mb-1 text-[10px] tracking-[2px] text-white/40 uppercase">
                  Hizmet
                </dt>
                <dd className="text-sm text-brand-offwhite">Drone Çekimi</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="mt-16 rounded-drone border-1.5 border-brand-blue/15 bg-brand-card px-8 py-10 text-center">
          <h2 className="mb-3 font-display text-2xl tracking-wide text-brand-white">
            Benzer Bir Proje mi Planlıyorsunuz?
          </h2>
          <p className="mx-auto mb-7 max-w-105 text-sm leading-relaxed font-light text-brand-offwhite">
            Projeniz için size özel bir teklif hazırlayalım.
          </p>
          <Button href="/#contact">Teklif Al</Button>
        </div>
      </div>
    </article>
  );
}
