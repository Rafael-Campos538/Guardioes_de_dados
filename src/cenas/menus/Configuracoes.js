export default class Configuracoes extends Phaser.Scene {
    constructor() {
      super({ key: "Configuracoes" });
    }

    preload() {
        this.load.font("Rainyhearts", "assets/fontes/rainyhearts.ttf");
        this.load.image("fundo", "assets/imagens/cenarios/fundooriginal.png");
        this.load.image("titulo", "assets/imagens/ui/tutorial_titulo.png");
        this.load.image("botao_retangular", "assets/imagens/botoes/botao_retangular.png");
    }
    create() {
        const largura = this.cameras.main.width;
        const altura = this.cameras.main.height;

        // Fundo com melhor controle de escala
        this.fundo = this.add
        .image(largura / 2, altura / 2, "fundo")
        .setOrigin(0.5)
        .setDisplaySize(largura, altura);
    
        // Título melhor posicionado
        this.titulo = this.add
        .text(largura * 0.5, altura * 0.2, "Configurações", {
          fontSize: Math.min(largura, altura) * 0.05,
          fill: "#000080",
          fontFamily: "guardioes_dados",
          align: "center",
          stroke: "#ADD8E6",
          strokeThickness: 6,
        })
        .setOrigin(0.5);


        let botaoMenu = this.add
        .image(largura * 0.05, altura * 0.05, "botao_retangular")
        .setInteractive()
        .setOrigin(0.5)
        .setScale(largura * 0.00025);
  
        let textoMenu = this.add
        .text(largura * 0.05, altura * 0.062, "MENU", {
        fontSize: Math.min(largura, altura) * 0.03,
        fill: "#FFFFFF",
        fontFamily: "Rainyhearts",
        fontStyle: "bold",
        })
        .setInteractive()
        .setOrigin(0.5, 1);
  
        botaoMenu.on("pointerdown", () => this.scene.start("MenuPrincipal"));
        textoMenu.on("pointerdown", () => this.scene.start("MenuPrincipal"));
  
        this.atualizarVisibilidadeVoltar();
    }

    update() {
      // Atualização contínua, se necessário
    }

    voltarMenuPrincipal() {
      this.scene.start("MenuPrincipal");
      this.sound.play("botao");
    }

    createButton(x, y, text, callback) {
      const button = this.add.image(x, y, "botao_retangular").setInteractive();
      button.setScale(0.3);
      button.on("pointerdown", () => {
        callback();
        this.sound.play("botao");
        });
  
      }



}