import type { Metadata } from "next";
import { EditorialInfoPage } from "@/components/EditorialInfoPage";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sobre o Infância Sem Tela",
  description:
    "Conheça o propósito do Infância Sem Tela e os limites da nossa curadoria de brinquedos e ideias de brincadeira.",
  alternates: { canonical: `${SITE_URL}/sobre` },
};

export default function AboutPage() {
  return (
    <EditorialInfoPage
      eyebrow="Sobre o projeto"
      title="Escolhas mais claras para brincar com presença"
      description="O Infância Sem Tela é um projeto editorial independente criado para ajudar famílias a comparar brinquedos, presentes e alternativas de brincadeira sem depender apenas de telas."
      sections={[
        {
          title: "Nosso propósito",
          paragraphs: [
            "Queremos reduzir a confusão na hora de escolher. Em vez de apresentar uma lista solta de produtos, organizamos as opções por idade, tipo de uso, habilidade envolvida e realidade da rotina familiar.",
            "Não acreditamos em um brinquedo perfeito para todas as crianças. Interesses, desenvolvimento, espaço, orçamento e necessidade de supervisão mudam de família para família.",
          ],
        },
        {
          title: "O que este site é — e o que não é",
          paragraphs: [
            "Este é um projeto de curadoria e informação para consumidores. Não substitui a orientação de pediatras, terapeutas, educadores ou outros profissionais que acompanham a criança.",
            "Quando um conteúdo se aproxima de desenvolvimento, fala, comportamento, autismo ou segurança, tratamos as sugestões como informação geral e recomendamos considerar orientação profissional individualizada.",
          ],
        },
        {
          title: "Como o projeto se mantém",
          paragraphs: [
            "Alguns links levam à Amazon e podem gerar comissão quando uma compra é realizada, sem custo adicional para o visitante. Essa relação é informada nas páginas e não deve determinar a posição de um item na seleção.",
          ],
        },
      ]}
    />
  );
}
