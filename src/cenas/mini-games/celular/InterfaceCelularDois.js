// ./src/cenas/mini-games/celular/InterfaceCelularDois.js

import HUD from "../../../componentes/HUD.js";
export default class InterfaceCelularDois extends Phaser.Scene {
  static mensagensDeletadas = new Set();
  static gruposDeletados = new Set();

  constructor() {
    super({ key: "InterfaceCelularDois" });
  }

  preload() {
    this.load.image(
      "fundominigame2",
      "assets/imagens/cenarios/fundominigame2.png"
    );
    this.load.image(
      "celularmensagens",
      "assets/imagens/celular/celularmensagens.png"
    );
    this.load.image("deletargrupo", "assets/imagens/celular/deletargrupo.png");
    this.load.image(
      "mensagem_geraldo",
      "assets/imagens/celular/mensagem_geraldo.png"
    );
    this.load.image(
      "mensagem_joaao",
      "assets/imagens/celular/mensagem_joaao.png"
    );
    this.load.image(
      "mensagem_beatriz",
      "assets/imagens/celular/mensagem_beatriz.png"
    );
    this.load.image(
      "mensagem_felipe",
      "assets/imagens/celular/mensagem_felipe.png"
    );
    this.load.image(
      "excluir_mensagem",
      "assets/imagens/celular/excluir_mensagem.png"
    );
    this.load.image("feedback_correto", "assets/imagens/feedback/correto.png");
    this.load.image(
      "feedback_incorreto",
      "assets/imagens/feedback/incorreto.png"
    );
    this.load.font("rainyhearts", "assets/fontes/rainyhearts.ttf");
  }

  init(data) {
    this.grupoAtual = data.grupo;
  }

  create() {
    this.atualizarCena();
    this.scale.on("resize", this.atualizarCena, this);

    this.hud = new HUD(this);
    this.hud.mostrar();
  }

  atualizarCena() {
    const largura = this.cameras.main.width;
    const altura = this.cameras.main.height;
    const centerX = largura / 2;
    const centerY = altura / 2;

    if (this.fundo) this.fundo.destroy();
    this.fundo = this.add
      .image(centerX, centerY, "fundominigame2")
      .setOrigin(0.5)
      .setDisplaySize(largura, altura);

    if (this.celular) this.celular.destroy();
    this.celular = this.add
      .image(centerX, centerY, "celularmensagens")
      .setOrigin(0.5)
      .setScale(Math.min(largura, altura) * 0.00053);

    this.criarMensagem(
      centerX,
      centerY - altura * 0.2,
      "mensagem_geraldo",
      "eoxisGeraldo"
    );
    this.criarMensagem(
      centerX,
      centerY - altura * 0.057,
      "mensagem_joaao",
      "eoxisJoaao"
    );
    this.criarMensagem(
      centerX,
      centerY + altura * 0.08,
      "mensagem_beatriz",
      "eoxisBeatriz"
    );
    this.criarMensagem(
      centerX,
      centerY + altura * 0.222,
      "mensagem_felipe",
      "eoxisFelipe"
    );

    if (this.deletarBotao) this.deletarBotao.destroy();
    this.deletarBotao = this.add
      .image(centerX * 1.13, centerY - altura * 0.31, "deletargrupo")
      .setOrigin(0.5)
      .setScale(Math.min(largura, altura) * 0.00061)
      .setInteractive()
      .on("pointerdown", () => {
        InterfaceCelularDois.gruposDeletados.add(this.grupoAtual);
        this.hud.esconder();
        this.scene.start("JogoCelular");
      });
  }

  criarMensagem(centerX, posY, mensagemKey, eoxisKey) {
    const largura = this.cameras.main.width;
    const altura = this.cameras.main.height;

    if (InterfaceCelularDois.mensagensDeletadas.has(eoxisKey)) return;

    let mensagem = this.add
      .image(centerX - largura * 0.025, posY, mensagemKey)
      .setOrigin(0.5)
      .setScale(Math.min(largura, altura) * 0.00053);

    let eoxis = this.add
      .image(
        centerX + largura * 0.053,
        posY + altura * 0.01,
        "excluir_mensagem"
      )
      .setOrigin(0.5)
      .setScale(Math.min(largura, altura) * 0.0014)
      .setInteractive()
      .on("pointerdown", () => {
        mensagem.destroy();
        eoxis.destroy();

        InterfaceCelularDois.mensagensDeletadas.add(eoxisKey);

        const mensagemCorreta = eoxisKey === "eoxisFelipe";
        this.mostrarFeedback(mensagemCorreta);
        if (mensagemCorreta) {
          this.hud.alterarPontuacao(45);
        } else {
          this.hud.alterarPontuacao(-10);
        }
      });
  }

  mostrarFeedback(isCorreto) {
    const largura = this.cameras.main.width;
    const altura = this.cameras.main.height;
    const centerX = largura / 2;
    const centerY = altura / 2;

    const feedbackKey = isCorreto ? "feedback_correto" : "feedback_incorreto";
    const mensagemTexto = isCorreto
      ? "Boa! Essa mensagem pedia o nome completo, isso só deve ser pedido caso realmente necessário."
      : "Ops! Essa não era uma mensagem sensível, então não precisava ser excluída.";

    const feedback = this.add
      .image(centerX, centerY, feedbackKey)
      .setOrigin(0.5)
      .setScale(Math.min(largura, altura) * 0.00051);

    const texto = this.add
      .text(centerX, centerY + altura * 0.12, mensagemTexto, {
        fontSize: `${Math.min(largura, altura) * 0.035}px`,
        fill: "#ffffff",
        fontFamily: "rainyhearts",
        align: "center",
        wordWrap: { width: largura * 0.34 },
      })
      .setOrigin(0.5)
      .setDepth(10);

    this.time.delayedCall(5670, () => {
      feedback.destroy();
      texto.destroy();
    });
  }
}
