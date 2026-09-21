/**
 * Compõe pins do Pinterest (1000x1500) a partir de fundos SEM texto + títulos.
 *
 * Por que existe: modelos de imagem erram acento, traduzem o texto e mudam a
 * fonte a cada geração. Aqui o texto é desenhado por código, então o acento
 * sai sempre certo, a identidade visual é fixa e um mesmo fundo rende vários
 * pins (um por template/título).
 *
 * Fluxo:
 *   1. Gere fundos sem texto (ver content/pins/PROMPTS-FUNDOS.md) e salve em
 *      content/pins/backgrounds/.
 *   2. Descreva os pins em content/pins/queue.json.
 *   3. npm run compose:pins            -> grava public/pins/<id>.jpg
 *
 * Uso:
 *   npm run compose:pins -- --list      mostra plano (link, imagem, estado)
 *   npm run compose:pins -- --check     só valida a fila
 *   npm run compose:pins -- --sheet     gera painel de revisão em tmp/pins-sheet.png
 *   npm run compose:pins -- --id <id>   compõe só um pin
 *   npm run compose:pins -- --force     recompõe inclusive pins já agendados
 *   --queue <arquivo> --bg-dir <pasta> --out-dir <pasta>   caminhos alternativos
 *
 * Pins com "scheduled_at" preenchido ficam travados (a imagem já foi copiada
 * para o Metricool), a menos que se use --force.
 */
import fs from "fs";
import path from "path";
import { createCanvas, GlobalFonts, loadImage } from "@napi-rs/canvas";
import type { Image, SKRSContext2D } from "@napi-rs/canvas";

import { getPageBySlug, isPageIndexable } from "@/lib/content";
import { getPagePath } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";

const WIDTH = 1000;
const HEIGHT = 1500;
const BAND_HEIGHT = 400;
const JPEG_QUALITY = 88;

const COLORS = {
  cream: "#F6F0E4",
  creamSoft: "#FBF7EE",
  brown: "#4A2F22",
  petrol: "#1F5A57",
  terracotta: "#B65A3C",
  sand: "#F3D9A4",
} as const;

const BOARDS = [
  "Presentes de Natal sem Tela",
  "Brinquedos e Presentes sem Tela",
] as const;

const TEMPLATES = [
  "band-top",
  "band-bottom",
  "overlay-top",
  "card-center",
] as const;

type TemplateName = (typeof TEMPLATES)[number];

type QueuedPin = {
  id: string;
  page: string;
  background: string;
  template: TemplateName;
  title: string;
  subtitle?: string;
  /** 0 mantém o topo do fundo, 1 mantém a base. Padrão depende do template. */
  focus_y?: number;
  /** Posição vertical do cartão (0 a 1) no template card-center. */
  card_y?: number;
  brand?: boolean;
  pin_title: string;
  pin_description: string;
  board: string;
  scheduled_at?: string;
  metricool_id?: number;
};

const ROOT = process.cwd();
const DEFAULT_QUEUE = path.join(ROOT, "content", "pins", "queue.json");
const DEFAULT_BACKGROUNDS = path.join(ROOT, "content", "pins", "backgrounds");
const DEFAULT_OUT = path.join(ROOT, "public", "pins");
const SHEET_PATH = path.join(ROOT, "tmp", "pins-sheet.png");

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

function hasFlag(name: string): boolean {
  return process.argv.includes(`--${name}`);
}

function registerFonts(): void {
  const fontsDir = path.join(ROOT, "node_modules", "@fontsource");
  const fonts: Array<[string, string]> = [
    ["montserrat/files/montserrat-latin-800-normal.woff2", "PinSans800"],
    ["montserrat/files/montserrat-latin-700-normal.woff2", "PinSans700"],
    ["playfair-display/files/playfair-display-latin-700-normal.woff2", "PinSerif700"],
  ];

  for (const [file, alias] of fonts) {
    const fullPath = path.join(fontsDir, file);

    if (!fs.existsSync(fullPath) || !GlobalFonts.registerFromPath(fullPath, alias)) {
      throw new Error(
        `Fonte não encontrada: ${file}. Rode "npm install" para instalar @fontsource/montserrat e @fontsource/playfair-display.`,
      );
    }
  }
}

function setLetterSpacing(ctx: SKRSContext2D, pixels: number): void {
  (ctx as unknown as { letterSpacing: string }).letterSpacing = `${pixels}px`;
}

/* ------------------------------ texto ------------------------------ */

function wrapGreedy(ctx: SKRSContext2D, text: string, maxWidth: number): string[] {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;

    if (!current || ctx.measureText(candidate).width <= maxWidth) {
      current = candidate;
    } else {
      lines.push(current);
      current = word;
    }
  }

  if (current) {
    lines.push(current);
  }

  return lines;
}

/** Quebra em linhas de tamanho parecido (evita "TELA" sozinha na última linha). */
function wrapBalanced(ctx: SKRSContext2D, text: string, maxWidth: number): string[] {
  const greedy = wrapGreedy(ctx, text, maxWidth);

  if (greedy.length < 2) {
    return greedy;
  }

  let low = maxWidth * 0.5;
  let high = maxWidth;
  let best = greedy;

  for (let step = 0; step < 14; step += 1) {
    const middle = (low + high) / 2;
    const attempt = wrapGreedy(ctx, text, middle);

    if (attempt.length <= greedy.length) {
      best = attempt;
      high = middle;
    } else {
      low = middle;
    }
  }

  return best;
}

type Fit = { size: number; lines: string[]; fits: boolean };

function fitText(
  ctx: SKRSContext2D,
  text: string,
  family: string,
  box: { width: number; height: number },
  options: { maxSize: number; minSize: number; lineHeight: number; maxLines: number },
): Fit {
  for (let size = options.maxSize; size >= options.minSize; size -= 2) {
    ctx.font = `${size}px ${family}`;
    const lines = wrapBalanced(ctx, text, box.width);
    const widest = Math.max(...lines.map((line) => ctx.measureText(line).width));

    if (
      lines.length <= options.maxLines &&
      widest <= box.width &&
      lines.length * size * options.lineHeight <= box.height
    ) {
      return { size, lines, fits: true };
    }
  }

  ctx.font = `${options.minSize}px ${family}`;
  return {
    size: options.minSize,
    lines: wrapBalanced(ctx, text, box.width),
    fits: false,
  };
}

type TitleStyle = {
  family: string;
  upper: boolean;
  maxSize: number;
  lineHeight: number;
  titleColor: string;
  subtitleColor: string;
  shadow?: boolean;
  divider?: boolean;
};

type TitleLayout = {
  fit: Fit;
  lineHeight: number;
  titleHeight: number;
  subtitle?: string;
  subtitleSize: number;
  subtitleHeight: number;
  gap: number;
  total: number;
};

function layoutTitle(
  ctx: SKRSContext2D,
  pin: QueuedPin,
  style: TitleStyle,
  width: number,
  maxHeight: number,
): TitleLayout {
  const title = style.upper ? pin.title.toLocaleUpperCase("pt-BR") : pin.title;
  const subtitle = pin.subtitle?.toLocaleUpperCase("pt-BR");

  let subtitleSize = 0;
  let subtitleHeight = 0;

  if (subtitle) {
    setLetterSpacing(ctx, 4);
    subtitleSize = 32;

    while (subtitleSize > 20) {
      ctx.font = `${subtitleSize}px PinSans700`;

      if (ctx.measureText(subtitle).width <= width) {
        break;
      }

      subtitleSize -= 1;
    }

    setLetterSpacing(ctx, 0);
    subtitleHeight = Math.round(subtitleSize * 1.3);
  }

  const gap = subtitle ? (style.divider ? 62 : 34) : 0;
  const fit = fitText(
    ctx,
    title,
    style.family,
    { width, height: maxHeight - subtitleHeight - gap },
    { maxSize: style.maxSize, minSize: 40, lineHeight: style.lineHeight, maxLines: 3 },
  );
  const titleHeight = fit.lines.length * fit.size * style.lineHeight;

  return {
    fit,
    lineHeight: style.lineHeight,
    titleHeight,
    subtitle,
    subtitleSize,
    subtitleHeight,
    gap,
    total: titleHeight + gap + subtitleHeight,
  };
}

function paintTitle(
  ctx: SKRSContext2D,
  layout: TitleLayout,
  style: TitleStyle,
  centerX: number,
  top: number,
): void {
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = style.titleColor;

  if (style.shadow) {
    ctx.shadowColor = "rgba(0,0,0,0.38)";
    ctx.shadowBlur = 14;
    ctx.shadowOffsetY = 3;
  }

  ctx.font = `${layout.fit.size}px ${style.family}`;
  const lineStep = layout.fit.size * layout.lineHeight;

  layout.fit.lines.forEach((line, index) => {
    ctx.fillText(line, centerX, top + lineStep * (index + 0.5));
  });

  ctx.shadowColor = "transparent";
  ctx.shadowBlur = 0;
  ctx.shadowOffsetY = 0;

  if (!layout.subtitle) {
    return;
  }

  const subtitleTop = top + layout.titleHeight + layout.gap;

  if (style.divider) {
    ctx.fillStyle = COLORS.terracotta;
    ctx.fillRect(centerX - 34, top + layout.titleHeight + layout.gap / 2 - 2, 68, 4);
  }

  if (style.shadow) {
    ctx.shadowColor = "rgba(0,0,0,0.38)";
    ctx.shadowBlur = 10;
    ctx.shadowOffsetY = 2;
  }

  setLetterSpacing(ctx, 4);
  ctx.font = `${layout.subtitleSize}px PinSans700`;
  ctx.fillStyle = style.subtitleColor;
  // O espaçamento entre letras deixa uma sobra à direita: compensa no centro.
  ctx.fillText(layout.subtitle, centerX + 2, subtitleTop + layout.subtitleHeight / 2);
  setLetterSpacing(ctx, 0);

  ctx.shadowColor = "transparent";
  ctx.shadowBlur = 0;
  ctx.shadowOffsetY = 0;
}

/* ----------------------------- desenho ----------------------------- */

function coverImage(
  ctx: SKRSContext2D,
  image: Image,
  area: { x: number; y: number; width: number; height: number },
  focusY: number,
  warnings: string[],
): void {
  const scale = Math.max(area.width / image.width, area.height / image.height);

  if (scale > 1.7) {
    warnings.push(
      `fundo pequeno (${image.width}x${image.height}) ampliado ${scale.toFixed(1)}x; a imagem pode ficar borrada`,
    );
  }

  const sourceWidth = area.width / scale;
  const sourceHeight = area.height / scale;
  const sourceX = (image.width - sourceWidth) / 2;
  const sourceY = (image.height - sourceHeight) * Math.min(1, Math.max(0, focusY));

  ctx.drawImage(
    image,
    sourceX,
    sourceY,
    sourceWidth,
    sourceHeight,
    area.x,
    area.y,
    area.width,
    area.height,
  );
}

function roundedRect(
  ctx: SKRSContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
): void {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + width, y, x + width, y + height, radius);
  ctx.arcTo(x + width, y + height, x, y + height, radius);
  ctx.arcTo(x, y + height, x, y, radius);
  ctx.arcTo(x, y, x + width, y, radius);
  ctx.closePath();
}

function drawBrand(ctx: SKRSContext2D, position: "top" | "bottom"): void {
  const label = "INFÂNCIA SEM TELA";
  setLetterSpacing(ctx, 3);
  ctx.font = "22px PinSans700";
  const textWidth = ctx.measureText(label).width;
  const pillWidth = textWidth + 60;
  const pillHeight = 50;
  const x = (WIDTH - pillWidth) / 2;
  const y = position === "bottom" ? HEIGHT - 44 - pillHeight : 44;

  ctx.fillStyle = "rgba(246,240,228,0.93)";
  roundedRect(ctx, x, y, pillWidth, pillHeight, pillHeight / 2);
  ctx.fill();

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = COLORS.petrol;
  ctx.fillText(label, WIDTH / 2 + 1.5, y + pillHeight / 2 + 1);
  setLetterSpacing(ctx, 0);
}

type LayoutContext = { ctx: SKRSContext2D; image: Image; pin: QueuedPin; warnings: string[] };

function layoutBand(layout: LayoutContext, position: "top" | "bottom"): void {
  const { ctx, image, pin, warnings } = layout;
  const imageArea =
    position === "top"
      ? { x: 0, y: BAND_HEIGHT, width: WIDTH, height: HEIGHT - BAND_HEIGHT }
      : { x: 0, y: 0, width: WIDTH, height: HEIGHT - BAND_HEIGHT };
  const bandTop = position === "top" ? 0 : HEIGHT - BAND_HEIGHT;
  const style: TitleStyle =
    position === "top"
      ? {
          family: "PinSans800",
          upper: true,
          maxSize: 92,
          lineHeight: 1.1,
          titleColor: COLORS.brown,
          subtitleColor: COLORS.petrol,
        }
      : {
          family: "PinSerif700",
          upper: false,
          maxSize: 100,
          lineHeight: 1.12,
          titleColor: COLORS.brown,
          subtitleColor: COLORS.petrol,
        };

  ctx.fillStyle = COLORS.cream;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  coverImage(ctx, image, imageArea, pin.focus_y ?? 1, warnings);
  ctx.fillStyle = COLORS.cream;
  ctx.fillRect(0, bandTop, WIDTH, BAND_HEIGHT);

  const padding = 56;
  const titleLayout = layoutTitle(ctx, pin, style, WIDTH - 130, BAND_HEIGHT - padding * 2);

  if (!titleLayout.fit.fits) {
    warnings.push("título não coube na faixa; reduza o texto");
  }

  paintTitle(
    ctx,
    titleLayout,
    style,
    WIDTH / 2,
    bandTop + (BAND_HEIGHT - titleLayout.total) / 2,
  );
}

function layoutOverlayTop(layout: LayoutContext): void {
  const { ctx, image, pin, warnings } = layout;
  const style: TitleStyle = {
    family: "PinSans800",
    upper: true,
    maxSize: 90,
    lineHeight: 1.1,
    titleColor: COLORS.creamSoft,
    subtitleColor: COLORS.sand,
    shadow: true,
  };

  coverImage(ctx, image, { x: 0, y: 0, width: WIDTH, height: HEIGHT }, pin.focus_y ?? 0.5, warnings);

  const scrimHeight = HEIGHT * 0.56;
  const scrim = ctx.createLinearGradient(0, 0, 0, scrimHeight);
  scrim.addColorStop(0, "rgba(34,22,14,0.70)");
  scrim.addColorStop(0.6, "rgba(34,22,14,0.34)");
  scrim.addColorStop(1, "rgba(34,22,14,0)");
  ctx.fillStyle = scrim;
  ctx.fillRect(0, 0, WIDTH, scrimHeight);

  const region = { top: 110, height: 350 };
  const titleLayout = layoutTitle(ctx, pin, style, WIDTH - 140, region.height);

  if (!titleLayout.fit.fits) {
    warnings.push("título não coube na área do topo; reduza o texto");
  }

  paintTitle(
    ctx,
    titleLayout,
    style,
    WIDTH / 2,
    region.top + (region.height - titleLayout.total) / 2,
  );
}

function layoutCardCenter(layout: LayoutContext): void {
  const { ctx, image, pin, warnings } = layout;
  const style: TitleStyle = {
    family: "PinSerif700",
    upper: false,
    maxSize: 88,
    lineHeight: 1.12,
    titleColor: COLORS.brown,
    subtitleColor: COLORS.petrol,
    divider: true,
  };

  coverImage(ctx, image, { x: 0, y: 0, width: WIDTH, height: HEIGHT }, pin.focus_y ?? 0.5, warnings);

  const cardWidth = 860;
  const padX = 62;
  const padY = 62;
  const titleLayout = layoutTitle(ctx, pin, style, cardWidth - padX * 2, 330);

  if (!titleLayout.fit.fits) {
    warnings.push("título não coube no cartão; reduza o texto");
  }

  const cardHeight = padY * 2 + titleLayout.total;
  const cardX = (WIDTH - cardWidth) / 2;
  const cardTop = Math.round(HEIGHT * (pin.card_y ?? 0.34) - cardHeight / 2);

  ctx.shadowColor = "rgba(30,20,12,0.32)";
  ctx.shadowBlur = 44;
  ctx.shadowOffsetY = 14;
  ctx.fillStyle = "rgba(251,247,238,0.95)";
  roundedRect(ctx, cardX, cardTop, cardWidth, cardHeight, 30);
  ctx.fill();
  ctx.shadowColor = "transparent";
  ctx.shadowBlur = 0;
  ctx.shadowOffsetY = 0;

  paintTitle(ctx, titleLayout, style, WIDTH / 2, cardTop + padY);
}

function renderPin(pin: QueuedPin, image: Image): { buffer: Buffer; warnings: string[] } {
  const canvas = createCanvas(WIDTH, HEIGHT);
  const ctx = canvas.getContext("2d");
  const warnings: string[] = [];
  const layout: LayoutContext = { ctx, image, pin, warnings };

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  switch (pin.template) {
    case "band-top":
      layoutBand(layout, "top");
      break;
    case "band-bottom":
      layoutBand(layout, "bottom");
      break;
    case "overlay-top":
      layoutOverlayTop(layout);
      break;
    case "card-center":
      layoutCardCenter(layout);
      break;
  }

  if (pin.brand !== false) {
    drawBrand(ctx, pin.template === "band-bottom" ? "top" : "bottom");
  }

  return { buffer: canvas.toBuffer("image/jpeg", JPEG_QUALITY), warnings };
}

/* ---------------------------- validação ---------------------------- */

type Issues = { errors: string[]; warnings: string[] };

function validatePins(queue: QueuedPin[], backgroundsDir: string): Map<string, Issues> {
  const result = new Map<string, Issues>();
  const seenIds = new Set<string>();
  const seenTitles = new Map<string, string>();

  for (const pin of queue) {
    const errors: string[] = [];
    const warnings: string[] = [];

    if (!/^[a-z0-9-]+$/.test(pin.id ?? "")) {
      errors.push("id deve usar só letras minúsculas, números e hífen");
    }

    if (seenIds.has(pin.id)) {
      errors.push("id repetido");
    }

    seenIds.add(pin.id);

    if (!TEMPLATES.includes(pin.template)) {
      errors.push(`template inválido (use ${TEMPLATES.join(", ")})`);
    }

    const page = getPageBySlug(pin.page);

    if (!page) {
      errors.push(`página "${pin.page}" não existe em content/pages`);
    } else if (!isPageIndexable(page)) {
      warnings.push("página está como noindex; o pin levaria tráfego para uma página fora do Google");
    }

    if (!pin.title?.trim()) {
      errors.push("título vazio");
    } else if (pin.title.length > 70) {
      errors.push(`título com ${pin.title.length} caracteres (máximo 70)`);
    }

    if (pin.subtitle && pin.subtitle.length > 45) {
      errors.push(`subtítulo com ${pin.subtitle.length} caracteres (máximo 45)`);
    }

    if (!pin.pin_title?.trim() || pin.pin_title.length > 100) {
      errors.push("pin_title deve ter de 1 a 100 caracteres");
    }

    if (!pin.pin_description?.trim() || pin.pin_description.length > 500) {
      errors.push("pin_description deve ter de 1 a 500 caracteres");
    } else if (pin.pin_description.length < 60) {
      warnings.push("pin_description curta; descrições de 100 a 300 caracteres rendem mais na busca");
    }

    if (!(BOARDS as readonly string[]).includes(pin.board)) {
      warnings.push(`board "${pin.board}" não está na lista conhecida; crie no Pinterest antes de agendar`);
    }

    const previous = seenTitles.get(pin.pin_title);

    if (previous) {
      warnings.push(`pin_title igual ao do pin "${previous}"`);
    }

    seenTitles.set(pin.pin_title, pin.id);

    if (!fs.existsSync(path.join(backgroundsDir, pin.background))) {
      warnings.push(`falta o fundo ${pin.background}`);
    }

    result.set(pin.id, { errors, warnings });
  }

  return result;
}

/* ------------------------------ painel ----------------------------- */

async function writeSheet(queue: QueuedPin[], outDir: string): Promise<void> {
  const ready = queue.filter((pin) => fs.existsSync(path.join(outDir, `${pin.id}.jpg`)));

  if (ready.length === 0) {
    console.log("Painel: nenhuma imagem composta ainda.");
    return;
  }

  const columns = 6;
  const thumbWidth = 220;
  const thumbHeight = 330;
  const gap = 14;
  const labelHeight = 26;
  const rows = Math.ceil(ready.length / columns);
  const sheet = createCanvas(
    columns * (thumbWidth + gap) + gap,
    rows * (thumbHeight + labelHeight + gap) + gap,
  );
  const ctx = sheet.getContext("2d");

  ctx.fillStyle = "#2A2420";
  ctx.fillRect(0, 0, sheet.width, sheet.height);
  ctx.imageSmoothingQuality = "high";

  for (let index = 0; index < ready.length; index += 1) {
    const pin = ready[index];
    const image = await loadImage(path.join(outDir, `${pin.id}.jpg`));
    const x = gap + (index % columns) * (thumbWidth + gap);
    const y = gap + Math.floor(index / columns) * (thumbHeight + labelHeight + gap);

    ctx.drawImage(image, x, y, thumbWidth, thumbHeight);
    ctx.fillStyle = "#EDE3D2";
    ctx.font = "13px PinSans700";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillText(pin.id, x, y + thumbHeight + labelHeight / 2);
  }

  fs.mkdirSync(path.dirname(SHEET_PATH), { recursive: true });
  fs.writeFileSync(SHEET_PATH, sheet.toBuffer("image/png"));
  console.log(`Painel de revisão: ${path.relative(ROOT, SHEET_PATH)} (${ready.length} pins)`);
}

/* ------------------------------ principal -------------------------- */

async function main(): Promise<void> {
  const queuePath = getArg("queue") ?? DEFAULT_QUEUE;
  const backgroundsDir = getArg("bg-dir") ?? DEFAULT_BACKGROUNDS;
  const outDir = getArg("out-dir") ?? DEFAULT_OUT;
  const onlyId = getArg("id");
  const force = hasFlag("force");

  if (!fs.existsSync(queuePath)) {
    throw new Error(`Fila não encontrada: ${queuePath}`);
  }

  const queue = JSON.parse(fs.readFileSync(queuePath, "utf8")) as QueuedPin[];
  const issues = validatePins(queue, backgroundsDir);

  if (hasFlag("list")) {
    console.table(
      queue.map((pin) => {
        const page = getPageBySlug(pin.page);
        const composed = fs.existsSync(path.join(outDir, `${pin.id}.jpg`));
        const status = pin.scheduled_at
          ? `agendado ${pin.scheduled_at}`
          : composed
            ? "imagem pronta"
            : fs.existsSync(path.join(backgroundsDir, pin.background))
              ? "pronto para compor"
              : "falta fundo";

        return {
          id: pin.id,
          estado: status,
          board: pin.board,
          link: page ? `${SITE_URL}${getPagePath(page)}` : "(página inexistente)",
        };
      }),
    );
    return;
  }

  let errorCount = 0;

  for (const pin of queue) {
    const found = issues.get(pin.id);

    for (const error of found?.errors ?? []) {
      errorCount += 1;
      console.log(`✗ ${pin.id}: ${error}`);
    }
  }

  if (hasFlag("check")) {
    for (const pin of queue) {
      for (const warning of issues.get(pin.id)?.warnings ?? []) {
        console.log(`! ${pin.id}: ${warning}`);
      }
    }

    console.log(`\nFila: ${queue.length} pins, ${errorCount} erro(s).`);
    process.exitCode = errorCount > 0 ? 1 : 0;
    return;
  }

  registerFonts();
  fs.mkdirSync(outDir, { recursive: true });

  let composed = 0;
  let locked = 0;
  let missing = 0;

  for (const pin of queue) {
    if (onlyId && pin.id !== onlyId) {
      continue;
    }

    if ((issues.get(pin.id)?.errors.length ?? 0) > 0) {
      continue;
    }

    if (pin.scheduled_at && !force) {
      locked += 1;
      continue;
    }

    const backgroundPath = path.join(backgroundsDir, pin.background);

    if (!fs.existsSync(backgroundPath)) {
      missing += 1;
      continue;
    }

    const image = await loadImage(backgroundPath);
    const { buffer, warnings } = renderPin(pin, image);

    fs.writeFileSync(path.join(outDir, `${pin.id}.jpg`), buffer);
    composed += 1;
    console.log(`✓ ${pin.id} (${Math.round(buffer.length / 1024)} KB)`);

    for (const warning of warnings) {
      console.log(`  ! ${warning}`);
    }
  }

  console.log(
    `\nCompostos: ${composed} · travados (já agendados): ${locked} · sem fundo: ${missing} · erros: ${errorCount}`,
  );

  if (hasFlag("sheet")) {
    await writeSheet(queue, outDir);
  }

  process.exitCode = errorCount > 0 ? 1 : 0;
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
