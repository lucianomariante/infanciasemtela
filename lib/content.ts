import fs from "fs";
import path from "path";

export type PageType = "bestof" | "gift" | "guide" | "comparative";

export type FAQItem = {
  question: string;
  answer: string;
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