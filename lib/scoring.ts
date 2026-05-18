import type { Product } from "@/lib/products";

function parseProductPrice(price: Product["price"]): number {
  const normalizedPrice = price
    .replace("R$", "")
    .replace(/\s+/g, "")
    .replace(".", "")
    .replace(",", ".");

  const parsedPrice = Number.parseFloat(normalizedPrice);

  return Number.isFinite(parsedPrice) ? parsedPrice : 0;
}

export function calculateProductScore(product: Product): number {
  const price = parseProductPrice(product.price);
  const premiumBonus = product.tag.toLowerCase().includes("premium") ? 5 : 0;

  return (
    product.rating * 20 +
    Math.log(product.reviews + 1) * 10 -
    price / 10 +
    premiumBonus
  );
}
