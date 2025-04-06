// ./src/cenas/mapas/MapaEscola.js

export default class MapaEscola extends Phaser.Scene {
  constructor() {
    super({ key: "MapaEscola" });
    this.isResizing = false;
  }

  preload() {
    // Carrega o cenário da escola
    this.load.image("fundo_escola", "assets/imagens/cenarios/fundoesolaini.png");

    // Carrega o spritesheet do personagem selecionado
    const personagemSelecionado = this.registry.get("personagemSelecionado");
    this.load.spritesheet(
      "personagem_sprite",
      `assets/personagens/spritesheets/${personagemSelecionado}.png`,
      {
        frameWidth: 64,
        frameHeight: 64,
      }
    );
  }

  create() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    // Adiciona o fundo
    this.background = this.add
      .image(width / 2, height / 2, "fundo_escola")
      .setOrigin(0.5)
      .setDisplaySize(width, height);

    // Adiciona o jogador com o spritesheet selecionado
    this.player = this.add
      .sprite(width / 2, height / 2, "personagem_sprite")
      .setOrigin(0.5)
      .setScale(1.4);

    // Cria as animações
    this.createAnimations();

    // Adiciona o cubo vermelho que pisca
    this.cube = this.add.rectangle(width * 0.7, height * 0.5, 40, 40, 0xff0000);
    this.time.addEvent({
      delay: 300,
      callback: () => this.cube.setVisible(!this.cube.visible),
      loop: true,
    });

    // Configuração de controles
    this.cursors = this.input.keyboard.createCursorKeys();

    // Evento de resize
    this.scale.on("resize", this.resize, this);
  }

  resize(gameSize) {
    if (this.isResizing) return;
    this.isResizing = true;

    const width = gameSize.width;
    const height = gameSize.height;

    if (this.background) {
      this.background.setPosition(width / 2, height / 2);
      this.background.setDisplaySize(width, height);
    }

    if (this.cube) {
      this.cube.setPosition(width * 0.7, height * 0.5);
    }

    this.isResizing = false;
  }

  createAnimations() {
    // Animação para baixo (frames 0-6)
    this.anims.create({
      key: "walk-down",
      frames: this.anims.generateFrameNumbers("personagem_sprite", {
        start: 0,
        end: 6,
      }),
      frameRate: 10,
      repeat: -1,
    });

    // Animação para cima (frames 7-13)
    this.anims.create({
      key: "walk-up",
      frames: this.anims.generateFrameNumbers("personagem_sprite", {
        start: 7,
        end: 13,
      }),
      frameRate: 10,
      repeat: -1,
    });

    // Animação para os lados (frames 14-20)
    this.anims.create({
      key: "walk-side",
      frames: this.anims.generateFrameNumbers("personagem_sprite", {
        start: 14,
        end: 20,
      }),
      frameRate: 10,
      repeat: -1,
    });

    // Animação idle (parado)
    this.anims.create({
      key: "idle",
      frames: [{ key: "personagem_sprite", frame: 0 }],
      frameRate: 10,
    });
  }

  update() {
    const speed = 4;
    let moving = false;

    if (this.cursors.left.isDown) {
      this.player.x -= speed;
      this.player.anims.play("walk-side", true);
      this.player.setFlipX(true);
      moving = true;
    } else if (this.cursors.right.isDown) {
      this.player.x += speed;
      this.player.anims.play("walk-side", true);
      this.player.setFlipX(false);
      moving = true;
    }

    if (this.cursors.up.isDown) {
      this.player.y -= speed;
      this.player.anims.play("walk-up", true);
      moving = true;
    } else if (this.cursors.down.isDown) {
      this.player.y += speed;
      this.player.anims.play("walk-down", true);
      moving = true;
    }

    if (!moving) {
      this.player.anims.play("idle", true);
    }

    // Verifica colisão com o cubo
    const hitCube = Phaser.Geom.Rectangle.Contains(
      this.cube.getBounds(),
      this.player.x,
      this.player.y
    );

    if (hitCube) {
      this.cameras.main.fadeOut(500, 0, 0, 0);
      this.time.delayedCall(500, () => {
        this.scene.start("TelaIntroducao");
      });
    }
  }
}
