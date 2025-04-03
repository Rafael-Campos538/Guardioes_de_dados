// ./src/cenas/mini-games/celular/InterfaceCelular.js

class InterfaceCelular extends Phaser.Scene {
  constructor() {
    super({ key: "InterfaceCelular" });
  }

  preload() {
    this.load.image(
      "fundominigame2",
      "assets/imagens/cenarios/fundominigame2.png"
    ); // Fundo
    this.load.image(
      "celularmensagens",
      "assets/imagens/celular/celularmensagens.png"
    ); // Imagem do celular
    this.load.image("deletargrupo", "assets/imagens/celular/deletargrupo.png"); // Imagem do botão
    this.load.image(
      "mensagem_claudia",
      "assets/imagens/celular/mensagem_claudia.png"
    ); // Imagem da mensagem da Claudia
    this.load.image(
      "mensagem_joao",
      "assets/imagens/celular/mensagem_joao.png"
    ); // Imagem da mensagem do João
    this.load.image("mensagem_ana", "assets/imagens/celular/mensagem_ana.png"); // Imagem da mensagem da Ana
    this.load.image(
      "mensagem_pedro",
      "assets/imagens/celular/mensagem_pedro.png"
    ); // Imagem da mensagem do Pedro
    this.load.image(
      "excluir_mensagem",
      "assets/imagens/celular/excluir_mensagem.png"
    ); // Ícone de exclusão ao lado das mensagens
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
      });
  }
}

window.InterfaceCelular = InterfaceCelular;
