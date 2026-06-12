import products from "@/data/products.json";
import { productMedia } from "@/data/product-media";
import { calculateProductScore } from "@/lib/scoring";

type ProductSource = {
  affiliate_url?: string;
  amazonUrl?: string;
  badge?: string;
  benefits?: string[];
  best_for?: string;
  bestFor?: string;
  description?: string;
  id: string;
  image?: string;
  price: string;
  pros?: string[];
  rating: number;
  reviews: number;
  short_description?: string;
  tag?: string;
  title: string;
};

export type Product = {
  ageRange?: string;
  amazonUrl: string;
  asin?: string;
  badge: string;
  benefits: string[];
  bestFor: string;
  description: string;
  id: string;
  imageAlt: string;
  imageUrl?: string;
  price: string;
  rating: number;
  reviews: number;
  title: string;
};

export type ProductWithScore = Product & {
  score: number;
};

function optionalValue(value: string | undefined): string | undefined {
  const normalized = value?.trim();
  return normalized ? normalized : undefined;
}

function normalizeProduct(product: ProductSource): Product {
  const media = productMedia[product.id as keyof typeof productMedia];
  const imageUrl = optionalValue(media?.imageUrl);

  return {
    id: product.id,
    title: product.title,
    description: product.description || product.short_description || "",
    amazonUrl: product.amazonUrl || product.affiliate_url || "#",
    asin: optionalValue(media?.asin),
    imageUrl,
    imageAlt:
      optionalValue(media?.imageAlt) ||
      (imageUrl ? `Foto do produto ${product.title}` : ""),
    badge: product.badge || product.tag || "",
    ageRange: optionalValue(media?.ageRange),
    benefits: product.benefits || product.pros || [],
    bestFor: product.bestFor || product.best_for || "",
    price: product.price,
    rating: product.rating,
    reviews: product.reviews,
  };
}

const productsById = new Map(
  (products as ProductSource[]).map((product) => {
    const normalizedProduct = normalizeProduct(product);
    return [normalizedProduct.id, normalizedProduct];
  }),
);

export function normalizeAffiliateUrl(
  amazonUrl: string | null | undefined,
): string {
  if (!amazonUrl || amazonUrl === "#") {
    return "#";
  }

  return amazonUrl;
}

export function getProductsByIds(ids: string[]): ProductWithScore[] {
  return ids
    .map((id) => productsById.get(id))
    .filter((product): product is Product => Boolean(product))
    .map((product) => ({
      ...product,
      score: calculateProductScore(product),
    }))
    .sort((left, right) => right.score - left.score);
}
