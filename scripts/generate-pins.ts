import fs from "fs";
import path from "path";

type PageType = "bestof" | "gift" | "guide" | "comparative";

type ContentPage = {
  h1: string;
  intro: string;
  primary_keyword: string;
  slug: string;
  title: string;
  type: PageType;
};

type Pin = {
  cta: string;
  image_size: "1000x1500";
  image_prompt: string;
  overlay_text: string;
  page_slug: string;
  page_url: string;
  pin_description: string;
  pin_keywords: string[];
  pin_title: string;
  visual_style: string;
};

const pagesDirectory = path.join(process.cwd(), "content", "pages");
const pinsDirectory = path.join(process.cwd(), "content", "pins");

const typeToPathPrefix: Record<PageType, string> = {
  bestof: "/melhores",
  gift: "/presentes",
  guide: "/guias",
  comparative: "/comparativos",
};

function getPageUrl(page: ContentPage) {
  return `${typeToPathPrefix[page.type]}/${page.slug}`;
}

function normalizeWhitespace(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function buildKeywords(page: ContentPage, variant: string) {
  return [
    page.primary_keyword,
    page.h1,
    variant,
    "brinquedos educativos",
    "brincadeiras sem tela",
  ]
    .map(normalizeWhitespace)
    .filter(Boolean);
}

function buildImagePrompt(page: ContentPage, concept: string, overlayText: string) {
  return [
    `Pinterest vertical 2:3 sobre ${page.h1}.`,
    "Imagem 1000x1500, visual limpo, infantil e moderno.",
    "Fundo claro, elementos ludicos, cores suaves e boa area de respiro.",
    "Nao usar imagem de produto real, marca, embalagem ou logotipo.",
    `Tema visual: ${concept}.`,
    `Texto curto no overlay: \"${overlayText}\".`,
  ].join(" ");
}

function createPinsForPage(page: ContentPage): Pin[] {
  const pageUrl = getPageUrl(page);
  const intro = normalizeWhitespace(page.intro);

  return [
    {
      image_size: "1000x1500",
      page_slug: page.slug,
      page_url: pageUrl,
      pin_title: `${page.h1}: ideias para escolher melhor`,
      pin_description: `${intro} Veja opções para comparar antes de comprar.`,
      pin_keywords: buildKeywords(page, "ideias para escolher"),
      visual_style:
        "Pinterest vertical 2:3, visual limpo, infantil, moderno, fundo claro, elementos ludicos, sem produto real.",
      overlay_text: "Brinquedos que prendem atenção",
      image_prompt: buildImagePrompt(
        page,
        "brinquedos educativos genericos organizados em uma cena clara e acolhedora",
        "Brinquedos que prendem atenção",
      ),
      cta: "Ver ideias",
    },
    {
      image_size: "1000x1500",
      page_slug: page.slug,
      page_url: pageUrl,
      pin_title: `${page.title}: guia rápido`,
      pin_description: `Um resumo prático para quem procura ${page.primary_keyword} com foco em uso real, diversão e escolha consciente.`,
      pin_keywords: buildKeywords(page, "guia rapido"),
      visual_style:
        "Pinterest vertical 2:3, visual limpo, infantil, moderno, fundo claro, elementos ludicos, sem produto real.",
      overlay_text: "Presentes úteis por idade",
      image_prompt: buildImagePrompt(
        page,
        `composicao editorial com formas infantis, blocos, lapis e brinquedos genericos para ${page.primary_keyword}`,
        "Presentes úteis por idade",
      ),
      cta: "Comparar opções",
    },
    {
      image_size: "1000x1500",
      page_slug: page.slug,
      page_url: pageUrl,
      pin_title: `Como escolher ${page.primary_keyword}`,
      pin_description: `Critérios simples para decidir com mais segurança: idade, interesse da criança, proposta de brincadeira e custo-benefício.`,
      pin_keywords: buildKeywords(page, "como escolher"),
      visual_style:
        "Pinterest vertical 2:3, visual limpo, infantil, moderno, fundo claro, elementos ludicos, sem produto real.",
      overlay_text: "Ideias sem tela para crianças",
      image_prompt: buildImagePrompt(
        page,
        "mesa infantil clara com elementos ludicos genericos, formas geometricas, estrelas e icones de brincadeira sem tela",
        "Ideias sem tela para crianças",
      ),
      cta: "Ler guia",
    },
  ];
}

function readPage(filePath: string) {
  return JSON.parse(fs.readFileSync(filePath, "utf8")) as ContentPage;
}

function main() {
  if (!fs.existsSync(pagesDirectory)) {
    throw new Error("Diretorio content/pages nao encontrado.");
  }

  if (!fs.existsSync(pinsDirectory)) {
    fs.mkdirSync(pinsDirectory, { recursive: true });
  }

  const files = fs
    .readdirSync(pagesDirectory)
    .filter((file) => file.endsWith(".json"))
    .sort((a, b) => a.localeCompare(b, "pt-BR"));

  for (const file of files) {
    const page = readPage(path.join(pagesDirectory, file));
    const pins = createPinsForPage(page);
    const outputPath = path.join(pinsDirectory, `${page.slug}.json`);

    fs.writeFileSync(outputPath, `${JSON.stringify(pins, null, 2)}\n`, "utf8");
    console.log(`Pins gerados: ${page.slug} (${pins.length})`);
  }

  console.log(`Total de paginas processadas: ${files.length}.`);
}

main();
