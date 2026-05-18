import fs from "fs";
import path from "path";

type PageType = "bestof" | "gift" | "guide" | "comparative";

type FAQItem = {
  answer: string;
  question: string;
};

type ContentPage = {
  faq: FAQItem[];
  h1: string;
  internal_links: string[];
  intro: string;
  product_ids: string[];
  slug: string;
  title: string;
  type: PageType;
};

type Product = {
  id: string;
};

const allowedTypes = new Set<PageType>([
  "bestof",
  "gift",
  "guide",
  "comparative",
]);

const pagesDirectory = path.join(process.cwd(), "content", "pages");
const productsPath = path.join(process.cwd(), "data", "products.json");

const products = JSON.parse(
  fs.readFileSync(productsPath, "utf8"),
) as Product[];

const productIds = new Set(products.map((product) => product.id));

let totalPages = 0;
let errorCount = 0;
let warningCount = 0;

function addError(message: string) {
  errorCount += 1;
  console.error(`ERROR: ${message}`);
}

function addWarning(message: string) {
  warningCount += 1;
  console.warn(`WARNING: ${message}`);
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function validatePage(page: unknown, fileName: string) {
  if (!page || typeof page !== "object" || Array.isArray(page)) {
    addError(`${fileName}: conteudo invalido, esperado objeto JSON.`);
    return;
  }

  const record = page as Record<string, unknown>;
  const requiredFields = [
    "slug",
    "type",
    "title",
    "h1",
    "intro",
    "product_ids",
    "faq",
    "internal_links",
  ];

  for (const field of requiredFields) {
    if (!(field in record)) {
      addError(`${fileName}: campo obrigatorio ausente: ${field}.`);
    }
  }

  if (!isNonEmptyString(record.slug)) {
    addError(`${fileName}: slug invalido.`);
  }

  if (!isNonEmptyString(record.title)) {
    addError(`${fileName}: title invalido.`);
  }

  if (!isNonEmptyString(record.h1)) {
    addError(`${fileName}: h1 invalido.`);
  }

  if (!isNonEmptyString(record.intro)) {
    addError(`${fileName}: intro invalido.`);
  }

  if (
    !isNonEmptyString(record.type) ||
    !allowedTypes.has(record.type as PageType)
  ) {
    addError(`${fileName}: type invalido.`);
  }

  if (!Array.isArray(record.product_ids)) {
    addError(`${fileName}: product_ids precisa ser array.`);
  } else {
    for (const productId of record.product_ids) {
      if (!isNonEmptyString(productId)) {
        addError(`${fileName}: product_id invalido.`);
        continue;
      }

      if (!productIds.has(productId)) {
        addWarning(
          `${fileName}: product_id nao encontrado em data/products.json: ${productId}.`,
        );
      }
    }
  }

  if (!Array.isArray(record.faq)) {
    addError(`${fileName}: faq precisa ser array.`);
  } else {
    for (const [index, item] of record.faq.entries()) {
      if (!item || typeof item !== "object" || Array.isArray(item)) {
        addError(`${fileName}: faq[${index}] invalido.`);
        continue;
      }

      const faqItem = item as Record<string, unknown>;

      if (!isNonEmptyString(faqItem.question)) {
        addError(`${fileName}: faq[${index}].question invalido.`);
      }

      if (!isNonEmptyString(faqItem.answer)) {
        addError(`${fileName}: faq[${index}].answer invalido.`);
      }
    }
  }

  if (!Array.isArray(record.internal_links)) {
    addError(`${fileName}: internal_links precisa ser array.`);
  }
}

function main() {
  if (!fs.existsSync(pagesDirectory)) {
    addError("Diretorio content/pages nao encontrado.");
    printReport();
    process.exit(1);
  }

  const files = fs
    .readdirSync(pagesDirectory)
    .filter((file) => file.endsWith(".json"));

  for (const file of files) {
    totalPages += 1;
    const fullPath = path.join(pagesDirectory, file);

    try {
      const raw = fs.readFileSync(fullPath, "utf8");
      const page = JSON.parse(raw) as ContentPage;
      validatePage(page, file);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "erro desconhecido";
      addError(`${file}: falha ao ler ou parsear JSON (${message}).`);
    }
  }

  printReport();

  if (errorCount > 0) {
    process.exit(1);
  }
}

function printReport() {
  console.log("");
  console.log("Relatorio final");
  console.log(`Paginas verificadas: ${totalPages}`);
  console.log(`Erros: ${errorCount}`);
  console.log(`Warnings: ${warningCount}`);
}

main();
