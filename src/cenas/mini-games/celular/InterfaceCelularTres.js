// ./src/cenas/mini-games/celular/InterfaceCelularTres.js

import HUD from "../../../componentes/HUD.js";
export default class InterfaceCelularTres extends Phaser.Scene {
  static mensagensDeletadas = new Set();
  static gruposDeletados = new Set();

  constructor() {
    super({ key: "InterfaceCelularTres" });
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
      "mensagem_clauudia",
      "assets/imagens/celular/mensagem_clauudia.png"
    );
    this.load.image(
      "mensagem_rafaeel",
      "assets/imagens/celular/mensagem_rafaeela.png"
    );
    this.load.image(
      "mensagem_gabriela",
      "assets/imagens/celular/mensagem_gabriela.png"
    );
    this.load.image(
      "mensagem_luiz",
      "assets/imagens/celular/mensagem_luiz.png"
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
      "mensagem_clauudia",
      "eoxisClauudia"
    );
    this.criarMensagem(
      centerX,
      centerY - altura * 0.057,
      "mensagem_rafaeel",
      "eoxisRafaeel"
    );
    this.criarMensagem(
      centerX,
      centerY + altura * 0.08,
      "mensagem_gabriela",
      "eoxisGabriela"
    );
    this.criarMensagem(
      centerX,
      centerY + altura * 0.222,
      "mensagem_luiz",
      "eoxisLuiz"
    );

    if (this.deletarBotao) this.deletarBotao.destroy();
    this.deletarBotao = this.add
      .image(centerX * 1.13, centerY - altura * 0.31, "deletargrupo")
      .setOrigin(0.5)
      .setScale(Math.min(largura, altura) * 0.00061)
      .setInteractive()
      .on("pointerdown", () => {
        InterfaceCelularTres.gruposDeletados.add(this.grupoAtual);
        this.hud.esconder();
        this.scene.start("JogoCelular");
      });
  }

  criarMensagem(centerX, posY, mensagemKey, eoxisKey) {
    const largura = this.cameras.main.width;
    const altura = this.cameras.main.height;

    if (InterfaceCelularTres.mensagensDeletadas.has(eoxisKey)) return;

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

        InterfaceCelularTres.mensagensDeletadas.add(eoxisKey);

        this.mostrarFeedback(true, eoxisKey);
      });
  }

  mostrarFeedback(isCorreto, eoxisKey) {
    const largura = this.cameras.main.width;
    const altura = this.cameras.main.height;
    const centerX = largura / 2;
    const centerY = altura / 2;

    const feedbackKey = "feedback_correto";

    const mensagens = {
      eoxisClauudia:
        "Boa! Não se deve pedir ou perguntar a religião de outras pessoas em nenhum momento.",
      eoxisRafaeel:
        "Boa! Você jamais deve expor sua religião a outras pessoas.",
      eoxisGabriela:
        "Boa! Um email não é considerado um dado sensível, mas deve ser pedido apenas com uma justificativa válida. ",
      eoxisLuiz:
        "EXCELENTE! Essa mensagem mostrava religião e email, onde religião jamais deve ser exposta e email apenas com uma justificativa válida.",
    };

    const mensagemTexto =
      mensagens[eoxisKey] ||
      "Boa! Você excluiu corretamente uma mensagem sensível.";

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
