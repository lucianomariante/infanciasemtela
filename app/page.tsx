import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Infancia Sem Tela",
  description:
    "Guias praticos para escolher brinquedos, presentes e ideias sem tela para criancas.",
};

const featuredGuides = [
  {
    href: "/melhores/melhor-brinquedo-para-3-anos",
    title: "Melhor brinquedo para 3 anos",
    description:
      "Opcoes para estimular imaginacao, autonomia e coordenacao motora.",
  },
  {
    href: "/melhores/melhor-brinquedo-para-4-anos",
    title: "Melhor brinquedo para 4 anos",
    description:
      "Escolhas equilibradas para brincar mais tempo sem depender de telas.",
  },
  {
    href: "/melhores/melhor-brinquedo-para-5-anos",
    title: "Melhor brinquedo para 5 anos",
    description:
      "Ideias para fase de criatividade, desafios simples e brincadeira ativa.",
  },
  {
    href: "/guias/brinquedo-para-crianca-ficar-quieta-sem-tela",
    title: "Brinquedo para crianca ficar quieta sem tela",
    description:
      "Alternativas praticas para momentos de espera, restaurantes e viagens.",
  },
  {
    href: "/guias/brinquedo-montessori-coordenacao-motora-3-anos",
    title: "Brinquedo Montessori para coordenacao motora",
    description:
      "Sugestoes para criancas de 3 anos treinarem foco, maos e movimento.",
  },
  {
    href: "/presentes/presente-para-menina-de-5-anos",
    title: "Presente para menina de 5 anos",
    description:
      "Presentes com mais proposito para brincar, criar e explorar.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f8f5ef] text-[#26231d]">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 py-12 sm:px-8 lg:px-10 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7a5c35]">
              Brincar com presenca
            </p>
            <div className="space-y-4">
              <h1 className="text-4xl font-semibold leading-tight text-[#1f1c18] sm:text-5xl lg:text-6xl">
                Infância Sem Tela
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-[#5f5a50] sm:text-xl">
                Guias práticos para escolher brinquedos, presentes e ideias sem
                tela para crianças.
              </p>
            </div>
          </div>

          <div className="rounded-lg border border-[#e5dccd] bg-white/78 p-7 shadow-sm sm:p-8">
            <p className="text-2xl font-semibold leading-snug text-[#2d2923] sm:text-3xl">
              Escolha melhor, com menos tela e mais intenção.
            </p>
            <p className="mt-5 text-base leading-7 text-[#675f53]">
              Conteudos organizados para comparar alternativas, entender a fase
              da crianca e encontrar presentes que convidam ao brincar real.
            </p>
          </div>
        </div>

        <section aria-labelledby="guias-em-destaque" className="space-y-5">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2
                id="guias-em-destaque"
                className="text-2xl font-semibold text-[#242019]"
              >
                Guias em destaque
              </h2>
              <p className="mt-2 max-w-2xl text-base leading-7 text-[#655e54]">
                Caminhos rapidos para escolher por idade, momento e tipo de
                presente.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredGuides.map((guide) => (
              <Link
                key={guide.href}
                href={guide.href}
                className="group flex min-h-44 flex-col justify-between rounded-lg border border-[#e3d8c7] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-[#c8a775] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#a37b45] focus:ring-offset-2 focus:ring-offset-[#f8f5ef]"
              >
                <span>
                  <span className="block text-lg font-semibold leading-7 text-[#2a261f] group-hover:text-[#7a4f1c]">
                    {guide.title}
                  </span>
                  <span className="mt-3 block text-sm leading-6 text-[#675f54]">
                    {guide.description}
                  </span>
                </span>
                <span className="mt-6 text-sm font-semibold text-[#8a6128]">
                  Ver guia
                </span>
              </Link>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
