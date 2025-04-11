// ./src/cenas/mapas/MapaEscola.js

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

    // Carrega o ícone de exclamação
    this.load.image("exclamacao", "assets/imagens/ui/exclamacao.png");
    this.load.image("prof", "assets/personagens/estaticos/prof.png");
  }

  create() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    // Adiciona o fundo
    this.background = this.add
      .image(width / 2, height / 2, "fundo_escola")
      .setOrigin(0.5)
      .setDisplaySize(width, height);

    this.hud = new HUD(this);
    this.hud.mostrar();

    // Adiciona o jogador com o spritesheet selecionado
    this.player = this.physics.add
      .sprite(width * 0.133, height * 0.6, "personagem_sprite")
      .setOrigin(0.5)
      .setScale(1.4);

    this.player.body.setSize(30, 30); // Adjust these values as needed
    this.player.body.setOffset(17, 17); //

    function mapX(x, width, height) {
      return ((x * width) / height) * 0.9;
    }

    function mapY(y, width, height) {
      return ((y * height) / width) * 3.5;
    }

    let x1 = mapX(64, width, height);
    let y1 = mapY(250, width, height);

    let x2 = mapX(128, width, height);
    let y2 = y1;

    let x3 = mapX(127, width, height);
    let y3 = mapY(209, width, height);

    let x4 = mapX(410, width, height);
    let y4 = mapY(209, width, height);

    let y5 = mapY(175, width, height);
    let x5 = mapX(64, width, height);

    let y6 = mapY(175, width, height);
    let x6 = mapX(360, width, height);

    let y7 = mapY(50, width, height);
    let x7 = mapX(360, width, height);

    let y8 = mapY(50, width, height);
    let x8 = mapX(432, width, height);

    let y9 = mapY(144, width, height);
    let x9 = mapX(432, width, height);

    let y10 = mapY(144, width, height);
    let x10 = mapX(410, width, height);

    let y11 = mapY(210, width, height);
    let x11 = mapX(410, width, height);
    /////////
    const t0 = bresenhamLine(x1, y1, x2, y2);
    const t1 = bresenhamLine(x2, y2, x3, y3);
    const t2 = bresenhamLine(x3, y3, x4, y4);
    const t3 = bresenhamLine(x1, y1, x5, y5);
    const t4 = bresenhamLine(x5, y5, x6, y6);
    const t5 = bresenhamLine(x6, y6, x7, y7);
    const t6 = bresenhamLine(x7, y7, x8, y8);
    const t7 = bresenhamLine(x8, y8, x9, y9);
    const t8 = bresenhamLine(x9, y9, x10, y10);
    const t9 = bresenhamLine(x10, y10, x11, y11);

    let pixels = t0.concat(t1, t2, t3, t4, t5, t6, t7, t8, t9);

    this.walls = this.physics.add.staticGroup();

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

    // Cria as animações
    this.createAnimations();

    // Adiciona a professora no lugar do cubo vermelho
    this.cube = this.add
      .image(width * 0.58, height * 0.25, "prof")
      .setScale(1.5);

    // Adiciona o ícone de exclamação acima do cubo
    this.exclamacao = this.add
      .image(this.cube.x, this.cube.y - 60, "exclamacao")
      .setScale(0.15);

    // Animação de piscar o ícone de exclamação
    this.time.addEvent({
      delay: 500,
      callback: () => {
        this.exclamacao.setVisible(!this.exclamacao.visible);
      },
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

    if (this.exclamacao) {
      this.exclamacao.setPosition(this.cube.x, this.cube.y - 40);
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
    const speed = 160;
    
    // Reset velocity each frame so the player stops when no key is pressed
    this.player.setVelocity(0);
    
    let moving = false;
    
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
  

    // Verifica colisão com o cubo
    const hitCube = Phaser.Geom.Rectangle.Contains(
      this.cube.getBounds(),
      this.player.x,
      this.player.y
    );

    if (hitCube) {
      this.cameras.main.fadeOut(500, 0, 0, 0);

      this.time.delayedCall(500, () => {
        this.hud.esconder();
        this.scene.start("TelaIntroducao");
      });
    }
  }
}
