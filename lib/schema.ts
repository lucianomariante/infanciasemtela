import type { ContentPage } from "@/lib/content";
import type { ProductWithScore } from "@/lib/products";
import { EDITORIAL_AUTHOR, SITE_URL } from "@/lib/site";

type JsonLd = Record<string, unknown>;

export function getPagePath(page: ContentPage): string {
  switch (page.type) {
    case "bestof":
      return `/${page.slug}`;
    case "gift":
      return `/presentes/${page.slug}`;
    case "guide":
      return `/guias/${page.slug}`;
    case "comparative":
      return `/comparativos/${page.slug}`;
  }
}

export function generateFAQSchema(page: ContentPage): JsonLd | null {
  if (!page.faq || page.faq.length === 0) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function generateArticleSchema(page: ContentPage): JsonLd {
  const pageUrl = `${SITE_URL}${getPagePath(page)}`;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: page.h1,
    description: page.intro,
    inLanguage: "pt-BR",
    mainEntityOfPage: pageUrl,
    author: {
      "@type": "Person",
      name: EDITORIAL_AUTHOR.name,
      jobTitle: EDITORIAL_AUTHOR.role,
      url: EDITORIAL_AUTHOR.url,
    },
    publisher: {
      "@type": "Organization",
      name: "Infância Sem Tela",
      url: SITE_URL,
    },
  };
}

export function generateBreadcrumbSchema(
  page: ContentPage,
  path: string,
): JsonLd {
  if (page.type === "bestof") {
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Início",
          item: SITE_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: page.h1,
          item: `${SITE_URL}${path}`,
        },
      ],
    };
  }

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Início",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: getBreadcrumbSectionName(page),
        item: `${SITE_URL}${getSectionPath(page)}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: page.h1,
        item: `${SITE_URL}${path}`,
      },
    ],
  };
}

export function generateItemListSchema(
  page: ContentPage,
  products: ProductWithScore[],
): JsonLd | null {
  if (!products || products.length === 0) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: page.h1,
    itemListOrder: "https://schema.org/ItemListOrderDescending",
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => {
      return {
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Product",
          name: product.title,
          description: product.description,
          ...(product.imageUrl
            ? {
                image: product.imageUrl.startsWith("http")
                  ? product.imageUrl
                  : `${SITE_URL}${product.imageUrl}`,
              }
            : {}),
          ...(product.asin ? { sku: product.asin } : {}),
        },
      };
    }),
  };
}

function getBreadcrumbSectionName(page: ContentPage): string {
  switch (page.type) {
    case "gift":
      return "Presentes";
    case "guide":
      return "Guias";
    case "comparative":
      return "Comparativos";
    case "bestof":
      return "Guias de compra";
  }
}

function getSectionPath(page: ContentPage): string {
  switch (page.type) {
    case "gift":
      return "/presentes";
    case "guide":
      return "/guias";
    case "comparative":
      return "/comparativos";
    case "bestof":
      return "/";
  }
}
