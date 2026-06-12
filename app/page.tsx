import type { Metadata } from "next";
import { GuideCard } from "@/components/GuideCard";
import { Icon } from "@/components/ui/Icon";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "Infância Sem Tela",
  description:
    "Guias práticos para escolher brinquedos, presentes e ideias sem tela para crianças.",
};

const featuredGuides = [
  {
    href: "/melhores/melhor-brinquedo-para-3-anos",
    title: "Melhor brinquedo para 3 anos",
    description:
      "Opções para estimular imaginação, autonomia e coordenação motora.",
    icon: "blocks" as const,
  },
  {
    href: "/melhores/melhor-brinquedo-para-4-anos",
    title: "Melhor brinquedo para 4 anos",
    description:
      "Escolhas equilibradas para brincar mais tempo sem depender de telas.",
    icon: "puzzle" as const,
  },
  {
    href: "/melhores/melhor-brinquedo-para-5-anos",
    title: "Melhor brinquedo para 5 anos",
    description:
      "Ideias para a fase de criatividade, desafios simples e brincadeira ativa.",
    icon: "sparkles" as const,
  },
  {
    href: "/guias/brinquedo-para-crianca-ficar-quieta-sem-tela",
    title: "Brinquedo para criança ficar quieta sem tela",
    description:
      "Alternativas práticas para momentos de espera, restaurantes e viagens.",
    icon: "heart" as const,
  },
  {
    href: "/guias/brinquedo-montessori-coordenacao-motora-3-anos",
    title: "Brinquedo Montessori para coordenação motora",
    description:
      "Sugestões para crianças de 3 anos treinarem foco, mãos e movimento.",
    icon: "blocks" as const,
  },
  {
    href: "/presentes/presente-para-menina-de-5-anos",
    title: "Presente para menina de 5 anos",
    description:
      "Presentes com mais propósito para brincar, criar e explorar.",
    icon: "gift" as const,
  },
];

const themes = [
  { icon: "blocks" as const, label: "Brinquedos educativos" },
  { icon: "gift" as const, label: "Presentes por idade" },
  { icon: "heart" as const, label: "Sem telas" },
  { icon: "sparkles" as const, label: "Brincar com presença" },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#faf7f0] text-stone-950">
      <section className="relative border-b border-[#eadfce]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(253,226,209,0.75),transparent_30%),radial-gradient(circle_at_72%_75%,rgba(219,234,254,0.65),transparent_28%)]" />
        <div className="relative mx-auto grid w-full max-w-6xl gap-10 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[1.12fr_0.88fr] lg:items-center lg:px-10 lg:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#e5d3b7] bg-white/75 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-amber-800 shadow-sm backdrop-blur">
              <Icon className="size-4" name="heart" />
              Brincar com presença
            </span>
            <h1 className="mt-7 max-w-3xl text-5xl font-semibold leading-[1.02] tracking-[-0.05em] text-stone-950 sm:text-6xl lg:text-7xl">
              Infância
              <span className="block text-teal-700">Sem Tela</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-600 sm:text-xl">
              Curadoria de brinquedos, presentes e ideias para uma infância
              mais criativa, ativa e conectada ao que importa.
            </p>

            <div className="mt-8 flex flex-wrap gap-2.5">
              {themes.map((theme) => (
                <span
                  key={theme.label}
                  className="inline-flex items-center gap-2 rounded-full border border-[#e7dccb] bg-white px-3.5 py-2 text-sm font-semibold text-stone-700 shadow-sm"
                >
                  <Icon className="size-4 text-teal-700" name={theme.icon} />
                  {theme.label}
                </span>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-lg">
            <div className="absolute -left-6 top-10 size-24 rounded-full bg-[#fde2d1]" />
            <div className="absolute -right-6 bottom-8 size-32 rounded-full bg-[#dbeafe]" />
            <div className="relative rounded-[2rem] border border-white/80 bg-white/80 p-6 shadow-[0_24px_70px_rgba(73,58,39,0.14)] backdrop-blur sm:p-8">
              <span className="grid size-14 place-items-center rounded-2xl bg-[#e7f3ee] text-teal-700">
                <Icon className="size-7" name="shield" />
              </span>
              <p className="mt-6 text-2xl font-semibold leading-snug tracking-[-0.03em] text-stone-950 sm:text-3xl">
                Escolha melhor, com menos tela e mais intenção.
              </p>
              <p className="mt-4 text-base leading-7 text-stone-600">
                Guias organizados para comparar alternativas, entender a fase
                da criança e encontrar presentes que convidam ao brincar real.
              </p>
              <div className="mt-7 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-[#faf3e8] p-4">
                  <Icon className="size-5 text-amber-800" name="search" />
                  <p className="mt-3 text-sm font-semibold text-stone-800">
                    Curadoria prática
                  </p>
                </div>
                <div className="rounded-2xl bg-[#edf5f2] p-4">
                  <Icon className="size-5 text-teal-700" name="check" />
                  <p className="mt-3 text-sm font-semibold text-stone-800">
                    Escolhas explicadas
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="guias-em-destaque"
        className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24"
      >
        <SectionHeader
          eyebrow="Comece por aqui"
          id="guias-em-destaque"
          title="Guias em destaque"
          description="Caminhos rápidos para escolher por idade, momento e tipo de presente, com critérios claros para pais e familiares."
        />

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featuredGuides.map((guide) => (
            <GuideCard key={guide.href} {...guide} />
          ))}
        </div>
      </section>

      <section className="border-y border-[#e7dccb] bg-white/60">
        <div className="mx-auto grid w-full max-w-6xl gap-6 px-5 py-12 sm:grid-cols-3 sm:px-8 lg:px-10">
          {[
            ["heart", "Mais afeto", "Ideias que valorizam vínculo e presença."],
            ["blocks", "Mais autonomia", "Brinquedos que convidam a explorar."],
            ["shield", "Mais clareza", "Critérios simples para decidir melhor."],
          ].map(([icon, title, text]) => (
            <article key={title} className="flex gap-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-[#f6eee2] text-amber-800">
                <Icon name={icon as "heart" | "blocks" | "shield"} />
              </span>
              <div>
                <h2 className="font-semibold text-stone-950">{title}</h2>
                <p className="mt-1 text-sm leading-6 text-stone-600">{text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
