import type { Metadata } from "next";
import { EditorialInfoPage } from "@/components/EditorialInfoPage";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política editorial",
  description:
    "Princípios de independência, transparência, correção e uso responsável de automação no Infância Sem Tela.",
  alternates: { canonical: `${SITE_URL}/politica-editorial` },
};

export default function EditorialPolicyPage() {
  return (
    <EditorialInfoPage
      eyebrow="Transparência"
      title="Política editorial"
      description="Estes princípios orientam a produção, revisão e monetização do conteúdo publicado no Infância Sem Tela."
      sections={[
        {
          title: "Independência e publicidade",
          paragraphs: [
            "Conteúdo editorial e relações comerciais devem permanecer identificáveis. Links de afiliado são sinalizados e não alteram o preço pago pelo visitante.",
            "Não publicamos avaliações pagas disfarçadas de recomendação independente. Caso exista conteúdo patrocinado no futuro, ele deverá ser identificado claramente.",
          ],
        },
        {
          title: "Automação e inteligência artificial",
          paragraphs: [
            "Ferramentas de automação e inteligência artificial podem apoiar pesquisa inicial, organização, revisão e criação de rascunhos. Elas não devem ser tratadas como fonte de experiência prática nem justificar informações que não possam ser verificadas.",
            "Conteúdos gerados ou assistidos por automação devem ser revisados quanto a clareza, duplicação, coerência, segurança e utilidade antes de serem considerados prontos.",
          ],
        },
        {
          title: "Temas sensíveis",
          paragraphs: [
            "Conteúdos relacionados a saúde, desenvolvimento, fala, comportamento, necessidades sensoriais ou neurodiversidade exigem cuidado adicional. Não fazemos diagnóstico nem prometemos resultados terapêuticos.",
          ],
        },
        {
          title: "Atualizações",
          paragraphs: [
            "Informações incorretas, links quebrados e páginas incompletas devem ser corrigidos, retirados de circulação ou identificados como em revisão. Datas de atualização só devem mudar quando houver alteração relevante no conteúdo.",
          ],
        },
      ]}
    />
  );
}
