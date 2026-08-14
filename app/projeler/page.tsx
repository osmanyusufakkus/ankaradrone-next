import type { Metadata } from "next";
import Link from "next/link";
import Eyebrow from "@/components/ui/Eyebrow";
import ProjectCover from "@/components/ui/ProjectCover";
import { PROJECTS } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projelerimiz – AnkaraDrone",
  description: "AnkaraDrone'un tamamladığı drone çekim projelerine göz atın.",
};

export default function ProjelerPage() {
  return (
    <section className="bg-brand-black pt-40 pb-25">
      <div className="mx-auto max-w-[1240px] px-8">
        <div className="mb-16">
          <Eyebrow>Projelerimiz</Eyebrow>
          <h1 className="font-display text-[clamp(42px,5.5vw,72px)] leading-[0.95] text-brand-white">
            TAMAMLANAN <span className="text-brand-blue">PROJELER</span>
          </h1>
        </div>

        <div className="grid grid-cols-3 gap-6 max-md:grid-cols-2 max-sm:grid-cols-1">
          {PROJECTS.map((project) => (
            <Link
              key={project.slug}
              href={`/projeler/${project.slug}`}
              className="group relative block aspect-4/3 overflow-hidden rounded-2xl border-1.5 border-white/8 transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-blue hover:shadow-[0_20px_50px_rgba(33,150,243,.15)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
            >
              <ProjectCover
                project={project}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <h2 className="font-display text-2xl leading-tight tracking-wide text-white">
                  {project.title}
                </h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
