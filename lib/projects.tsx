import { PLACEHOLDER_VIDEO_SRC } from "@/lib/media";

// AnkaraDrone's own completed work, shown on /projeler — separate from
// components/sections/References.tsx (companies that trust/support us).
//
// Titles below are placeholders ("Proje 1" etc.) until real project names,
// videos, and cover photos are supplied — nothing here is invented client
// content. Fill in `videoSrc`/`coverImage` per project once footage exists.
export type Project = {
  slug: string;
  title: string;
  accentColor: string;
  videoSrc: string;
  coverImage?: string;
  description?: string;
  location?: string;
  date?: string;
  gallery?: string[];
};

export const PROJECTS: Project[] = [
  {
    slug: "proje-1",
    title: "Proje 1",
    accentColor: "rgba(33,150,243,.25)",
    videoSrc: PLACEHOLDER_VIDEO_SRC,
  },
  {
    slug: "proje-2",
    title: "Proje 2",
    accentColor: "rgba(76,175,80,.2)",
    videoSrc: PLACEHOLDER_VIDEO_SRC,
  },
  {
    slug: "proje-3",
    title: "Proje 3",
    accentColor: "rgba(255,150,0,.2)",
    videoSrc: PLACEHOLDER_VIDEO_SRC,
  },
  {
    slug: "proje-4",
    title: "Proje 4",
    accentColor: "rgba(156,39,176,.2)",
    videoSrc: PLACEHOLDER_VIDEO_SRC,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((project) => project.slug === slug);
}
