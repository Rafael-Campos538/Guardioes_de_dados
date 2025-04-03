// ./src/cenas/mapas/MapaInicial.js

export default class MapaInicial extends Phaser.Scene {
  constructor() {
    super({ key: "MapaInicial" });
  }

  init() {
    // Inicialização de variáveis para o pássaro
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

    // Flag para controlar o redimensionamento
    this.isResizing = false;
  }

  preload() {
    // Carregando o fundo correto
    this.load.image("fundo_mapa", "assets/imagens/cenarios/fundocenaini.png");

    // Carregando o spritesheet corretamente
    this.load.spritesheet(
      "menina_sprite",
      "assets/personagens/spritesheets/menina1.png",
      {
        frameWidth: 64, // Cada frame tem 64 pixels de largura
        frameHeight: 64, // Cada frame tem 64 pixels de altura
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
  }

  create() {
    // Obtém dimensões da tela
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    // Adiciona o fundo
    this.background = this.add
      .image(width / 2, height / 2, "fundo_mapa")
      .setOrigin(0.5)
      .setDisplaySize(width, height);

    // Adiciona o jogador em escala apropriada (muito menor)
    this.player = this.add
      .sprite(width / 2, height / 2, "menina_sprite")
      .setOrigin(0.5)
      .setScale(0.6); // Escala reduzida significativamente

    // Cria as animações para o jogador
    this.createAnimations();

    // Adiciona o cubo vermelho que pisca
    this.cube = this.add.rectangle(width * 0.7, height * 0.5, 40, 40, 0xff0000);
    this.time.addEvent({
      delay: 300,
      callback: () => this.cube.setVisible(!this.cube.visible),
      loop: true,
    });

    // Configura o passarinho
    this.passarinho = this.add
      .sprite(this.xi, this.yi, "passarinho")
      .setScale(0.2);
    this.passarinho.anims.play("fly", true);

    // Configuração de controles
    this.cursors = this.input.keyboard.createCursorKeys();

    // Configuração de eventos de resize
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
    // Animação para baixo (frames 0-6)
    this.anims.create({
      key: "walk-down",
      frames: this.anims.generateFrameNumbers("menina_sprite", {
        start: 0,
        end: 6,
      }),
      frameRate: 10,
      repeat: -1,
    });

    // Animação para cima (frames 7-13)
    this.anims.create({
      key: "walk-up",
      frames: this.anims.generateFrameNumbers("menina_sprite", {
        start: 7,
        end: 13,
      }),
      frameRate: 10,
      repeat: -1,
    });

    // Animação para lado (frames 14-20)
    this.anims.create({
      key: "walk-side",
      frames: this.anims.generateFrameNumbers("menina_sprite", {
        start: 14,
        end: 20,
      }),
      frameRate: 10,
      repeat: -1,
    });

    // Animação do passarinho
    this.anims.create({
      key: "fly",
      frames: this.anims.generateFrameNumbers("passarinho", {
        start: 0,
        end: 8,
      }),
      frameRate: 10,
      repeat: -1,
    });

    // Animações de idle (parado)
    this.anims.create({
      key: "idle",
      frames: [{ key: "menina_sprite", frame: 0 }],
      frameRate: 10,
    });
  }

  update(time, delta) {
    // Velocidade do jogador
    const speed = 4;
    let moving = false;

    // Movimentação
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

    // Se não estiver se movendo, mostrar animação idle
    if (!moving) {
      this.player.anims.play("idle", true);
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
        this.scene.start("MapaEscola");
      });
    }

    // Atualiza o passarinho (movimento)
    if (this.passarinho && this.t <= this.t_total) {
      const dt = delta / 1000; // Converter delta para segundos
      this.t += dt;

      // Posição X (MU)
      this.x = this.xi + this.vx * this.t;
      this.passarinho.x = this.x;

      // Posição Y (MUV)
      this.vy = this.ay * this.t;
      this.y = this.yi + (this.vy * this.t) / 2;
      this.passarinho.y = this.y;
    }
  }
}
