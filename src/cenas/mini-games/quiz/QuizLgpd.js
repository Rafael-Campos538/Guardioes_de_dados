// ./src/cenas/mini-games/quiz/QuizLgpd.js

export default class QuizLgpd extends Phaser.Scene {
  constructor() {
    super({ key: "QuizLgpd" });
  }

  preload() {
    // Carregar imagens necessárias para feedback e botões
    this.load.image("feedback_positivo", "assets/imagens/feedback/correto.png");
    this.load.image(
      "feedback_negativo",
      "assets/imagens/feedback/incorreto.png"
    );
    this.load.image(
      "background",
      "assets/imagens/cenarios/fundo_mini_game_1.png"
    );
    this.load.image("botao_verde", "assets/imagens/botoes/botaoverde.png");
    this.load.image(
      "botao_vermelho",
      "assets/imagens/botoes/botaovermelho.png"
    );

    // Carregar a fonte usando WebFont
    this.load.font("Rainyhearts", "assets/fontes/rainyhearts.ttf");
  }

  create() {
    const centerX = this.cameras.main.width / 2; // Posição central no eixo X
    const centerY = this.cameras.main.height / 2; // Posição central no eixo Y

    // Adicionar a imagem de fundo centralizada
    this.add
      .image(centerX, centerY, "background")
      .setOrigin(0.5)
      .setDisplaySize(this.cameras.main.width, this.cameras.main.height);

    // Botões interativos para as respostas, posicionados na tela
    this.botaoVerde = this.add
      .image(centerX - 250, centerY + 240, "botao_verde")
      .setScale(0.11)
      .setInteractive()
      .on("pointerdown", () => this.verificarBotao(true)); // Resposta correta

    this.botaoVermelho = this.add
      .image(centerX + 200, centerY + 240, "botao_vermelho")
      .setScale(0.11)
      .setInteractive()
      .on("pointerdown", () => this.verificarBotao(false)); // Resposta incorreta

    // Feedback visual para respostas corretas e incorretas
    this.feedbackPositivo = this.add
      .image(centerX, centerY, "feedback_positivo")
      .setScale(0.7)
      .setVisible(false); // Inicialmente invisível

    this.feedbackNegativo = this.add
      .image(centerX, centerY, "feedback_negativo")
      .setScale(0.7)
      .setVisible(false); // Inicialmente invisível

    // Botão "Avançar", usado para ir para a próxima pergunta
    this.botaoAvancar = this.add
      .text(centerX, centerY + 190, ">>", {
        font: "40px Rainyhearts", // Usando a fonte TrueType
        fill: "#FFFFFF",
        align: "center",
      })
      .setOrigin(0.5)
      .setInteractive()
      .setVisible(false) // Inicialmente invisível
      .on("pointerdown", () => this.avancarPergunta()); // Avançar para a próxima pergunta

    // Texto de "Game Concluído", que será mostrado quando o jogo terminar
    this.gameConcluido = this.add
      .text(centerX, centerY, "Game concluído!", {
        font: "40px Rainyhearts", // Usando a fonte TrueType
        fill: "#FFFFFF",
        fontWeight: "bold",
      })
      .setOrigin(0.5)
      .setVisible(false); // Inicialmente invisível

    // Texto das perguntas
    this.perguntaTexto = this.add
      .text(centerX - 30, 290, "", {
        font: "15px Rainyhearts", // Usando a fonte TrueType
        fill: "#000",
        wordWrap: { width: 250 },
        align: "center",
      })
      .setOrigin(0.5);

    // Texto adicional sobre dados sensíveis
    this.mensagemAdicional = this.add
      .text(centerX, centerY + 60, "", {
        font: "31px Rainyhearts", // Usando a fonte TrueType
        fill: "#FFFFFF",
        fontWeight: "bold",
        wordWrap: { width: 500 },
        align: "center",
      })
      .setOrigin(0.5)
      .setVisible(false); // Inicialmente invisível

    // Lista de perguntas, cada uma com uma resposta correta ou incorreta
    this.perguntas = [
      {
        pergunta:
          "Um estudante de 18 anos faz o cadastro para um curso online gratuito e fornece os seguintes dados:\n\nNome\nIdade\nE-mail\nCidade",
        respostaCorreta: true,
      },
      {
        pergunta:
          "Uma jovem de 22 anos se inscreve para uma vaga de emprego em um site de recrutamento e preenche um formulário com as seguintes informações:\n\nNome\nIdade\nEndereço\nTelefone\nReligião\nExperiência profissional",
        respostaCorreta: false,
      },
      {
        pergunta:
          "Um adolescente de 16 anos cria uma conta em um aplicativo de exercícios e preenche um formulário com as seguintes informações:\n\nNome\nIdade\nAltura e peso\nFrequência cardíaca média\nHistórico de doenças na família",
        respostaCorreta: false,
      },
      {
        pergunta:
          "Ao fazer o cadastro em um site online um jovens de 20 anos preencheu um formulário com as seguintes informações:\n\nNome\nIdade\nCEP\nEndereço\nTelefone\nGênero\nRaça",
        respostaCorreta: false,
      },
      {
        pergunta:
          "Ao fazer parte de um sorteio online e receber o prêmio na sua casa um jovens de 14 anos preencheu um formulário com as seguintes informações:\n\nNome\nIdade\nCPF\nCEP\nEndereço\nTelefone\nGênero",
        respostaCorreta: false,
      },
    ];

    this.indice = 0; // Índice da pergunta atual
    this.mostrarPergunta(); // Exibe a primeira pergunta
  }

  mostrarPergunta() {
    // Verifica se ainda há perguntas para mostrar
    if (this.indice < this.perguntas.length) {
      this.perguntaTexto.setText(this.perguntas[this.indice].pergunta);
      this.perguntaTexto.setVisible(true); // Exibe a pergunta
      this.feedbackPositivo.setVisible(false);
      this.feedbackNegativo.setVisible(false);
      this.botaoAvancar.setVisible(false); // Não exibe o botão avançar ainda
      this.botaoVerde.setInteractive(); // Habilita a interação do botão verde
      this.botaoVermelho.setInteractive(); // Habilita a interação do botão vermelho
      this.mensagemAdicional.setVisible(false); // Oculta a mensagem adicional ao mudar a pergunta
    } else {
      // Quando o jogo terminar, exibe a mensagem de "Game concluído"
      this.perguntaTexto.setText("Game concluído!");
      this.botaoVerde.setVisible(false);
      this.botaoVermelho.setVisible(false);
      this.botaoAvancar.setVisible(false);
      this.feedbackPositivo.setVisible(false);
      this.feedbackNegativo.setVisible(false);
      this.gameConcluido.setVisible(true); // Exibe a mensagem de game concluído
      this.mensagemAdicional.setVisible(false); // Oculta a mensagem adicional

      // Aguardar 2 segundos antes de iniciar a transição suave
      this.time.delayedCall(2000, () => {
        // Iniciar o fadeOut da cena atual para dar o efeito de transição
        this.cameras.main.fadeOut(1000, 0, 0, 0); // FadeOut de 1 segundo

        // Quando o fadeOut for concluído, muda para a cena "MapaInicial"
        this.cameras.main.on("camerafadeoutcomplete", () => {
          this.scene.start("MapaInicial"); // Atualizado para o novo nome da cena

          // Inicia o fadeIn da nova cena
          this.cameras.main.fadeIn(1000, 0, 0, 0); // FadeIn de 1 segundo
        });
      });
    }
  }

  verificarBotao(escolhaUsuario) {
    let perguntaAtual = this.perguntas[this.indice];
    // Verifica se a escolha do usuário é correta ou não
    if (escolhaUsuario === perguntaAtual.respostaCorreta) {
      this.feedbackPositivo.setVisible(true); // Exibe feedback positivo
    } else {
      this.feedbackNegativo.setVisible(true); // Exibe feedback negativo
    }

    // Exibe a mensagem adicional sobre dados sensíveis
    if (this.indice === 0) {
      this.mensagemAdicional.setText(
        "Nenhum desses dados é sensível, mas o CPF deve ser coletado apenas se for realmente necessário."
      );
      this.mensagemAdicional.setVisible(true);
    }

    if (this.indice === 1) {
      this.mensagemAdicional.setText(
        "Religião é um dado sensível e não deveria ser solicitado sem uma justificativa válida"
      );
      this.mensagemAdicional.setVisible(true);
    }

    if (this.indice === 2) {
      this.mensagemAdicional.setText(
        "Dados de saúde e histórico são sensíveis e, sendo menor de idade, exigem consentimento dos pais."
      );
      this.mensagemAdicional.setVisible(true);
    }

    if (this.indice === 3) {
      this.mensagemAdicional.setText(
        "Raça é um dado sensível e sem justificativa para uso."
      );
      this.mensagemAdicional.setVisible(true);
    }

    if (this.indice === 4) {
      this.mensagemAdicional.setText(
        "A pessoa é menor de idade e precisa de consentimento dos pais para fornecer seus dados."
      );
      this.mensagemAdicional.setVisible(true);
    }

    // Esconde a pergunta e exibe a mensagem adicional
    this.perguntaTexto.setVisible(false);
    this.mensagemAdicional.setVisible(true);
    this.botaoVerde.disableInteractive(); // Desabilita a interação com o botão verde
    this.botaoVermelho.disableInteractive(); // Desabilita a interação com o botão vermelho
    this.botaoAvancar.setVisible(true).setDepth(1); // Exibe o botão "Avançar"
  }

  avancarPergunta() {
    this.indice++; // Avança para a próxima pergunta
    this.mostrarPergunta(); // Mostra a próxima pergunta
  }
}
