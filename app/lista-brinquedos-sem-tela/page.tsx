import type { Metadata } from "next";
import Link from "next/link";
import { PrintButton } from "@/components/PrintButton";
import { Icon } from "@/components/ui/Icon";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "10 brinquedos sem tela para imprimir e consultar",
  description:
    "Lista prática com 10 tipos de brinquedos sem tela, perguntas para escolher melhor e pontos de atenção por perfil de brincadeira.",
  alternates: { canonical: `${SITE_URL}/lista-brinquedos-sem-tela` },
  openGraph: {
    title: "10 brinquedos sem tela para imprimir e consultar",
    description:
      "Uma lista prática e gratuita para escolher brinquedos sem tela com mais clareza.",
    url: `${SITE_URL}/lista-brinquedos-sem-tela`,
    type: "article",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/opengraph-image"],
  },
};

const ideas = [
  {
    title: "Blocos de montar",
    goodFor: "construção livre, coordenação e imaginação",
    check: "tamanho das peças, firmeza dos encaixes e faixa etária",
  },
  {
    title: "Quebra-cabeça",
    goodFor: "atenção, tentativa e erro e percepção visual",
    check: "quantidade de peças compatível com a experiência da criança",
  },
  {
    title: "Massinha e ferramentas",
    goodFor: "criação, força das mãos e brincadeira simbólica",
    check: "composição do material e necessidade de supervisão",
  },
  {
    title: "Lousa de desenho reutilizável",
    goodFor: "desenho livre, viagens e momentos de espera",
    check: "facilidade para apagar, caneta presa e resistência",
  },
  {
    title: "Jogo de encaixe",
    goodFor: "coordenação fina, formas e resolução de pequenos desafios",
    check: "peças grandes o suficiente e desafio sem frustração excessiva",
  },
  {
    title: "Livros interativos",
    goodFor: "linguagem, vínculo e curiosidade",
    check: "texto, ilustrações e formato adequados ao momento da criança",
  },
  {
    title: "Kit de arte",
    goodFor: "expressão, experimentação de cores e projetos em família",
    check: "materiais laváveis, atóxicos e adequados à idade",
  },
  {
    title: "Jogo de memória",
    goodFor: "observação, turnos e brincadeira compartilhada",
    check: "número de pares e duração provável da partida",
  },
  {
    title: "Brinquedo de faz de conta",
    goodFor: "histórias, autonomia e interação social",
    check: "se o tema combina com interesses que a criança já demonstra",
  },
  {
    title: "Bola ou brinquedo de movimento",
    goodFor: "coordenação ampla, energia e brincadeira ao ar livre",
    check: "espaço disponível, tamanho, peso e supervisão necessária",
  },
];

export default function FreeListPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "10 brinquedos sem tela para imprimir e consultar",
    description:
      "Lista prática com tipos de brinquedos sem tela e critérios de escolha.",
    inLanguage: "pt-BR",
    mainEntityOfPage: `${SITE_URL}/lista-brinquedos-sem-tela`,
    publisher: {
      "@type": "Organization",
      name: "Infância Sem Tela",
    },
  };

  return (
    <main className="flex-1 bg-[#faf7f0] text-stone-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema).replace(/</g, "\\u003c"),
        }}
      />
      <div className="mx-auto w-full max-w-4xl px-5 py-10 sm:px-8 sm:py-16">
        <nav className="print:hidden text-sm font-semibold text-stone-500" aria-label="Breadcrumb">
          <Link className="hover:text-teal-700" href="/">Início</Link>
          <span className="px-2">/</span>
          <span>Lista gratuita</span>
        </nav>

        <header className="mt-8 rounded-[2rem] border border-[#e7dccb] bg-white p-6 shadow-[0_18px_55px_rgba(73,58,39,0.08)] sm:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal-700">
            Material gratuito · sem cadastro
          </p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-[-0.04em] sm:text-5xl">
            10 ideias de brinquedos sem tela para escolher com mais clareza
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-stone-600">
            Use esta lista como ponto de partida. O melhor brinquedo não é o mais
            complexo: é aquele que combina com a idade, o interesse, a rotina e
            o espaço disponível para brincar.
          </p>
          <div className="mt-7">
            <PrintButton />
          </div>
        </header>

        <section className="mt-10" aria-labelledby="ideas-title">
          <h2 id="ideas-title" className="text-2xl font-semibold tracking-[-0.025em] sm:text-3xl">
            A lista
          </h2>
          <ol className="mt-6 grid gap-4">
            {ideas.map((idea, index) => (
              <li key={idea.title} className="rounded-2xl border border-[#e7dccb] bg-white p-5 sm:p-6">
                <div className="flex gap-4">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[#e7f3ee] font-bold text-teal-800">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-stone-950">{idea.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-stone-600">
                      <strong className="text-stone-800">Pode funcionar bem para:</strong>{" "}
                      {idea.goodFor}.
                    </p>
                    <p className="mt-1 text-sm leading-6 text-stone-600">
                      <strong className="text-stone-800">Antes de escolher, confira:</strong>{" "}
                      {idea.check}.
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-10 rounded-[1.5rem] border border-[#d8e7df] bg-[#e8f4ef] p-6 sm:p-8">
          <span className="grid size-11 place-items-center rounded-2xl bg-white text-teal-700">
            <Icon name="shield" />
          </span>
          <h2 className="mt-5 text-2xl font-semibold">Três perguntas antes da compra</h2>
          <ul className="mt-4 grid gap-3 text-base leading-7 text-stone-700">
            <li>1. A criança consegue entender como começar a brincar?</li>
            <li>2. A proposta permite repetir, variar ou inventar novas formas de uso?</li>
            <li>3. O tamanho das peças e a faixa etária indicada são adequados?</li>
          </ul>
          <p className="mt-5 text-sm leading-6 text-stone-600">
            Sempre siga as orientações do fabricante e considere a supervisão
            necessária para o momento de desenvolvimento da criança.
          </p>
        </section>

        <div className="print:hidden mt-10 text-center">
          <Link className="font-semibold text-teal-700 hover:text-teal-900" href="/guias">
            Explorar todos os guias →
          </Link>
        </div>
      </div>
    </main>
  );
}
