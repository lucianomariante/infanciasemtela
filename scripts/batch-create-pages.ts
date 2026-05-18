import { loadEnvConfig } from "@next/env";
import { execFileSync } from "child_process";
import fs from "fs";
import path from "path";

import { generateJsonWithAI } from "@/lib/ai";

type PageType = "bestof" | "gift" | "guide" | "comparative";

type PageInput = {
  h1: string;
  intro: string;
  slug: string;
  title: string;
  type: PageType;
};

type FAQItem = {
  answer: string;
  question: string;
};

type GeneratedContent = {
  faq: FAQItem[];
  intro: string;
  page_goal: string;
  recommended_blocks: string[];
  secondary_keywords: string[];
};

type ContentPage = {
  faq: FAQItem[];
  h1: string;
  internal_links: string[];
  intro: string;
  page_goal: string;
  primary_keyword: string;
  product_ids: string[];
  recommended_blocks: string[];
  secondary_keywords: string[];
  slug: string;
  title: string;
  type: PageType;
};

const pages: PageInput[] = [
  {
    slug: "melhor-brinquedo-para-5-anos",
    type: "bestof",
    title: "Melhor brinquedo para 5 anos",
    h1: "Melhor brinquedo para 5 anos",
    intro: "Selecionamos opções úteis e divertidas para crianças de 5 anos.",
  },
  {
    slug: "presente-para-menina-de-5-anos",
    type: "gift",
    title: "Presente para menina de 5 anos",
    h1: "Presente para menina de 5 anos",
    intro: "Ideias de presente que fazem sentido para meninas de 5 anos.",
  },
];

const pagesDirectory = path.join(process.cwd(), "content", "pages");

function wait(milliseconds: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

function createBasePage(input: PageInput): ContentPage {
  return {
    slug: input.slug,
    type: input.type,
    title: input.title,
    h1: input.h1,
    intro: input.intro,
    primary_keyword: input.title.toLocaleLowerCase("pt-BR"),
    secondary_keywords: [],
    page_goal: "",
    recommended_blocks: [],
    product_ids: [],
    faq: [],
    internal_links: [],
  };
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function isFAQArray(value: unknown): value is FAQItem[] {
  return (
    Array.isArray(value) &&
    value.every(
      (item) =>
        item &&
        typeof item === "object" &&
        !Array.isArray(item) &&
        typeof (item as Record<string, unknown>).question === "string" &&
        typeof (item as Record<string, unknown>).answer === "string",
    )
  );
}

function normalizeGeneratedContent(content: GeneratedContent): GeneratedContent {
  return {
    intro: content.intro.trim(),
    secondary_keywords: content.secondary_keywords
      .map((keyword) => keyword.trim())
      .filter(Boolean),
    page_goal: content.page_goal.trim(),
    recommended_blocks: content.recommended_blocks
      .map((block) => block.trim())
      .filter(Boolean),
    faq: content.faq
      .map((item) => ({
        question: item.question.trim(),
        answer: item.answer.trim(),
      }))
      .filter((item) => item.question && item.answer),
  };
}

function validateGeneratedContent(content: GeneratedContent) {
  if (typeof content.intro !== "string" || content.intro.trim().length === 0) {
    throw new Error("A IA retornou intro invalida.");
  }

  if (
    typeof content.page_goal !== "string" ||
    content.page_goal.trim().length === 0
  ) {
    throw new Error("A IA retornou page_goal invalido.");
  }

  if (!isStringArray(content.secondary_keywords)) {
    throw new Error("A IA retornou secondary_keywords invalido.");
  }

  if (!isStringArray(content.recommended_blocks)) {
    throw new Error("A IA retornou recommended_blocks invalido.");
  }

  if (!isFAQArray(content.faq)) {
    throw new Error("A IA retornou faq invalido.");
  }
}

function buildSystemPrompt() {
  return [
    "Voce escreve conteudo editorial para o projeto Guia Sem Tela.",
    "O publico sao pais, maes e familiares que querem escolher brinquedos, presentes infantis e brincadeiras sem tela.",
    "O tom deve ser confiavel, simples, util, especifico e sem exagero.",
    "Escreva para SEO de forma natural, sem keyword stuffing.",
    "Nao faca promessas medicas, terapeuticas ou de desenvolvimento garantido.",
    "Evite afirmacoes absolutas e prefira linguagem cuidadosa.",
    "O foco principal e ajudar na decisao de compra.",
  ].join("\n");
}

function buildUserPrompt(page: ContentPage) {
  return [
    "Gere conteudo editorial complementar para a pagina abaixo.",
    "Retorne JSON puro exatamente com as chaves: intro, secondary_keywords, page_goal, recommended_blocks, faq.",
    "A intro ja existe e nao sera sobrescrita, mas retorne uma intro coerente para manter o formato.",
    "",
    "Pagina:",
    JSON.stringify(
      {
        slug: page.slug,
        type: page.type,
        title: page.title,
        h1: page.h1,
        intro: page.intro,
        primary_keyword: page.primary_keyword,
      },
      null,
      2,
    ),
    "",
    "Formato obrigatorio:",
    JSON.stringify(
      {
        intro: "texto curto",
        secondary_keywords: ["termo relacionado"],
        page_goal: "objetivo editorial e comercial da pagina",
        recommended_blocks: ["hero", "product-list", "faq"],
        faq: [
          {
            question: "pergunta",
            answer: "resposta",
          },
        ],
      },
      null,
      2,
    ),
  ].join("\n");
}

async function generateContentForPage(page: ContentPage): Promise<ContentPage> {
  const generatedContent = await generateJsonWithAI<GeneratedContent>({
    systemPrompt: buildSystemPrompt(),
    userPrompt: buildUserPrompt(page),
  });
  const normalizedContent = normalizeGeneratedContent(generatedContent);

  validateGeneratedContent(normalizedContent);

  return {
    ...page,
    secondary_keywords: normalizedContent.secondary_keywords,
    page_goal: normalizedContent.page_goal,
    recommended_blocks: normalizedContent.recommended_blocks,
    faq: normalizedContent.faq,
  };
}

function runContentValidation() {
  execFileSync("cmd.exe", ["/c", "npm", "run", "validate:content"], {
    cwd: process.cwd(),
    stdio: "inherit",
  });
}

async function main() {
  loadEnvConfig(process.cwd());

  if (!fs.existsSync(pagesDirectory)) {
    fs.mkdirSync(pagesDirectory, { recursive: true });
  }

  let generatedCount = 0;

  for (const [index, input] of pages.entries()) {
    const outputPath = path.join(pagesDirectory, `${input.slug}.json`);

    if (fs.existsSync(outputPath)) {
      console.log(`Pagina existente, ignorada: ${input.slug}`);
      continue;
    }

    const basePage = createBasePage(input);
    fs.writeFileSync(outputPath, `${JSON.stringify(basePage, null, 2)}\n`);
    console.log(`Pagina criada: ${input.slug}`);

    const fullPage = await generateContentForPage(basePage);
    fs.writeFileSync(outputPath, `${JSON.stringify(fullPage, null, 2)}\n`);
    console.log(`Conteudo gerado: ${input.slug}`);
    generatedCount += 1;

    if (index < pages.length - 1) {
      await wait(1500);
    }
  }

  runContentValidation();
  console.log(`Lote finalizado. Paginas novas: ${generatedCount}.`);
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`ERROR: ${message}`);
  process.exit(1);
});
