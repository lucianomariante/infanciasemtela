import type { ContentPage } from "@/lib/content";
import { LeadMagnet } from "@/components/LeadMagnet";
import { EditorialTemplate } from "@/components/templates/EditorialTemplate";

type GuideTemplateProps = {
  page: ContentPage;
};

export function GuideTemplate({ page }: GuideTemplateProps) {
  return (
    <EditorialTemplate
      page={page}
      footerSlot={<LeadMagnet />}
      copy={{
        heroEyebrow: "Guia pratico",
        quickSummaryTitle: "Resumo rapido",
        explainerEyebrow: "O que faz sentido considerar",
        explainerTitle: "O que faz sentido considerar",
        explainerText:
          "Este guia prioriza brinquedos e opcoes com proposta clara de uso, encaixe melhor na rotina e potencial real de manter a crianca engajada sem complicar demais a escolha.",
        ctaEyebrow: "Perfil de leitura",
        ctaTitle: "Para quem este guia e ideal",
        audienceBullets: [
          "pais buscando uma selecao mais objetiva",
          "quem quer entender melhor o que vale a pena",
          "quem procura opcoes com uso mais pratico no dia a dia",
        ],
        cautionBullets: [
          "se a necessidade da crianca for muito especifica",
          "se voce ja decidiu por um estilo de brinquedo diferente",
          "se a faixa etaria da pagina nao representa bem o momento da crianca",
        ],
        rankingEyebrow: "Opcoes recomendadas",
        listTitle: "Opcoes em destaque neste guia",
      }}
    />
  );
}
