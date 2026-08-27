import type { Metadata } from "next";
import { ContentHub } from "@/components/ContentHub";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Presentes infantis por idade",
  description:
    "Guias de presentes infantis com opções sem tela, critérios de escolha e atenção à fase da criança.",
  alternates: { canonical: `${SITE_URL}/presentes` },
};

export default function GiftsPage() {
  return (
    <ContentHub
      type="gift"
      eyebrow="Presentes com intenção"
      title="Presentes infantis por idade"
      description="Ideias completas para escolher um presente que combine com a idade, o interesse e a rotina da criança."
    />
  );
}
