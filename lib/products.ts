import products from "@/data/products.json";
import { calculateProductScore } from "@/lib/scoring";

export type Product = {
  id: string;
  title: string;
  image: string;
  affiliate_url: string;
  short_description: string;
  price: string;
  rating: number;
  reviews: number;
  tag: string;
  pros: string[];
  best_for: string;
};

export type ProductWithScore = Product & {
  score: number;
};

const productsById = new Map(
  (products as Product[]).map((product) => [product.id, product]),
);

export function normalizeAffiliateUrl(
  affiliateUrl: string | null | undefined,
): string {
  if (!affiliateUrl || affiliateUrl === "#") {
    return "#";
  }

  return affiliateUrl;
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
