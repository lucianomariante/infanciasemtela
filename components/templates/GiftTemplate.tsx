import type { ContentPage } from "@/lib/content";
import { LeadMagnet } from "@/components/LeadMagnet";
import { EditorialTemplate } from "@/components/templates/EditorialTemplate";

type GiftTemplateProps = {
  page: ContentPage;
};

export function GiftTemplate({ page }: GiftTemplateProps) {
  return (
    <EditorialTemplate
      page={page}
      footerSlot={<LeadMagnet />}
      copy={{
        heroEyebrow: "Guia de presentes",
        quickSummaryTitle: "Resumo rápido",
        explainerEyebrow: "Como pensamos nesta seleção",
        explainerTitle: "Como pensamos nesta seleção",
        explainerText:
          "Organizamos esta seleção olhando para faixa etária, perfil da criança, utilidade real depois do presente, percepção de valor e sinais de satisfação nas avaliações.",
        ctaEyebrow: "Para quem esta lista ajuda mais",
        ctaTitle: "Para quem esta lista é ideal",
        audienceBullets: [
          "quem quer acertar no presente sem depender do óbvio",
          "pais e familiares buscando opções mais úteis",
          "quem quer comparar ideias antes de comprar",
        ],
        cautionBullets: [
          "se a criança já tem vários brinquedos do mesmo tipo",
          "se o presente não combina com o perfil da criança",
          "se a rotina pede algo mais simples do que a opção escolhida",
        ],
        rankingEyebrow: "Presentes recomendados",
        listTitle: "Presentes para considerar nesta página",
      }}
    />
  );
}
