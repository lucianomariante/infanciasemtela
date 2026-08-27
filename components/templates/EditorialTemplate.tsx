import Link from "next/link";
import { AffiliateDisclosure } from "@/components/AffiliateDisclosure";
import { EditorialTrustBar } from "@/components/EditorialTrustBar";
import { FAQ } from "@/components/FAQ";
import { InternalLinks } from "@/components/InternalLinks";
import { PageEditorialSections } from "@/components/PageEditorialSections";
import { ProductCard } from "@/components/ProductCard";
import { QuickSummaryCard } from "@/components/QuickSummaryCard";
import { Icon } from "@/components/ui/Icon";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { ContentPage } from "@/lib/content";
import { getCombinedInternalLinks } from "@/lib/internal-links";
import { getProductsByIds } from "@/lib/products";
import {
  generateArticleSchema,
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
    generateArticleSchema(page),
    generateFAQSchema(page),
    generateBreadcrumbSchema(page, path),
    generateItemListSchema(page, products),
  ].filter((schema): schema is Record<string, unknown> => Boolean(schema));

  return (
    <main className="min-h-screen bg-[#faf7f0] text-stone-950">
      <div className="mx-auto w-full max-w-6xl px-5 py-7 sm:px-8 sm:py-10 lg:px-10 lg:py-14">
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
        <EditorialTrustBar />

        <section className="relative mt-8 overflow-hidden rounded-[2rem] border border-[#e7dccb] bg-white px-6 py-9 shadow-[0_18px_55px_rgba(73,58,39,0.08)] sm:mt-10 sm:px-10 sm:py-12 lg:grid lg:grid-cols-[1fr_0.34fr] lg:gap-10">
          <div className="relative z-10">
            <nav className="flex items-center gap-2 text-xs font-semibold text-stone-500" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-teal-700">Início</Link>
              <span>/</span>
              <span>Guia editorial</span>
            </nav>
            <p className="mt-6 text-xs font-bold uppercase tracking-[0.22em] text-teal-700">
              {copy.heroEyebrow}
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-[1.08] tracking-[-0.045em] text-stone-950 sm:text-5xl lg:text-6xl">
              {page.h1}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-stone-600 sm:text-xl sm:leading-9">
              {page.intro}
            </p>
          </div>
          <aside className="relative z-10 mt-8 flex flex-col justify-end rounded-2xl bg-[#fff3e8] p-5 lg:mt-0">
            <span className="grid size-11 place-items-center rounded-2xl bg-white text-amber-800 shadow-sm">
              <Icon name="heart" />
            </span>
            <p className="mt-5 text-sm font-bold uppercase tracking-[0.16em] text-amber-900">
              Escolha com intenção
            </p>
            <p className="mt-2 text-sm leading-6 text-stone-600">
              Sugestões organizadas para facilitar uma decisão adulta, acolhedora e prática.
            </p>
          </aside>
          <span className="absolute -right-16 -top-16 size-48 rounded-full bg-[#dbeafe]/55" />
        </section>

        <PageEditorialSections sections={page.editorial_sections} />

        {products.length > 0 ? (
          <>
            <section
              className="mt-12 sm:mt-16"
              aria-labelledby="quick-summary-title"
            >
              <SectionHeader
                eyebrow="Comparação rápida"
                id="quick-summary-title"
                title={copy.quickSummaryTitle}
                description="Três opções para entender rapidamente os destaques desta seleção."
              />

              <div className="mt-7 grid gap-5 md:grid-cols-3">
                {firstProduct ? (
                  <QuickSummaryCard
                    badge="Primeira escolha"
                    product={firstProduct}
                    tone="teal"
                  />
                ) : null}
                {secondProduct ? (
                  <QuickSummaryCard
                    badge="Boa alternativa"
                    product={secondProduct}
                    tone="caramel"
                  />
                ) : null}
                {thirdProduct ? (
                  <QuickSummaryCard
                    badge="Outra opção forte"
                    product={thirdProduct}
                    tone="blue"
                  />
                ) : null}
              </div>
            </section>

            <section className="mt-8 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
              <article className="rounded-[1.5rem] border border-[#e7dccb] bg-[#f6eee2]/75 p-6 sm:p-8">
                <span className="grid size-11 place-items-center rounded-2xl bg-white text-amber-800 shadow-sm">
                  <Icon name="sparkles" />
                </span>
                <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-teal-700">
                  {copy.explainerEyebrow}
                </p>
                <h2 className="mt-3 text-2xl font-semibold tracking-[-0.025em] text-stone-950">
                  {copy.explainerTitle}
                </h2>
                <p className="mt-4 text-base leading-7 text-stone-600">
                  {copy.explainerText}
                </p>
              </article>

              <div className="grid gap-5">
                <article className="rounded-[1.5rem] border border-[#e7dccb] bg-white p-6 shadow-[0_10px_30px_rgba(73,58,39,0.06)]">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal-700">
                    {copy.ctaEyebrow}
                  </p>
                  <h2 className="mt-3 text-xl font-semibold tracking-[-0.02em] text-stone-950">
                    {copy.ctaTitle}
                  </h2>
                  <ul className="mt-4 space-y-3 text-sm leading-6 text-stone-600">
                    {copy.audienceBullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3">
                        <Icon className="mt-1 size-4 shrink-0 text-teal-700" name="check" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </article>

                <article className="rounded-[1.5rem] border border-[#ead8cf] bg-[#fff8f4] p-6">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-rose-700">
                    Pontos de atenção
                  </p>
                  <h2 className="mt-3 text-xl font-semibold tracking-[-0.02em] text-stone-950">
                    Quando talvez não valha a pena
                  </h2>
                  <ul className="mt-4 space-y-3 text-sm leading-6 text-stone-600">
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
              <SectionHeader
                eyebrow={copy.rankingEyebrow}
                id="page-products-title"
                title={copy.listTitle}
                description="Compare benefícios, perfil indicado e detalhes de cada recomendação."
              />

              <div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    ageRange={product.ageRange}
                    amazonUrl={product.amazonUrl}
                    badge={product.badge}
                    benefits={product.benefits}
                    bestFor={product.bestFor}
                    description={product.description}
                    imageAlt={product.imageAlt}
                    imageUrl={product.imageUrl}
                    rating={product.rating}
                    reviews={product.reviews}
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

            <div className="mt-7 rounded-lg border border-amber-200 bg-amber-50 p-5 text-base leading-7 text-stone-700">
              <p className="font-semibold text-stone-900">Seleção em revisão editorial</p>
              <p className="mt-2">
                Ainda não há produtos confirmados para esta página. Use as
                orientações acima como ponto de partida e confira faixa etária,
                materiais, tamanho das peças e supervisão indicada pelo fabricante.
              </p>
            </div>
          </section>
        )}

        <FAQ items={page.faq} />
        <InternalLinks links={internalLinks} />
        {footerSlot}
      </div>
    </main>
  );
}
