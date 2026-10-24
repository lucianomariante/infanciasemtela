import fs from "fs";
import path from "path";

export type PageType = "bestof" | "gift" | "guide" | "comparative";

export type FAQItem = {
  question: string;
  answer: string;
};

export type EditorialSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

export type ExpertNote = {
  paragraphs: string[];
  /** Só "aprovado" aparece na página; enquanto for "rascunho" a página fica fora do Google. */
  status: "rascunho" | "aprovado";
};

export type ContentPage = {
  slug: string;
  type: PageType;
  title: string;
  h1: string;
  intro: string;
  primary_keyword?: string;
  secondary_keywords?: string[];
  page_goal?: string;
  recommended_blocks?: string[];
  editorial_sections?: EditorialSection[];
  expert_note?: ExpertNote;
  /** Os 3 destaques escolhidos à mão; sem isso, valem os 3 primeiros do ranking automático com rótulos padrão. */
  quick_picks?: { product_id: string; label: string }[];
  product_ids: string[];
  faq: FAQItem[];
  internal_links: string[];
};

const pagesDirectory = path.join(process.cwd(), "content", "pages");

export function getPageBySlug(slug: string): ContentPage | null {
  const fullPath = path.join(pagesDirectory, `${slug}.json`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");

  return JSON.parse(fileContents) as ContentPage;
}

export function getAllPages(): ContentPage[] {
  if (!fs.existsSync(pagesDirectory)) {
    return [];
  }

  const files = fs.readdirSync(pagesDirectory);

  return files
    .filter((file) => file.endsWith(".json"))
    .map((file) => {
      const slug = file.replace(".json", "");
      return getPageBySlug(slug);
    })
    .filter(Boolean) as ContentPage[];
}

const pagesRequiringExpertReview = new Set([
  "brinquedo-sensorial-para-autismo-4-anos",
]);

export function isPageIndexable(page: ContentPage): boolean {
  return (
    page.product_ids.length > 0 &&
    !pagesRequiringExpertReview.has(page.slug) &&
    (!page.expert_note || page.expert_note.status === "aprovado")
  );
}
