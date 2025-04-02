// ./src/MapaCenaIni.js

class MapaCenaIni extends Phaser.Scene {
    constructor() {
        super({ key: "MapaCenaIni" });
    }

    preload() {
        // Carregar imagens do fundo e personagens
        this.load.image("b1", "assets/mapa/city1.png");
        this.load.image("b2", "assets/mapa/floor.png");
        this.load.image("b3", "assets/mapa/indoor1.png");
        this.load.image("b4", "assets/mapa/indoor3.png");
        this.load.image("b5", "assets/mapa/inter.png");
        this.load.image("b6", "assets/mapa/interesc.png");
        this.load.image("b7", "assets/mapa/meta.png");
        this.load.image("b8", "assets/mapa/tech2.png");


        // Carregar o arquivo do tilemap (JSON do Tiled)
        this.load.tilemapTiledJSON('map', "assets/mapa/principal.json");


        // Carregar imagens dos personagens
    }

    create (){

        const map = this.make.tilemap({key: 'map', tileWidht: 64, tileHeight: 64  });
        const tileset1 = map.addTilesetImage("city1", "b1");
        const tileset2 = map.addTilesetImage("floor", "b2");
        const tileset3 = map.addTilesetImage("indoor1", "b3");
        const tileset4 = map.addTilesetImage("indoor3", "b4");
        const tileset5 = map.addTilesetImage("inter", "b5");
        const tileset6 = map.addTilesetImage("interesc", "b6");
        const tileset7 = map.addTilesetImage("meta", "b7");
        const tileset8 = map.addTilesetImage("tech2", "b8");
        const CLayer = map.createLayer("c", tileset1, tileset2, tileset3, tileset4, tileset5, tileset6,tileset7,tileset8, 0, 0);
        const ChaoLayer = map.createLayer("chao", tileset1, tileset2, tileset3, tileset4, tileset5, tileset6,tileset7,tileset8, 0, 0);
        const ALayer = map.createLayer("a", tileset1, tileset2, tileset3, tileset4, tileset5, tileset6,tileset7,tileset8, 0, 0);
        const AbaixoLayer = map.createLayer("abaixo", tileset1, tileset2, tileset3, tileset4, tileset5, tileset6,tileset7,tileset8, 0, 0);
        const PrediosLayer = map.createLayer("predios", tileset1, tileset2, tileset3, tileset4, tileset5, tileset6,tileset7,tileset8, 0, 0);
        const PonteLayer = map.createLayer("ponte", tileset1, tileset2, tileset3, tileset4, tileset5, tileset6,tileset7,tileset8, 0, 0);
        const CoisasLayer = map.createLayer("coisas", tileset1, tileset2, tileset3, tileset4, tileset5, tileset6,tileset7,tileset8, 0, 0);
        const AcimaLayer = map.createLayer("acima", tileset1, tileset2, tileset3, tileset4, tileset5, tileset6,tileset7,tileset8, 0, 0);
        const HitboxLayer = map.createLayer("hitbox", tileset1, tileset2, tileset3, tileset4, tileset5, tileset6,tileset7,tileset8, 0, 0)

    }
}
