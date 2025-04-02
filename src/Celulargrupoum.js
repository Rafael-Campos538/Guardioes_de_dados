// ./src/Celulargrupoum.js

class Celulargrupoum extends Phaser.Scene {
  constructor() {
    super({ key: "Celulargrupoum" });
  }

  preload() {
    this.load.image("fundominigame2", "assets/imagens/fundominigame2.png"); // Fundo
    this.load.image("celularmensagens", "assets/imagens/celularmensagens.png"); // Imagem do celular
    this.load.image("deletargrupo", "assets/imagens/deletargrupo.png"); // Imagem do botão
    this.load.image("mensagemclaud", "assets/imagens/mensagemclaud.png"); // Imagem da mensagem da Claudia
    this.load.image("mensagemjoao", "assets/imagens/mensagemjoao.png"); // Imagem da mensagem do João
    this.load.image("mensagemana", "assets/imagens/mensagemana.png"); // Imagem da mensagem da Ana
    this.load.image("mensagempedro", "assets/imagens/mensagempedro.png"); // Imagem da mensagem do Pedro
    this.load.image("eoxiscell", "assets/imagens/eoxiscell.png"); // Ícone de exclusão ao lado das mensagens
  }

  create() {
    this.atualizarCena(); // Configura a cena
    this.scale.on("resize", this.atualizarCena, this); // Adapta elementos ao redimensionar tela
  }

  atualizarCena() {
    const largura = this.cameras.main.width;
    const altura = this.cameras.main.height;
    const centerX = largura / 2;
    const centerY = altura / 2;

    // Fundo responsivo
    if (this.fundo) this.fundo.destroy();
    this.fundo = this.add
      .image(centerX, centerY, "fundominigame2")
      .setOrigin(0.5)
      .setDisplaySize(largura, altura);

    // Celular no centro da tela
    if (this.celular) this.celular.destroy();
    this.celular = this.add
      .image(centerX, centerY, "celularmensagens")
      .setOrigin(0.5)
      .setScale(Math.min(largura, altura) * 0.00053);

    // Função para criar mensagens e botões de exclusão
    this.criarMensagem(
      centerX,
      centerY - altura * 0.2,
      "mensagemclaud",
      "eoxisClaud"
    );
    this.criarMensagem(
      centerX,
      centerY - altura * 0.057,
      "mensagemjoao",
      "eoxisJoao"
    );
    this.criarMensagem(
      centerX,
      centerY + altura * 0.08,
      "mensagemana",
      "eoxisAna"
    );
    this.criarMensagem(
      centerX,
      centerY + altura * 0.222,
      "mensagempedro",
      "eoxisPedro"
    );

    // Botão "deletargrupo" mais para cima e responsivo
    if (this.deletarBotao) this.deletarBotao.destroy();
    this.deletarBotao = this.add
      .image(centerX * 1.13, centerY - altura * 0.31, "deletargrupo")
      .setOrigin(0.5)
      .setScale(Math.min(largura, altura) * 0.00061)
      .setInteractive()
      .on("pointerdown", () => {
        console.log("Botão de deletar grupo clicado!");
      });
  }

  criarMensagem(centerX, posY, mensagemKey, eoxisKey) {
    const largura = this.cameras.main.width;
    const altura = this.cameras.main.height;

    let mensagem = this.add
      .image(centerX - largura * 0.025, posY, mensagemKey)
      .setOrigin(0.5)
      .setScale(Math.min(largura, altura) * 0.00053);

    let eoxis = this.add
      .image(centerX + largura * 0.053, posY + altura * 0.01, "eoxiscell")
      .setOrigin(0.5)
      .setScale(Math.min(largura, altura) * 0.0014)
      .setInteractive()
      .on("pointerdown", () => {
        mensagem.destroy();
        eoxis.destroy();
      });
  }
}

window.Celulargrupoum = Celulargrupoum;
