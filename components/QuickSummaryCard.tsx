import { ProductImage } from "@/components/ProductImage";
import { Icon } from "@/components/ui/Icon";
import { RecommendationBadge } from "@/components/ui/RecommendationBadge";
import { normalizeAffiliateUrl, type ProductWithScore } from "@/lib/products";

type QuickSummaryCardProps = {
  badge: string;
  product: ProductWithScore;
  tone?: "blue" | "caramel" | "rose" | "teal";
};

export function QuickSummaryCard({
  badge,
  product,
  tone = "teal",
}: QuickSummaryCardProps) {
  const href = normalizeAffiliateUrl(product.amazonUrl);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.35rem] border border-[#e7dccb] bg-white shadow-[0_12px_35px_rgba(73,58,39,0.07)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(73,58,39,0.12)]">
      <ProductImage
        imageUrl={product.imageUrl}
        alt={product.imageAlt}
        title={product.title}
      />
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <RecommendationBadge tone={tone}>{badge}</RecommendationBadge>
        <p className="mt-4 text-xs font-bold uppercase tracking-[0.15em] text-stone-500">
          {product.badge}
        </p>
        <h3 className="mt-2 text-lg font-semibold leading-7 text-stone-950">
          {product.title}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-6 text-stone-600">
          {product.description}
        </p>
        <a
          href={href}
          target="_blank"
          rel="nofollow sponsored noopener noreferrer"
          className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-teal-700 px-4 py-3 text-sm font-bold text-white shadow-sm shadow-teal-950/15 transition hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2"
        >
          Ver preço na Amazon
          <Icon className="size-4" name="external" />
        </a>
        <p className="mt-2 text-center text-[0.7rem] leading-5 text-stone-500">
          Preço e disponibilidade podem mudar.
        </p>
      </div>
    </article>
  );
}
