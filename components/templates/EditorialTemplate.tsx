import { AffiliateDisclosure } from "@/components/AffiliateDisclosure";
import { FAQ } from "@/components/FAQ";
import { InternalLinks } from "@/components/InternalLinks";
import { ProductCard } from "@/components/ProductCard";
import type { ContentPage } from "@/lib/content";
import { getCombinedInternalLinks } from "@/lib/internal-links";
import { getProductsByIds, type ProductWithScore } from "@/lib/products";
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateItemListSchema,
  getPagePath,
} from "@/lib/schema";

type EditorialTemplateCopy = {
  audienceBullets: string[];
  cautionBullets: string[];
  ctaEyebrow: string;
  ctaTitle: string;
  explainerEyebrow: string;
  explainerTitle: string;
  explainerText: string;
  heroEyebrow: string;
  listTitle: string;
  quickSummaryTitle: string;
  rankingEyebrow: string;
};

type EditorialTemplateProps = {
  copy: EditorialTemplateCopy;
  footerSlot?: React.ReactNode;
  page: ContentPage;
};

type QuickSummaryCardProps = {
  cta: string;
  label: string;
  product: ProductWithScore;
};

function QuickSummaryCard({ cta, label, product }: QuickSummaryCardProps) {
  const href =
    product.affiliate_url && product.affiliate_url !== ""
      ? product.affiliate_url
      : "#";

  return (
    <article className="flex h-full flex-col rounded-lg border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/70">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
        {label}
      </p>
      <span className="mt-4 inline-flex w-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-slate-700">
        {product.tag}
      </span>
      <h3 className="mt-4 text-lg font-semibold leading-7 text-slate-950">
        {product.title}
      </h3>
      <p className="mt-3 text-2xl font-bold tracking-tight text-slate-950">
        {product.price}
      </p>
      <a
        href={href}
        target="_blank"
        rel="nofollow sponsored noopener noreferrer"
        className="mt-5 inline-flex w-full items-center justify-center rounded-md bg-teal-700 px-4 py-3.5 text-sm font-bold text-white shadow-md shadow-teal-900/20 transition duration-200 ease-out hover:-translate-y-0.5 hover:bg-teal-600 hover:shadow-lg hover:shadow-teal-900/25 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
      >
        {cta}
      </a>
      <p className="mt-2 text-center text-xs leading-5 text-slate-500">
        Preço pode variar ao longo do dia
      </p>
    </article>
  );
}

export function EditorialTemplate({
  copy,
  footerSlot,
  page,
}: EditorialTemplateProps) {
  const products = getProductsByIds(page.product_ids);
  const firstProduct = products[0];
  const secondProduct = products[1];
  const thirdProduct = products[2];
  const internalLinks = getCombinedInternalLinks(page);
  const path = getPagePath(page);
  const schemas = [
    generateFAQSchema(page),
    generateBreadcrumbSchema(page, path),
    generateItemListSchema(page, products),
  ].filter((schema): schema is Record<string, unknown> => Boolean(schema));

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <div className="mx-auto w-full max-w-5xl px-5 py-8 sm:px-8 sm:py-12 lg:py-16">
        {schemas.map((schema, index) => (
          <script
            key={`${page.slug}-schema-${index}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
            }}
          />
        ))}

        <AffiliateDisclosure />

        <section className="mt-10 max-w-4xl sm:mt-14">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-700">
            {copy.heroEyebrow}
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            {page.h1}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-700 sm:text-xl sm:leading-9">
            {page.intro}
          </p>
        </section>

        {products.length > 0 ? (
          <>
            <section
              className="mt-12 sm:mt-16"
              aria-labelledby="quick-summary-title"
            >
              <div className="max-w-3xl">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
                  {copy.quickSummaryTitle}
                </p>
                <h2
                  id="quick-summary-title"
                  className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl"
                >
                  {copy.quickSummaryTitle}
                </h2>
              </div>

              <div className="mt-7 grid gap-5 md:grid-cols-3">
                {firstProduct ? (
                  <QuickSummaryCard
                    cta="Ver preço agora"
                    label="Primeira escolha"
                    product={firstProduct}
                  />
                ) : null}
                {secondProduct ? (
                  <QuickSummaryCard
                    cta="Melhor custo-benefício"
                    label="Boa alternativa"
                    product={secondProduct}
                  />
                ) : null}
                {thirdProduct ? (
                  <QuickSummaryCard
                    cta="Ver oferta na Amazon"
                    label="Outra opcao forte"
                    product={thirdProduct}
                  />
                ) : null}
              </div>
            </section>

            <section className="mt-8 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
              <article className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/70">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
                  {copy.explainerEyebrow}
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
                  {copy.explainerTitle}
                </h2>
                <p className="mt-4 text-base leading-7 text-slate-700">
                  {copy.explainerText}
                </p>
              </article>

              <div className="grid gap-5">
                <article className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/70">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
                    {copy.ctaEyebrow}
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
                    {copy.ctaTitle}
                  </h2>
                  <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
                    {copy.audienceBullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3">
                        <span className="text-teal-700">+</span>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </article>

                <article className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/70">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
                    Pontos de atencao
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
                    Quando talvez nao valha a pena
                  </h2>
                  <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
                    {copy.cautionBullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3">
                        <span className="text-rose-600">-</span>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </article>
              </div>
            </section>

            <section
              className="mt-12 sm:mt-16"
              aria-labelledby="page-products-title"
            >
              <div className="max-w-3xl">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
                  {copy.rankingEyebrow}
                </p>
                <h2
                  id="page-products-title"
                  className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl"
                >
                  {copy.listTitle}
                </h2>
              </div>

              <div className="mt-7 grid gap-5 md:grid-cols-3">
                {products.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    affiliate_url={product.affiliate_url}
                    best_for={product.best_for}
                    image={product.image}
                    index={index}
                    price={product.price}
                    pros={product.pros}
                    rating={product.rating}
                    reviews={product.reviews}
                    short_description={product.short_description}
                    tag={product.tag}
                    title={product.title}
                  />
                ))}
              </div>
            </section>
          </>
        ) : (
          <section
            className="mt-12 sm:mt-16"
            aria-labelledby="page-products-title"
          >
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
                {copy.rankingEyebrow}
              </p>
              <h2
                id="page-products-title"
                className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl"
              >
                {copy.listTitle}
              </h2>
            </div>

            <p className="mt-7 rounded-lg border border-slate-200 bg-white p-5 text-base leading-7 text-slate-700 shadow-sm shadow-slate-200/60">
              Em breve adicionaremos opcoes recomendadas para esta pagina.
            </p>
          </section>
        )}

        <FAQ items={page.faq} />
        <InternalLinks links={internalLinks} />
        {footerSlot}
      </div>
    </main>
  );
}
