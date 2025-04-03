// ./src/cenas/mapas/MapaEscola.js

export default class MapaEscola extends Phaser.Scene {
  constructor() {
    super({ key: "MapaEscola" });
    this.isResizing = false;
  }

  preload() {
    // Carrega o cenário da escola
    this.load.image(
      "fundo_escola",
      "assets/imagens/cenarios/fundoesolaini.png"
    );

    // Carrega as imagens para o personagem
    // Usando imagens individuais para a animação
    for (let i = 0; i <= 6; i++) {
      this.load.image(
        `bonecodir${i}`,
        `assets/personagens/animacoes/bonecodir${i}.png`
      );
      this.load.image(
        `bonecobax${i}`,
        `assets/personagens/animacoes/bonecobax${i}.png`
      );
      this.load.image(
        `bonecocim${i}`,
        `assets/personagens/animacoes/bonecocim${i}.png`
      );
    }
  }

  create() {
    // Configurações iniciais
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    // Adiciona o fundo
    this.background = this.add
      .image(width / 2, height / 2, "fundo_escola")
      .setOrigin(0.5)
      .setDisplaySize(width, height);

    // Adiciona o personagem
    this.player = this.add
      .sprite(width / 2, height / 2, "bonecobax0")
      .setOrigin(0.5)
      .setScale(0.8); // Escala reduzida

    // Adiciona um quadrado vermelho como ponto de interação
    this.cube = this.add.rectangle(width * 0.7, height * 0.5, 40, 40, 0xff0000);

    // Faz o cubo piscar para ser mais visível
    this.time.addEvent({
      delay: 300,
      callback: () => this.cube.setVisible(!this.cube.visible),
      loop: true,
    });

    // Cria as animações
    this.createAnimations();

    // Configura controles
    this.cursors = this.input.keyboard.createCursorKeys();
    this.speed = 4;
    this.lastDirection = "down";

    // Configura a câmera para seguir o jogador
    this.cameras.main.startFollow(this.player, true, 0.08, 0.08);

    // Configura eventos de redimensionamento
    this.scale.on("resize", this.resize, this);
  }

  resize(gameSize) {
    if (this.isResizing) return;
    this.isResizing = true;

    const width = gameSize.width;
    const height = gameSize.height;

    // Redimensionar o fundo
    if (this.background) {
      this.background.setPosition(width / 2, height / 2);
      this.background.setDisplaySize(width, height);
    }

    // Reposicionar o cubo se necessário
    if (this.cube) {
      this.cube.setPosition(width * 0.7, height * 0.5);
    }

    this.isResizing = false;
  }

  createAnimations() {
    // Animação para andar para a direita
    this.anims.create({
      key: "walk-right",
      frames: [
        { key: "bonecodir1" },
        { key: "bonecodir2" },
        { key: "bonecodir3" },
        { key: "bonecodir4" },
        { key: "bonecodir5" },
        { key: "bonecodir6" },
      ],
      frameRate: 10,
      repeat: -1,
    });

    // Animação para andar para a esquerda (usando os mesmos frames, mas espelhados)
    this.anims.create({
      key: "walk-left",
      frames: [
        { key: "bonecodir1" },
        { key: "bonecodir2" },
        { key: "bonecodir3" },
        { key: "bonecodir4" },
        { key: "bonecodir5" },
        { key: "bonecodir6" },
      ],
      frameRate: 10,
      repeat: -1,
    });

    // Animação para andar para baixo
    this.anims.create({
      key: "walk-down",
      frames: [
        { key: "bonecobax1" },
        { key: "bonecobax2" },
        { key: "bonecobax3" },
        { key: "bonecobax4" },
        { key: "bonecobax5" },
        { key: "bonecobax6" },
      ],
      frameRate: 10,
      repeat: -1,
    });

    // Animação para andar para cima
    this.anims.create({
      key: "walk-up",
      frames: [
        { key: "bonecocim1" },
        { key: "bonecocim2" },
        { key: "bonecocim3" },
        { key: "bonecocim4" },
        { key: "bonecocim5" },
        { key: "bonecocim6" },
      ],
      frameRate: 10,
      repeat: -1,
    });

    // Animações para o personagem parado
    this.anims.create({
      key: "idle-down",
      frames: [{ key: "bonecobax0" }],
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "idle-up",
      frames: [{ key: "bonecocim0" }],
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "idle-side",
      frames: [{ key: "bonecodir0" }],
      frameRate: 10,
      repeat: -1,
    });
  }

  update() {
    let moving = false;

    // Movimentação
    if (this.cursors.left.isDown) {
      this.player.x -= this.speed;
      this.player.setFlipX(true);
      this.player.play("walk-left", true);
      this.lastDirection = "side";
      moving = true;
    } else if (this.cursors.right.isDown) {
      this.player.x += this.speed;
      this.player.setFlipX(false);
      this.player.play("walk-right", true);
      this.lastDirection = "side";
      moving = true;
    }

    if (this.cursors.down.isDown) {
      this.player.y += this.speed;
      this.player.play("walk-down", true);
      this.lastDirection = "down";
      moving = true;
    } else if (this.cursors.up.isDown) {
      this.player.y -= this.speed;
      this.player.play("walk-up", true);
      this.lastDirection = "up";
      moving = true;
    }

    // Animação para personagem parado
    if (!moving) {
      if (this.lastDirection === "down") {
        this.player.play("idle-down", true);
      } else if (this.lastDirection === "up") {
        this.player.play("idle-up", true);
      } else {
        this.player.play("idle-side", true);
      }
    }

    // Verificar colisão com o cubo
    const hitCube = Phaser.Geom.Rectangle.Contains(
      this.cube.getBounds(),
      this.player.x,
      this.player.y
    );

    if (hitCube) {
      // Transição suave
      this.cameras.main.fadeOut(500, 0, 0, 0);
      this.time.delayedCall(500, () => {
        this.scene.start("TelaIntroducao");
      });
    }
  }
}
