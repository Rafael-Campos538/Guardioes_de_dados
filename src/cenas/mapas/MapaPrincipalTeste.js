export default class MapaPrincipalTeste extends Phaser.Scene {
  constructor() {
    super({ key: "MapaPrincipalTeste" });
  }

  preload() {
    // Carregando o arquivo JSON do mapa
    this.load.tilemapTiledJSON(
      "mapa_principal",
      "assets/mapas/MapaPrincipalTeste/MapaPrincipalTeste.json"
    );

    // Carregando todos os tilesets
    this.load.image("city1", "assets/mapas/MapaPrincipalTeste/city1.png");
    this.load.image("city2", "assets/mapas/MapaPrincipalTeste/city2.png");
    this.load.image("grass1", "assets/mapas/MapaPrincipalTeste/grass1.png");
    this.load.image("grass2", "assets/mapas/MapaPrincipalTeste/grass2.png");
    this.load.image("indoor1", "assets/mapas/MapaPrincipalTeste/indoor1.png");
    this.load.image("indoor2", "assets/mapas/MapaPrincipalTeste/indoor2.png");
    this.load.image("meta", "assets/mapas/MapaPrincipalTeste/meta.png");
    this.load.image("tech1", "assets/mapas/MapaPrincipalTeste/tech1.png");
  }

  create() {
    // 1. Criar o objeto de mapa a partir do JSON
    const map = this.make.tilemap({ key: "mapa_principal" });

    // 2. Adicionar todos os tilesets ao mapa
    // IMPORTANTE: O primeiro parâmetro deve corresponder EXATAMENTE ao nome do tileset no Tiled
    const city1Tileset = map.addTilesetImage("city1", "city1");
    const city2Tileset = map.addTilesetImage("city2", "city2");
    const grass1Tileset = map.addTilesetImage("grass1", "grass1");
    const grass2Tileset = map.addTilesetImage("grass2", "grass2");
    const indoor1Tileset = map.addTilesetImage("indoor1", "indoor1");
    const indoor2Tileset = map.addTilesetImage("indoor2", "indoor2");
    const metaTileset = map.addTilesetImage("meta", "meta");
    const tech1Tileset = map.addTilesetImage("tech1", "tech1");

    // 3. Criar um array com todos os tilesets para usar na criação das camadas
    const allTilesets = [
      city1Tileset,
      city2Tileset,
      grass1Tileset,
      grass2Tileset,
      indoor1Tileset,
      indoor2Tileset,
      metaTileset,
      tech1Tileset,
    ];

    // 4. Criar todas as camadas
    const chaoLayer = map.createLayer("chao", allTilesets);
    const cLayer = map.createLayer("c", allTilesets);
    const aLayer = map.createLayer("a", allTilesets);
    const abaixoLayer = map.createLayer("abaixo", allTilesets);
    const prediosLayer = map.createLayer("predios", allTilesets);
    const pontesLayer = map.createLayer("pontes", allTilesets);
    const coisasLayer = map.createLayer("coisas", allTilesets);
    const acimaLayer = map.createLayer("acima", allTilesets);
    const hitboxLayer = map.createLayer("hitbox", allTilesets);

    // 5. Aplicar escala para aumentar o tamanho do mapa (opcional)
    const escalaDoMapa = 3; // Ajuste conforme necessário

    // Aplicar escala a todas as camadas
    chaoLayer.setScale(escalaDoMapa);
    cLayer.setScale(escalaDoMapa);
    aLayer.setScale(escalaDoMapa);
    abaixoLayer.setScale(escalaDoMapa);
    prediosLayer.setScale(escalaDoMapa);
    pontesLayer.setScale(escalaDoMapa);
    coisasLayer.setScale(escalaDoMapa);
    acimaLayer.setScale(escalaDoMapa);
    hitboxLayer.setScale(escalaDoMapa);

    // 6. Configurar colisões para todas as camadas EXCETO "chao"
    cLayer.setCollisionByExclusion([-1]); // -1 = tiles vazios
    aLayer.setCollisionByExclusion([-1]);
    abaixoLayer.setCollisionByExclusion([-1]);
    prediosLayer.setCollisionByExclusion([-1]);
    pontesLayer.setCollisionByExclusion([-1]);
    coisasLayer.setCollisionByExclusion([-1]);
    acimaLayer.setCollisionByExclusion([-1]);
    hitboxLayer.setCollisionByExclusion([-1]);

    // 7. Configurar a câmera para mostrar o mapa
    this.cameras.main.setBounds(
      0,
      0,
      map.widthInPixels * escalaDoMapa,
      map.heightInPixels * escalaDoMapa
    );

    // 8. Centralizar a câmera no meio do mapa
    this.cameras.main.centerOn(
      (map.widthInPixels * escalaDoMapa) / 2,
      (map.heightInPixels * escalaDoMapa) / 2
    );

    // 9. Ajustar o zoom da câmera para ver uma área maior do mapa (opcional)
     this.cameras.main.setZoom(0.8); // Descomente e ajuste se quiser ver mais do mapa

    // 10. Adicionar botão para voltar ao menu
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

  update() {}
}
