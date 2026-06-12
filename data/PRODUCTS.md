# Cadastro de produtos

Os dados editoriais e links afiliados continuam em `data/products.json`.

Novos produtos podem usar os campos padronizados:

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

Os registros antigos ainda usam nomes legados e sao normalizados
automaticamente em `lib/products.ts`:

- `affiliate_url` vira `amazonUrl`
- `short_description` vira `description`
- `tag` vira `badge`
- `pros` vira `benefits`
- `best_for` vira `bestFor`

Imagens e metadados que serao preenchidos gradualmente ficam em
`data/product-media.ts`:

- `imageUrl`
- `imageAlt`
- `asin`
- `ageRange`

Para imagens locais, salve o arquivo em `public/images/products/` e use:

```ts
imageUrl: "/images/products/nome-do-produto.webp"
```

Nao altere o link afiliado ao cadastrar imagem ou ASIN.
