// ./src/Conversation.js

class Conversation extends Phaser.Scene {
  constructor() {
    super({ key: "Conversation" });
  }

  preload() {
    this.load.font("Rainyhearts", "assets/fonts/rainyhearts.ttf");
    this.load.image("caixa_dialogo", "assets/imagens/caixadialogo.png");
    this.load.image(
      "fundoconversation",
      "assets/imagens/fundoconversation.png"
    );
    this.load.image("homemcabelopreto", "assets/imagens/homemcabelopreto.png");
    this.load.image("cientista", "assets/imagens/cientistacientista.png");
    this.load.image("botao_retangular", "assets/imagens/botao_retangular.png");

    // Sons
    this.load.audio("digitacao", "assets/sons/digitacao_conv.mp3");
    this.load.audio("abrirCelular", "assets/sons/abrir_celular.mp3");
  }

  create() {
    const largura = this.cameras.main.width;
    const altura = this.cameras.main.height;
    const centerX = largura / 2;
    const centerY = altura / 2;

    this.add
      .image(centerX, centerY, "fundoconversation")
      .setOrigin(0.5)
      .setDisplaySize(largura, altura);

    this.dialogos = [
      {
        personagem: "Agente P.",
        texto: "Bem-vindo à Agência Global de Proteção de Dados, recruta.",
        img: "cientista",
      },
      {
        personagem: "Agente P.",
        texto: "Seu codinome agora é DPO Hero.",
        img: "cientista",
      },
      {
        personagem: "Agente H.",
        texto: "É uma honra servir para proteger a privacidade!",
        img: "homemcabelopreto",
      },
      {
        personagem: "Agente P.",
        texto: "Diariamente, milhões de dados são expostos.",
        img: "cientista",
      },
      {
        personagem: "Agente P.",
        texto: "Nossa missão é garantir a segurança dessas informações.",
        img: "cientista",
      },
    ];

    this.indice = 0;

    // Personagens Menores
    this.personagemEsquerda = this.add
      .image(
        centerX - largura * 0.5,
        centerY + altura * 0.05,
        "homemcabelopreto"
      )
      .setOrigin(0.5)
      .setScale(largura * 0.0012);

    this.personagemDireita = this.add
      .image(centerX + largura * 0.3, centerY + altura * 0.02, "cientista")
      .setOrigin(0.5)
      .setScale(largura * 0.0009);

    // Caixa de Diálogo Menor
    const caixaDialogo = this.add
      .image(centerX, centerY + altura * 0.35, "caixa_dialogo")
      .setOrigin(0.5)
      .setDisplaySize(largura * 0.5, altura * 0.18);

    // Texto menor
    this.personagemTexto = this.add
      .text(centerX - largura * 0.23, centerY + altura * 0.28, "", {
        fontSize: Math.min(largura, altura) * 0.05,
        fill: "#FFFFFF",
        fontFamily: "Rainyhearts",
      })
      .setOrigin(0, 0.4);

    this.textoAtual = this.add
      .text(centerX - largura * 0.23, centerY + altura * 0.32, "", {
        fontSize: Math.min(largura, altura) * 0.024,
        fill: "#FFFFFF",
        fontFamily: "Rainyhearts",
        wordWrap: { width: largura * 0.4, useAdvancedWrap: true },
      })
      .setOrigin(0, 0);

    this.atualizarTexto();

    // Botão Voltar
    this.botaoVoltar = this.add
      .text(centerX - largura * 0.15, centerY + altura * 0.4, "VOLTAR", {
        fontSize: Math.min(largura, altura) * 0.025,
        fill: "#00BFFF",
        fontFamily: "Rainyhearts",
      })
      .setInteractive()
      .on("pointerdown", () => {
        let somClique = this.sound.add("abrirCelular", { loop: false });
        somClique.play();
        this.dialogoAnterior();
      });

    // Botão Continuar
    let botaoContinuar = this.add
      .text(centerX + largura * 0.08, centerY + altura * 0.4, "CONTINUAR", {
        fontSize: Math.min(largura, altura) * 0.025,
        fill: "#00BFFF",
        fontFamily: "Rainyhearts",
      })
      .setInteractive()
      .on("pointerdown", () => {
        let somClique = this.sound.add("abrirCelular", { loop: false });
        somClique.play();
        this.proximoDialogo();
      });

    // Botão Menu
    let botaoMenu = this.add
      .image(largura * 0.05, altura * 0.05, "botao_retangular")
      .setInteractive()
      .setOrigin(0.5)
      .setScale(largura * 0.00025);

    let textoMenu = this.add
      .text(largura * 0.05, altura * 0.062, "MENU", {
        fontSize: Math.min(largura, altura) * 0.03,
        fill: "#FFFFFF",
        fontFamily: "Rainyhearts",
        fontStyle: "bold",
      })
      .setInteractive()
      .setOrigin(0.5, 1);

    botaoMenu.on("pointerdown", () => this.scene.start("MainMenu"));
    textoMenu.on("pointerdown", () => this.scene.start("MainMenu"));

    this.atualizarVisibilidadeVoltar();
  }

  atualizarTexto() {
    let fala = this.dialogos[this.indice];
    this.personagemTexto.setText(fala.personagem);

    this.time.removeAllEvents();
    this.textoAtual.setText("");

    this.aplicarEfeitoDigitar(fala.texto);

    this.personagemEsquerda.setVisible(fala.img === "homemcabelopreto");
    this.personagemDireita.setVisible(fala.img === "cientista");
  }

  aplicarEfeitoDigitar(texto) {
    this.textoAtual.setText("");

    if (this.somDigitacao) {
      this.somDigitacao.stop();
    }

    let i = 0;
    const tempo = 50;

    this.somDigitacao = this.sound.add("digitacao", { loop: false });
    this.somDigitacao.play();

    this.time.addEvent({
      delay: tempo,
      callback: () => {
        this.textoAtual.setText(texto.substring(0, i));
        i++;

        if (i > texto.length) {
          this.time.removeAllEvents();
          this.somDigitacao.stop();
        }
      },
      loop: true,
    });
  }

  atualizarVisibilidadeVoltar() {
    this.botaoVoltar.setVisible(this.indice > 0);
  }

  proximoDialogo() {
    if (this.indice < this.dialogos.length - 1) {
      this.indice++;
      this.atualizarTexto();
      this.atualizarVisibilidadeVoltar();
    } else {
      this.sound.stopAll();
      this.cameras.main.fadeOut(500, 0, 0, 0);
      this.time.delayedCall(500, () => this.scene.start("Gameinicial"));
    }
  }

  dialogoAnterior() {
    if (this.indice > 0) {
      this.indice--;
      this.atualizarTexto();
    }
    this.atualizarVisibilidadeVoltar();
  }
}

window.Conversation = Conversation;
