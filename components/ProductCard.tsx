import Image from "next/image";
import { normalizeAffiliateUrl, type Product } from "@/lib/products";

type ProductCardProps = Pick<
  Product,
  | "affiliate_url"
  | "best_for"
  | "image"
  | "price"
  | "pros"
  | "rating"
  | "reviews"
  | "short_description"
  | "tag"
  | "title"
> & {
  index?: number;
};

function getCTA(_product: ProductCardProps, index = 0): string {
  if (index === 0) {
    return "Ver preço agora";
  }

  if (index === 1) {
    return "Melhor custo-benefício";
  }

  if (index === 2) {
    return "Ver oferta na Amazon";
  }

  return "Conferir preço";
}

export function ProductCard({
  affiliate_url,
  best_for,
  image,
  price,
  pros,
  rating,
  reviews,
  short_description,
  tag,
  title,
  index = 0,
}: ProductCardProps) {
  const formattedPrice = price;
  const href = normalizeAffiliateUrl(affiliate_url);
  const hasVerifiedRating = rating > 0 && reviews > 0;
  const cta = getCTA(
    {
      affiliate_url,
      best_for,
      image,
      price,
      pros,
      rating,
      reviews,
      short_description,
      tag,
      title,
    },
    index,
  );

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm shadow-slate-200/70 transition duration-200 ease-out hover:-translate-y-1 hover:border-teal-200 hover:shadow-lg hover:shadow-slate-200/80">
      <div className="aspect-[4/3] overflow-hidden bg-slate-100">
        <Image
          src={image}
          alt={title}
          width={640}
          height={480}
          className="h-full w-full object-cover transition duration-300 ease-out group-hover:scale-[1.02]"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-4">
          <span className="inline-flex rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-teal-700 ring-1 ring-teal-100">
            {tag}
          </span>
        </div>

        <div className="mt-5 flex flex-1 flex-col">
          <h3 className="text-lg font-semibold leading-7 text-slate-950">
            {title}
          </h3>

          <p className="mt-3 text-sm leading-6 text-slate-600">
            {short_description}
          </p>

          <p className="mt-4 text-3xl font-bold tracking-tight text-slate-950">
            {formattedPrice}
          </p>

          {hasVerifiedRating ? (
            <div className="mt-4 flex items-center gap-2 text-sm text-slate-600">
              <span className="text-amber-500" aria-hidden="true">
                *****
              </span>
              <span>
                {rating} ({reviews} avaliacoes)
              </span>
            </div>
          ) : null}

          <ul className="mt-5 space-y-2 text-sm leading-6 text-slate-700">
            {pros.map((pro) => (
              <li key={pro} className="flex gap-2">
                <span className="mt-1 text-teal-700" aria-hidden="true">
                  +
                </span>
                <span>{pro}</span>
              </li>
            ))}
          </ul>

          <p className="mt-5 text-sm leading-6 text-slate-700">
            <span className="font-semibold text-slate-950">Ideal para:</span>{" "}
            {best_for}
          </p>

          <a
            href={href}
            target="_blank"
            rel="nofollow sponsored noopener noreferrer"
            className="mt-6 inline-flex w-full items-center justify-center rounded-md bg-teal-700 px-4 py-3.5 text-sm font-bold text-white shadow-md shadow-teal-900/20 transition duration-200 ease-out hover:-translate-y-0.5 hover:bg-teal-600 hover:shadow-lg hover:shadow-teal-900/25 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
          >
            {cta}
          </a>
          <p className="mt-2 text-center text-xs leading-5 text-slate-500">
            Preço pode variar ao longo do dia
          </p>
        </div>
      </div>
    </article>
  );
}
