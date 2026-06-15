import type { MetadataRoute } from "next";
import { getAllPages } from "@/lib/content";
import { getPagePath } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const contentPages: MetadataRoute.Sitemap = getAllPages()
    .map<MetadataRoute.Sitemap[number]>((page) => ({
      url: `${SITE_URL}${getPagePath(page)}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    }))
    .sort((a, b) => a.url.localeCompare(b.url));

  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...contentPages,
  ];
}
