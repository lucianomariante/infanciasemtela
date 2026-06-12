import fs from "fs";
import path from "path";
import { productMedia } from "../data/product-media";

type ProductSource = {
  affiliate_url?: string;
  amazonUrl?: string;
  benefits?: string[];
  id: string;
  pros?: string[];
  title?: string;
};

type ContentPage = {
  h1?: string;
  product_ids?: string[];
  slug?: string;
  type?: "bestof" | "comparative" | "gift" | "guide";
};

type ProductUsage = {
  label: string;
  route: string;
};

const rootDirectory = process.cwd();
const productsPath = path.join(rootDirectory, "data", "products.json");
const pagesDirectory = path.join(rootDirectory, "content", "pages");

function readJson<T>(filePath: string): T {
  return JSON.parse(fs.readFileSync(filePath, "utf8")) as T;
}

function hasText(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function getPageRoute(page: ContentPage): string {
  const sections = {
    bestof: "melhores",
    comparative: "comparativos",
    gift: "presentes",
    guide: "guias",
  };
  const section = page.type ? sections[page.type] : "pagina";
  return `/${section}/${page.slug || "slug-ausente"}`;
}

function collectUsages(): {
  unknownReferences: string[];
  usagesByProduct: Map<string, ProductUsage[]>;
} {
  const usagesByProduct = new Map<string, ProductUsage[]>();
  const unknownReferences: string[] = [];

  if (!fs.existsSync(pagesDirectory)) {
    return { unknownReferences, usagesByProduct };
  }

  const files = fs
    .readdirSync(pagesDirectory)
    .filter((file) => file.endsWith(".json"));

  for (const file of files) {
    const page = readJson<ContentPage>(path.join(pagesDirectory, file));
    const usage = {
      label: page.h1 || page.slug || file,
      route: getPageRoute(page),
    };

    for (const productId of page.product_ids || []) {
      if (!hasText(productId)) {
        unknownReferences.push(`${file}: product_id vazio`);
        continue;
      }

      const currentUsages = usagesByProduct.get(productId) || [];
      currentUsages.push(usage);
      usagesByProduct.set(productId, currentUsages);
    }
  }

  return { unknownReferences, usagesByProduct };
}

function getLocalImagePath(imageUrl: string): string | null {
  if (!imageUrl.startsWith("/")) {
    return null;
  }

  const relativePath = imageUrl.replace(/^\/+/, "");
  return path.join(rootDirectory, "public", relativePath);
}

function main() {
  const products = readJson<ProductSource[]>(productsPath);
  const productsById = new Map(products.map((product) => [product.id, product]));
  const { unknownReferences, usagesByProduct } = collectUsages();
  let issueCount = 0;
  let completeCount = 0;

  console.log("Checklist de produtos");
  console.log("=====================");

  for (const product of products) {
    const media = productMedia[product.id as keyof typeof productMedia];
    const amazonUrl = product.amazonUrl || product.affiliate_url;
    const benefits = product.benefits || product.pros || [];
    const issues: string[] = [];

    if (!hasText(amazonUrl) || amazonUrl === "#") {
      issues.push("amazonUrl ausente ou vazio");
    }

    if (!hasText(media?.asin)) {
      issues.push("ASIN ausente");
    }

    if (!hasText(media?.imageUrl)) {
      issues.push("imageUrl ausente");
    }

    if (!hasText(media?.imageAlt)) {
      issues.push("imageAlt ausente");
    }

    if (!hasText(media?.ageRange)) {
      issues.push("ageRange ausente");
    }

    if (benefits.length === 0 || benefits.every((benefit) => !hasText(benefit))) {
      issues.push("benefits ausentes");
    }

    if (hasText(media?.imageUrl)) {
      const localImagePath = getLocalImagePath(media.imageUrl);

      if (localImagePath && !fs.existsSync(localImagePath)) {
        issues.push(`arquivo local nao existe: ${media.imageUrl}`);
      }

      if (!localImagePath && /^https?:\/\//i.test(media.imageUrl)) {
        issues.push("imageUrl externa: confirme permissao e next.config.ts");
      }
    }

    if (issues.length === 0) {
      completeCount += 1;
      continue;
    }

    issueCount += issues.length;
    const usages = usagesByProduct.get(product.id) || [];

    console.log("");
    console.log(`- ${product.title || "Produto sem titulo"} [${product.id}]`);
    console.log(
      `  Paginas: ${
        usages.length > 0
          ? usages.map((usage) => `${usage.label} (${usage.route})`).join("; ")
          : "nenhuma pagina encontrada"
      }`,
    );

    for (const issue of issues) {
      console.log(`  [pendente] ${issue}`);
    }
  }

  const unknownProductIds = [...usagesByProduct.keys()].filter(
    (productId) => !productsById.has(productId),
  );
  const orphanMediaIds = Object.keys(productMedia).filter(
    (productId) => !productsById.has(productId),
  );

  if (unknownReferences.length > 0 || unknownProductIds.length > 0) {
    console.log("");
    console.log("Referencias de pagina invalidas");

    for (const reference of unknownReferences) {
      issueCount += 1;
      console.log(`  [pendente] ${reference}`);
    }

    for (const productId of unknownProductIds) {
      issueCount += 1;
      console.log(`  [pendente] produto nao existe em products.json: ${productId}`);
    }
  }

  if (orphanMediaIds.length > 0) {
    console.log("");
    console.log("Cadastros de midia sem produto");

    for (const productId of orphanMediaIds) {
      issueCount += 1;
      console.log(`  [pendente] ${productId}`);
    }
  }

  console.log("");
  console.log("Resumo");
  console.log(`Produtos cadastrados: ${products.length}`);
  console.log(`Produtos completos: ${completeCount}`);
  console.log(`Pendencias encontradas: ${issueCount}`);
  console.log("");
  console.log("Checklist informativo: pendencias nao bloqueiam o build.");
}

try {
  main();
} catch (error) {
  const message = error instanceof Error ? error.message : "erro desconhecido";
  console.error(`ERROR: falha ao executar checklist (${message}).`);
  process.exitCode = 1;
}
