import type { MetadataRoute } from "next";
import { getAllPages, type ContentPage } from "@/lib/content";
import { SITE_URL } from "@/lib/site";

function getPagePath(page: ContentPage): string {
  switch (page.type) {
    case "bestof":
      return `/melhores/${page.slug}`;
    case "gift":
      return `/presentes/${page.slug}`;
    case "guide":
      return `/guias/${page.slug}`;
    case "comparative":
      return `/comparativos/${page.slug}`;
  }
}

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
