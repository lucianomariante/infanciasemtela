export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "") ||
  "https://infanciasemtela.massacriativa.com.br";

export const SITE_NAME = "Infância Sem Tela";

export const SITE_DESCRIPTION =
  "Guias práticos para escolher brinquedos, presentes e ideias sem tela para crianças.";

export const EDITORIAL_AUTHOR = {
  name: "Ana Maria Mariante",
  role: "Psicopedagoga",
  url: `${SITE_URL}/autores/ana-maria-mariante`,
} as const;
