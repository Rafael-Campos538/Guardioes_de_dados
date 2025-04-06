// ./src/cenas/menus/SelecaoPersonagem.js

export default class SelecaoPersonagem extends Phaser.Scene {
  constructor() {
    super({ key: "SelecaoPersonagem" });
  }

  preload() {
    this.load.image("menina1", "assets/personagens/estaticos/menina1.png");
    this.load.image("menino2", "assets/personagens/estaticos/menino2.png"); // provavelmente está duplicado
    this.load.image("menino3", "assets/personagens/estaticos/menino3.png");
    this.load.image("menina3", "assets/personagens/estaticos/menina3.png"); // mesma imagem usada
    this.load.image("confirmar", "assets/imagens/botoes/confirmar.png");
  }

  create() {
    const larguraTela = this.cameras.main.width;
    const espacamento = 150;
    const escala = 0.5;

    this.personagens = ["menina1", "menino2", "menino3", "menina3"];
    this.selectedIndex = 0;

    const totalLargura = (this.personagens.length - 1) * espacamento;
    const xInicial = larguraTela / 2 - totalLargura / 2;
    this.xInicial = xInicial;

    this.characterSprites = this.personagens.map((key, index) => {
      const x = xInicial + index * espacamento;
      let sprite = this.add.image(x, 300, key).setInteractive();
      sprite.setScale(escala);
      sprite.on("pointerdown", () => this.selectCharacter(index));
      return sprite;
    });

    this.selector = this.add.rectangle(
      xInicial + this.selectedIndex * espacamento,
      300,
      120,
      150,
      0xffffff,
      0.3
    );
    this.selector.setStrokeStyle(2, 0xffd700);

    this.confirmar = this.add.image(larguraTela / 2, 700, "confirmar").setInteractive();
    this.confirmar.setScale(0.2);
    this.confirmar.on("pointerdown", () => this.confirmSelection());
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
    this.scene.start("DialogoInicial");
  }
}
