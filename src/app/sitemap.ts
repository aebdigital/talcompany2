import type { MetadataRoute } from "next";
import { PROJECTS } from "@/lib/projects";

const SITE_URL = "https://www.talcompany.sk";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const core = [
    { url: `${SITE_URL}/`, priority: 1, changeFrequency: "monthly" as const },
    { url: `${SITE_URL}/sluzby`, priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${SITE_URL}/galeria`, priority: 0.9, changeFrequency: "weekly" as const },
    { url: `${SITE_URL}/kontakt`, priority: 0.8, changeFrequency: "yearly" as const },
  ].map((p) => ({ ...p, lastModified: now }));

  const projectPages = PROJECTS.map((p) => ({
    url: `${SITE_URL}/projekty/${p.id}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...core, ...projectPages];
}
