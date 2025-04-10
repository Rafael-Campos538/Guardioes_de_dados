// ./src/cenas/mapas/MapaInicial.js

import HUD from "../../componentes/HUD.js";

function bresenhamLine(x1, y1, x2, y2) {
  const points = [];

  // Determine whether the line is steep: slope > 1 or slope < -1
  const steep = Math.abs(y2 - y1) > Math.abs(x2 - x1);

  // If steep, we transpose the line (swap x and y)
  if (steep) {
    [x1, y1] = [y1, x1];
    [x2, y2] = [y2, x2];
  }

  // Ensure we always draw from left to right
  if (x1 > x2) {
    [x1, x2] = [x2, x1];
    [y1, y2] = [y2, y1];
  }

  const dx = x2 - x1;
  const dy = Math.abs(y2 - y1);
  let error = Math.floor(dx / 2);
  const yStep = (y1 < y2) ? 1 : -1;
  let y = y1;

  // Iterate over bounding box generating points between start and end
  for (let x = x1; x <= x2; x++) {
    // Un-transpose if the line was steep
    if (steep) {
      points.push([y, x]);
    } else {
      points.push([x, y]);
    }

    error -= dy;
    if (error < 0) {
      y += yStep;
      error += dx;
    }
  }

  return points;
}

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

    // this.textures.generate('pixel', {
    //   data: ['0xFFFFFF'],
    //   pixelWidth: 1,
    //   pixelHeight: 1
    // });
  }

  create() {
    // this.width = this.cameras.main.width;
    // this.height = this.cameras.main.height;
    this.width = 1280;
    this.height = 632;
    // console.log(this.width, this.height);

    // maps a screen‐pixel X into a world‐unit X
    function mapX(x, screenWidth, worldWidth) {
      return x * worldWidth / screenWidth * 2;
    }

    // maps a screen‐pixel Y into a world‐unit Y
    function mapY(y, screenHeight, worldHeight) {
      return y * worldHeight / screenHeight * 2.7;
    }

    // this.phyiscs.world.setBounds(0, 0, this.width, this.height);

    this.background = this.add
      .image(this.width / 2, this.height / 2, "fundo_mapa")
      .setOrigin(0.5)
      .setDisplaySize(this.width, this.height);

    // ADIÇÃO: Mostrar alerta_mapa no centro por 5 segundos
    const alerta = this.add
      .image(this.width / 2, this.height / 2, "alerta_mapa")
      .setOrigin(0.5)
      .setDepth(100); // garantir que fique no topo

    this.time.delayedCall(5000, () => {
      alerta.destroy();
    });

    this.hud = new HUD(this);
    this.hud.mostrar();

    this.player = this.physics.add
    .sprite(this.width / 2, this.height / 2, "personagem_sprite")
    .setOrigin(0.5)
    .setScale(1.4)
    .setCollideWorldBounds(true);  
    this.player.body.setSize(30, 30); // Adjust these values as needed
    this.player.body.setOffset(17, 17); // 


      this.walls = this.physics.add.staticGroup();
      let x1 = mapX(480, this.width, this.height);
      let y1 = mapY(190, this.width, this.height);
      
      let x2 = mapX(480, this.width, this.height);
      let y2 = mapY(275, this.width, this.height);
      
      let x3 = mapX(676, this.width, this.height);
      let y3 = mapY(275, this.width, this.height);
      
      let x4 = mapX(676, this.width, this.height);
      let y4 = mapY(190, this.width, this.height);

      let x5 = mapX(696, this.width, this.height);
      let y5 = mapY(336, this.width, this.height);

      let x6 = mapX(878, this.width, this.height);
      let y6 = mapY(337, this.width, this.height);

      let x7 = mapX(878, this.width, this.height);
      let y7 = mapY(218, this.width, this.height);

      let x8 = mapX(1182, this.width, this.height);
      let y8 = mapY(218, this.width, this.height);

      let x9 = mapX(676, this.width, this.height);
      let y9 = mapY(138, this.width, this.height);

      let x10 = mapX(676, this.width, this.height);
      let y10 = mapY(182, this.width, this.height);

      let x11 = mapX(1180, this.width, this.height);
      let y11 = mapY(138, this.width, this.height);

      let x12 = mapX(1180, this.width, this.height);
      let y12 = mapY(222, this.width, this.height);
    
      const t0 = bresenhamLine(x1, y1, x2, y2);
      const t1 = bresenhamLine(x2, y2, x3, y3);
      const t2 = bresenhamLine(x1,y1,x4,y4);
      const t3 = bresenhamLine(x3,y3,x5,y5);
      const t4 = bresenhamLine(x5,y5,x6,y6);
      const t5 = bresenhamLine(x6,y6,x7,y7);
      const t6 = bresenhamLine(x7,y7,x8,y8);
      const t7  = bresenhamLine(x10,y10,x9,y9);
      const t8 = bresenhamLine(x9,y9,x11,y11);
      const t9 = bresenhamLine(x11,y11,x12,y12);


      let pixels = t0.concat(t1,t2,t3,t4,t5,t6,t7,t8,t9);

// Modify the wall creation:
pixels.forEach(([x, y]) => {
  // Create an invisible rectangle collider
  const wallPiece = this.add.rectangle(x, y, 5, 5, 0xffffff, 0);
  
  // Enable physics on the rectangle and mark it as static
  this.physics.add.existing(wallPiece, true);
  
  // Add it to the staticGroup for collisions
  this.walls.add(wallPiece);
});
      // ── COLLIDER BETWEEN PLAYER & WALLS ──
      this.physics.add.collider(this.player, this.walls);

    this.createAnimations();

    this.cube = this.add.rectangle(this.width * 0.853, this.height * 0.38, 40, 40, 0xff0000);
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
    const speed = 160; // Adjusted for velocity
    let moving = false;

    // Reset velocity
    this.player.setVelocity(0);

    if (this.cursors.left.isDown) {
        this.player.setVelocityX(-speed);
        this.player.anims.play("walk-side", true);
        this.player.setFlipX(true);
        moving = true;
    } else if (this.cursors.right.isDown) {
        this.player.setVelocityX(speed);
        this.player.anims.play("walk-side", true);
        this.player.setFlipX(false);
        moving = true;
    }

    if (this.cursors.up.isDown) {
        this.player.setVelocityY(-speed);
        this.player.anims.play("walk-up", true);
        moving = true;
    } else if (this.cursors.down.isDown) {
        this.player.setVelocityY(speed);
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