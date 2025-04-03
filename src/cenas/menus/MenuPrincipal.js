// ./src/cenas/menus/MenuPrincipal.js

export default class MenuPrincipal extends Phaser.Scene {
  constructor() {
    super({ key: "MenuPrincipal" });

    // Guardar referências para objetos que precisamos acompanhar
    this.fundo = null;
    this.titulo = null;
    this.botoes = [];
    this.musica = null;
  }

  preload() {
    this.load.image("fundo", "assets/imagens/cenarios/fundooriginal.png");
    this.load.image(
      "botao_retangular",
      "assets/imagens/botoes/botao_retangular.png"
    );
    this.load.image("titulo", "assets/imagens/ui/menu_principal_titulo.png");

    // Carregar fontes
    this.load.font("Rainyhearts", "assets/fontes/rainyhearts.ttf");
    this.load.font("guardioes_dados", "assets/fontes/vhs-gothic.ttf");

    // Carregar a música
    this.load.audio("musica_menu", "assets/sons/musicas/musica_menu.mp3");
    this.load.audio("transicao_tela", "assets/sons/efeitos/transicao_tela.mp3");
    this.load.audio("botao", "assets/sons/efeitos/botao.mp3");
  }

  create() {
    // Limpar arrays e objetos anteriores caso a cena seja reiniciada
    this.botoes = [];

    const largura = this.cameras.main.width;
    const altura = this.cameras.main.height;

    // Fundo com melhor controle de escala
    this.fundo = this.add
      .image(largura / 2, altura / 2, "fundo")
      .setOrigin(0.5)
      .setDisplaySize(largura, altura);

    // Título melhor posicionado
    this.titulo = this.add
      .text(largura * 0.5, altura * 0.25, "Guardiões de Dados", {
        fontSize: Math.min(largura, altura) * 0.07,
        fill: "#000080",
        fontFamily: "guardioes_dados",
        align: "center",
        stroke: "#ADD8E6",
        strokeThickness: 6,
      })
      .setOrigin(0.5);

    // Configurar botões com posições relativas
    this.createButton(largura * 0.5, altura * 0.7, "Jogar", () =>
      this.iniciarJogo()
    );
    this.createButton(largura * 0.5, altura * 0.8, "Configurações", () =>
      console.log("Configurações")
    );
    this.createButton(largura * 0.5, altura * 0.9, "Acessibilidade", () =>
      console.log("Acessibilidade")
    );

    // Iniciar música de fundo
    this.musica = this.sound.add("musica_menu", { loop: true });
    this.musica.play({ volume: 0.09 });

    // Configurar eventos de escala
    this.scale.on("resize", this.atualizarLayout, this);

    // Configurar para parar a música quando a cena for fechada
    this.events.on("shutdown", () => {
      if (this.musica) {
        this.musica.stop();
      }
    });
  }

  createButton(x, y, text, callback) {
    // Criar a imagem do botão
    const botao = this.add
      .image(x, y, "botao_retangular")
      .setInteractive()
      .setScale(0.62);

    // Criar o texto do botão
    const texto = this.add
      .text(x, y, text, {
        fontSize:
          Math.min(this.cameras.main.width, this.cameras.main.height) * 0.032,
        fill: "#FFFFFF",
        fontFamily: "Rainyhearts",
        align: "center",
        letterSpacing: 8,
      })
      .setOrigin(0.5);

    // Configurar interatividade
    botao.on("pointerover", () => botao.setTint(0xaaaaaa));
    botao.on("pointerout", () => botao.clearTint());
    botao.on("pointerdown", () => {
      this.sound.play("botao", { volume: 0.7 });
      callback();
    });

    // Guardar referências para o botão e texto para ajustar quando a tela for redimensionada
    this.botoes.push({
      botao,
      texto,
      posX: x / this.cameras.main.width,
      posY: y / this.cameras.main.height,
    });
  }

  iniciarJogo() {
    // Parar música
    if (this.musica) {
      this.musica.stop();
    }

    // Tocar som de transição
    this.sound.play("transicao_tela", { volume: 0.6 });

    // Efeito de transição
    this.tweens.add({
      targets: this.cameras.main,
      alpha: 0,
      duration: 1020,
      ease: "Power2",
      onComplete: () => {
        this.scene.start("SelecaoPersonagem");
      },
    });
  }

  atualizarLayout(gameSize) {
    // Obter novas dimensões
    const largura = gameSize.width;
    const altura = gameSize.height;

    // Atualizar fundo
    if (this.fundo) {
      this.fundo.setPosition(largura / 2, altura / 2);
      this.fundo.setDisplaySize(largura, altura);
    }

    // Atualizar título
    if (this.titulo) {
      this.titulo.setPosition(largura * 0.5, altura * 0.25);
      this.titulo.setFontSize(Math.min(largura, altura) * 0.07);
    }

    // Atualizar botões
    this.botoes.forEach((item) => {
      const { botao, texto, posX, posY } = item;
      const novoX = largura * posX;
      const novoY = altura * posY;

      botao.setPosition(novoX, novoY);
      texto.setPosition(novoX, novoY);
      texto.setFontSize(Math.min(largura, altura) * 0.032);
    });
  }
}
