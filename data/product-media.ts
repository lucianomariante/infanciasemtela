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
    asin: "B0BXFQMJPM",
    ageRange: "5 anos ou mais",
    badge: "Criatividade",
    imageUrl: "/images/products/laboratorio-criativo-luna.webp",
    imageAlt:
      "Laboratório Criativo Show da Luna kit de experiências científicas para crianças",
  },
  "prod-mesinha-didatica": {
    asin: "B089DNCHBY",
    ageRange: "2 a 5 anos",
    badge: "Coordenação",
    imageUrl: "/images/products/mesinha-didatica-infantil-atividades.webp",
    imageAlt:
      "Mesinha didática infantil com atividades e peças coloridas para crianças pequenas",
  },
  "prod-girafa-didatica-mercotoys": {
    asin: "B07FKG4DKG",
    ageRange: "2 a 5 anos",
    badge: "Coordenação",
    imageUrl: "/images/products/girafa-didatica-mercotoys.webp",
    imageAlt:
      "Girafa didática Mercotoys brinquedo educativo com atividades para crianças pequenas",
  },
  "prod-cubo-didatico-mercotoys": {
    asin: "B07CSD9XHZ",
    ageRange: "2 a 5 anos",
    badge: "Encaixe",
    imageUrl: "/images/products/mercotoys-cubo-didatico-educativo.webp",
    imageAlt:
      "Cubo didático educativo Mercotoys com formas e atividades para crianças pequenas",
  },
  "prod-box-block-dismat": {
    asin: "B07FK2ST8Z",
    ageRange: "3 a 5 anos",
    badge: "Criatividade",
    imageUrl: "/images/products/box-block-dismat-brinquedo-montar.webp",
    imageAlt: "Box Block Dismat brinquedo de montar colorido para crianças",
  },
  "prod-giro-magico-dismat": {
    asin: "B07RRXQJYN",
    ageRange: "12 meses a 8 anos",
    badge: "Coordenação",
    imageUrl: "/images/products/giro-magico-dismat-viva-brincar.png",
    imageAlt:
      "Giro Mágico Infantil Dismat com engrenagens coloridas para estimular coordenação motora",
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
