import type { Metadata } from "next";
import { ContentHub } from "@/components/ContentHub";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Guias para brincar sem tela",
  description:
    "Guias para escolher brinquedos por idade, habilidade, comportamento e momento da rotina familiar.",
  alternates: { canonical: `${SITE_URL}/guias` },
};

export default function GuidesPage() {
  return (
    <ContentHub
      type="guide"
      eyebrow="Escolha por necessidade"
      title="Guias para brincar sem tela"
      description="Encontre ideias por idade, habilidade e situação da rotina. Exibimos aqui apenas os guias que já têm uma seleção completa para comparar."
    />
  );
}
