class Minigamedois extends Phaser.Scene {
    constructor() {
        super({ key: "Minigamedois" });
    }

    preload() {
        // Carregar a imagem de fundo e a imagem da missão
        this.load.image("background", "assets/imagens/fundominigame2.png");
        this.load.image("missao", "assets/imagens/missao2ini.png");
        this.load.image("botao_retangular", "assets/imagens/botao_retangular.png");
        this.load.image("seta", "assets/imagens/seta.png");  // Adicionando a seta

        // Carregar a fonte
        this.load.font('Rainyhearts', 'assets/fonts/rainyhearts.ttf');

        // Carregar o som de clique
        this.load.audio("abrirCelular", "assets/sons/abrir_celular.mp3");
    }

    create() {
        // Inicializar tamanho da tela
        const largura = this.cameras.main.width;
        const altura = this.cameras.main.height;
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        // Adicionar o fundo e garantir que ele cubra toda a tela
        this.fundo = this.add.image(0, 0, "background")
            .setOrigin(0, 0)
            .setDisplaySize(largura, altura);

        // Adicionar a imagem da missão
        this.missao = this.add.image(centerX, centerY - altura * 0.05, "missao")
            .setOrigin(0.5)
            .setScale(0.5);

        // Adiciona evento para atualizar o fundo quando a tela for redimensionada
        this.scale.on('resize', this.atualizarFundo, this);

        // Ajustando a posição do botão para a esquerda
        const deslocamentoEsquerda = -100;

        // Criar as setas à esquerda e à direita do texto
        const setaEsquerda = this.add.text(centerX - 239 + deslocamentoEsquerda, centerY + altura * 0.27, ">>", {
            fontSize: Math.min(largura, altura) * 0.055,
            fill: "#FFFFFF",
            fontFamily: "Rainyhearts",
            stroke: "#000000",
            strokeThickness: 6
        }).setOrigin(0.5, 0);

        const textoBotao1 = this.add.text(centerX - 70 + deslocamentoEsquerda, centerY + altura * 0.27, "Falar com a", {
            fontSize: Math.min(largura, altura) * 0.055,
            fill: "#00BFFF",
            fontFamily: "Rainyhearts",
            stroke: "#00008B",
            strokeThickness: 6
        }).setOrigin(0.5, 0);

        const textoBotao2 = this.add.text(textoBotao1.x + textoBotao1.width + 10, centerY + altura * 0.27, "Professora", {
            fontSize: Math.min(largura, altura) * 0.055,
            fill: "#FFFF00",
            fontFamily: "Rainyhearts",
            stroke: "#00008B",
            strokeThickness: 6
        }).setOrigin(0.5, 0);

        const setaDireita = this.add.text(centerX - 1 + textoBotao2.width + 20, centerY + altura * 0.27, "<<", {
            fontSize: Math.min(largura, altura) * 0.055,
            fill: "#FFFFFF",
            fontFamily: "Rainyhearts",
            stroke: "#000000",
            strokeThickness: 6
        }).setOrigin(0.5, 0);

        // Tornar os textos interativos
        textoBotao1.setInteractive()
          .on("pointerdown", () => {
              let somClique = this.sound.add("abrirCelular", { loop: false });
              somClique.play();
              this.proximoDialogo();
          });

        textoBotao2.setInteractive()
          .on("pointerdown", () => {
              let somClique = this.sound.add("abrirCelular", { loop: false });
              somClique.play();
              // Iniciar a transição de fade para a cena "Conversationdois"
              this.tweens.add({
                  targets: this.cameras.main,
                  alpha: 0,
                  duration: 1800,
                  ease: 'Linear',
                  onComplete: () => {
                      // Após a transição de fade, trocar a cena
                      this.scene.start('Conversationdois');
                  }
              });
          });

        // Adicionar animação contínua de "bounce" (pulo) para os textos e setas
        this.tweens.add({
            targets: [setaEsquerda, textoBotao1, textoBotao2, setaDireita],
            y: `+=10`,
            duration: 520,
            yoyo: true,
            repeat: -1
        });
    }

    atualizarFundo(gameSize) {
        this.cameras.main.setSize(gameSize.width, gameSize.height);
        this.fundo.setDisplaySize(gameSize.width, gameSize.height);
    }

    proximoDialogo() {
        console.log("Próximo diálogo ou ação!");
    }
}

window.Minigamedois = Minigamedois;
