import Link from "next/link";
import { AffiliateDisclosure } from "@/components/AffiliateDisclosure";
import { FAQ } from "@/components/FAQ";
import { InternalLinks } from "@/components/InternalLinks";
import { LeadMagnet } from "@/components/LeadMagnet";
import { ProductCard } from "@/components/ProductCard";
import type { ContentPage } from "@/lib/content";
import {
  getCombinedInternalLinks,
  getSuggestedInternalLinks,
} from "@/lib/internal-links";
import { getProductsByIds, type ProductWithScore } from "@/lib/products";
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateItemListSchema,
  getPagePath,
} from "@/lib/schema";

type BestOfTemplateProps = {
  page: ContentPage;
};

type QuickSummaryCardProps = {
  cta: string;
  product: ProductWithScore;
  title: string;
};

function QuickSummaryCard({ cta, product, title }: QuickSummaryCardProps) {
  const href =
    product.affiliate_url && product.affiliate_url !== ""
      ? product.affiliate_url
      : "#";

  return (
    <article className="flex h-full flex-col rounded-lg border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/70">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
        {title}
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

function getPillarH1(page: ContentPage) {
  if (page.h1.toLocaleLowerCase("pt-BR").includes("como escolher")) {
    return page.h1;
  }

  return `${page.h1}: como escolher + melhores opções`;
}

export function BestOfTemplate({ page }: BestOfTemplateProps) {
  const products = getProductsByIds(page.product_ids);
  const bestOverall = products[0];
  const bestValue = products[1];
  const premiumChoice = products[2];
  const topicLinks = getSuggestedInternalLinks(page)
    .filter((link) => link.type === "guide")
    .slice(0, 5);
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
            Guia de compra
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            {getPillarH1(page)}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-700 sm:text-xl sm:leading-9">
            {page.intro}
          </p>
        </section>

        {topicLinks.length > 0 ? (
          <section
            className="mt-12 sm:mt-16"
            aria-labelledby="parent-search-topics-title"
          >
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
                Guia por necessidade
              </p>
              <h2
                id="parent-search-topics-title"
                className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl"
              >
                Tópicos mais buscados por pais
              </h2>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {topicLinks.map((link) => (
                <Link
                  key={link.url}
                  href={link.url}
                  className="rounded-lg border border-slate-200 bg-white px-4 py-4 text-sm font-semibold leading-6 text-slate-800 shadow-sm shadow-slate-200/60 transition duration-200 ease-out hover:border-teal-200 hover:bg-teal-50 hover:text-teal-900"
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        <section
          className="mt-12 sm:mt-16"
          aria-labelledby="how-to-choose-title"
        >
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/70 sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
              Antes do ranking
            </p>
            <h2
              id="how-to-choose-title"
              className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl"
            >
              Como escolher o melhor brinquedo para esta idade
            </h2>
            <div className="mt-5 space-y-4 text-base leading-7 text-slate-700">
              <p>
                Antes de comparar produtos, vale observar o momento real da
                criança: o que ela já consegue fazer sozinha, quanto tempo
                costuma se concentrar e quais brincadeiras despertam curiosidade
                sem gerar frustração.
              </p>
              <p>
                Um bom brinquedo para a idade não precisa ser complexo. Ele deve
                convidar a criança a repetir, testar, imaginar e resolver
                pequenas situações no próprio ritmo, com materiais seguros e uma
                proposta fácil de entender no dia a dia.
              </p>
            </div>
          </div>
        </section>

        {products.length > 0 ? (
          <>
            <section className="mt-12 sm:mt-16" aria-labelledby="quick-summary-title">
              <div className="max-w-3xl">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
                  Resumo rapido
                </p>
                <h2
                  id="quick-summary-title"
                  className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl"
                >
                  Resumo rapido
                </h2>
              </div>

              <div className="mt-7 grid gap-5 md:grid-cols-3">
                {bestOverall ? (
                  <QuickSummaryCard
                    cta="Ver preço agora"
                    product={bestOverall}
                    title="Melhor geral"
                  />
                ) : null}
                {bestValue ? (
                  <QuickSummaryCard
                    cta="Melhor custo-benefício"
                    product={bestValue}
                    title="Melhor custo-beneficio"
                  />
                ) : null}
                {premiumChoice ? (
                  <QuickSummaryCard
                    cta="Ver oferta na Amazon"
                    product={premiumChoice}
                    title="Melhor premium"
                  />
                ) : null}
              </div>
            </section>

            <section className="mt-8 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
              <article className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/70">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
                  Como escolhemos
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
                  Como escolhemos
                </h2>
                <p className="mt-4 text-base leading-7 text-slate-700">
                  Organizamos esta selecao considerando a faixa etaria, a
                  proposta de brincadeira, as avaliacoes dos usuarios, o
                  equilibrio entre preco e entrega, e a utilidade no dia a dia
                  para familias que querem acertar mais na escolha.
                </p>
              </article>

              <div className="grid gap-5">
                <article className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/70">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
                    Para quem esta lista e ideal
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
                    Para quem esta lista e ideal
                  </h2>
                  <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
                    <li className="flex gap-3">
                      <span className="text-teal-700">+</span>
                      pais buscando brinquedos mais uteis
                    </li>
                    <li className="flex gap-3">
                      <span className="text-teal-700">+</span>
                      quem quer fugir de presentes obvios
                    </li>
                    <li className="flex gap-3">
                      <span className="text-teal-700">+</span>
                      quem procura opcoes sem depender de telas
                    </li>
                  </ul>
                </article>

                <article className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/70">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
                    Quando talvez nao valha a pena
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
                    Quando talvez nao valha a pena
                  </h2>
                  <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
                    <li className="flex gap-3">
                      <span className="text-rose-600">-</span>
                      se a crianca ja tem muitos brinquedos parecidos
                    </li>
                    <li className="flex gap-3">
                      <span className="text-rose-600">-</span>
                      se o produto exige supervisao maior do que a rotina
                      permite
                    </li>
                    <li className="flex gap-3">
                      <span className="text-rose-600">-</span>
                      se a faixa etaria nao combina com a crianca
                    </li>
                  </ul>
                </article>
              </div>
            </section>

            <section
              className="mt-12 sm:mt-16"
              aria-labelledby="best-options-title"
            >
              <div className="max-w-3xl">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
                  Melhores opcoes
                </p>
                <h2
                  id="best-options-title"
                  className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl"
                >
                  Melhores opcoes para esta idade
                </h2>
              </div>

              <div className="mt-7 grid gap-5 lg:grid-cols-3">
                {bestOverall ? (
                  <section className="rounded-lg border border-teal-200 bg-white p-5 shadow-sm shadow-slate-200/70 lg:col-span-2 lg:p-6">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
                      Melhor escolha geral
                    </p>
                    <div className="mt-4">
                      <ProductCard
                        affiliate_url={bestOverall.affiliate_url}
                        best_for={bestOverall.best_for}
                        image={bestOverall.image}
                        index={0}
                        price={bestOverall.price}
                        pros={bestOverall.pros}
                        rating={bestOverall.rating}
                        reviews={bestOverall.reviews}
                        short_description={bestOverall.short_description}
                        tag="Melhor geral"
                        title={bestOverall.title}
                      />
                    </div>
                  </section>
                ) : null}

                <div className="grid gap-5">
                  {bestValue ? (
                    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/70">
                      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
                        Melhor custo-beneficio
                      </p>
                      <div className="mt-4">
                        <ProductCard
                          affiliate_url={bestValue.affiliate_url}
                          best_for={bestValue.best_for}
                          image={bestValue.image}
                          index={1}
                          price={bestValue.price}
                          pros={bestValue.pros}
                          rating={bestValue.rating}
                          reviews={bestValue.reviews}
                          short_description={bestValue.short_description}
                          tag="Custo-beneficio"
                          title={bestValue.title}
                        />
                      </div>
                    </section>
                  ) : null}

                  {premiumChoice ? (
                    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/70">
                      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
                        Melhor opcao premium
                      </p>
                      <div className="mt-4">
                        <ProductCard
                          affiliate_url={premiumChoice.affiliate_url}
                          best_for={premiumChoice.best_for}
                          image={premiumChoice.image}
                          index={2}
                          price={premiumChoice.price}
                          pros={premiumChoice.pros}
                          rating={premiumChoice.rating}
                          reviews={premiumChoice.reviews}
                          short_description={premiumChoice.short_description}
                          tag="Premium"
                          title={premiumChoice.title}
                        />
                      </div>
                    </section>
                  ) : null}
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-semibold tracking-tight text-slate-950 sm:text-2xl">
                  Lista completa
                </h3>

                <div className="mt-5 grid gap-5 md:grid-cols-3">
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
              </div>
            </section>
          </>
        ) : (
          <section
            className="mt-12 sm:mt-16"
            aria-labelledby="best-options-title"
          >
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
                Melhores opcoes
              </p>
              <h2
                id="best-options-title"
                className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl"
              >
                Melhores opcoes para esta idade
              </h2>
            </div>

            <p className="mt-7 rounded-lg border border-slate-200 bg-white p-5 text-base leading-7 text-slate-700 shadow-sm shadow-slate-200/60">
              Em breve adicionaremos as melhores opcoes para esta pagina.
            </p>
          </section>
        )}

        <FAQ items={page.faq} />
        <InternalLinks links={internalLinks} />
        <LeadMagnet />
      </div>
    </main>
  );
}
