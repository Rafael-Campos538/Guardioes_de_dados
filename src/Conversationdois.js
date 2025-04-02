class Conversationdois extends Phaser.Scene {
    constructor() {
        super({ key: "Conversationdois" });
    }

    preload() {
        this.load.font('Rainyhearts', 'assets/fonts/rainyhearts.ttf');
        this.load.image("caixa_dialogo", "assets/imagens/caixadialogo.png");
        this.load.image("fundominigame2", "assets/imagens/fundominigame2.png");
        this.load.image("homemcabelopreto", "assets/imagens/homemcabelopreto.png");
        this.load.image("profprof", "assets/imagens/professora.png");
        this.load.image("botao_retangular", "assets/imagens/botao_retangular.png");

        // Sons
        this.load.audio("digitacao", "assets/sons/digitacao_conv.mp3");
        this.load.audio("abrirCelular", "assets/sons/abrir_celular.mp3");
    }

    create() {
        this.atualizarCena(); // Chama a função para configurar a cena
        this.scale.on('resize', this.atualizarCena, this); // Atualiza os elementos na mudança de tamanho da tela
    }

    atualizarCena() {
        const largura = this.cameras.main.width;
        const altura = this.cameras.main.height;
        const centerX = largura / 2;
        const centerY = altura / 2;

        // Atualiza o fundo
        this.fundo = this.add.image(centerX, centerY, "fundominigame2")
            .setOrigin(0.5)
            .setDisplaySize(largura, altura);

        this.dialogos = [
            { personagem: "Professora.", texto: "Olá, boas vindas a nossa escola. Como posso te ajudar?", img: "profprof" },
            { personagem: "Agente P.", texto: "Você é a professora responsável por criar o grupo de mensagens com os seus alunos?", img: "homemcabelopreto" },
            { personagem: "NARRADOR", texto: "AMBOS CONVERSAM E A PROFESSORA É CONSCIENTIZADA", img: "" },
        ];

        this.indice = 0;

        // Personagem à esquerda da caixa de diálogo
        this.personagemEsquerda = this.add.image(centerX - largura * 0.14, centerY + altura * 0.007, "homemcabelopreto")
            .setOrigin(0.5)
            .setScale(largura * 0.0010);

        // Personagem à direita da caixa de diálogo
        this.personagemDireita = this.add.image(centerX + largura * 0.30, centerY + altura * 0.3, "profprof")
            .setOrigin(0.5)
            .setScale(largura * 0.0003); // Tamanho reduzido

        // Caixa de Diálogo Menor
        this.caixaDialogo = this.add.image(centerX, centerY + altura * 0.33, "caixa_dialogo")
            .setOrigin(0.5)
            .setDisplaySize(largura * 0.5, altura * 0.24);

        // Texto menor
        this.personagemTexto = this.add.text(centerX - largura * 0.24, centerY + altura * 0.24, "", {
            fontSize: Math.min(largura, altura) * 0.05,
            fill: "#FFFFFF",
            fontFamily: "Rainyhearts",
        }).setOrigin(0, 0.4);

        this.textoAtual = this.add.text(centerX - largura * 0.23, centerY + altura * 0.29, "", {
            fontSize: Math.min(largura, altura) * 0.035,
            fill: "#FFFFFF",
            fontFamily: "Rainyhearts",
            wordWrap: { width: largura * 0.40, useAdvancedWrap: true }
        }).setOrigin(0, 0);

        this.atualizarTexto();

        // Botão Voltar
        this.botaoVoltar = this.add.text(centerX - largura * 0.20, centerY + altura * 0.41, "VOLTAR", {
            fontSize: Math.min(largura, altura) * 0.027,
            fill: "#00BFFF",
            fontFamily: "Rainyhearts",
        }).setInteractive().on("pointerdown", () => {
            let somClique = this.sound.add("abrirCelular", { loop: false });
            somClique.play();
            this.dialogoAnterior();
        });

        // Botão Continuar
        this.botaoContinuar = this.add.text(centerX + largura * 0.12, centerY + altura * 0.41, "CONTINUAR", {
            fontSize: Math.min(largura, altura) * 0.027,
            fill: "#00BFFF",
            fontFamily: "Rainyhearts",
        }).setInteractive().on("pointerdown", () => {
            let somClique = this.sound.add("abrirCelular", { loop: false });
            somClique.play();
            this.proximoDialogo();
        });
    }

    atualizarTexto() {
        let fala = this.dialogos[this.indice];
        this.personagemTexto.setText(fala.personagem);

        this.time.removeAllEvents();
        this.textoAtual.setText('');

        this.aplicarEfeitoDigitar(fala.texto);

        // Exibe o personagem correto com base na fala
        if (fala.img === "homemcabelopreto") {
            this.personagemEsquerda.setVisible(true);
            this.personagemDireita.setVisible(false);
        } else if (fala.img === "profprof") {
            this.personagemEsquerda.setVisible(false);
            this.personagemDireita.setVisible(true);
        }
    }

    aplicarEfeitoDigitar(texto) {
        this.textoAtual.setText('');

        if (this.somDigitacao) {
            this.somDigitacao.stop();
        }

        let i = 0;
        const tempo = 50;

        this.somDigitacao = this.sound.add("digitacao", { loop: false });
        this.somDigitacao.play();

        this.time.addEvent({
            delay: tempo,
            callback: () => {
                this.textoAtual.setText(texto.substring(0, i));
                i++;

                if (i > texto.length) {
                    this.time.removeAllEvents();
                    this.somDigitacao.stop();
                }
            },
            loop: true
        });
    }

    atualizarVisibilidadeVoltar() {
        this.botaoVoltar.setVisible(this.indice > 0);
    }

    proximoDialogo() {
        if (this.indice < this.dialogos.length - 1) {
            this.indice++;
            this.atualizarTexto();
            this.atualizarVisibilidadeVoltar();
        } else {
            this.sound.stopAll();
            this.cameras.main.fadeOut(500, 0, 0, 0);
            this.time.delayedCall(500, () => this.scene.start("Gamedoismini"));
        }
    }

    dialogoAnterior() {
        if (this.indice > 0) {
            this.indice--;
            this.atualizarTexto();
        }
        this.atualizarVisibilidadeVoltar();
    }
}

window.Conversationdois = Conversationdois;
