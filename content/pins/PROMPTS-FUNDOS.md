# Fundos para os pins (imagens SEM texto)

O título de cada pin é desenhado por código (`npm run compose:pins`), então o
acento sai sempre certo e a fonte é sempre a mesma. Aqui você gera só a **cena**.
Cada fundo abastece de 2 a 4 pins com títulos e layouts diferentes.

## Fluxo

1. Gere cada cena abaixo no **Gemini** (gemini.google.com, o mesmo caminho que
   funcionou nos pins anteriores). Não use o Flow nem o "Build" do AI Studio.
2. Confira: **nenhum texto, letra ou número na imagem**, formato vertical, sem
   marca, sem rosto. Se o Gemini escrever algo na imagem, gere de novo.
3. Salve como **JPG** em `content/pins/backgrounds/` com **exatamente** o nome
   indicado (ex.: `natal-presentes-kraft.jpg`).
4. Rode:

   ```bash
   npm run compose:pins -- --sheet
   ```

   Ele compõe todos os pins que já têm fundo e gera um painel de revisão em
   `tmp/pins-sheet.png`. Fundos que faltam são apenas ignorados.
5. Me avise. Eu reviso o painel, publico as imagens no site e agendo os pins.

Não precisa gerar os 14 de uma vez: cada fundo que chegar já libera seus pins.

## Ordem sugerida

Comece pelos de **Natal** (`natal-*`) e por `festa-dia-das-criancas`, que têm data.
Depois os demais.

## Regra de composição (vale para todos)

O título entra no **terço superior**. Por isso o assunto principal fica na
**metade inferior** e o terço de cima é uma área calma (mesa vazia, tapete, parede).

Trecho final que já vai colado em todos os prompts:

> Fotografia vertical 3:4, alta resolução, luz natural suave, estilo escandinavo
> minimalista, paleta creme, madeira clara, verde-sálvia e terracota. O assunto
> principal fica na metade inferior da imagem; o terço superior é uma área calma
> e vazia. NENHUM texto, letra, número, logotipo ou marca d'água na imagem. Sem
> marcas de produto, sem embalagens reais, sem rostos.

---

## Natal

### natal-presentes-kraft.jpg
```
Vista de cima de uma mesa de madeira clara com quatro presentes embrulhados em papel kraft e fita de algodão cru, blocos de madeira natural empilhados e um raminho de pinheiro, todos na metade inferior da imagem. Luz natural suave de manhã, sombras leves. Fotografia vertical 3:4, alta resolução, estilo escandinavo minimalista, paleta creme, madeira clara, verde-sálvia e terracota. O terço superior é uma área calma de mesa vazia. NENHUM texto, letra, número, logotipo ou marca d'água na imagem. Sem marcas de produto, sem embalagens reais, sem rostos.
```

### natal-arvore-tapete.jpg
```
Canto aconchegante de sala: um pinheirinho de Natal pequeno com luzes quentes, bem ao fundo e desfocado (bokeh), e no primeiro plano um tapete de lã bege com brinquedos de madeira (blocos, argolas de empilhar) e dois presentes em papel kraft, todos na metade inferior. Luz dourada de fim de tarde. Fotografia vertical 3:4, alta resolução, estilo escandinavo minimalista, paleta creme, madeira clara, verde escuro e âmbar. O terço superior é uma área calma e desfocada. NENHUM texto, letra, número, logotipo ou marca d'água na imagem. Sem marcas de produto, sem embalagens reais, sem rostos.
```

### natal-mesa-atividades.jpg
```
Vista de cima de uma mesa de madeira clara montada como cantinho de atividades: um quebra-cabeça de madeira parcialmente montado (ilustração simples e colorida, sem letras), blocos magnéticos coloridos, lápis de cor em um pote de cerâmica e folhas de papel, na metade inferior. Um raminho de pinheiro e uma fita vermelha discreta no canto inferior. Luz natural clara de manhã. Fotografia vertical 3:4, alta resolução, estilo escandinavo minimalista, paleta creme, madeira, azul-petróleo e terracota. O terço superior é uma área calma de mesa vazia. NENHUM texto, letra, número, logotipo ou marca d'água na imagem. Sem marcas de produto, sem embalagens reais, sem rostos.
```

### natal-encaixe-linho.jpg
```
Vista de cima sobre linho creme amassado: brinquedos de madeira natural para criança pequena (argolas de empilhar, peças grandes de encaixe, um carrinho simples de madeira) na metade inferior, com um raminho de pinheiro e uma fita vermelha discreta no canto. Luz natural difusa, sombras macias. Fotografia vertical 3:4, alta resolução, estilo escandinavo minimalista, paleta creme, madeira clara e verde-sálvia. O terço superior é uma área calma de linho liso. NENHUM texto, letra, número, logotipo ou marca d'água na imagem. Sem marcas de produto, sem embalagens reais, sem rostos.
```

### natal-maos-brincando.jpg
```
Close nas mãos de uma criança pequena encaixando argolas de madeira em um pino, sobre um tapete de lã bege, na metade inferior. Aparecem apenas as mãos e os braços, nenhum rosto. Ao fundo, bem desfocado, um pinheirinho de Natal com luzes quentes. Luz quente vinda de uma janela lateral, profundidade de campo rasa. Fotografia vertical 3:4, alta resolução, estilo escandinavo, paleta quente e aconchegante. O terço superior é uma área calma e desfocada. NENHUM texto, letra, número, logotipo ou marca d'água na imagem. Sem marcas de produto, sem rostos.
```

## Dia das Crianças

### festa-dia-das-criancas.jpg
```
Vista de cima de brinquedos de madeira natural e blocos coloridos organizados em círculo sobre um fundo creme liso, com bandeirinhas de papel coloridas e confete espalhados, clima de festa infantil, sem nada natalino. A composição fica concentrada na metade inferior. Luz natural clara e uniforme. Fotografia vertical 3:4, alta resolução, estilo escandinavo minimalista, paleta creme, terracota, mostarda, verde-sálvia e azul suave. O terço superior é um fundo creme liso e vazio. NENHUM texto, letra, número, logotipo ou marca d'água na imagem. Sem marcas de produto, sem embalagens reais, sem rostos.
```

## Perenes (servem o ano todo)

### blocos-tapete-luz.jpg
```
Vista de cima de um tapete de lã creme com uma torre baixa de blocos de madeira coloridos em tons terrosos, peças de encaixe geométricas espalhadas e um presente embrulhado em papel kraft com fita verde-sálvia, tudo na metade inferior. Luz natural de janela, sombras longas e macias, nada natalino. Fotografia vertical 3:4, alta resolução, estilo escandinavo minimalista, paleta creme, madeira clara, verde-sálvia, mostarda e terracota. O terço superior é uma área calma de tapete liso. NENHUM texto, letra, número, logotipo ou marca d'água na imagem. Sem marcas de produto, sem embalagens reais, sem rostos.
```

### montessori-prateleira.jpg
```
Estante baixa de madeira clara em uma sala iluminada, com brinquedos de madeira organizados em bandejas e cestos de palha (blocos, quebra-cabeça de pinos, argolas de empilhar), no estilo Montessori, ocupando a metade inferior da imagem. Parede lisa e clara acima da estante. Luz natural suave. Fotografia vertical 3:4, alta resolução, estilo escandinavo minimalista, paleta creme, madeira clara, verde-sálvia e terracota. O terço superior é uma parede lisa e vazia. NENHUM texto, letra, número, logotipo ou marca d'água na imagem. Sem marcas de produto, sem rostos.
```

### mesa-desenho-criativo.jpg
```
Vista de cima de uma mesa de madeira clara com papel de desenho, lápis de cor em pote de cerâmica, aquarelas, massinha em tons suaves e formas de madeira, tudo concentrado na metade inferior. Luz natural clara e suave. Fotografia vertical 3:4, alta resolução, estilo escandinavo minimalista, paleta creme, madeira clara, verde-sálvia, mostarda e terracota. O terço superior é uma área calma de mesa vazia. NENHUM texto, letra, número, logotipo ou marca d'água na imagem. Sem marcas de produto, sem embalagens reais, sem rostos.
```

### quebra-cabeca-mesa.jpg
```
Vista de cima de uma mesa de madeira clara com um quebra-cabeça de madeira parcialmente montado (ilustração simples e colorida, sem letras nem números), peças soltas e blocos magnéticos coloridos, tudo na metade inferior. Luz natural lateral, sombras suaves. Fotografia vertical 3:4, alta resolução, estilo escandinavo minimalista, paleta creme, madeira clara, azul-petróleo, mostarda e terracota. O terço superior é uma área calma de mesa vazia. NENHUM texto, letra, número, logotipo ou marca d'água na imagem. Sem marcas de produto, sem embalagens reais, sem rostos.
```

### viagem-kit-mochila.jpg
```
Vista de cima de uma mesa de madeira clara com uma mochilinha de tecido cru aberta e itens para brincar sem tela saindo dela: caderno de desenho, lápis de cor, um quebra-cabeça pequeno de madeira, uma prancha magnética pequena e um livro infantil fechado sem título legível. Tudo na metade inferior. Sem pratos, sem comida. Luz natural suave. Fotografia vertical 3:4, alta resolução, estilo escandinavo minimalista, paleta creme, madeira clara, verde-sálvia e terracota. O terço superior é uma área calma de mesa vazia. NENHUM texto, letra, número, logotipo ou marca d'água na imagem. Sem marcas de produto, sem embalagens reais, sem rostos.
```

### sala-manha-brincadeira.jpg
```
Sala de estar clara e aconchegante de manhã: tapete de lã no chão com brinquedos de madeira espalhados (blocos, um cesto de palha, livros de figuras fechados sem título legível) na metade inferior, sofá bege ao fundo e desfocado, luz de janela entrando de lado. Nenhuma pessoa na imagem. Fotografia vertical 3:4, alta resolução, estilo escandinavo minimalista, paleta creme, madeira clara, verde-sálvia e terracota. O terço superior é uma parede clara e calma. NENHUM texto, letra, número, logotipo ou marca d'água na imagem. Sem marcas de produto, sem rostos.
```

### sensorial-cesto.jpg
```
Um cesto de palha grande sobre um tapete bege, cheio de brinquedos sensoriais de texturas naturais (bolas de feltro, animais de madeira, tecidos macios, argolas de madeira), com alguns itens espalhados ao redor, na metade inferior da imagem. Luz natural suave. Fotografia vertical 3:4, alta resolução, estilo escandinavo minimalista, paleta creme, madeira clara, verde-sálvia, mostarda e terracota. O terço superior é uma área calma de tapete liso. NENHUM texto, letra, número, logotipo ou marca d'água na imagem. Sem marcas de produto, sem embalagens reais, sem rostos.
```

### fala-livros-animais.jpg
```
Cantinho de leitura: livros ilustrados infantis abertos e fechados (ilustrações simples e coloridas, sem texto legível) com animais de madeira (vaca, cachorro, pato) sobre um tapete bege, na metade inferior da imagem. Luz natural suave de janela. Fotografia vertical 3:4, alta resolução, estilo escandinavo minimalista, paleta creme, madeira clara, verde-sálvia e terracota. O terço superior é uma área calma de tapete liso. NENHUM texto, letra, número, logotipo ou marca d'água na imagem. Sem marcas de produto, sem embalagens reais, sem rostos.
```

---

## Depois que a fila esvaziar

A fila (`queue.json`) tem 38 pins sobre esses 14 fundos, o que rende cerca de 3
semanas a 2 pins por dia. Para renovar: gere fundos novos e peça mais pins.
Pinterest premia imagem inédita para o mesmo link, então fundo novo vale mais do
que repetir o mesmo fundo com outro título.
