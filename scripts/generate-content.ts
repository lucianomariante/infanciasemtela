import { loadEnvConfig } from "@next/env";
import fs from "fs";
import path from "path";

import { generateJsonWithAI } from "@/lib/ai";

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

type ContentPage = Partial<GeneratedContent> & {
  h1: string;
  primary_keyword?: string;
  product_ids?: string[];
  slug: string;
  title: string;
  type: string;
};

const fillableFields = [
  "intro",
  "secondary_keywords",
  "page_goal",
  "recommended_blocks",
  "faq",
] as const;

type FillableField = (typeof fillableFields)[number];

function parseArgs(argv: string[]): Record<string, string> {
  const args: Record<string, string> = {};

  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];

    if (token === "--") {
      continue;
    }

    if (!token.startsWith("--")) {
      continue;
    }

    const [rawKey, inlineValue] = token.slice(2).split("=", 2);

    if (inlineValue && inlineValue.trim().length > 0) {
      args[rawKey] = inlineValue.trim();
      continue;
    }

    const value = argv[index + 1];

    if (!value || value.startsWith("--")) {
      throw new Error(`Argumento sem valor: --${rawKey}`);
    }

    args[rawKey] = value.trim();
    index += 1;
  }

  return args;
}

function getRequiredArg(args: Record<string, string>, key: string) {
  const value = args[key] ?? process.env[`npm_config_${key}`];

  if (!value || value.trim().length === 0) {
    throw new Error(`Argumento obrigatorio ausente: --${key}`);
  }

  return value.trim();
}

function isEmptyValue(value: unknown) {
  if (typeof value === "string") {
    return value.trim().length === 0;
  }

  if (Array.isArray(value)) {
    return value.length === 0;
  }

  return value === undefined || value === null;
}

function getEmptyFields(page: ContentPage): FillableField[] {
  return fillableFields.filter((field) => isEmptyValue(page[field]));
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

function buildUserPrompt(page: ContentPage, emptyFields: FillableField[]) {
  return [
    "Preencha apenas conteudo editorial para os campos vazios indicados.",
    "Retorne JSON puro exatamente com as chaves: intro, secondary_keywords, page_goal, recommended_blocks, faq.",
    "Mesmo que algum campo nao esteja vazio, retorne todas as chaves no JSON; o script so usara os campos vazios.",
    "",
    `Campos vazios a preencher: ${emptyFields.join(", ")}`,
    "",
    "Pagina:",
    JSON.stringify(
      {
        slug: page.slug,
        type: page.type,
        title: page.title,
        h1: page.h1,
        primary_keyword: page.primary_keyword,
        product_ids: page.product_ids,
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

async function main() {
  loadEnvConfig(process.cwd());

  const args = parseArgs(process.argv.slice(2));
  const slug = getRequiredArg(args, "slug");
  const pagePath = path.join(process.cwd(), "content", "pages", `${slug}.json`);

  if (!fs.existsSync(pagePath)) {
    throw new Error(`Arquivo nao encontrado: content/pages/${slug}.json`);
  }

  const page = JSON.parse(fs.readFileSync(pagePath, "utf8")) as ContentPage;
  const emptyFields = getEmptyFields(page);

  if (emptyFields.length === 0) {
    console.log(`Nenhum campo vazio para preencher em ${slug}.`);
    return;
  }

  const generatedContent = await generateJsonWithAI<GeneratedContent>({
    systemPrompt: buildSystemPrompt(),
    userPrompt: buildUserPrompt(page, emptyFields),
  });
  const normalizedContent = normalizeGeneratedContent(generatedContent);

  validateGeneratedContent(normalizedContent);

  for (const field of emptyFields) {
    page[field] = normalizedContent[field] as never;
  }

  fs.writeFileSync(pagePath, `${JSON.stringify(page, null, 2)}\n`);

  console.log(`Conteudo gerado para ${slug}: ${emptyFields.join(", ")}`);
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`ERROR: ${message}`);
  process.exit(1);
});
