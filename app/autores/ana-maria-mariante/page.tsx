import type { Metadata } from "next";
import Link from "next/link";
import { EDITORIAL_AUTHOR, SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: `${EDITORIAL_AUTHOR.name} — Psicopedagoga`,
  description:
    "Conheça Ana Maria Mariante, psicopedagoga e autora editorial do Infância Sem Tela.",
  alternates: { canonical: EDITORIAL_AUTHOR.url },
  openGraph: {
    title: `${EDITORIAL_AUTHOR.name} — Psicopedagoga`,
    description:
      "Autora editorial do Infância Sem Tela, projeto de curadoria para famílias.",
    url: EDITORIAL_AUTHOR.url,
    siteName: SITE_NAME,
    locale: "pt_BR",
    type: "profile",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/opengraph-image"],
  },
};

export default function AuthorPage() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: EDITORIAL_AUTHOR.name,
    jobTitle: EDITORIAL_AUTHOR.role,
    url: EDITORIAL_AUTHOR.url,
    affiliation: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };

  return (
    <main className="flex-1 bg-[#faf7f0] text-stone-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personSchema).replace(/</g, "\\u003c"),
        }}
      />

      <div className="mx-auto w-full max-w-4xl px-5 py-10 sm:px-8 sm:py-16">
        <nav className="text-sm font-semibold text-stone-500" aria-label="Breadcrumb">
          <Link className="hover:text-teal-700" href="/">
            Início
          </Link>
          <span className="px-2">/</span>
          <span>Autora</span>
        </nav>

        <article className="mt-8 overflow-hidden rounded-[2rem] border border-[#e7dccb] bg-white shadow-[0_18px_55px_rgba(73,58,39,0.08)]">
          <header className="border-b border-[#e7dccb] bg-[#edf5f2] px-6 py-9 sm:px-10 sm:py-12">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal-700">
              Autora editorial
            </p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-[-0.04em] sm:text-5xl">
              {EDITORIAL_AUTHOR.name}
            </h1>
            <p className="mt-4 text-lg font-semibold text-teal-800">
              {EDITORIAL_AUTHOR.role}
            </p>
          </header>

          <div className="grid gap-9 px-6 py-9 sm:px-10 sm:py-12">
            <section aria-labelledby="about-author">
              <h2 id="about-author" className="text-2xl font-semibold tracking-[-0.025em]">
                Sobre a autora
              </h2>
              <div className="mt-4 grid gap-4 text-base leading-7 text-stone-700">
                <p>
                  Ana Maria Mariante é psicopedagoga e autora editorial do
                  Infância Sem Tela.
                </p>
                <p>
                  Assina conteúdos que ajudam famílias a organizar escolhas de
                  brinquedos, presentes e brincadeiras sem tela com critérios
                  claros e linguagem acessível.
                </p>
              </div>
            </section>

            <section className="rounded-2xl border border-[#d8e7df] bg-[#edf5f2] p-5 sm:p-6" aria-labelledby="editorial-role">
              <h2 id="editorial-role" className="text-xl font-semibold">
                Atuação no projeto
              </h2>
              <p className="mt-3 leading-7 text-stone-700">
                Sua assinatura identifica a autoria dos guias editoriais. As
                seleções consideram proposta de uso, faixa etária, informações
                públicas, avaliações disponíveis e os critérios explicados na
                metodologia do site.
              </p>
              <Link className="mt-4 inline-flex font-bold text-teal-700 hover:text-teal-900" href="/como-avaliamos">
                Conheça nossa metodologia →
              </Link>
            </section>

            <section aria-labelledby="limits">
              <h2 id="limits" className="text-2xl font-semibold tracking-[-0.025em]">
                Limites da orientação
              </h2>
              <p className="mt-4 leading-7 text-stone-700">
                O conteúdo do site é informativo e geral. Não realiza
                diagnóstico, avaliação individual ou tratamento e não substitui
                o acompanhamento dos profissionais que conhecem a criança.
              </p>
            </section>

            <div>
              <Link className="font-bold text-teal-700 hover:text-teal-900" href="/guias">
                Ver os guias publicados →
              </Link>
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}
