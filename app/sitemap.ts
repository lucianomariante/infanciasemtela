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
  return getAllPages().map((page) => ({
    url: `${SITE_URL}${getPagePath(page)}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: page.type === "bestof" ? 0.9 : 0.8,
  }));
}
