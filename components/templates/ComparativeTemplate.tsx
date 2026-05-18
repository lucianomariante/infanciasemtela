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
        quickSummaryTitle: "Visao rapida",
        explainerEyebrow: "O que observamos no comparativo",
        explainerTitle: "O que observamos no comparativo",
        explainerText:
          "Neste comparativo, a organizacao considera a proposta de cada opcao, o equilibrio entre custo e entrega, a resposta nas avaliacoes e o tipo de uso que tende a funcionar melhor para cada familia.",
        ctaEyebrow: "Quem aproveita melhor",
        ctaTitle: "Para quem este comparativo e ideal",
        audienceBullets: [
          "quem esta em duvida entre opcoes parecidas",
          "quem quer comparar valor percebido com mais clareza",
          "quem precisa decidir com menos tentativa e erro",
        ],
        cautionBullets: [
          "se voce ja escolheu uma opcao especifica",
          "se o comparativo nao cobre o tipo de uso que voce procura",
          "se a crianca precisa de uma proposta muito diferente das opcoes listadas",
        ],
        rankingEyebrow: "Comparativo de opcoes",
        listTitle: "Opcoes comparadas nesta pagina",
      }}
    />
  );
}
