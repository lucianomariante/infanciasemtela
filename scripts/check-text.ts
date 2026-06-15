import fs from "fs";
import path from "path";

type Finding = {
  location: string;
  suggestion: string;
  term: string;
};

const rootDirectory = process.cwd();
const pagesDirectory = path.join(rootDirectory, "content", "pages");
const productsPath = path.join(rootDirectory, "data", "products.json");

const replacements: Record<string, string> = {
  aceitacao: "aceitação",
  altissimo: "altíssimo",
  atencao: "atenção",
  avaliacao: "avaliação",
  avaliacoes: "avaliações",
  beneficio: "benefício",
  beneficios: "benefícios",
  classico: "clássico",
  comparacao: "comparação",
  concentracao: "concentração",
  construcao: "construção",
  construcoes: "construções",
  coordenacao: "coordenação",
  crianca: "criança",
  criancas: "crianças",
  decisao: "decisão",
  didatico: "didático",
  disponivel: "disponível",
  duvida: "dúvida",
  duvidas: "dúvidas",
  educacao: "educação",
  equilibrio: "equilíbrio",
  especifica: "específica",
  estimulacao: "estimulação",
  estimulo: "estímulo",
  etaria: "etária",
  facil: "fácil",
  familia: "família",
  familias: "famílias",
  gratis: "grátis",
  imaginacao: "imaginação",
  indicacao: "indicação",
  indicacoes: "indicações",
  inicio: "início",
  intencao: "intenção",
  logica: "lógica",
  ludico: "lúdico",
  magnetica: "magnética",
  magnetico: "magnético",
  magneticos: "magnéticos",
  manipulacao: "manipulação",
  media: "média",
  nao: "não",
  obvio: "óbvio",
  obvios: "óbvios",
  opcao: "opção",
  opcoes: "opções",
  organizacao: "organização",
  otimo: "ótimo",
  pagina: "página",
  paginas: "páginas",
  paciencia: "paciência",
  pecas: "peças",
  pedagogico: "pedagógico",
  percepcao: "percepção",
  plastico: "plástico",
  pratico: "prático",
  praticos: "práticos",
  preco: "preço",
  recomendacao: "recomendação",
  recomendacoes: "recomendações",
  reutilizavel: "reutilizável",
  raciocinio: "raciocínio",
  rapido: "rápido",
  selecao: "seleção",
  seguranca: "segurança",
  satisfacao: "satisfação",
  sugestoes: "sugestões",
  supervisao: "supervisão",
  tatil: "tátil",
  uteis: "úteis",
  util: "útil",
  usuarios: "usuários",
  vinculo: "vínculo",
  visao: "visão",
  voce: "você",
};

const suspectPattern = new RegExp(
  `\\b(${Object.keys(replacements).join("|")})\\b`,
  "giu",
);

function readJson<T>(filePath: string): T {
  return JSON.parse(fs.readFileSync(filePath, "utf8")) as T;
}

function findTerms(value: string, location: string, findings: Finding[]) {
  for (const match of value.matchAll(suspectPattern)) {
    const term = match[0].toLocaleLowerCase("pt-BR");
    findings.push({
      location,
      suggestion: replacements[term],
      term: match[0],
    });
  }
}

function collectStrings(
  value: unknown,
  location: string,
  findings: Finding[],
) {
  if (typeof value === "string") {
    findTerms(value, location, findings);
    return;
  }

  if (Array.isArray(value)) {
    value.forEach((item, index) =>
      collectStrings(item, `${location}[${index}]`, findings),
    );
    return;
  }

  if (value && typeof value === "object") {
    for (const [key, item] of Object.entries(value)) {
      collectStrings(item, `${location}.${key}`, findings);
    }
  }
}

function scanProducts(findings: Finding[]) {
  const products = readJson<Record<string, unknown>[]>(productsPath);
  const editorialFields = [
    "title",
    "price",
    "tag",
    "pros",
    "best_for",
    "short_description",
    "badge",
    "benefits",
    "bestFor",
    "description",
  ];

  products.forEach((product, index) => {
    for (const field of editorialFields) {
      collectStrings(
        product[field],
        `data/products.json[${index}].${field}`,
        findings,
      );
    }
  });
}

function scanContentPages(findings: Finding[]) {
  if (!fs.existsSync(pagesDirectory)) {
    return;
  }

  const editorialFields = [
    "title",
    "h1",
    "intro",
    "primary_keyword",
    "secondary_keywords",
    "page_goal",
    "recommended_blocks",
    "faq",
  ];

  for (const file of fs
    .readdirSync(pagesDirectory)
    .filter((name) => name.endsWith(".json"))) {
    const page = readJson<Record<string, unknown>>(
      path.join(pagesDirectory, file),
    );

    for (const field of editorialFields) {
      collectStrings(
        page[field],
        `content/pages/${file}.${field}`,
        findings,
      );
    }
  }
}

function getFilesRecursively(directory: string): string[] {
  if (!fs.existsSync(directory)) {
    return [];
  }

  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);
    return entry.isDirectory() ? getFilesRecursively(fullPath) : [fullPath];
  });
}

function sanitizeSource(source: string): string {
  return source
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/^\s*\/\/.*$/gm, "")
    .replace(/["'`]\/[^"'`\s]+["'`]/g, '""')
    .replace(/\b[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}\b/g, "");
}

function scanVisibleSource(findings: Finding[]) {
  const sourceFiles = [
    ...getFilesRecursively(path.join(rootDirectory, "app")),
    ...getFilesRecursively(path.join(rootDirectory, "components")),
    path.join(rootDirectory, "lib", "schema.ts"),
  ].filter((file) => file.endsWith(".tsx") || file.endsWith("schema.ts"));

  for (const file of sourceFiles) {
    const source = sanitizeSource(fs.readFileSync(file, "utf8"));
    const relativePath = path.relative(rootDirectory, file).replaceAll("\\", "/");

    source.split(/\r?\n/).forEach((line, index) => {
      findTerms(line, `${relativePath}:${index + 1}`, findings);
    });
  }
}

function main() {
  const findings: Finding[] = [];

  scanProducts(findings);
  scanContentPages(findings);
  scanVisibleSource(findings);

  console.log("Auditoria informativa de acentuação");
  console.log("===================================");

  if (findings.length === 0) {
    console.log("Nenhum termo comum sem acentuação foi encontrado.");
    return;
  }

  for (const finding of findings) {
    console.log(
      `- ${finding.location}: "${finding.term}" -> "${finding.suggestion}"`,
    );
  }

  console.log("");
  console.log(`Possíveis ocorrências: ${findings.length}`);
  console.log("O checklist é informativo e não bloqueia o build.");
}

try {
  main();
} catch (error) {
  const message = error instanceof Error ? error.message : "erro desconhecido";
  console.error(`ERROR: falha ao executar auditoria de texto (${message}).`);
  process.exitCode = 1;
}
