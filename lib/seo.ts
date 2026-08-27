import type { Metadata } from "next";
import type { ContentPage } from "@/lib/content";
import { isPageIndexable } from "@/lib/content";
import { getPagePath } from "@/lib/schema";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export function buildPageMetadata(page: ContentPage): Metadata {
  const path = getPagePath(page);
  const pageUrl = `${SITE_URL}${path}`;
  const indexable = isPageIndexable(page);

  return {
    title: page.title,
    description: page.intro,
    alternates: {
      canonical: pageUrl,
    },
    robots: indexable
      ? { index: true, follow: true }
      : { index: false, follow: true },
    openGraph: {
      title: page.title,
      description: page.intro,
      url: pageUrl,
      siteName: SITE_NAME,
      locale: "pt_BR",
      type: "article",
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: `${page.h1} — Infância Sem Tela`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.intro,
      images: ["/opengraph-image"],
    },
  };
}

export const notFoundMetadata: Metadata = {
  title: "Página não encontrada",
  robots: { index: false, follow: false },
};
