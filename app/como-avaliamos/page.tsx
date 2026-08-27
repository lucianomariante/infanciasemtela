import type { Metadata } from "next";
import { EditorialInfoPage } from "@/components/EditorialInfoPage";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Como avaliamos brinquedos e presentes",
  description:
    "Entenda os critérios, fontes, limitações e processo editorial usados nas seleções do Infância Sem Tela.",
  alternates: { canonical: `${SITE_URL}/como-avaliamos` },
};

export default function MethodologyPage() {
  return (
    <EditorialInfoPage
      eyebrow="Metodologia"
      title="Como avaliamos brinquedos e presentes"
      description="Transparência é parte da escolha. Estes são os critérios que orientam nossas listas e também os limites do que podemos afirmar."
      sections={[
        {
          title: "Critérios de seleção",
          paragraphs: ["A seleção considera o conjunto da proposta, e não apenas nota, preço ou popularidade."],
          bullets: [
            "faixa etária indicada e complexidade de uso",
            "tipo de brincadeira e possibilidade de uso repetido",
            "qualidade percebida, robustez e pontos de segurança informados",
            "volume e consistência das avaliações disponíveis",
            "relação entre preço, proposta e utilidade na rotina",
            "variedade para diferentes interesses e orçamentos",
          ],
        },
        {
          title: "Fontes e limitações",
          paragraphs: [
            "Usamos descrições de fabricantes e vendedores, informações públicas de produto e avaliações de consumidores. Nem todos os itens foram testados diretamente pelo projeto; quando não há teste próprio, não apresentamos a recomendação como experiência pessoal.",
            "Preços, disponibilidade, notas e quantidade de avaliações podem mudar. Sempre confira a página do produto e as orientações do fabricante antes da compra.",
          ],
        },
        {
          title: "Como ordenamos as opções",
          paragraphs: [
            "A ordem combina adequação à proposta da página, avaliações disponíveis, utilidade, variedade e custo-benefício percebido. Uma comissão de afiliado não deve comprar posição nem transformar publicidade em recomendação editorial.",
          ],
        },
        {
          title: "Correções e revisões",
          paragraphs: [
            "Links, imagens e informações são revisados periodicamente. Quando um link parece incorreto ou não pode ser confirmado, preferimos removê-lo temporariamente a enviar o visitante ao produto errado.",
          ],
        },
      ]}
    />
  );
}
