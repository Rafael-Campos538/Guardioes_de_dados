class Gamedoismini extends Phaser.Scene {
    constructor() {
        super({ key: "Gamedoismini" });
    }

    preload() {
        this.load.image("fundominigame2", "assets/imagens/fundominigame2.png");
        this.load.image("celulargrupos", "assets/imagens/celulargrupos.png");
        this.load.image("setaentrargrupo", "assets/imagens/setaentrargrupo.png");
    }

    create() {
        this.atualizarCena(); // Configura a cena
        this.scale.on('resize', this.atualizarCena, this); // Adapta elementos ao redimensionar tela

        // Tornando as setas interativas
        this.seta.setInteractive(); // Tornar a primeira seta clicável
        this.seta.on('pointerdown', () => {
            this.scene.start('Celulargrupoum'); // Mudar para a cena 'Celulargrupoum' ao clicar na primeira seta
        });

        // Interatividade para a segunda seta
        this.seta2.setInteractive(); // Tornar a segunda seta clicável
        this.seta2.on('pointerdown', () => {
            console.log("Segunda seta clicada!"); // Você pode adicionar ações aqui
        });

        // Interatividade para a terceira seta
        this.seta3.setInteractive(); // Tornar a terceira seta clicável
        this.seta3.on('pointerdown', () => {
            console.log("Terceira seta clicada!"); // Você pode adicionar ações aqui
        });

        // Interatividade para a quarta seta
        this.seta4.setInteractive(); // Tornar a quarta seta clicável
        this.seta4.on('pointerdown', () => {
            console.log("Quarta seta clicada!"); // Você pode adicionar ações aqui
        });
    }

    atualizarCena() {
        const largura = this.cameras.main.width;
        const altura = this.cameras.main.height;
        const centerX = largura / 2;
        const centerY = altura / 2;

        // Fundo responsivo
        if (this.fundo) this.fundo.destroy();
        this.fundo = this.add.image(centerX, centerY, "fundominigame2")
            .setOrigin(0.5)
            .setDisplaySize(largura, altura);

        // Celular no centro (tamanho reduzido)
        if (this.celular) this.celular.destroy();
        this.celular = this.add.image(centerX, centerY, "celulargrupos")
            .setOrigin(0.5)
            .setScale(Math.min(largura, altura) * 0.00053);

        // Seta sobre o celular (ajustada ainda mais para cima)
        if (this.seta) this.seta.destroy();
        this.seta = this.add.image(centerX + (largura * 0.07), centerY - (altura * 0.20), "setaentrargrupo") // Movida mais para a direita
            .setOrigin(0.5)
            .setScale(Math.min(largura, altura) * 0.0014);

        // Outras setas
        if (this.seta2) this.seta2.destroy();
        this.seta2 = this.add.image(centerX + (largura * 0.07), centerY - (altura * 0.061), "setaentrargrupo") // Segunda seta
            .setOrigin(0.5)
            .setScale(Math.min(largura, altura) * 0.0014);

        if (this.seta3) this.seta3.destroy();
        this.seta3 = this.add.image(centerX + (largura * 0.07), centerY + (altura * 0.081), "setaentrargrupo") // Terceira seta movida mais para baixo
            .setOrigin(0.5)
            .setScale(Math.min(largura, altura) * 0.0014);

        if (this.seta4) this.seta4.destroy();
        this.seta4 = this.add.image(centerX + (largura * 0.07), centerY + (altura * 0.23), "setaentrargrupo") // Quarta seta
            .setOrigin(0.5)
            .setScale(Math.min(largura, altura) * 0.0014);
    }
}

window.Gamedoismini = Gamedoismini;
