import { loadEnvConfig } from "@next/env";
import { generateJsonWithAI, getOpenAIModel } from "@/lib/ai";

type TestAIResponse = {
  faq: {
    answer: string;
    question: string;
  }[];
  intro: string;
};

async function main() {
  loadEnvConfig(process.cwd());

  const result = await generateJsonWithAI<TestAIResponse>({
    systemPrompt:
      "Voce gera respostas de teste para validar integracao com IA.",
    userPrompt:
      "Responda com um JSON simples neste formato: " +
      '{"intro":"texto curto","faq":[{"question":"pergunta","answer":"resposta"}]}.',
  });

  console.log(`Modelo: ${getOpenAIModel()}`);
  console.log(JSON.stringify(result, null, 2));
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`ERROR: ${message}`);
  process.exit(1);
});
