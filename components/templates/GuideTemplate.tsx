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
        heroEyebrow: "Guia prático",
        quickSummaryTitle: "Resumo rápido",
        explainerEyebrow: "O que faz sentido considerar",
        explainerTitle: "O que faz sentido considerar",
        explainerText:
          "Este guia prioriza brinquedos e opções com proposta clara de uso, encaixe melhor na rotina e potencial real de manter a criança engajada sem complicar demais a escolha.",
        ctaEyebrow: "Perfil de leitura",
        ctaTitle: "Para quem este guia é ideal",
        audienceBullets: [
          "pais buscando uma seleção mais objetiva",
          "quem quer entender melhor o que vale a pena",
          "quem procura opções com uso mais prático no dia a dia",
        ],
        cautionBullets: [
          "se a necessidade da criança for muito específica",
          "se você já decidiu por um estilo de brinquedo diferente",
          "se a faixa etária da página não representa bem o momento da criança",
        ],
        rankingEyebrow: "Opções recomendadas",
        listTitle: "Opções em destaque neste guia",
      }}
    />
  );
}
