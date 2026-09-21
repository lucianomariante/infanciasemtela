/**
 * Gera os fundos SEM texto dos pins pela API de imagens da OpenAI, usando os
 * mesmos prompts de content/pins/PROMPTS-FUNDOS.md. Alternativa a gerar cada
 * cena à mão no Gemini.
 *
 * Saída: content/pins/backgrounds/<arquivo>.jpg (1024x1536, proporção 2:3).
 * Depois: npm run compose:pins -- --sheet
 *
 * Uso:
 *   npm run generate:backgrounds -- --dry                 lista o que seria gerado e o custo estimado
 *   npm run generate:backgrounds -- --only natal-presentes-kraft.jpg
 *   npm run generate:backgrounds                          gera todos os que ainda não existem
 *   --quality low|medium|high   (padrão: medium)
 *   --force                     regera mesmo que o arquivo exista
 *
 * Requer OPENAI_API_KEY em .env.local. Cada imagem é cobrada pela OpenAI.
 */
import { loadEnvConfig } from "@next/env";
import fs from "fs";
import path from "path";

import { getOpenAIClient } from "@/lib/ai";

type Quality = "low" | "medium" | "high";

const PROMPTS_FILE = path.join(process.cwd(), "content", "pins", "PROMPTS-FUNDOS.md");
const OUTPUT_DIR = path.join(process.cwd(), "content", "pins", "backgrounds");
const IMAGE_SIZE = "1024x1536";

// Valores aproximados por imagem 1024x1536 (US$); confirme no painel da OpenAI.
const ESTIMATED_COST: Record<Quality, number> = { low: 0.016, medium: 0.063, high: 0.25 };

type BackgroundPrompt = { file: string; prompt: string };

function getArg(name: string): string | undefined {
  const flag = `--${name}`;
  const index = process.argv.indexOf(flag);
  const next = index === -1 ? undefined : process.argv[index + 1];

  if (next && !next.startsWith("--")) {
    return next;
  }

  const withEquals = process.argv.find((arg) => arg.startsWith(`${flag}=`));
  return withEquals?.slice(flag.length + 1);
}

function parsePrompts(markdown: string): BackgroundPrompt[] {
  const pattern = /^### (\S+\.jpg)\s*\r?\n```\r?\n([\s\S]*?)\r?\n```/gm;
  const found: BackgroundPrompt[] = [];

  for (const match of markdown.matchAll(pattern)) {
    found.push({
      file: match[1],
      // A API gera 1024x1536 (2:3); o prompt do Gemini fala em 3:4.
      prompt: match[2].replace(/\s+/g, " ").replace(/vertical 3:4/g, "vertical 2:3").trim(),
    });
  }

  return found;
}

function parseQuality(): Quality {
  const value = getArg("quality") ?? "medium";

  if (value !== "low" && value !== "medium" && value !== "high") {
    throw new Error('--quality deve ser "low", "medium" ou "high".');
  }

  return value;
}

async function generate(prompt: string, quality: Quality): Promise<Buffer> {
  const client = getOpenAIClient();
  const response = await client.images.generate({
    model: process.env.OPENAI_IMAGE_MODEL?.trim() || "gpt-image-1",
    prompt,
    size: IMAGE_SIZE,
    quality,
    n: 1,
    output_format: "jpeg",
    output_compression: 92,
  });

  const base64Image = response.data?.[0]?.b64_json;

  if (!base64Image) {
    throw new Error("A OpenAI não retornou a imagem.");
  }

  return Buffer.from(base64Image, "base64");
}

async function main(): Promise<void> {
  loadEnvConfig(process.cwd());

  const quality = parseQuality();
  const only = getArg("only");
  const force = process.argv.includes("--force");
  const dry = process.argv.includes("--dry");

  const prompts = parsePrompts(fs.readFileSync(PROMPTS_FILE, "utf8"));

  if (prompts.length === 0) {
    throw new Error("Nenhum prompt encontrado em PROMPTS-FUNDOS.md.");
  }

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const pending = prompts.filter((item) => {
    if (only && item.file !== only) {
      return false;
    }

    return force || !fs.existsSync(path.join(OUTPUT_DIR, item.file));
  });

  const estimate = pending.length * ESTIMATED_COST[quality];
  console.log(
    `${pending.length} fundo(s) a gerar (${prompts.length - pending.length} já existem ou foram filtrados) · ` +
      `qualidade ${quality} · custo estimado ~US$ ${estimate.toFixed(2)}`,
  );

  if (dry) {
    for (const item of pending) {
      console.log(`  - ${item.file}`);
    }

    return;
  }

  let failures = 0;

  for (const item of pending) {
    try {
      const image = await generate(item.prompt, quality);
      fs.writeFileSync(path.join(OUTPUT_DIR, item.file), image);
      console.log(`✓ ${item.file} (${Math.round(image.length / 1024)} KB)`);
    } catch (error) {
      failures += 1;
      console.log(`✗ ${item.file}: ${error instanceof Error ? error.message : error}`);
    }
  }

  console.log(`\nGerados: ${pending.length - failures} · falhas: ${failures}`);
  process.exitCode = failures > 0 ? 1 : 0;
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
