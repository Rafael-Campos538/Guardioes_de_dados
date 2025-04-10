// ./src/cenas/menus/SelecaoPersonagem.js

export default class SelecaoPersonagem extends Phaser.Scene {
  constructor() {
    super({ key: "SelecaoPersonagem" });
  }

  preload() {
    this.load.font("Rainyhearts", "assets/fontes/rainyhearts.ttf");
    this.load.image("titulo", "assets/imagens/ui/tutorial_titulo.png");
    this.load.image("botao_retangular", "assets/imagens/botoes/botao_retangular.png");
    this.load.image("fundo", "assets/imagens/cenarios/fundooriginal.png");
    this.load.image("menina1", "assets/personagens/estaticos/menina1.png");
    this.load.image("menino2", "assets/personagens/estaticos/menino2.png"); // provavelmente está duplicado
    this.load.image("menino3", "assets/personagens/estaticos/menino3.png");
    this.load.image("menina3", "assets/personagens/estaticos/menina3.png"); // mesma imagem usada
    this.load.image("confirmar", "assets/imagens/botoes/confirmar.png");
  }

  create() {
    const largura = this.cameras.main.width;
    const altura = this.cameras.main.height;
    const espacamento = 150;
    const escala = 0.5;

    // Fundo com melhor controle de escala
    this.fundo = this.add
      .image(largura / 2, altura / 2, "fundo")
      .setOrigin(0.5)
      .setDisplaySize(largura, altura);

    this.personagens = ["menina1", "menino2", "menino3", "menina3"];
    this.selectedIndex = 0;

    const totalLargura = (this.personagens.length - 1) * espacamento;
    const xInicial = largura / 2 - totalLargura / 2;
    this.xInicial = xInicial;

    this.characterSprites = this.personagens.map((key, index) => {
      const x = xInicial + index * espacamento;
      let sprite = this.add.image(x, altura * 0.5, key).setInteractive();
      sprite.setScale(escala);
      sprite.on("pointerdown", () => this.selectCharacter(index));
      return sprite;
    });

    this.selector = this.add.rectangle(
      xInicial + this.selectedIndex * espacamento,
      altura * 0.5,
      120,
      240,
      0xffffff,
      0.3
    );
    this.selector.setStrokeStyle(2, 0xffd700);

    this.confirmar = this.add
      .image(largura / 2, altura * 0.8, "confirmar")
      .setInteractive();
    this.confirmar.setScale(0.8);
    this.confirmar.on("pointerdown", () => this.confirmSelection());

    // Título melhor posicionado
    this.titulo = this.add
      .text(largura * 0.5, altura * 0.2, "Selecione seu Personagem", {
        fontSize: Math.min(largura, altura) * 0.05,
        fill: "#000080",
        fontFamily: "guardioes_dados",
        align: "center",
        stroke: "#ADD8E6",
        strokeThickness: 6,
      })
      .setOrigin(0.5);

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

    botaoMenu.on("pointerdown", () => this.scene.start("MenuPrincipal"));
    textoMenu.on("pointerdown", () => this.scene.start("MenuPrincipal"));

    this.atualizarVisibilidadeVoltar();
  }

  update() {
    // Destaca o personagem selecionado
    this.characterSprites.forEach((sprite, index) => {
      sprite.setAlpha(index === this.selectedIndex ? 1 : 0.5);
    });
  }

  selectCharacter(index) {
    this.selectedIndex = index;
    this.updateSelector();
  }

  updateSelector() {
    this.selector.x = this.xInicial + this.selectedIndex * 150;
  }

  confirmSelection() {
    const personagemSelecionado = this.personagens[this.selectedIndex];
    this.registry.set("personagemSelecionado", personagemSelecionado); // variável global
    this.scene.start("DialogoInicial"); //DialogoInicial
  }

  voltarMenuPrincipal() {
    this.scene.start("MenuPrincipal");
    this.sound.play("botao");
  }

  createButton(x, y, text, callback) {
    const button = this.add.image(x, y, "botao_retangular").setInteractive();
    button.setScale(0.3);
    button.on("pointerdown", () => {
      callback();
      this.sound.play("botao");
    });
  }
}
