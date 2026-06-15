export type ProductMedia = {
  /**
   * ASIN do produto na Amazon, quando conhecido. Exemplo: "B0XXXXXXXX".
   */
  asin?: string;
  /**
   * Faixa etária indicada pelo fabricante. Exemplo: "3 a 5 anos".
   */
  ageRange?: string;
  /**
   * Sobrescreve o selo editorial de products.json somente quando necessário.
   */
  badge?: string;
  /**
   * Texto alternativo objetivo que descreve o produto da imagem.
   */
  imageAlt?: string;
  /**
   * Caminho local recomendado: "/images/products/nome-do-arquivo.webp".
   * Para URL externa, autorize primeiro o domínio em next.config.ts.
   */
  imageUrl?: string;
};

/**
 * Cadastro manual de imagens e metadados Amazon.
 *
 * 1. Salve imagens com uso autorizado em public/images/products/.
 * 2. Preencha imageUrl com o caminho iniciado por /images/products/.
 * 3. Preencha imageAlt descrevendo somente o que aparece na imagem.
 * 4. Preencha asin e ageRange quando essas informações forem confirmadas.
 * 5. Use badge apenas quando precisar sobrescrever o selo de products.json.
 * 6. Não altere os links afiliados aqui; eles continuam em products.json.
 */
export const productMedia = {
  "prod-laboratorio-show-da-luna": {
    asin: "",
    ageRange: "",
    badge: "",
    imageUrl: "",
    imageAlt: "",
  },
  "prod-mesinha-didatica": {
    asin: "",
    ageRange: "",
    badge: "",
    imageUrl: "",
    imageAlt: "",
  },
  "prod-girafa-didatica-mercotoys": {
    asin: "",
    ageRange: "",
    badge: "",
    imageUrl: "",
    imageAlt: "",
  },
  "prod-cubo-didatico-mercotoys": {
    asin: "",
    ageRange: "",
    badge: "",
    imageUrl: "",
    imageAlt: "",
  },
  "prod-box-block-dismat": {
    asin: "",
    ageRange: "",
    badge: "",
    imageUrl: "",
    imageAlt: "",
  },
  "prod-giro-magico-dismat": {
    asin: "",
    ageRange: "",
    badge: "",
    imageUrl: "",
    imageAlt: "",
  },
  "prod-fisher-price-torre-potinhos": {
    asin: "",
    ageRange: "",
    badge: "",
    imageUrl: "",
    imageAlt: "",
  },
  "prod-formas-magicas-babebi": {
    asin: "",
    ageRange: "",
    badge: "",
    imageUrl: "",
    imageAlt: "",
  },
  "prod-busy-board-montessori": {
    asin: "",
    ageRange: "",
    badge: "",
    imageUrl: "",
    imageAlt: "",
  },
  "prod-brinquedo-sensorial-infantil": {
    asin: "",
    ageRange: "",
    badge: "",
    imageUrl: "",
    imageAlt: "",
  },
  "prod-quebra-cabeca-infantil": {
    asin: "",
    ageRange: "",
    badge: "",
    imageUrl: "",
    imageAlt: "",
  },
  "prod-jogo-encaixe-madeira": {
    asin: "",
    ageRange: "",
    badge: "",
    imageUrl: "",
    imageAlt: "",
  },
  "prod-lousa-magnetica-infantil": {
    asin: "",
    ageRange: "",
    badge: "",
    imageUrl: "",
    imageAlt: "",
  },
  "prod-pesca-magnetica": {
    asin: "",
    ageRange: "",
    badge: "",
    imageUrl: "",
    imageAlt: "",
  },
  "prod-brastoy-blocos-magneticos-108": {
    asin: "",
    ageRange: "",
    badge: "",
    imageUrl: "",
    imageAlt: "",
  },
} satisfies Record<string, ProductMedia>;
