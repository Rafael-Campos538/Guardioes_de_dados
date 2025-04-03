# Reorganização da Estrutura do Projeto Guardiões de Dados

Pessoal,

Fiz uma refatoração e reorganização o completa da estrutura de arquivos do nosso projeto. Este documento mostra em detalhes como era antes e como ficou depois, para que todos possam entender as mudanças.

## Convenções de Nomenclatura Implementadas

Estabeleci os seguintes padrões que devemos seguir rigorosamente daqui para frente para nomear arquivos e/ou pastas:

### 1. PascalCase

- **Usado para:** Classes e arquivos de cenas do Phaser
- **Exemplos:** `MapaEscola.js`, `DialogoInicial.js`, `MenuPrincipal.js`
- **Regra:** Cada palavra começa com letra maiúscula, sem espaços ou separadores
- **Por quê:** É o padrão para classes em JavaScript e torna mais claro que são classes do Phaser

### 2. camelCase

- **Usado para:** Arquivos de configuração e utilitários
- **Exemplos:** `config.js`, `index.js`
- **Regra:** Primeira palavra em minúscula, as seguintes começam com maiúscula, sem separadores
- **Por quê:** É o padrão para funções e objetos em JavaScript

### 3. kebab-case

- **Usado para:** Nomes de pastas compostas (quando necessário)
- **Exemplos:** `mini-games/`
- **Regra:** Todas as letras minúsculas, palavras separadas por hífen
- **Por quê:** Melhor compatibilidade com URLs e facilidade de leitura em diretórios

### 4. snake_case

- **Usado para:** Arquivos de assets (imagens, sons, etc.)
- **Exemplos:** `homem_cabelo_preto.png`, `fundo_mini_game_1.png`
- **Regra:** Todas as letras minúsculas, palavras separadas por underscore
- **Por quê:** Facilita a leitura de nomes de arquivos com várias palavras

### 5. Plural para Pastas

- **Usado para:** Todas as pastas
- **Exemplos:** `cenas/`, `dialogos/`, `mapas/`
- **Regra:** Nomes de pastas sempre no plural para indicar que contêm múltiplos itens
- **Por quê:** Padroniza a estrutura e torna óbvio que a pasta contém múltiplos arquivos de um tipo

### 6. Português para Nomes

- **Usado para:** Nomenclatura geral do projeto
- **Regra:** Todos os nomes em português, exceto termos técnicos consolidados
- **Por quê:** O projeto é em português e fica mais consistente com o contexto

## Comparação Completa das Estruturas

<table>
  <tr>
    <th>Estrutura Antiga</th>
    <th>Estrutura Nova</th>
  </tr>
  <tr>
    <td>
      <pre>
.
├── 📁 assets/
│   ├── 📁 fonts/
│   │   └── rainyhearts.ttf
│   ├── 📁 imagens/
│   │   ├── agenteP..png
│   │   ├── botao_avancar.png
│   │   ├── botao_retangular.png
│   │   ├── botaocfg.png
│   │   ├── botaoinfo.png
│   │   ├── botaoplay.png
│   │   ├── botaoverde.png
│   │   ├── botaovermelho.png
│   │   ├── caixadialogo.png
│   │   ├── Cena1.png
│   │   ├── celular.png
│   │   ├── celularasset.png
│   │   ├── celulargame.png
│   │   ├── celulargrupos.png
│   │   ├── celularmensagens.png
│   │   ├── cientistacientista.png
│   │   ├── Confirmar.png
│   │   ├── correto.png
│   │   ├── deletargrupo.png
│   │   ├── eoxiscell.png
│   │   ├── fundo.webp
│   │   ├── fundocenaini.png
│   │   ├── fundoconversation.png
│   │   ├── fundoesolaini.png
│   │   ├── fundofoda.png
│   │   ├── fundogamecell.png
│   │   ├── fundominigame2.png
│   │   ├── fundoMiniGame1.png
│   │   ├── fundooriginal.png
│   │   ├── funcionario.png
│   │   ├── homemcabelopreto.png
│   │   ├── incorreto.png
│   │   ├── MainMenuTitulo.png
│   │   ├── mensagemana.png
│   │   ├── mensagemclaud.png
│   │   ├── mensagemjoao.png
│   │   ├── mensagempedro.png
│   │   ├── missao2ini.png
│   │   ├── mulherjogo.png.png
│   │   ├── nomemens.png
│   │   ├── novo.png
│   │   ├── painel_retangular.png
│   │   ├── passarinho.png
│   │   ├── personagens jogaveis.png
│   │   ├── professor jorge.png
│   │   ├── professora.png
│   │   ├── professora claudia.png
│   │   ├── religiaomens.png
│   │   ├── saudemens.png
│   │   ├── setaentrargrupo.png
│   │   └── sprite.png
│   ├── 📁 mapa/
│   │   ├── city1.png
│   │   ├── escola.json
│   │   ├── floor.png
│   │   ├── indoor1.png
│   │   ├── indoor3.png
│   │   ├── inter.png
│   │   ├── interesc.png
│   │   ├── meta.png
│   │   ├── principal.json
│   │   └── tech2.png
│   ├── 📁 personagens/
│   │   ├── Menina1.png
│   │   ├── Menino1.png
│   │   └── Menino3.png
│   ├── 📁 personsasa/
│   │   ├── cadeirante.png
│   │   ├── menina1.png
│   │   ├── menina2BIO.png
│   │   ├── menina3.png
│   │   ├── menino1.png
│   │   └── menino3.png
│   └── 📁 sons/
│       ├── abrir_celular.mp3
│       ├── alerta-vff.mp3
│       ├── apagar_whats.mp3
│       ├── botao.mp3
│       ├── digitacao_conv.mp3
│       ├── errou.mp3
│       ├── musica_menu.mp3
│       ├── musica_minigame1.mp3
│       ├── musica_minigame2.mp3
│       ├── somAcerto.mp3
│       └── transicao_tela.mp3
└── 📁 src/
    ├── CenaEscola.js
    ├── Cenainicial.js
    ├── Celulargrupoum.js
    ├── ChooseRole.js  // não usado
    ├── Conversation.js
    ├── Conversationdois.js
    ├── game.js
    ├── Gamedoismini.js
    ├── Gameinicial.js
    ├── MainMenu.js
    ├── MapaCenaIni.js  // não usado
    ├── Minigamedois.js  // não usado
    ├── Personagens.js
    ├── phaser.js
    └── Telaminigamedois.js</pre>
    </td>
    <td>
      <pre>
.
├── 📁 assets/
│   ├── 📁 fontes/                  
│   │   └── rainyhearts.ttf
│   ├── 📁 imagens/                
│   │   ├── 📁 botoes/
│   │   │   ├── botao_avancar.png
│   │   │   ├── botao_retangular.png
│   │   │   ├── botaocfg.png
│   │   │   ├── botaoinfo.png
│   │   │   ├── botaoplay.png
│   │   │   ├── botaoverde.png
│   │   │   ├── botaovermelho.png
│   │   │   └── confirmar.png
│   │   ├── 📁 celular/
│   │   │   ├── celular.png
│   │   │   ├── celularasset.png
│   │   │   ├── celulargame.png
│   │   │   ├── celulargrupos.png
│   │   │   ├── celularmensagens.png
│   │   │   ├── deletargrupo.png
│   │   │   ├── excluir_mensagem.png
│   │   │   ├── mensagem_ana.png
│   │   │   ├── mensagem_claudia.png
│   │   │   ├── mensagem_joao.png
│   │   │   ├── mensagem_pedro.png
│   │   │   └── setaentrargrupo.png
│   │   ├── 📁 cenarios/
│   │   │   ├── cena_1.png
│   │   │   ├── fundo.webp
│   │   │   ├── fundocenaini.png
│   │   │   ├── fundoconversation.png
│   │   │   ├── fundoesolaini.png
│   │   │   ├── fundo_principal.png
│   │   │   ├── fundogamecell.png
│   │   │   ├── fundominigame2.png
│   │   │   ├── fundo_mini_game_1.png
│   │   │   └── fundooriginal.png
│   │   ├── 📁 feedback/
│   │   │   ├── correto.png
│   │   │   └── incorreto.png
│   │   └── 📁 ui/
│   │       ├── caixadialogo.png
│   │       ├── menu_principal_titulo.png
│   │       ├── missao2ini.png
│   │       ├── nome_mensagem.png
│   │       ├── novo.png
│   │       ├── painel_retangular.png
│   │       ├── religiao_mensagem.png
│   │       ├── saude_mensagem.png
│   │       └── sprite.png
│   ├── 📁 mapas/                  
│   │   ├── city1.png
│   │   ├── escola.json
│   │   ├── floor.png
│   │   ├── indoor1.png
│   │   ├── indoor3.png
│   │   ├── inter.png
│   │   ├── interesc.png
│   │   ├── meta.png
│   │   ├── principal.json
│   │   └── tech2.png
│   ├── 📁 personagens/ (ainda coloquei divisão em estaticos/ e spritesheets/ para deixar mais organizado)
│   │   ├── cadeirante.png
│   │   ├── menina1.png
│   │   ├── menina2BIO.png
│   │   ├── menina3.png
│   │   ├── menino1.png
│   │   ├── menino3.png 
│   │   ├── ... (enfim, todas as imagens de personagens)             
│   │   └── 📁 animacoes/
│   └── 📁 sons/                  
│       ├── 📁 efeitos/
│       │   ├── abrir_celular.mp3
│       │   ├── alerta-vff.mp3
│       │   ├── apagar_whats.mp3
│       │   ├── botao.mp3
│       │   ├── digitacao_conv.mp3
│       │   ├── errou.mp3
│       │   ├── somAcerto.mp3
│       │   └── transicao_tela.mp3
│       └── 📁 musicas/
│           ├── musica_menu.mp3
│           ├── musica_minigame1.mp3
│           └── musica_minigame2.mp3
└── 📁 src/
    ├── 📁 cenas/
    │   ├── 📁 dialogos/
    │   │   ├── DialogoInicial.js
    │   │   └── DialogoProfessora.js
    │   ├── 📁 mapas/
    │   │   ├── MapaEscola.js
    │   │   └── MapaInicial.js
    │   ├── 📁 menus/
    │   │   ├── MenuPrincipal.js
    │   │   └── SelecaoPersonagem.js
    │   └── 📁 mini-games/
    │       ├── 📁 celular/
    │       │   ├── InterfaceCelular.js
    │       │   ├── JogoCelular.js
    │       │   └── TelaIntroducao.js
    │       └── 📁 quiz/
    │           └── QuizLgpd.js
    ├── config.js
    ├── index.js
    └── phaser.js</pre>
    </td>
  </tr>
</table>

## Mapeamento de Arquivos

Aqui está o que aconteceu com cada arquivo:

| Arquivo Original      | Novo Nome              | Nova Localização                |
| --------------------- | ---------------------- | ------------------------------- |
| `MainMenu.js`         | `MenuPrincipal.js`     | `src/cenas/menus/`              |
| `Personagens.js`      | `SelecaoPersonagem.js` | `src/cenas/menus/`              |
| `Conversation.js`     | `DialogoInicial.js`    | `src/cenas/dialogos/`           |
| `Conversationdois.js` | `DialogoProfessora.js` | `src/cenas/dialogos/`           |
| `Cenainicial.js`      | `MapaInicial.js`       | `src/cenas/mapas/`              |
| `CenaEscola.js`       | `MapaEscola.js`        | `src/cenas/mapas/`              |
| `Gameinicial.js`      | `QuizLgpd.js`          | `src/cenas/mini-games/quiz/`    |
| `Telaminigamedois.js` | `TelaIntroducao.js`    | `src/cenas/mini-games/celular/` |
| `Gamedoismini.js`     | `JogoCelular.js`       | `src/cenas/mini-games/celular/` |
| `Celulargrupoum.js`   | `InterfaceCelular.js`  | `src/cenas/mini-games/celular/` |
| `game.js`             | `config.js`            | `src/`                          |

### Renomeação de Assets

Também padronizei os nomes dos assets para seguir o formato snake_case (palavras separadas por underscore e em minúsculas):

| Arquivo Original         | Novo Nome                   |
| ------------------------ | --------------------------- |
| `Confirmar.png`          | `confirmar.png`             |
| `MainMenuTitulo.png`     | `menu_principal_titulo.png` |
| `agenteP..png`           | `agente_p.png`              |
| `homemcabelopreto.png`   | `homem_cabelo_preto.png`    |
| `mulherjogo.png`         | `mulher_jogo.png`           |
| `cientistacientista.png` | `cientista.png`             |
| `professora.png`         | `professora_base.png`       |
| `Cena1.png`              | `cena_1.png`                |
| `fundoMiniGame1.png`     | `fundo_mini_game_1.png`     |
| `fundofoda.png`          | `fundo_principal.png`       |
| `eoxiscell.png`          | `excluir_mensagem.png`      |
| `mensagemclaud.png`      | `mensagem_claudia.png`      |
| `mensagemjoao.png`       | `mensagem_joao.png`         |
| `mensagempedro.png`      | `mensagem_pedro.png`        |
| `mensagemana.png`        | `mensagem_ana.png`          |
| `nomemens.png`           | `nome_mensagem.png`         |
| `religiaomens.png`       | `religiao_mensagem.png`     |
| `saudemens.png`          | `saude_mensagem.png`        |

**Arquivos Removidos**: `ChooseRole.js`, `MapaCenaIni.js` e `Minigamedois.js` foram removidos por não estarem em uso.

## Fluxo do Jogo

A sequência de cenas continua a mesma, mas com arquivos renomeados e reorganizados:

1. `MenuPrincipal` → 2. `SelecaoPersonagem` → 3. `DialogoInicial` → 4. `QuizLgpd` → 5. `MapaInicial` → 6. `MapaEscola` → 7. `TelaIntroducao` → 8. `DialogoProfessora` → 9. `JogoCelular` → 10. `InterfaceCelular`

## Adicionando Novos Arquivos no Futuro

Ao adicionar novos arquivos ao projeto, siga rigorosamente estas diretrizes:

1. **Novas Cenas**:

   - Use PascalCase: `NovaCena.js`
   - Coloque na pasta correta em `src/cenas/`
   - Exemplo: Uma nova tela de jogo vai em `src/cenas/mini-games/novoJogo/NovoMiniGame.js`

2. **Novos Assets**:

   - Coloque na pasta correspondente ao tipo de asset
   - Use snake_case para nomes de arquivos (palavras separadas por underscore, tudo em minúsculas)
   - Exemplo: Uma nova imagem de botão vai em `assets/imagens/botoes/novo_botao.png`

3. **Novas Pastas**:
   - Use plural e minúsculas para pastas normais: `novos_recursos/`
   - Use kebab-case para pastas com nomes compostos: `mini-games/`

## Por Que Fiz Essa Mudança

Essa reorganização traz vários benefícios:

- **Código mais organizado**: Cada arquivo tem seu lugar específico e lógico
- **Padrões consistentes**: Todos saberão onde colocar novos arquivos
- **Facilidade de encontrar arquivos**: A estrutura de diretórios é intuitiva
- **Código mais profissional**: Seguimos padrões reconhecidos na indústria

Não precisamos modificar o conteúdo dos arquivos, apenas reorganizei tudo para facilitar nosso trabalho. Se tiverem dúvidas sobre a nova estrutura, me perguntem!

Assinado,
Richard
