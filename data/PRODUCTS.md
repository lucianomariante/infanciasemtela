# Cadastro manual de produtos

## Onde cada dado fica

- `data/products.json`: titulo, descricao, link afiliado, beneficios, selo e
  informacoes editoriais.
- `data/product-media.ts`: ASIN, imagem local, alt text, faixa etaria e
  sobrescrita opcional de selo.
- `public/images/products/`: arquivos locais das imagens autorizadas.
- `lib/products.ts`: normaliza os campos antigos e novos para os componentes.

Os links afiliados existentes ficam em `data/products.json`. Nao altere esses
links ao cadastrar imagem, ASIN ou faixa etaria.

## Fluxo atual sem API Amazon

1. Escolha manualmente o produto na Amazon.
2. Gere ou copie o link afiliado e cadastre-o em `data/products.json`.
3. Identifique o ASIN diretamente nas informacoes oficiais do produto.
4. Obtenha uma imagem com uso autorizado e salve-a em
   `public/images/products/`.
5. Use um nome de arquivo amigavel, por exemplo:
   `brinquedo-montessori-madeira-4-anos.webp`.
6. Preencha o registro correspondente em `data/product-media.ts`:
   - `asin`
   - `imageUrl`
   - `imageAlt`
   - `ageRange`
   - `badge`, somente se precisar sobrescrever o selo editorial
7. Confirme que o produto existe em `data/products.json` e que o ID e igual nos
   dois arquivos.
8. Rode o projeto com `npm run dev`.
9. Abra uma pagina que use o produto e valide o card com imagem.
10. Valide a mesma pagina em viewport mobile.

Exemplo de cadastro em `data/product-media.ts`:

```ts
{
  asin: "B0XXXXXXXX",
  imageUrl: "/images/products/brinquedo-montessori-madeira-4-anos.webp",
  imageAlt: "Brinquedo educativo de madeira para crianca de 4 anos",
  ageRange: "4 anos",
  badge: "Montessori",
}
```

O selo e os beneficios principais normalmente permanecem em
`data/products.json`:

```json
{
  "id": "prod-exemplo",
  "title": "Nome do produto",
  "description": "Descricao curta para o card.",
  "amazonUrl": "https://amzn.to/link-afiliado",
  "badge": "Coordenacao motora",
  "benefits": ["Beneficio curto", "Outro beneficio"],
  "bestFor": "perfil de crianca ou familia",
  "price": "campo interno opcional",
  "rating": 0,
  "reviews": 0
}
```

## Regras para imagens de produtos

- Use imagens proprias, autorizadas, fornecidas por parceiros ou com permissao
  clara de uso.
- Salve os arquivos em `public/images/products/`.
- Prefira o formato `.webp`.
- Use nomes descritivos e sem espacos.
- Nao use hotlink direto da Amazon.
- Nao faca scraping nem copie imagens automaticamente.
- Nao use uma imagem ficticia fingindo representar o produto real.
- Preencha um `imageAlt` curto, objetivo e fiel ao que aparece na imagem.
- Mantenha o arquivo leve e otimizado.
- Prefira fundo limpo e produto bem visivel.
- Para URLs externas autorizadas, configure o dominio explicitamente em
  `next.config.ts` antes de preencher `imageUrl`.

Quando `imageUrl` estiver vazio, o card mostra o fallback neutro:
`Imagem do produto em breve`.

## Compatibilidade de campos

Registros antigos continuam funcionando porque `lib/products.ts` converte:

- `affiliate_url` para `amazonUrl`
- `short_description` para `description`
- `tag` para `badge`
- `pros` para `benefits`
- `best_for` para `bestFor`

## Checklist de produtos incompletos

Rode:

```bash
npm run check:products
```

O comando lista:

- link Amazon ausente ou aparentemente vazio;
- ASIN ausente;
- `imageUrl` ausente;
- `imageAlt` ausente;
- faixa etaria ausente;
- beneficios ausentes;
- imagem local apontando para arquivo inexistente;
- produto usado em pagina mas ausente em `data/products.json`;
- cadastro de mídia sem produto correspondente.

O checklist e informativo e nao bloqueia o build por campos ainda incompletos.
