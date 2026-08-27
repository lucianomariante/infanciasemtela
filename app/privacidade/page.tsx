import type { Metadata } from "next";
import { EditorialInfoPage } from "@/components/EditorialInfoPage";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacidade",
  description:
    "Saiba quais informações técnicas podem ser medidas no Infância Sem Tela e como funcionam os links externos.",
  alternates: { canonical: `${SITE_URL}/privacidade` },
};

export default function PrivacyPage() {
  return (
    <EditorialInfoPage
      eyebrow="Privacidade"
      title="Privacidade e medição do site"
      description="Explicamos de forma simples o que medimos para melhorar o projeto e o que acontece ao visitar páginas externas."
      sections={[
        {
          title: "Métricas de uso",
          paragraphs: [
            "Podemos usar ferramentas de análise da Vercel para medir visualizações de páginas, origem geral do tráfego, desempenho e eventos como a abertura da lista gratuita ou o clique em um produto.",
            "Os eventos configurados pelo projeto não devem incluir nome, e-mail, conteúdo digitado ou outras informações pessoais fornecidas diretamente pelo visitante.",
          ],
        },
        {
          title: "Links externos e afiliados",
          paragraphs: [
            "Ao seguir um link para Amazon ou outro site, você passa a usar um serviço com termos e práticas de privacidade próprios. Alguns links contêm identificação de afiliado para atribuir uma possível comissão.",
          ],
        },
        {
          title: "Formulários e e-mail",
          paragraphs: [
            "Neste momento, o site não solicita nem armazena e-mails para entregar a lista gratuita. Se uma ferramenta de newsletter for adicionada, esta página deverá ser atualizada antes da coleta começar.",
          ],
        },
        {
          title: "Atualizações desta página",
          paragraphs: [
            "Esta explicação deve acompanhar as ferramentas efetivamente usadas pelo site. Mudanças relevantes na coleta ou no uso de dados serão descritas aqui.",
          ],
        },
      ]}
    />
  );
}
