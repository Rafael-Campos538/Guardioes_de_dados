// ./src/cenas/mapas/MapaTeste.js

export default class MapaTeste extends Phaser.Scene {
  constructor() {
    super({ key: "MapaTeste" });
    this.player = null;
    this.cursors = null;
  }

  preload() {
    // Carrega o tileset e o mapa
    this.load.image("tiles", "assets/mapas/MapaTeste/CP_V1.0.4.png");
    this.load.tilemapTiledJSON("mapa", "assets/mapas/MapaTeste/MapaTeste.json");

    // Carrega spritesheet do personagem - ajustando tamanho dos frames
    this.load.spritesheet(
      "personagem",
      "assets/personagens/spritesheets/menino3.png",
      {
        frameWidth: 64, // Tamanho de cada frame
        frameHeight: 64, // Altura de cada frame
      }
    );
  }

  create() {
    // Criando o tilemap
    const map = this.make.tilemap({ key: "mapa" });

    // Adicionando o tileset ao mapa
    const tileset = map.addTilesetImage("cp_tileset", "tiles");

    // Criando as camadas conforme definidas no seu Tiled
    const fundoLayer = map.createLayer("fundo", tileset);
    const colisaoLayer = map.createLayer("colisao", tileset);

    // Configurando colisões na camada de colisão
    colisaoLayer.setCollisionByExclusion([-1]);

    // Escalar as camadas do mapa - NOVA ADIÇÃO
    const escalaDoMapa = 3; // Ajuste esse valor conforme necessário
    fundoLayer.setScale(escalaDoMapa);
    colisaoLayer.setScale(escalaDoMapa);

    // Criando o personagem
    this.player = this.physics.add.sprite(
      100 * escalaDoMapa,
      100 * escalaDoMapa,
      "personagem"
    );

    // Ajuste a escala do personagem proporcionalmente ao mapa
    this.player.setScale(0.5 * escalaDoMapa);

    // Ajustando o hitbox do personagem
    this.player.body.setSize(32, 48);
    this.player.body.setOffset(16, 16);

    // Configurando física do personagem
    this.player.setCollideWorldBounds(true);

    // Configurando colisão entre jogador e camada de colisão
    this.physics.add.collider(this.player, colisaoLayer);

    // Definir os limites do mundo baseado no tamanho do mapa ESCALADO
    this.physics.world.bounds.width = map.widthInPixels * escalaDoMapa;
    this.physics.world.bounds.height = map.heightInPixels * escalaDoMapa;

    // Configurando controles
    this.cursors = this.input.keyboard.createCursorKeys();

    // Configurando câmera para seguir o personagem com o mapa ESCALADO
    this.cameras.main.setBounds(
      0,
      0,
      map.widthInPixels * escalaDoMapa,
      map.heightInPixels * escalaDoMapa
    );
    this.cameras.main.startFollow(this.player, true, 0.5, 0.5);

    // Criando animações de movimento
    this.createPlayerAnimations();

    // Botão para voltar ao menu principal
    const botaoVoltar = this.add
      .text(10, 10, "Voltar ao Menu", {
        fontSize: "20px",
        fill: "#fff",
        backgroundColor: "#333",
        padding: { x: 10, y: 5 },
      })
      .setInteractive()
      .setScrollFactor(0);

    botaoVoltar.on("pointerdown", () => {
      this.scene.start("MenuPrincipal");
    });
  }

  createPlayerAnimations() {
    // Animação andando para baixo (frames 0-6)
    this.anims.create({
      key: "down",
      frames: this.anims.generateFrameNumbers("personagem", {
        start: 0,
        end: 6,
      }),
      frameRate: 10,
      repeat: -1,
    });

    // Animação andando para cima (frames 7-13)
    this.anims.create({
      key: "up",
      frames: this.anims.generateFrameNumbers("personagem", {
        start: 7,
        end: 13,
      }),
      frameRate: 10,
      repeat: -1,
    });

    // Animação andando para direita (frames 14-20)
    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("personagem", {
        start: 14,
        end: 20,
      }),
      frameRate: 10,
      repeat: -1,
    });

    // Animação andando para esquerda (usar os mesmos frames da direita, mas espelhados)
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("personagem", {
        start: 14,
        end: 20,
      }),
      frameRate: 10,
      repeat: -1,
    });

    // Animações parado (usando o primeiro frame de cada direção)
    this.anims.create({
      key: "idle-down",
      frames: [{ key: "personagem", frame: 0 }],
      frameRate: 10,
    });

    this.anims.create({
      key: "idle-up",
      frames: [{ key: "personagem", frame: 7 }],
      frameRate: 10,
    });

    this.anims.create({
      key: "idle-right",
      frames: [{ key: "personagem", frame: 14 }],
      frameRate: 10,
    });

    this.anims.create({
      key: "idle-left",
      frames: [{ key: "personagem", frame: 14 }],
      frameRate: 10,
    });
  }
  update() {
    if (!this.cursors || !this.player) return;

    // Variável para armazenar a última direção do personagem
    if (!this.lastDirection) {
      this.lastDirection = "down";
    }

    // Velocidade de movimento (ajustada para a escala do mapa)
    const escalaDoMapa = 3; // Deve ser o mesmo valor usado no create()
    const speed = 120 * escalaDoMapa;

    // Controle do movimento do jogador
    let moving = false;

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-speed);
      this.player.anims.play("left", true);
      this.player.setFlipX(true); // Espelhar o sprite para olhar para esquerda
      this.lastDirection = "left";
      moving = true;
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(speed);
      this.player.anims.play("right", true);
      this.player.setFlipX(false); // Não espelhar o sprite
      this.lastDirection = "right";
      moving = true;
    } else {
      this.player.setVelocityX(0);
    }

    if (this.cursors.up.isDown) {
      this.player.setVelocityY(-speed);
      if (!this.cursors.left.isDown && !this.cursors.right.isDown) {
        this.player.anims.play("up", true);
        this.lastDirection = "up";
      }
      moving = true;
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityY(speed);
      if (!this.cursors.left.isDown && !this.cursors.right.isDown) {
        this.player.anims.play("down", true);
        this.lastDirection = "down";
      }
      moving = true;
    } else {
      this.player.setVelocityY(0);
    }

    // Se o jogador está parado
    if (!moving) {
      this.player.anims.play(`idle-${this.lastDirection}`, true);
    }
  }
}
