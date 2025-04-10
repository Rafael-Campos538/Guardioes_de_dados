// ./src/cenas/mini-games/celular/JogoCelular.js

import InterfaceCelular from "./InterfaceCelular.js";
import InterfaceCelularDois from "./InterfaceCelularDois.js";
import InterfaceCelularTres from "./InterfaceCelularTres.js";
import HUD from "../../../componentes/HUD.js";

export default class JogoCelular extends Phaser.Scene {
  constructor() {
    super({ key: "JogoCelular" });
  }

  preload() {
    this.load.image("fundominigame2", "assets/imagens/cenarios/fundominigame2.png");
    this.load.image("celulargrupos", "assets/imagens/celular/celulargrupos.png");
    this.load.image("setaentrargrupo", "assets/imagens/celular/setaentrargrupo.png");
  }

  create() {
    this.hud = new HUD(this);
    this.hud.mostrar();

    this.atualizarCena();
    this.scale.on("resize", this.atualizarCena, this);
  }

  criarAnimacaoPulo(seta) {
    this.tweens.add({
      targets: seta,
      y: seta.y - 10,
      duration: 500,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
    });
  }

  atualizarCena() {
    const largura = this.cameras.main.width;
    const altura = this.cameras.main.height;
    const centerX = largura / 2;
    const centerY = altura / 2;

    if (this.fundo) this.fundo.destroy();
    this.fundo = this.add
      .image(centerX, centerY, "fundominigame2")
      .setOrigin(0.5)
      .setDisplaySize(largura, altura);

    if (this.celular) this.celular.destroy();
    this.celular = this.add
      .image(centerX, centerY, "celulargrupos")
      .setOrigin(0.5)
      .setScale(Math.min(largura, altura) * 0.00053);

    // SETA 1 - grupo1
    if (this.seta) this.seta.destroy();
    if (!InterfaceCelular.gruposDeletados.has("grupo1")) {
      this.seta = this.add
        .image(centerX + largura * 0.07, centerY - altura * 0.2, "setaentrargrupo")
        .setOrigin(0.5)
        .setScale(Math.min(largura, altura) * 0.0014)
        .setInteractive()
        .on("pointerdown", () => {
          this.hud.esconder();
          this.scene.start("InterfaceCelular", { grupo: "grupo1" });
        });
      this.criarAnimacaoPulo(this.seta);
    }

    // SETA 2 - grupo2
    if (this.seta2) this.seta2.destroy();
    if (!InterfaceCelularDois.gruposDeletados.has("grupo2")) {
      this.seta2 = this.add
        .image(centerX + largura * 0.07, centerY - altura * 0.01, "setaentrargrupo")
        .setOrigin(0.5)
        .setScale(Math.min(largura, altura) * 0.0014)
        .setInteractive()
        .on("pointerdown", () => {
          this.hud.esconder();
          this.scene.start("InterfaceCelularDois", { grupo: "grupo2" });
        });
      this.criarAnimacaoPulo(this.seta2);
    }

    // SETA 3 - grupo3
    if (this.seta3) this.seta3.destroy();
    if (!InterfaceCelularTres.gruposDeletados.has("grupo3")) {
      this.seta3 = this.add
        .image(centerX + largura * 0.07, centerY + altura * 0.19, "setaentrargrupo")
        .setOrigin(0.5)
        .setScale(Math.min(largura, altura) * 0.0014)
        .setInteractive()
        .on("pointerdown", () => {
          this.hud.esconder();
          this.scene.start("InterfaceCelularTres", { grupo: "grupo3" });
        });
      this.criarAnimacaoPulo(this.seta3);
    }
  }
}
