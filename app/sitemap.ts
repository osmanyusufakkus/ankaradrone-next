import type { MetadataRoute } from "next";
import { PROJECTS } from "@/lib/projects";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: SITE_URL, lastModified, changeFrequency: "monthly", priority: 1 },
    {
      url: `${SITE_URL}/projeler`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...PROJECTS.map((project) => ({
      url: `${SITE_URL}/projeler/${project.slug}`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
    // /kvkk is deliberately left out — it's marked noindex in its own metadata.
  ];
}
