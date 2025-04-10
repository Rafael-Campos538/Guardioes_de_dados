// ./src/cenas/dialogos/DialogoProfessora.js

export default class DialogoProfessora extends Phaser.Scene {
  constructor() {
    super({ key: "DialogoProfessora" });
  }

  preload() {
    this.personagemSelecionado = this.registry.get("personagemSelecionado");

    this.load.font("Rainyhearts", "assets/fontes/rainyhearts.ttf");
    this.load.image("caixa_dialogo", "assets/imagens/ui/caixadialogo.png");
    this.load.image(
      "fundominigame2",
      "assets/imagens/cenarios/fundominigame2.png"
    );
    this.load.image(
      "professora_base",
      "assets/imagens/personagens/estaticos/professora_base.png"
    );
    this.load.image(
      "botao_retangular",
      "assets/imagens/botoes/botao_retangular.png"
    );

    // Carrega dinamicamente o personagem selecionado
    if (this.personagemSelecionado) {
      this.load.image(
        this.personagemSelecionado,
        `assets/imagens/personagens/estaticos/${this.personagemSelecionado}.png`
      );
    }

    // Sons
    this.load.audio("digitacao", "assets/sons/efeitos/digitacao_conv.mp3");
    this.load.audio("abrirCelular", "assets/sons/efeitos/abrir_celular.mp3");
  }

  create() {
    const largura = this.cameras.main.width;
    const altura = this.cameras.main.height;
    const centerX = largura / 2;
    const centerY = altura / 2;

    this.fundo = this.add
      .image(centerX, centerY, "fundominigame2")
      .setOrigin(0.5)
      .setDisplaySize(largura, altura);

    this.dialogos = [
      {
        personagem: "Professora.",
        texto: "Olá, boas vindas a nossa escola. Como posso te ajudar?",
        img: "professora_base",
      },
      {
        personagem: "Agente H.",
        texto:
          "Você é a professora responsável por criar o grupo de mensagens com os seus alunos?",
        img: this.personagemSelecionado,
      },
      {
        personagem: "Professora.",
        texto: "Sim, sou eu. Aconteceu alguma coisa?",
        img: "professora_base",
      },
      {
        personagem: "Agente H.",
        texto:
          "Na verdade sim... Acontece que, de acordo com a LGPD, é proibido criar grupos com dados pessoais de alunos sem autorização.",
        img: this.personagemSelecionado,
      },
      {
        personagem: "Professora.",
        texto: "Mas o grupo era só para passar avisos e tirar dúvidas rápidas!",
        img: "professora_base",
      },
      {
        personagem: "Agente H.",
        texto:
          "Mesmo com boa intenção, quando você cria um grupo com os números dos alunos ou responsáveis, está compartilhando dados pessoais sem o consentimento deles.",
        img: this.personagemSelecionado,
      },
      {
        personagem: "Agente H.",
        texto:
          "Além disso, mensagens enviadas nesses grupos não são monitoradas oficialmente pela escola, o que pode causar problemas sérios.",
        img: this.personagemSelecionado,
      },
      {
        personagem: "Professora.",
        texto:
          "Entendo... Então como posso me comunicar com eles de forma segura?",
        img: "professora_base",
      },
      {
        personagem: "Agente H.",
        texto:
          "O ideal é usar plataformas autorizadas pela escola, que respeitam a privacidade e a segurança dos dados. Assim, todos estão protegidos.",
        img: this.personagemSelecionado,
      },
      {
        personagem: "Professora.",
        texto:
          "Obrigada pelo aviso. Vou seguir as orientações corretas a partir de agora.",
        img: "professora_base",
      },
    ];

    this.indice = 0;

    this.personagemEsquerda = this.add
      .image(
        centerX - largura * 0.25,
        centerY + altura * 0.26,
        this.personagemSelecionado
      )
      .setOrigin(0.5)
      .setScale(largura * 0.0017);

    this.personagemDireita = this.add
      .image(centerX + largura * 0.3, centerY + altura * 0.2, "professora_base")
      .setOrigin(0.5)
      .setScale(largura * 0.0025);

    this.caixaDialogo = this.add
      .image(centerX, centerY + altura * 0.33, "caixa_dialogo")
      .setOrigin(0.5)
      .setDisplaySize(largura * 0.5, altura * 0.24);

    this.personagemTexto = this.add
      .text(centerX - largura * 0.24, centerY + altura * 0.24, "", {
        fontSize: Math.min(largura, altura) * 0.05,
        fill: "#FFFFFF",
        fontFamily: "Rainyhearts",
      })
      .setOrigin(0, 0.4);

    this.textoAtual = this.add
      .text(centerX - largura * 0.23, centerY + altura * 0.29, "", {
        fontSize: Math.min(largura, altura) * 0.035,
        fill: "#FFFFFF",
        fontFamily: "Rainyhearts",
        wordWrap: { width: largura * 0.46, useAdvancedWrap: true },
      })
      .setOrigin(0, 0);

    this.atualizarTexto();

    this.botaoVoltar = this.add
      .text(centerX - largura * 0.2, centerY + altura * 0.41, "VOLTAR", {
        fontSize: Math.min(largura, altura) * 0.027,
        fill: "#00BFFF",
        fontFamily: "Rainyhearts",
      })
      .setInteractive()
      .on("pointerdown", () => {
        this.sound.play("abrirCelular");
        this.dialogoAnterior();
      });

    this.botaoContinuar = this.add
      .text(centerX + largura * 0.12, centerY + altura * 0.41, "CONTINUAR", {
        fontSize: Math.min(largura, altura) * 0.027,
        fill: "#00BFFF",
        fontFamily: "Rainyhearts",
      })
      .setInteractive()
      .on("pointerdown", () => {
        this.sound.play("abrirCelular");
        this.proximoDialogo();
      });

    this.atualizarVisibilidadeVoltar();
  }

  atualizarTexto() {
    let fala = this.dialogos[this.indice];
    this.personagemTexto.setText(fala.personagem);

    this.time.removeAllEvents();
    this.textoAtual.setText("");

    this.aplicarEfeitoDigitar(fala.texto);

    // Alterna a visibilidade das imagens
    this.personagemEsquerda.setVisible(fala.img === this.personagemSelecionado);
    this.personagemDireita.setVisible(fala.img === "professora_base");
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
      this.time.delayedCall(500, () => this.scene.start("JogoCelular"));
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
