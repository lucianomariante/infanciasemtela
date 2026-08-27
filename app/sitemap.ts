import type { MetadataRoute } from "next";
import { getAllPages, isPageIndexable } from "@/lib/content";
import { getPagePath } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const contentPages: MetadataRoute.Sitemap = getAllPages()
    .filter(isPageIndexable)
    .map<MetadataRoute.Sitemap[number]>((page) => ({
      url: `${SITE_URL}${getPagePath(page)}`,
    }))
    .sort((a, b) => a.url.localeCompare(b.url));

  const staticPaths = [
    "",
    "/guias",
    "/melhores",
    "/presentes",
    "/lista-brinquedos-sem-tela",
    "/sobre",
    "/autores/ana-maria-mariante",
    "/como-avaliamos",
    "/politica-editorial",
    "/privacidade",
  ];

  return [
    ...staticPaths.map((path) => ({ url: `${SITE_URL}${path}` })),
    ...contentPages,
  ];
}
