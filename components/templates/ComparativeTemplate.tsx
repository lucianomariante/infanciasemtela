import type { ContentPage } from "@/lib/content";
import { EditorialTemplate } from "@/components/templates/EditorialTemplate";

type ComparativeTemplateProps = {
  page: ContentPage;
};

export function ComparativeTemplate({ page }: ComparativeTemplateProps) {
  return (
    <EditorialTemplate
      page={page}
      copy={{
        heroEyebrow: "Comparativo",
        quickSummaryTitle: "Visão rápida",
        explainerEyebrow: "O que observamos no comparativo",
        explainerTitle: "O que observamos no comparativo",
        explainerText:
          "Neste comparativo, a organização considera a proposta de cada opção, o equilíbrio entre custo e entrega, a resposta nas avaliações e o tipo de uso que tende a funcionar melhor para cada família.",
        ctaEyebrow: "Quem aproveita melhor",
        ctaTitle: "Para quem este comparativo é ideal",
        audienceBullets: [
          "quem está em dúvida entre opções parecidas",
          "quem quer comparar valor percebido com mais clareza",
          "quem precisa decidir com menos tentativa e erro",
        ],
        cautionBullets: [
          "se você já escolheu uma opção específica",
          "se o comparativo não cobre o tipo de uso que você procura",
          "se a criança precisa de uma proposta muito diferente das opções listadas",
        ],
        rankingEyebrow: "Comparativo de opções",
        listTitle: "Opções comparadas nesta página",
      }}
    />
  );
}
