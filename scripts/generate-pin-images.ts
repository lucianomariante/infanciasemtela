import { loadEnvConfig } from "@next/env";
import fs from "fs";
import path from "path";

import { getOpenAIClient } from "@/lib/ai";

type Pin = {
  cta?: string;
  image_path?: string;
  image_prompt: string;
  overlay_text: string;
  page_slug: string;
  page_url?: string;
  pin_description?: string;
  pin_keywords?: string[];
  pin_title?: string;
  visual_style?: string;
};

type Args = {
  force: boolean;
  limit: number | null;
};

const pinsDirectory = path.join(process.cwd(), "content", "pins");
const outputDirectory = path.join(process.cwd(), "public", "generated", "pins");
const publicOutputPrefix = "/generated/pins";
const imageSize = "1024x1536";
const imageQuality = "medium";

function parseArgs(argv: string[]): Args {
  const args: Args = {
    force: process.env.npm_config_force === "true",
    limit: null,
  };

  const envLimit = process.env.npm_config_limit;

  if (envLimit) {
    args.limit = parseLimit(envLimit);
  }

  for (const token of argv) {
    if (token === "--force") {
      args.force = true;
      continue;
    }

    if (token.startsWith("--limit=")) {
      args.limit = parseLimit(token.replace("--limit=", ""));
    }
  }

  return args;
}

function parseLimit(value: string) {
  const limit = Number.parseInt(value, 10);

  if (!Number.isFinite(limit) || limit < 1) {
    throw new Error("--limit precisa ser um numero inteiro maior que zero.");
  }

  return limit;
}

function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function getOutputFileName(pin: Pin, index: number) {
  return `${pin.page_slug}-pin-${index + 1}.png`;
}

function getPublicImagePath(fileName: string) {
  return `${publicOutputPrefix}/${fileName}`;
}

function getAbsoluteImagePath(fileName: string) {
  return path.join(outputDirectory, fileName);
}

function hasExistingImage(pin: Pin) {
  if (!pin.image_path) {
    return false;
  }

  const relativePath = pin.image_path.replace(/^\//, "");
  return fs.existsSync(path.join(process.cwd(), "public", relativePath));
}

function buildFinalPrompt(pin: Pin) {
  return [
    "Crie uma imagem vertical 2:3 para Pinterest.",
    `Use exatamente o tamanho visual de Pinterest vertical (${imageSize}).`,
    "Estilo infantil moderno, limpo, claro e amigavel para pais.",
    "Fundo claro com bastante respiro visual.",
    "Inclua elementos ludicos genericos como blocos, formas geometricas, quebra-cabecas, lapis e estrelas.",
    "Nao mostre rosto real de crianca.",
    "Nao use marcas, logos, embalagens ou nomes de produtos.",
    "Nao use imagem real de produto.",
    `Inclua texto grande, legivel e bem contrastado na imagem: "${pin.overlay_text}".`,
    "O texto deve ficar integrado ao layout, sem cobrir elementos importantes.",
    "",
    "Briefing original do pin:",
    pin.image_prompt,
    pin.visual_style ? `Estilo complementar: ${pin.visual_style}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

function readPins(filePath: string) {
  return JSON.parse(fs.readFileSync(filePath, "utf8")) as Pin[];
}

function writePins(filePath: string, pins: Pin[]) {
  fs.writeFileSync(filePath, `${JSON.stringify(pins, null, 2)}\n`, "utf8");
}

async function generateImage(pin: Pin) {
  const client = getOpenAIClient();
  const response = await client.images.generate({
    model: process.env.OPENAI_IMAGE_MODEL?.trim() || "gpt-image-1",
    prompt: buildFinalPrompt(pin),
    size: imageSize,
    quality: imageQuality,
    n: 1,
    output_format: "png",
  });

  const base64Image = response.data?.[0]?.b64_json;

  if (!base64Image) {
    throw new Error("A OpenAI nao retornou imagem em base64.");
  }

  return Buffer.from(base64Image, "base64");
}

async function main() {
  loadEnvConfig(process.cwd());

  const args = parseArgs(process.argv.slice(2));

  if (!fs.existsSync(pinsDirectory)) {
    throw new Error("Diretorio content/pins nao encontrado.");
  }

  if (!fs.existsSync(outputDirectory)) {
    fs.mkdirSync(outputDirectory, { recursive: true });
  }

  const files = fs
    .readdirSync(pinsDirectory)
    .filter((file) => file.endsWith(".json"))
    .sort((a, b) => a.localeCompare(b, "pt-BR"));

  let generatedCount = 0;

  for (const file of files) {
    const filePath = path.join(pinsDirectory, file);
    const pins = readPins(filePath);
    let changed = false;

    for (const [index, pin] of pins.entries()) {
      if (args.limit !== null && generatedCount >= args.limit) {
        break;
      }

      const existingImage = hasExistingImage(pin);

      if (existingImage && !args.force) {
        console.log(`Pulando imagem existente: ${pin.image_path}`);
        continue;
      }

      const fileName = getOutputFileName(pin, index);
      const absoluteImagePath = getAbsoluteImagePath(fileName);
      const publicImagePath = getPublicImagePath(fileName);

      if (fs.existsSync(absoluteImagePath) && pin.image_path && !args.force) {
        console.log(`Pulando imagem existente: ${publicImagePath}`);
        continue;
      }

      console.log(`Gerando imagem: ${publicImagePath}`);
      const imageBuffer = await generateImage(pin);
      fs.writeFileSync(absoluteImagePath, imageBuffer);

      pin.image_path = publicImagePath;
      changed = true;
      generatedCount += 1;

      if (args.limit === null || generatedCount < args.limit) {
        await sleep(2000);
      }
    }

    if (changed) {
      writePins(filePath, pins);
    }

    if (args.limit !== null && generatedCount >= args.limit) {
      break;
    }
  }

  console.log(`Imagens geradas: ${generatedCount}.`);
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`ERROR: ${message}`);
  process.exit(1);
});
