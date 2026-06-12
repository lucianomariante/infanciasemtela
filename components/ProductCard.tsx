import { ProductImage } from "@/components/ProductImage";
import { Icon } from "@/components/ui/Icon";
import { RecommendationBadge } from "@/components/ui/RecommendationBadge";
import { normalizeAffiliateUrl, type Product } from "@/lib/products";

type ProductCardProps = Pick<
  Product,
  | "ageRange"
  | "amazonUrl"
  | "badge"
  | "benefits"
  | "bestFor"
  | "description"
  | "imageAlt"
  | "imageUrl"
  | "rating"
  | "reviews"
  | "title"
>;

export function ProductCard({
  ageRange,
  amazonUrl,
  badge,
  benefits,
  bestFor,
  description,
  imageAlt,
  imageUrl,
  rating,
  reviews,
  title,
}: ProductCardProps) {
  const href = normalizeAffiliateUrl(amazonUrl);
  const hasVerifiedRating = rating > 0 && reviews > 0;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-[#e7dccb] bg-white shadow-[0_14px_40px_rgba(73,58,39,0.08)] transition duration-300 hover:-translate-y-1 hover:border-[#d4b98f] hover:shadow-[0_20px_50px_rgba(73,58,39,0.13)]">
      <ProductImage
        imageUrl={imageUrl}
        alt={imageAlt}
        title={title}
      />

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-2">
          <RecommendationBadge>{badge}</RecommendationBadge>
          {ageRange ? (
            <span className="rounded-full bg-[#f6eee2] px-3 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.12em] text-amber-900">
              {ageRange}
            </span>
          ) : null}
        </div>

        <div className="mt-4 flex flex-1 flex-col">
          <h3 className="text-xl font-semibold leading-7 tracking-[-0.02em] text-stone-950">
            {title}
          </h3>

          <p className="mt-3 text-sm leading-6 text-stone-600">
            {description}
          </p>

          {hasVerifiedRating ? (
            <div className="mt-4 flex items-center gap-2 text-sm text-stone-600">
              <Icon className="size-4 fill-amber-400 text-amber-500" name="star" />
              <span>
                <strong className="font-semibold text-stone-800">{rating}</strong>{" "}
                ({reviews.toLocaleString("pt-BR")} avaliações)
              </span>
            </div>
          ) : null}

          <ul className="mt-5 space-y-2.5 text-sm leading-6 text-stone-700">
            {benefits.map((benefit) => (
              <li key={benefit} className="flex gap-2.5">
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-teal-50 text-teal-700">
                  <Icon className="size-3.5" name="check" />
                </span>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>

          <div className="mt-5 rounded-xl bg-[#faf7f0] px-4 py-3 text-sm leading-6 text-stone-700">
            <span className="font-semibold text-stone-950">Ideal para:</span>{" "}
            {bestFor}
          </div>

          <a
            href={href}
            target="_blank"
            rel="nofollow sponsored noopener noreferrer"
            className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-teal-700 px-4 py-3 text-sm font-bold text-white shadow-sm shadow-teal-950/15 transition hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2"
          >
            Ver preço na Amazon
            <Icon className="size-4" name="external" />
          </a>
          <p className="mt-2 text-center text-[0.7rem] leading-5 text-stone-500">
            Preço e disponibilidade podem mudar.
          </p>
        </div>
      </div>
    </article>
  );
}
