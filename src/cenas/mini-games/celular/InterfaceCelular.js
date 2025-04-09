// Variável mensagensSensiveisDeletadas ficará true quando o jogador deletar todas as mensagens sensíveis e se ele tentar deletar o grupo sem deletar todas as mensagens, o jogo não irá exibir um toast.

// Para exibir o toast é só usar this.toast.showMessage("Mensagem aqui");
var mensagensSensiveisDeletadas = false;
export default class InterfaceCelular extends Phaser.Scene {
  static mensagensDeletadas = new Set();
  static gruposDeletados = new Set();

  constructor() {
    super({ key: "InterfaceCelular" });
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
      "mensagem_claudia",
      "assets/imagens/celular/mensagem_claudia.png"
    );
    this.load.image(
      "mensagem_joao",
      "assets/imagens/celular/mensagem_joao.png"
    );
    this.load.image("mensagem_ana", "assets/imagens/celular/mensagem_ana.png");
    this.load.image(
      "mensagem_pedro",
      "assets/imagens/celular/mensagem_pedro.png"
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
    this.load.scenePlugin(
      "rexuiplugin",
      "https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js",
      "rexUI",
      "rexUI"
    );
  }

  init(data) {
    this.grupoAtual = data.grupo; // Recebe o grupo clicado da cena anterior
  }

  create() {
    this.atualizarCena();
    this.scale.on("resize", this.atualizarCena, this);
    this.toast = this.rexUI.add.toast({
      x: this.cameras.main.centerX,
      y: this.cameras.main.centerY,

      // Fundo com borda azul e interior escuro semi-transparente
      background: this.rexUI.add
        .roundRectangle(0, 0, 2, 2, 20, 0x00ccff)
        .setStrokeStyle(3, 0x00ccff) // Borda #00ccff
        .setFillStyle(0x010100, 0.8), // Fundo #010100 com 80% de opacidade

      // Texto branco
      text: this.add.text(0, 0, "", {
        fontSize: "24px",
        fontFamily: "Arial",
        color: "#ffffff", // Texto branco
        align: "center",
      }),

      space: {
        left: 25,
        right: 25,
        top: 20,
        bottom: 20,
      },

      duration: {
        in: 300,
        hold: 2500,
        out: 300,
      },
    });
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
      "mensagem_claudia",
      "eoxisClaud"
    );
    this.criarMensagem(
      centerX,
      centerY - altura * 0.057,
      "mensagem_joao",
      "eoxisJoao"
    );
    this.criarMensagem(
      centerX,
      centerY + altura * 0.08,
      "mensagem_ana",
      "eoxisAna"
    );
    this.criarMensagem(
      centerX,
      centerY + altura * 0.222,
      "mensagem_pedro",
      "eoxisPedro"
    );

    if (this.deletarBotao) this.deletarBotao.destroy();
    this.deletarBotao = this.add
      .image(centerX * 1.13, centerY - altura * 0.31, "deletargrupo")
      .setOrigin(0.5)
      .setScale(Math.min(largura, altura) * 0.00061)
      .setInteractive()
      .on("pointerdown", () => {
        if (mensagensSensiveisDeletadas) {
          InterfaceCelular.gruposDeletados.add(this.grupoAtual); // Marca grupo como deletado
          this.scene.start("JogoCelular");
        } else {
          this.toast.showMessage(
            "Ops! Você não deletou todas as mensagens sensíveis."
          );
        }
      });
  }

  criarMensagem(centerX, posY, mensagemKey, eoxisKey) {
    const largura = this.cameras.main.width;
    const altura = this.cameras.main.height;

    if (InterfaceCelular.mensagensDeletadas.has(eoxisKey)) return;

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

        InterfaceCelular.mensagensDeletadas.add(eoxisKey);

        const mensagemCorreta = eoxisKey === "eoxisPedro";
        if (mensagemCorreta) {
          mensagensSensiveisDeletadas = true;
        }
        this.mostrarFeedback(mensagemCorreta);
      });
  }

  mostrarFeedback(isCorreto) {
    const largura = this.cameras.main.width;
    const altura = this.cameras.main.height;
    const centerX = largura / 2;
    const centerY = altura / 2;

    const feedbackKey = isCorreto ? "feedback_correto" : "feedback_incorreto";
    const mensagemTexto = isCorreto
      ? "Boa! Essa mensagem possuia pedido de CPF, e por serem menores de idade, devem pedir autorização aos pais ou responsáveis."
      : "Ops! Essa não era uma mensagem sensivel, então não precisava ser excluida.";

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
