import Link from "next/link";
import { AffiliateDisclosure } from "@/components/AffiliateDisclosure";
import { FAQ } from "@/components/FAQ";
import { InternalLinks } from "@/components/InternalLinks";
import { LeadMagnet } from "@/components/LeadMagnet";
import { ProductCard } from "@/components/ProductCard";
import { QuickSummaryCard } from "@/components/QuickSummaryCard";
import { Icon } from "@/components/ui/Icon";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { ContentPage } from "@/lib/content";
import {
  getCombinedInternalLinks,
  getSuggestedInternalLinks,
} from "@/lib/internal-links";
import { getProductsByIds } from "@/lib/products";
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateItemListSchema,
  getPagePath,
} from "@/lib/schema";

type BestOfTemplateProps = {
  page: ContentPage;
};

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

        <section className="relative mt-8 overflow-hidden rounded-[2rem] border border-[#e7dccb] bg-white px-6 py-9 shadow-[0_18px_55px_rgba(73,58,39,0.08)] sm:mt-10 sm:px-10 sm:py-12 lg:grid lg:grid-cols-[1fr_0.34fr] lg:gap-10">
          <div className="relative z-10">
            <nav className="flex items-center gap-2 text-xs font-semibold text-stone-500" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-teal-700">Início</Link>
              <span>/</span>
              <span>Guias de compra</span>
            </nav>
            <p className="mt-6 text-xs font-bold uppercase tracking-[0.22em] text-teal-700">
              Guia de compra
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-[1.08] tracking-[-0.045em] text-stone-950 sm:text-5xl lg:text-6xl">
              {getPillarH1(page)}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-stone-600 sm:text-xl sm:leading-9">
              {page.intro}
            </p>
          </div>
          <aside className="relative z-10 mt-8 flex flex-col justify-end rounded-2xl bg-[#edf5f2] p-5 lg:mt-0">
            <span className="grid size-11 place-items-center rounded-2xl bg-white text-teal-700 shadow-sm">
              <Icon name="shield" />
            </span>
            <p className="mt-5 text-sm font-bold uppercase tracking-[0.16em] text-teal-800">
              Curadoria prática
            </p>
            <p className="mt-2 text-sm leading-6 text-stone-600">
              Comparações claras para encontrar opções que combinam com a fase e a rotina da criança.
            </p>
          </aside>
          <span className="absolute -right-16 -top-16 size-48 rounded-full bg-[#fde2d1]/70" />
        </section>

        {topicLinks.length > 0 ? (
          <section
            className="mt-12 sm:mt-16"
            aria-labelledby="parent-search-topics-title"
          >
            <SectionHeader
              eyebrow="Guia por necessidade"
              id="parent-search-topics-title"
              title="Tópicos mais buscados por pais"
              description="Encontre um caminho mais específico para a idade, o comportamento ou a habilidade que você quer estimular."
            />

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {topicLinks.map((link) => (
                <Link
                  key={link.url}
                  href={link.url}
                  className="group flex items-center gap-3 rounded-2xl border border-[#e7dccb] bg-white px-4 py-4 text-sm font-semibold leading-6 text-stone-800 shadow-sm transition hover:-translate-y-0.5 hover:border-teal-200 hover:text-teal-800 hover:shadow-md"
                >
                  <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-[#f6eee2] text-amber-800">
                    <Icon className="size-4" name="search" />
                  </span>
                  <span className="flex-1">{link.title}</span>
                  <Icon className="size-4 transition group-hover:translate-x-1" name="arrow" />
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        <section
          className="mt-12 sm:mt-16"
          aria-labelledby="how-to-choose-title"
        >
          <div className="grid overflow-hidden rounded-[1.5rem] border border-[#e7dccb] bg-white shadow-[0_14px_40px_rgba(73,58,39,0.07)] md:grid-cols-[0.3fr_0.7fr]">
            <div className="flex min-h-44 items-center justify-center bg-[linear-gradient(145deg,#f6eee2,#edf5f2)] p-8">
              <span className="grid size-20 place-items-center rounded-[1.5rem] bg-white/80 text-teal-700 shadow-sm">
                <Icon className="size-10" name="puzzle" />
              </span>
            </div>
            <div className="p-6 sm:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal-700">
                Antes do ranking
              </p>
              <h2
                id="how-to-choose-title"
                className="mt-3 text-2xl font-semibold tracking-[-0.025em] text-stone-950 sm:text-3xl"
              >
                Como escolher o melhor brinquedo para esta idade
              </h2>
              <div className="mt-5 space-y-4 text-base leading-7 text-stone-600">
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
          </div>
        </section>

        {products.length > 0 ? (
          <>
            <section className="mt-12 sm:mt-16" aria-labelledby="quick-summary-title">
              <SectionHeader
                eyebrow="Comparação rápida"
                id="quick-summary-title"
                title="Três escolhas para começar"
                description="Um resumo visual das opções que mais se destacam nesta seleção."
              />

              <div className="mt-7 grid gap-5 md:grid-cols-3">
                {bestOverall ? (
                  <QuickSummaryCard
                    badge="Melhor geral"
                    product={bestOverall}
                    tone="teal"
                  />
                ) : null}
                {bestValue ? (
                  <QuickSummaryCard
                    badge="Melhor custo-benefício"
                    product={bestValue}
                    tone="caramel"
                  />
                ) : null}
                {premiumChoice ? (
                  <QuickSummaryCard
                    badge="Melhor premium"
                    product={premiumChoice}
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
                  Como escolhemos
                </p>
                <h2 className="mt-3 text-2xl font-semibold tracking-[-0.025em] text-stone-950">
                  Como escolhemos
                </h2>
                <p className="mt-4 text-base leading-7 text-stone-600">
                  Organizamos esta selecao considerando a faixa etaria, a
                  proposta de brincadeira, as avaliacoes dos usuarios, o
                  equilibrio entre preco e entrega, e a utilidade no dia a dia
                  para familias que querem acertar mais na escolha.
                </p>
              </article>

              <div className="grid gap-5">
                <article className="rounded-[1.5rem] border border-[#e7dccb] bg-white p-6 shadow-[0_10px_30px_rgba(73,58,39,0.06)]">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal-700">
                    Para quem esta lista e ideal
                  </p>
                  <h2 className="mt-3 text-xl font-semibold tracking-[-0.02em] text-stone-950">
                    Para quem esta lista e ideal
                  </h2>
                  <ul className="mt-4 space-y-3 text-sm leading-6 text-stone-600">
                    <li className="flex gap-3">
                      <Icon className="mt-1 size-4 shrink-0 text-teal-700" name="check" />
                      pais buscando brinquedos mais uteis
                    </li>
                    <li className="flex gap-3">
                      <Icon className="mt-1 size-4 shrink-0 text-teal-700" name="check" />
                      quem quer fugir de presentes obvios
                    </li>
                    <li className="flex gap-3">
                      <Icon className="mt-1 size-4 shrink-0 text-teal-700" name="check" />
                      quem procura opcoes sem depender de telas
                    </li>
                  </ul>
                </article>

                <article className="rounded-[1.5rem] border border-[#ead8cf] bg-[#fff8f4] p-6">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-rose-700">
                    Quando talvez nao valha a pena
                  </p>
                  <h2 className="mt-3 text-xl font-semibold tracking-[-0.02em] text-stone-950">
                    Quando talvez nao valha a pena
                  </h2>
                  <ul className="mt-4 space-y-3 text-sm leading-6 text-stone-600">
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
              <SectionHeader
                eyebrow="Seleção principal"
                id="best-options-title"
                title="Melhores opções para esta idade"
                description="Veja os detalhes, benefícios e o perfil indicado de cada recomendação."
              />

              <div className="mt-7 grid gap-5 lg:grid-cols-3">
                {bestOverall ? (
                  <section className="rounded-[1.75rem] border border-teal-200 bg-[#edf5f2]/65 p-3 lg:col-span-2 lg:p-4">
                    <p className="px-3 pb-1 pt-2 text-xs font-bold uppercase tracking-[0.2em] text-teal-800">
                      Melhor escolha geral
                    </p>
                    <div className="mt-4">
                      <ProductCard
                        ageRange={bestOverall.ageRange}
                        amazonUrl={bestOverall.amazonUrl}
                        badge="Melhor geral"
                        benefits={bestOverall.benefits}
                        bestFor={bestOverall.bestFor}
                        description={bestOverall.description}
                        imageAlt={bestOverall.imageAlt}
                        imageUrl={bestOverall.imageUrl}
                        rating={bestOverall.rating}
                        reviews={bestOverall.reviews}
                        title={bestOverall.title}
                      />
                    </div>
                  </section>
                ) : null}

                <div className="grid gap-5">
                  {bestValue ? (
                    <section className="rounded-[1.75rem] border border-[#e7dccb] bg-[#f6eee2]/55 p-3">
                      <p className="px-3 pb-1 pt-2 text-xs font-bold uppercase tracking-[0.2em] text-amber-800">
                        Melhor custo-beneficio
                      </p>
                      <div className="mt-4">
                        <ProductCard
                          ageRange={bestValue.ageRange}
                          amazonUrl={bestValue.amazonUrl}
                          badge="Custo-benefício"
                          benefits={bestValue.benefits}
                          bestFor={bestValue.bestFor}
                          description={bestValue.description}
                          imageAlt={bestValue.imageAlt}
                          imageUrl={bestValue.imageUrl}
                          rating={bestValue.rating}
                          reviews={bestValue.reviews}
                          title={bestValue.title}
                        />
                      </div>
                    </section>
                  ) : null}

                  {premiumChoice ? (
                    <section className="rounded-[1.75rem] border border-blue-100 bg-blue-50/55 p-3">
                      <p className="px-3 pb-1 pt-2 text-xs font-bold uppercase tracking-[0.2em] text-blue-800">
                        Melhor opcao premium
                      </p>
                      <div className="mt-4">
                        <ProductCard
                          ageRange={premiumChoice.ageRange}
                          amazonUrl={premiumChoice.amazonUrl}
                          badge="Premium"
                          benefits={premiumChoice.benefits}
                          bestFor={premiumChoice.bestFor}
                          description={premiumChoice.description}
                          imageAlt={premiumChoice.imageAlt}
                          imageUrl={premiumChoice.imageUrl}
                          rating={premiumChoice.rating}
                          reviews={premiumChoice.reviews}
                          title={premiumChoice.title}
                        />
                      </div>
                    </section>
                  ) : null}
                </div>
              </div>

              <div className="mt-12 border-t border-[#e7dccb] pt-10">
                <h3 className="text-2xl font-semibold tracking-[-0.025em] text-stone-950 sm:text-3xl">
                  Lista completa
                </h3>
                <p className="mt-2 text-base leading-7 text-stone-600">
                  Compare todas as opções recomendadas neste guia.
                </p>

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
