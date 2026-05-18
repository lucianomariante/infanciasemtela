import OpenAI from "openai";

export const DEFAULT_OPENAI_MODEL = "gpt-5-nano";

export type GenerateJsonWithAIParams = {
  systemPrompt: string;
  userPrompt: string;
};

let cachedClient: OpenAI | null = null;

export function getOpenAIClient() {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error(
      "OPENAI_API_KEY nao configurada. Defina a chave em .env.local no servidor.",
    );
  }

  if (!cachedClient) {
    cachedClient = new OpenAI({ apiKey });
  }

  return cachedClient;
}

export function getOpenAIModel() {
  return process.env.OPENAI_MODEL?.trim() || DEFAULT_OPENAI_MODEL;
}

function extractTextNodes(value: unknown): string[] {
  if (typeof value === "string") {
    return [value];
  }

  if (Array.isArray(value)) {
    return value.flatMap(extractTextNodes);
  }

  if (!value || typeof value !== "object") {
    return [];
  }

  const record = value as Record<string, unknown>;
  const texts: string[] = [];

  if (typeof record.output_text === "string") {
    texts.push(record.output_text);
  }

  if (typeof record.text === "string") {
    texts.push(record.text);
  }

  if (Array.isArray(record.content)) {
    texts.push(...record.content.flatMap(extractTextNodes));
  }

  if (Array.isArray(record.output)) {
    texts.push(...record.output.flatMap(extractTextNodes));
  }

  return texts;
}

function stripMarkdownFences(value: string) {
  return value.replace(/```(?:json)?|```/gi, "").trim();
}

function extractBalancedJsonCandidate(rawText: string) {
  const startIndexes = [rawText.indexOf("{"), rawText.indexOf("[")].filter(
    (index) => index >= 0,
  );

  if (startIndexes.length === 0) {
    return null;
  }

  const start = Math.min(...startIndexes);
  const opening = rawText[start];
  const closing = opening === "{" ? "}" : "]";
  let depth = 0;
  let inString = false;
  let escaping = false;

  for (let index = start; index < rawText.length; index += 1) {
    const char = rawText[index];

    if (escaping) {
      escaping = false;
      continue;
    }

    if (char === "\\") {
      escaping = true;
      continue;
    }

    if (char === '"') {
      inString = !inString;
      continue;
    }

    if (inString) {
      continue;
    }

    if (char === opening) {
      depth += 1;
    } else if (char === closing) {
      depth -= 1;

      if (depth === 0) {
        return rawText.slice(start, index + 1);
      }
    }
  }

  return null;
}

function parseJsonFromText<T>(rawText: string): T {
  const cleanedText = stripMarkdownFences(rawText);
  const candidates = [
    cleanedText,
    extractBalancedJsonCandidate(cleanedText),
  ].filter((candidate): candidate is string => Boolean(candidate));

  for (const candidate of candidates) {
    try {
      return JSON.parse(candidate) as T;
    } catch {
      // Try the next extraction strategy.
    }
  }

  throw new Error(
    "Nao foi possivel interpretar a resposta da OpenAI como JSON valido.",
  );
}

export async function generateJsonWithAI<T>({
  systemPrompt,
  userPrompt,
}: GenerateJsonWithAIParams): Promise<T> {
  const client = getOpenAIClient();

  const response = await client.responses.create({
    model: getOpenAIModel(),
    input: [
      {
        role: "system",
        content:
          `${systemPrompt.trim()}\n\n` +
          "Responda apenas com JSON puro e valido. " +
          "Nao use markdown, comentarios, explicacoes ou texto fora do JSON.",
      },
      {
        role: "user",
        content: userPrompt,
      },
    ],
    store: false,
  });

  const rawText = extractTextNodes(response).join("\n").trim();

  if (!rawText) {
    throw new Error("A resposta da OpenAI veio vazia.");
  }

  return parseJsonFromText<T>(rawText);
}
