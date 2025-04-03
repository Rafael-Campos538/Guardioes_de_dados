// ./src/cenas/menus/SelecaoPersonagem.js

class SelecaoPersonagem extends Phaser.Scene {
  constructor() {
    super({ key: "SelecaoPersonagem" });
  }

  preload() {
    this.load.image("menina1", "assets/personagens/menina1.png");
    this.load.image("menino1", "assets/personagens/menino1.png");
    this.load.image("menino3", "assets/personagens/menino3.png");
    this.load.image("confirmar", "assets/imagens/botoes/confirmar.png");
  }

  create() {
    this.personagens = ["menina1", "menina3", "menino1", "menino3"];
    this.selectedIndex = 0;

    this.characterSprites = this.personagens.map((key, index) => {
      let sprite = this.add.image(200 + index * 150, 300, key).setInteractive();
      sprite.setScale(0.5);
      sprite.on("pointerdown", () => this.selectCharacter(index));
      return sprite;
    });

    this.selector = this.add.rectangle(200, 300, 120, 150, 0xffffff, 0.3);
    this.selector.setStrokeStyle(2, 0xffd700);
    this.updateSelector();

    this.confirmar = this.add.image(700, 600, "confirmar").setInteractive();
    this.confirmar.setScale(0.2);
    this.confirmar.on("pointerdown", () => this.confirmSelection());
  }

  update() {
    // Atualiza a posição do seletor com base no personagem selecionado
    this.characterSprites.forEach((sprite, index) => {
      sprite.setAlpha(index === this.selectedIndex ? 1 : 0.5);
    });
  }

  // Método para selecionar o personagem
  selectCharacter(index) {
    this.selectedIndex = index;
    this.updateSelector();
  }

  updateSelector() {
    this.selector.x = 200 + this.selectedIndex * 150;
  }

  confirmSelection() {
    this.scene.start("DialogoInicial"); // Atualizado para o novo nome da cena
  }
}

window.SelecaoPersonagem = SelecaoPersonagem;
