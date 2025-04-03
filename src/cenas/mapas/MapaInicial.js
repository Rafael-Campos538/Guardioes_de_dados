// ./src/cenas/mapas/MapaInicial.js

export default class MapaInicial extends Phaser.Scene {
  constructor() {
    super({ key: "MapaInicial" });
  }

  // Método correto para inicializar variáveis ao iniciar a cena
  init() {
    this.xi = 1600;
    this.yi = 800;
    this.xf = -100;
    this.yf = 100;
    this.t_total = 2000;
    this.t = 0;

    // Movimento Uniforme no eixo X
    this.vx = (this.xf - this.xi) / this.t_total;
    this.x = this.xi;

    // Movimento Uniformemente Variado no eixo Y
    this.vy = 0;
    this.y = this.yi;
    this.ay = (2 * (this.yf - this.yi)) / this.t_total ** 2;
  }

  preload() {
    this.load.image("cena1", "assets/imagens/cenarios/cena_1.png");

    // Carregar spritesheet corretamente
    this.load.spritesheet(
      "menina1",
      "assets/personagens/spritesheets/menina1.png",
      {
        frameWidth: 64, // Cada frame tem 64 pixels de largura
        frameHeight: 64, // Cada frame tem 64 pixels de altura
        startFrame: 0, // Começando do primeiro frame
        endFrame: 20, // Total de 21 frames (0-20)
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
    const centerX = this.cameras.main.width / 2;
    const centerY = this.cameras.main.height / 2;

    this.cameras.main.setZoom(1.5);

    const background = this.add
      .image(0, 0, "cena1")
      .setOrigin(0, 0)
      .setDisplaySize(
        this.cameras.main.width * 1.5,
        this.cameras.main.height * 1.5
      );

    this.player = this.add
      .sprite(centerX, centerY, "menina1")
      .setOrigin(0.5)
      .setScale(1.7);

    // Adiciona um quadrado vermelho no centro do mapa
    this.cube = this.add.rectangle(550, 450, 30, 30, 0xff0000);

    // Faz o quadrado vermelho piscar a cada 500ms
    this.time.addEvent({
      delay: 300,
      callback: () => {
        this.cube.setVisible(!this.cube.visible);
      },
      loop: true,
    });

    // Animações para a menina
    this.anims.create({
      key: "turn",
      frames: [{ key: "menina1", frame: 0 }],
      frameRate: 20,
    });

    // Animação para baixo (frames 0-6)
    this.anims.create({
      key: "down",
      frames: this.anims.generateFrameNumbers("menina1", { start: 0, end: 6 }),
      frameRate: 10,
      repeat: -1,
    });

    // Animação para cima (frames 7-13)
    this.anims.create({
      key: "up",
      frames: this.anims.generateFrameNumbers("menina1", { start: 7, end: 13 }),
      frameRate: 10,
      repeat: -1,
    });

    // Animação para esquerda/direita (frames 14-20)
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("menina1", {
        start: 14,
        end: 20,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("menina1", {
        start: 14,
        end: 20,
      }),
      frameRate: 10,
      repeat: -1,
    });

    // Configurar teclas de cursor
    this.cursors = this.input.keyboard.createCursorKeys();

    // Configurar passarinho
    this.passarinho = this.add
      .sprite(this.xi, this.yi, "passarinho")
      .setScale(0.2);

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

    this.passarinho.anims.play("fly", false);
  }

  update(delta) {
    //movimentação do jogador
    const speed = 3; // Velocidade do player

    if (this.cursors.left.isDown) {
      this.player.x -= speed;
      this.player.anims.play("left", true);
      this.player.setFlipX(true); // Inverte a imagem do jogador
    } else if (this.cursors.right.isDown) {
      this.player.x += speed;
      this.player.anims.play("right", true);
      this.player.setFlipX(false);
    } else if (this.cursors.up.isDown) {
      this.player.y -= speed;
      this.player.anims.play("up", true);
    } else if (this.cursors.down.isDown) {
      this.player.y += speed;
      this.player.anims.play("down", true);
    } else {
      this.player.anims.play("turn");
    }

    // Verifica se o player tocou no quadrado vermelho
    if (
      this.player.x < this.cube.x + this.cube.width / 2 &&
      this.player.x > this.cube.x - this.cube.width / 2 &&
      this.player.y < this.cube.y + this.cube.height / 2 &&
      this.player.y > this.cube.y - this.cube.height / 2
    ) {
      this.scene.start("MapaEscola"); // Atualizado para o novo nome da cena
    }

    //passarinho
    if (this.passarinho && this.t <= this.t_total) {
      const dt = delta / 1000; // Converter delta para segundos
      this.t += dt;

      // Atualizando posição no eixo X (MU)
      this.x = this.xi + this.vx * this.t;
      this.passarinho.x = this.x;
      console.log(
        `Tempo: ${this.t.toFixed(2)}s - X: ${this.x.toFixed(
          2
        )}m - Velocidade X: ${this.vx.toFixed(2)}m/s`
      );

      // Atualizando posição no eixo Y (MUV)
      this.vy = this.ay * this.t;
      this.y = this.yi + (this.vy * this.t) / 2;
      this.passarinho.y = this.y;
      console.log(
        `Tempo: ${this.t.toFixed(2)}s - Y: ${this.y.toFixed(
          2
        )}m - Velocidade Y: ${this.vy.toFixed(
          2
        )}m/s - Aceleração Y: ${this.ay.toFixed(2)}m/s²`
      );
    }
  }
}
