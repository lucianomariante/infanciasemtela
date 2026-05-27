import type { ContentPage } from "@/lib/content";
import type { ProductWithScore } from "@/lib/products";
import { SITE_URL } from "@/lib/site";

type JsonLd = Record<string, unknown>;

export function getPagePath(page: ContentPage): string {
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

export function generateBreadcrumbSchema(
  page: ContentPage,
  path: string,
): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Inicio",
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

  const pagePath = getPagePath(page);

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: page.h1,
    itemListOrder: "https://schema.org/ItemListOrderDescending",
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => {
      const numericPrice = getNumericPrice(product.price);
      const hasVerifiedRating = product.rating > 0 && product.reviews > 0;

      return {
        "@type": "ListItem",
        position: index + 1,
        url: `${SITE_URL}${pagePath}#${product.id}`,
        item: {
          "@type": "Product",
          name: product.title,
          description: product.short_description,
          image: `${SITE_URL}${product.image}`,
          ...(numericPrice > 0
            ? {
                offers: {
                  "@type": "Offer",
                  priceCurrency: "BRL",
                  price: numericPrice,
                  url:
                    product.affiliate_url && product.affiliate_url !== ""
                      ? product.affiliate_url
                      : "#",
                },
              }
            : {}),
          ...(hasVerifiedRating
            ? {
                aggregateRating: {
                  "@type": "AggregateRating",
                  ratingValue: product.rating,
                  reviewCount: product.reviews,
                },
              }
            : {}),
        },
      };
    }),
  };
}

function getBreadcrumbSectionName(page: ContentPage): string {
  switch (page.type) {
    case "bestof":
      return "Melhores";
    case "gift":
      return "Presentes";
    case "guide":
      return "Guias";
    case "comparative":
      return "Comparativos";
  }
}

function getSectionPath(page: ContentPage): string {
  switch (page.type) {
    case "bestof":
      return "/melhores";
    case "gift":
      return "/presentes";
    case "guide":
      return "/guias";
    case "comparative":
      return "/comparativos";
  }
}

function getNumericPrice(price: string): number {
  const normalizedPrice = price
    .replace("R$", "")
    .replace(/\s+/g, "")
    .replace(".", "")
    .replace(",", ".");

  const parsedPrice = Number.parseFloat(normalizedPrice);

  return Number.isFinite(parsedPrice) ? parsedPrice : 0;
}
