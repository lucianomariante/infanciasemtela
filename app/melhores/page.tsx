import type { Metadata } from "next";
import { ContentHub } from "@/components/ContentHub";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Melhores brinquedos por idade e perfil",
  description:
    "Seleções de brinquedos organizadas por idade, proposta de brincadeira e uso real na rotina.",
  alternates: { canonical: `${SITE_URL}/melhores` },
};

export default function BestToysPage() {
  return (
    <ContentHub
      type="bestof"
      eyebrow="Compare com clareza"
      title="Melhores brinquedos por idade e perfil"
      description="Listas completas com critérios, pontos de atenção e opções para diferentes perfis de brincadeira."
    />
  );
}
