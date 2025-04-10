// ./src/cenas/mapas/MapaInicial.js

import HUD from "../../componentes/HUD.js";

export default class MapaInicial extends Phaser.Scene {
  constructor() {
    super({ key: "MapaInicial" });
  }

  init() {
    this.xi = 1600;
    this.yi = 800;
    this.xf = -100;
    this.yf = 100;
    this.t_total = 2000;
    this.t = 0;
    this.vx = (this.xf - this.xi) / this.t_total;
    this.x = this.xi;
    this.vy = 0;
    this.y = this.yi;
    this.ay = (2 * (this.yf - this.yi)) / this.t_total ** 2;

    this.isResizing = false;
  }

  preload() {
    this.load.image("fundo_mapa", "assets/imagens/cenarios/fundocenaini.png");
    this.load.image("alerta_mapa", "assets/imagens/cenarios/AlertaMapaGeral.png");

    const personagemSelecionado = this.registry.get("personagemSelecionado");
    this.load.spritesheet(
      "personagem_sprite",
      `assets/personagens/spritesheets/${personagemSelecionado}.png`,
      {
        frameWidth: 64,
        frameHeight: 64,
      }
    );

    this.load.spritesheet(
      "passarinho",
      "assets/personagens/spritesheets/passarinho.png",
      {
        frameWidth: 384,
        frameHeight: 384,
      }
    );

    this.load.image("icone_exclamacao", "assets/imagens/ui/exclamacao.png");
  }

  create() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    this.background = this.add
      .image(width / 2, height / 2, "fundo_mapa")
      .setOrigin(0.5)
      .setDisplaySize(width, height);

    // ADIÇÃO: Mostrar alerta_mapa no centro por 5 segundos
    const alerta = this.add
      .image(width / 2, height / 2, "alerta_mapa")
      .setOrigin(0.5)
      .setDepth(100); // garantir que fique no topo

    this.time.delayedCall(5000, () => {
      alerta.destroy();
    });

    this.hud = new HUD(this);
    this.hud.mostrar();

    this.player = this.add
      .sprite(width / 2, height / 2, "personagem_sprite")
      .setOrigin(0.5)
      .setScale(1.4);

    this.createAnimations();

    this.cube = this.add.rectangle(width * 0.853, height * 0.38, 40, 40, 0xff0000);
    this.time.addEvent({
      delay: 300,
      callback: () => this.cube.setVisible(!this.cube.visible),
      loop: true,
    });

    this.exclamacao = this.add
      .image(this.cube.x, this.cube.y - 80, "icone_exclamacao")
      .setOrigin(0.5)
      .setScale(0.15);

    this.time.addEvent({
      delay: 300,
      callback: () => {
        this.exclamacao.setVisible(!this.exclamacao.visible);
      },
      loop: true,
    });

    this.passarinho = this.add
      .sprite(this.xi, this.yi, "passarinho")
      .setScale(0.2);
    this.passarinho.anims.play("fly", true);

    this.cursors = this.input.keyboard.createCursorKeys();

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

    if (this.exclamacao) {
      this.exclamacao.setPosition(this.cube.x, this.cube.y - 80);
    }

    this.isResizing = false;
  }

  createAnimations() {
    this.anims.create({
      key: "walk-down",
      frames: this.anims.generateFrameNumbers("personagem_sprite", {
        start: 0,
        end: 6,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "walk-up",
      frames: this.anims.generateFrameNumbers("personagem_sprite", {
        start: 7,
        end: 13,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "walk-side",
      frames: this.anims.generateFrameNumbers("personagem_sprite", {
        start: 14,
        end: 20,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "fly",
      frames: this.anims.generateFrameNumbers("passarinho", {
        start: 0,
        end: 8,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "idle",
      frames: [{ key: "personagem_sprite", frame: 0 }],
      frameRate: 10,
    });
  }

  update(time, delta) {
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

    const hitCube = Phaser.Geom.Rectangle.Contains(
      this.cube.getBounds(),
      this.player.x,
      this.player.y
    );

    if (hitCube) {
      this.cameras.main.fadeOut(500, 0, 0, 0);
      this.time.delayedCall(500, () => {
        this.hud.esconder();
        this.scene.start("MapaEscola");
      });
    }

    if (this.passarinho && this.t <= this.t_total) {
      const dt = delta / 1000;
      this.t += dt;

      this.x = this.xi + this.vx * this.t;
      this.passarinho.x = this.x;

      this.vy = this.ay * this.t;
      this.y = this.yi + (this.vy * this.t) / 2;
      this.passarinho.y = this.y;
    }
  }
}
