class MainMenu extends Phaser.Scene {
    constructor() {
        super({ key: "MainMenu" });
    }

    preload() {
        this.load.font('Rainyhearts', 'assets/fonts/rainyhearts.ttf');
        this.load.font("guardioes_dados", "assets/fonts/vhs-gothic.ttf");
        this.load.image("fundo", "assets/imagens/fundooriginal.png");
        this.load.image("botao_retangular", "assets/imagens/botao_retangular.png");
        this.load.image("titulo", "assets/imagens/MainMenuTitulo.png");

        // Carregar a música
        this.load.audio("musica_menu", "assets/sons/musica_menu.mp3");
        this.load.audio("transicao_tela", "assets/sons/transicao_tela.mp3");
        this.load.audio("botao", "assets/sons/botao.mp3"); // Adicionando o som do botão
    }

    create() {
        const largura = this.cameras.main.width;
        const altura = this.cameras.main.height;

        //  Garante que o fundo cubra toda a tela
        this.fundo = this.add.image(0, 0, "fundo")
            .setOrigin(0, 0)
            .setDisplaySize(largura, altura);

        // Usando proporções para o título
        this.add.text(largura * 0.5, altura * 0.25, "Guardiões de Dados", {
            fontSize: Math.min(largura, altura) * 0.07, // Tamanho do texto baseado na tela
            fill: "#000080",
            fontFamily: "guardioes_dados",
            align: "center",
            stroke: "#ADD8E6",
            strokeThickness: 6 
        }).setOrigin(0.5);

        // Criando os botões com posições relativas e tamanho reduzido
        this.createButton(largura * 0.5, altura * 0.7, "Jogar", () => this.iniciarJogo());
        this.createButton(largura * 0.5, altura * 0.8, "Configurações", () => console.log("Abrir configurações..."));
        this.createButton(largura * 0.5, altura * 0.9, "Acessibilidade", () => console.log("Fechando o jogo..."));

        // Adiciona evento para atualizar o fundo quando a tela for redimensionada
        this.scale.on('resize', this.atualizarFundo, this);

        // Iniciar a música de fundo com volume reduzido
        this.musica = this.sound.add("musica_menu", { loop: true });
        this.musica.play({ volume: 0.090 });
    }

    createButton(x, y, text, callback) {
        let botao = this.add.image(x, y, "botao_retangular")
            .setInteractive()
            .setScale(0.62); // Ajuste para melhor encaixe

        // Diminui o tamanho do texto para os botões
        let texto = this.add.text(x, y, text, {
            fontSize: Math.min(this.cameras.main.width, this.cameras.main.height) * 0.032,  // Tamanho do texto menor (ajustado para 0.04)
            fill: "#FFFFFF",
            fontFamily: "Rainyhearts",
            align: "center",
            letterSpacing: 10
        }).setOrigin(0.5);

        botao.on("pointerover", () => botao.setTint(0xaaaaaa));
        botao.on("pointerout", () => botao.clearTint());
        botao.on("pointerdown", () => {
            // Reproduz o som do botão ao clicar
            this.sound.play("botao", { volume: 0.7 });
            callback();
        });
    }

    iniciarJogo() {
        // Para a música do menu
        if (this.musica) {
            this.musica.stop();
        }

        // Toca o som de transição de tela
        this.sound.play("transicao_tela", { volume: 0.6 });

        // Adiciona o efeito de transição e a troca de cena
        this.tweens.add({
            targets: this.cameras.main,
            alpha: 0,
            duration: 1020,
            ease: 'Power2',
            onComplete: () => {
                this.scene.start("Personagens"); // Troca para a cena de personagens
            }
        });
    }

    atualizarFundo(gameSize) {
        this.cameras.main.setSize(gameSize.width, gameSize.height);
        this.fundo.setDisplaySize(gameSize.width, gameSize.height);
    }
}

window.MainMenu = MainMenu;
