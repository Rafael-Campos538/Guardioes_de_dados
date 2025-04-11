// ./src/cenas/menus/SelecaoPersonagem.js

export default class SelecaoPersonagem extends Phaser.Scene {
  constructor() {
    super({ key: "SelecaoPersonagem" });
  }

  preload() {
    this.load.font("Rainyhearts", "assets/fontes/rainyhearts.ttf");
    this.load.image("titulo", "assets/imagens/ui/tutorial_titulo.png");
    this.load.image(
      "botao_retangular",
      "assets/imagens/botoes/botao_retangular.png"
    );
    this.load.image("fundo", "assets/imagens/cenarios/fundooriginal.png");
    this.load.image("painel", "assets/imagens/ui/painel_retangular.png");

    // Carregando as versões 2 das imagens
    this.load.image(
      "menina1",
      "assets/personagens/estaticos/menina1_versao2.png"
    );
    this.load.image(
      "menino2",
      "assets/personagens/estaticos/menino2_versao2.png"
    );
    this.load.image(
      "menino3",
      "assets/personagens/estaticos/menino3_versao2.png"
    );
    this.load.image(
      "menina3",
      "assets/personagens/estaticos/menina3_versao2.png"
    );

    this.load.image("confirmar", "assets/imagens/botoes/confirmar.png");

    // Efeitos sonoros
    this.load.audio("botao", "assets/sons/efeitos/botao.mp3");
    this.load.audio("selecao", "assets/sons/efeitos/transicao_tela.mp3");
  }

  create() {
    const largura = this.cameras.main.width;
    const altura = this.cameras.main.height;

    // Aumentamos o espaçamento para uma melhor separação visual
    const espacamento = largura * 0.18;

    // Mapeamento das dimensões das novas imagens
    const dimensoes = {
      menina1: { largura: 603, altura: 1404 },
      menino2: { largura: 218, altura: 500 },
      menino3: { largura: 643, altura: 1423 },
      menina3: { largura: 700, altura: 1411 },
    };

    // Altura alvo para todos os personagens na tela
    const alturaAlvo = altura * 0.45;
    // Escala para personagem selecionado (20% maior)
    const escalaSelecionado = 1.2;

    // Fundo com melhor controle de escala
    this.fundo = this.add
      .image(largura / 2, altura / 2, "fundo")
      .setOrigin(0.5)
      .setDisplaySize(largura, altura);

    // Adicionar um painel de fundo para a área de seleção
    this.painelSelecao = this.add
      .image(largura / 2, altura * 0.55, "painel")
      .setOrigin(0.5)
      .setAlpha(0.7)
      .setDisplaySize(largura * 0.85, altura * 0.5);

    this.personagens = ["menina1", "menino2", "menino3", "menina3"];
    this.selectedIndex = 0;

    // Calculamos o total de largura necessária para todos os personagens
    const totalPersonagens = this.personagens.length;
    const totalLargura = (totalPersonagens - 1) * espacamento;
    const xInicial = largura / 2 - totalLargura / 2;
    this.xInicial = xInicial;

    // Criamos contêineres para os personagens e seus nomes
    this.characterContainers = [];

    this.characterSprites = this.personagens.map((key, index) => {
      const x = xInicial + index * espacamento;

      // Criar um contêiner para o personagem e seu nome
      const container = this.add.container(x, altura * 0.5);
      this.characterContainers.push(container);

      // Adicionar o sprite do personagem
      let sprite = this.add.image(0, 0, key).setInteractive();

      // Calcular o fator de escala base para manter a altura alvo
      const escalaBase = alturaAlvo / dimensoes[key].altura;
      sprite.setScale(escalaBase);

      // Adicionar elementos ao contêiner
      container.add([sprite]);

      // Efeitos interativos
      sprite.on("pointerover", () => {
        if (index !== this.selectedIndex) {
          this.tweens.add({
            targets: sprite,
            scaleX: escalaBase * 1.1,
            scaleY: escalaBase * 1.1,
            duration: 100,
          });
        }
      });

      sprite.on("pointerout", () => {
        if (index !== this.selectedIndex) {
          this.tweens.add({
            targets: sprite,
            scaleX: escalaBase,
            scaleY: escalaBase,
            duration: 100,
          });
        }
      });

      sprite.on("pointerdown", () => {
        this.sound.play("botao");
        this.selectCharacter(index);
      });

      return sprite;
    });

    // Criar um efeito de seleção com fundo quase transparente e borda azul
    this.selectorGlow = this.add
      .image(
        xInicial + this.selectedIndex * espacamento,
        altura * 0.5,
        "painel"
      )
      .setTint(0x010100)
      .setAlpha(0.2)
      .setBlendMode(Phaser.BlendModes.NORMAL);

    // Criar a borda azul usando um gráfico
    this.selectorBorder = this.add.graphics();
    this.updateSelectorBorder();

    // Ajustar o tamanho do seletor
    const personagemAtual = this.personagens[this.selectedIndex];
    const escalaBase = alturaAlvo / dimensoes[personagemAtual].altura;
    const larguraSeletor =
      dimensoes[personagemAtual].largura * escalaBase * escalaSelecionado;
    const alturaSeletor = alturaAlvo * escalaSelecionado;

    this.selectorGlow.setDisplaySize(larguraSeletor + 60, alturaSeletor + 60);

    // Animar o seletor com um brilho pulsante
    this.tweens.add({
      targets: this.selectorGlow,
      alpha: { from: 0.25, to: 0.3 },
      duration: 1000,
      yoyo: true,
      repeat: -1,
    });

    // Botão confirmar com efeito ao passar o mouse
    this.confirmar = this.add
      .image(largura / 2, altura * 0.85, "confirmar")
      .setInteractive()
      .setScale(0.8);

    this.tweens.add({
      targets: this.confirmar,
      y: altura * 0.85 + 5,
      duration: 1000,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
    });

    this.confirmar.on("pointerover", () => {
      this.tweens.add({
        targets: this.confirmar,
        scale: 0.9,
        duration: 100,
      });
    });

    this.confirmar.on("pointerout", () => {
      this.tweens.add({
        targets: this.confirmar,
        scale: 0.8,
        duration: 100,
      });
    });

    this.confirmar.on("pointerdown", () => {
      this.sound.play("selecao");
      this.confirmSelection();
    });

    // Título com estilo melhorado
    this.titulo = this.add
      .text(largura * 0.5, altura * 0.15, "Selecione seu Personagem", {
        fontSize: Math.min(largura, altura) * 0.05,
        fill: "#FFFFFF",
        fontFamily: "Rainyhearts",
        align: "center",
        stroke: "#000080",
        strokeThickness: 6,
      })
      .setOrigin(0.5);

    // Animação do título
    this.tweens.add({
      targets: this.titulo,
      scale: { from: 1, to: 1.05 },
      duration: 1500,
      yoyo: true,
      repeat: -1,
    });

    // Botão de menu com melhores efeitos
    let botaoMenu = this.add
      .image(largura * 0.1, altura * 0.08, "botao_retangular")
      .setInteractive()
      .setOrigin(0.5)
      .setScale(largura * 0.0003);

    let textoMenu = this.add
      .text(largura * 0.1, altura * 0.08, "MENU", {
        fontSize: Math.min(largura, altura) * 0.03,
        fill: "#FFFFFF",
        fontFamily: "Rainyhearts",
        fontStyle: "bold",
      })
      .setInteractive()
      .setOrigin(0.5);

    botaoMenu.on("pointerover", () => {
      this.tweens.add({
        targets: [botaoMenu, textoMenu],
        scale: "*=1.1",
        duration: 100,
      });
    });

    botaoMenu.on("pointerout", () => {
      this.tweens.add({
        targets: [botaoMenu, textoMenu],
        scale: "/=1.1",
        duration: 100,
      });
    });

    botaoMenu.on("pointerdown", () => {
      this.sound.play("botao");
      this.scene.start("MenuPrincipal");
    });

    textoMenu.on("pointerdown", () => {
      this.sound.play("botao");
      this.scene.start("MenuPrincipal");
    });

    // Configurar controles de teclado
    this.setupKeyboardControls();

    // Aplicar o estado inicial
    this.selectCharacter(0, true);
  }

  // Adicionar função para configurar os controles de teclado
  setupKeyboardControls() {
    // Criar referências para as teclas de seta e Enter
    this.cursors = this.input.keyboard.createCursorKeys();

    // Adicionar evento para teclas pressionadas
    this.input.keyboard.on("keydown", (event) => {
      // Para direita e cima: selecionar próximo personagem
      if (event.code === "ArrowRight" || event.code === "ArrowUp") {
        let nextIndex = (this.selectedIndex + 1) % this.personagens.length;
        this.selectCharacter(nextIndex);
      }
      // Para esquerda e baixo: selecionar personagem anterior
      else if (event.code === "ArrowLeft" || event.code === "ArrowDown") {
        let prevIndex =
          (this.selectedIndex - 1 + this.personagens.length) %
          this.personagens.length;
        this.selectCharacter(prevIndex);
      }
      // Para Enter: confirmar seleção
      else if (event.code === "Enter") {
        this.sound.play("selecao");
        this.confirmSelection();
      }
    });
  }

  updateSelectorBorder() {
    // Limpar qualquer desenho anterior
    this.selectorBorder.clear();

    // Definir cor e espessura da borda
    this.selectorBorder.lineStyle(2, 0x00ccff, 1);

    // Obter as dimensões e posição atuais do selectorGlow
    const x = this.selectorGlow.x - this.selectorGlow.displayWidth / 2;
    const y = this.selectorGlow.y - this.selectorGlow.displayHeight / 2;
    const width = this.selectorGlow.displayWidth;
    const height = this.selectorGlow.displayHeight;

    // Desenhar o retângulo como borda
    this.selectorBorder.strokeRoundedRect(x, y, width, height, 20);
  }

  selectCharacter(index, isInitial = false) {
    // Se não for a inicialização, reproduzir som
    if (!isInitial) {
      this.sound.play("botao");
    }

    const dimensoes = {
      menina1: { largura: 603, altura: 1404 },
      menino2: { largura: 218, altura: 500 },
      menino3: { largura: 643, altura: 1423 },
      menina3: { largura: 700, altura: 1411 },
    };

    const alturaAlvo = this.cameras.main.height * 0.45;
    const escalaSelecionado = 1.2;
    const escalaNormal = 1.0;

    // Redefinir o personagem anteriormente selecionado
    if (this.selectedIndex !== index) {
      const personagemAnterior = this.personagens[this.selectedIndex];
      const escalaBaseAnterior =
        alturaAlvo / dimensoes[personagemAnterior].altura;

      const spriteAnterior = this.characterSprites[this.selectedIndex];
      this.tweens.add({
        targets: spriteAnterior,
        scaleX: escalaBaseAnterior,
        scaleY: escalaBaseAnterior,
        duration: 200,
      });

      // Desfoque do contêiner anterior
      this.tweens.add({
        targets: this.characterContainers[this.selectedIndex],
        y: this.cameras.main.height * 0.5,
        duration: 200,
      });
    }

    // Atualizar o índice selecionado
    this.selectedIndex = index;

    // Aplicar efeito ao novo personagem selecionado
    const personagemAtual = this.personagens[index];
    const escalaBase = alturaAlvo / dimensoes[personagemAtual].altura;

    const spriteAtual = this.characterSprites[index];
    this.tweens.add({
      targets: spriteAtual,
      scaleX: escalaBase * escalaSelecionado,
      scaleY: escalaBase * escalaSelecionado,
      duration: 200,
    });

    // Destacar o contêiner atual (move ligeiramente para cima)
    this.tweens.add({
      targets: this.characterContainers[index],
      y: this.cameras.main.height * 0.48,
      duration: 200,
    });

    // Mover o efeito de brilho para o personagem selecionado
    this.tweens.add({
      targets: this.selectorGlow,
      x: this.xInicial + index * (this.cameras.main.width * 0.18),
      duration: 200,
      ease: "Power2",
      onUpdate: () => this.updateSelectorBorder(),
      onComplete: () => this.updateSelectorBorder(),
    });

    // Ajustar o tamanho do seletor
    const larguraSeletor =
      dimensoes[personagemAtual].largura * escalaBase * escalaSelecionado;
    const alturaSeletor = alturaAlvo * escalaSelecionado;

    this.tweens.add({
      targets: this.selectorGlow,
      displayWidth: larguraSeletor + 60,
      displayHeight: alturaSeletor + 60,
      duration: 200,
      onUpdate: () => this.updateSelectorBorder(),
      onComplete: () => this.updateSelectorBorder(),
    });
  }

  confirmSelection() {
    // Efeito de flash ao confirmar
    this.cameras.main.flash(300, 255, 255, 255, true);

    const personagemSelecionado = this.personagens[this.selectedIndex];
    this.registry.set("personagemSelecionado", personagemSelecionado);

    // Atraso pequeno para o efeito de flash ser visível
    this.time.delayedCall(300, () => {
      this.scene.start("DialogoInicial");
    });
  }
}
