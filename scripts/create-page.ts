import fs from "fs";
import path from "path";

type PageType = "bestof" | "gift" | "guide" | "comparative";

type ContentPage = {
  faq: [];
  h1: string;
  internal_links: [];
  intro: string;
  page_goal: string;
  primary_keyword: string;
  product_ids: [];
  recommended_blocks: [];
  secondary_keywords: [];
  slug: string;
  title: string;
  type: PageType;
};

const allowedTypes = new Set<PageType>([
  "bestof",
  "gift",
  "guide",
  "comparative",
]);

const pagesDirectory = path.join(process.cwd(), "content", "pages");

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
    const key = rawKey;

    if (inlineValue && inlineValue.trim().length > 0) {
      args[key] = inlineValue;
      continue;
    }

    const value = argv[index + 1];

    if (!value || value.startsWith("--")) {
      console.error(`ERROR: argumento sem valor: --${key}`);
      process.exit(1);
    }

    args[key] = value;
    index += 1;
  }

  return args;
}

function getRequiredArg(args: Record<string, string>, key: string): string {
  const value = args[key] ?? process.env[`npm_config_${key}`];

  if (!value || value.trim().length === 0) {
    console.error(`ERROR: argumento obrigatorio ausente: --${key}`);
    process.exit(1);
  }

  return value.trim();
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const slug = getRequiredArg(args, "slug");
  const type = getRequiredArg(args, "type");
  const title = getRequiredArg(args, "title");
  const h1 = getRequiredArg(args, "h1");
  const intro = getRequiredArg(args, "intro");

  if (!allowedTypes.has(type as PageType)) {
    console.error("ERROR: type invalido. Use bestof, gift, guide ou comparative.");
    process.exit(1);
  }

  if (!fs.existsSync(pagesDirectory)) {
    fs.mkdirSync(pagesDirectory, { recursive: true });
  }

  const outputPath = path.join(pagesDirectory, `${slug}.json`);

  if (fs.existsSync(outputPath)) {
    console.error(`ERROR: arquivo ja existe para o slug "${slug}".`);
    process.exit(1);
  }

  const page: ContentPage = {
    slug,
    type: type as PageType,
    title,
    h1,
    intro,
    primary_keyword: title.toLocaleLowerCase("pt-BR"),
    secondary_keywords: [],
    page_goal: "",
    recommended_blocks: [],
    product_ids: [],
    faq: [],
    internal_links: [],
  };

  fs.writeFileSync(outputPath, `${JSON.stringify(page, null, 2)}\n`, "utf8");
  console.log(`Pagina criada: ${outputPath}`);
}

main();
