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
        quickSummaryTitle: "Resumo rapido",
        explainerEyebrow: "Como pensamos nesta selecao",
        explainerTitle: "Como pensamos nesta selecao",
        explainerText:
          "Organizamos esta selecao olhando para faixa etaria, perfil da crianca, utilidade real depois do presente, percepcao de valor e sinais de satisfacao nas avaliacoes.",
        ctaEyebrow: "Para quem esta lista ajuda mais",
        ctaTitle: "Para quem esta lista e ideal",
        audienceBullets: [
          "quem quer acertar no presente sem depender do obvio",
          "pais e familiares buscando opcoes mais uteis",
          "quem quer comparar ideias antes de comprar",
        ],
        cautionBullets: [
          "se a crianca ja tem varios brinquedos do mesmo tipo",
          "se o presente nao combina com o perfil da crianca",
          "se a rotina pede algo mais simples do que a opcao escolhida",
        ],
        rankingEyebrow: "Presentes recomendados",
        listTitle: "Presentes para considerar nesta pagina",
      }}
    />
  );
}
