// ./src/componentes/HUD.js

export default class HUD {
  constructor(scene) {
    this.scene = scene;
    this.pontuacao = 0;
    this.pontuacaoMaxima = 100; // Valor máximo para a barra de pontuação
    this.seguranca = 0; // Agora começa em 0% e aumenta com a pontuação
    this.visible = false;

    // Container para todos os elementos da HUD
    this.container = this.scene.add.container(0, 0);
    this.container.setDepth(1000); // Garantir que fique acima de outros elementos

    // Inicializa a HUD
    this.inicializar();

    // Por padrão, a HUD começa oculta
    this.esconder();

    // Atualiza quando a tela for redimensionada
    this.scene.scale.on("resize", this.redimensionar, this);
  }

  inicializar() {
    const largura = this.scene.cameras.main.width;
    const altura = this.scene.cameras.main.height;

    // Fundo da HUD
    this.fundo = this.scene.add.graphics();
    this.desenharFundo();

    // Grupo para partículas digitais (efeito visual de dados)
    this.particulas = this.scene.add.group();
    this.criarParticulasDados();

    // Escudo de segurança
    this.escudoSeguranca = this.scene.add.graphics();
    this.desenharEscudo();

    // Barras de progresso
    this.barraPontuacao = this.scene.add.graphics();
    this.barraSeguranca = this.scene.add.graphics();
    this.desenharBarraPontuacao();
    this.desenharBarraSeguranca();

    // Linhas de circuito (decorativas)
    this.linhasTech = this.scene.add.graphics();
    this.desenharLinhasTech();

    // Textos informativos - Atualizados conforme solicitado
    this.labelPontuacao = this.scene.add
      .text(largura * 0.15, altura * 0.025, "PONTUAÇÃO", {
        fontFamily: "Rainyhearts",
        fontSize: Math.min(largura, altura) * 0.03 + "px",
        fill: "#FFFFFF",
      })
      .setOrigin(0, 0.5);

    this.labelSeguranca = this.scene.add
      .text(largura * 0.55, altura * 0.025, "SEGURANÇA DA CIDADE", {
        fontFamily: "Rainyhearts",
        fontSize: Math.min(largura, altura) * 0.03 + "px",
        fill: "#FFFFFF",
      })
      .setOrigin(0, 0.5);

    // Valores numéricos
    this.valorPontuacao = this.scene.add
      .text(largura * 0.4, altura * 0.055, "0", {
        fontFamily: "Rainyhearts",
        fontSize: Math.min(largura, altura) * 0.022 + "px",
        fill: "#FFFFFF",
      })
      .setOrigin(1, 0.5);

    this.valorSeguranca = this.scene.add
      .text(largura * 0.82, altura * 0.055, "0%", {
        fontFamily: "Rainyhearts",
        fontSize: Math.min(largura, altura) * 0.022 + "px",
        fill: "#FFFFFF",
      })
      .setOrigin(1, 0.5);

    // Botão para voltar ao menu principal
    this.botaoMenu = this.scene.add.graphics();
    this.desenharBotaoMenu();

    this.textoMenu = this.scene.add
      .text(largura * 0.95, altura * 0.045, "MENU", {
        fontFamily: "Rainyhearts",
        fontSize: Math.min(largura, altura) * 0.018 + "px",
        fill: "#FFFFFF",
      })
      .setOrigin(0.5);

    // Tornar o botão interativo
    const hitArea = new Phaser.Geom.Rectangle(
      largura * 0.95 - 40,
      altura * 0.045 - 15,
      80,
      30
    );

    this.botaoMenuHitArea = this.scene.add
      .zone(largura * 0.95 - 40, altura * 0.045 - 15, 80, 30)
      .setOrigin(0);

    this.botaoMenuHitArea.setInteractive({
      hitArea: hitArea,
      useHandCursor: true,
    });
    this.botaoMenuHitArea.on("pointerdown", () => {
      // Verificar se existe som de clique
      if (this.scene.sound.get("botao")) {
        this.scene.sound.play("botao", { volume: 0.7 });
      }
      this.scene.scene.start("MenuPrincipal");
    });

    // Adicionar todos os elementos ao container
    this.container.add([
      this.fundo,
      ...this.particulas.getChildren(),
      this.escudoSeguranca,
      this.barraPontuacao,
      this.barraSeguranca,
      this.linhasTech,
      this.botaoMenu,
      this.labelPontuacao,
      this.labelSeguranca,
      this.valorPontuacao,
      this.valorSeguranca,
      this.textoMenu,
      this.botaoMenuHitArea,
    ]);
  }

  desenharFundo() {
    const largura = this.scene.cameras.main.width;
    const altura = this.scene.cameras.main.height;

    this.fundo.clear();

    // Fundo semi-transparente com gradiente e cantos arredondados
    this.fundo.fillStyle(0x0a1128, 0.85);

    // Desenhar retângulo com cantos arredondados
    const raioArredondamento = 15; // Raio para os cantos arredondados (na parte inferior)

    // Caminho para desenhar retângulo com cantos inferiores arredondados
    this.fundo.beginPath();
    this.fundo.moveTo(0, 0);
    this.fundo.lineTo(largura, 0);
    this.fundo.lineTo(largura, altura * 0.09 - raioArredondamento);
    this.fundo.arc(
      largura - raioArredondamento,
      altura * 0.09 - raioArredondamento,
      raioArredondamento,
      0,
      Math.PI / 2,
      false
    );
    this.fundo.lineTo(raioArredondamento, altura * 0.09);
    this.fundo.arc(
      raioArredondamento,
      altura * 0.09 - raioArredondamento,
      raioArredondamento,
      Math.PI / 2,
      Math.PI,
      false
    );
    this.fundo.lineTo(0, 0);
    this.fundo.closePath();
    this.fundo.fillPath();

    // Borda inferior com cantos arredondados
    this.fundo.lineStyle(2, 0x1282a2);
    this.fundo.beginPath();
    this.fundo.moveTo(0, altura * 0.09 - raioArredondamento);
    this.fundo.lineTo(raioArredondamento, altura * 0.09 - raioArredondamento);
    this.fundo.arc(
      raioArredondamento,
      altura * 0.09 - raioArredondamento,
      raioArredondamento,
      Math.PI,
      Math.PI / 2,
      true
    );
    this.fundo.lineTo(largura - raioArredondamento, altura * 0.09);
    this.fundo.arc(
      largura - raioArredondamento,
      altura * 0.09 - raioArredondamento,
      raioArredondamento,
      Math.PI / 2,
      0,
      true
    );
    this.fundo.lineTo(largura, altura * 0.09 - raioArredondamento);
    this.fundo.strokePath();
  }

  desenharBotaoMenu() {
    const largura = this.scene.cameras.main.width;
    const altura = this.scene.cameras.main.height;

    this.botaoMenu.clear();

    // Desenhar o botão com cantos arredondados
    this.botaoMenu.fillStyle(0x1282a2, 0.7);

    // Botão arredondado
    const x = largura * 0.95;
    const y = altura * 0.045;
    const larguraBotao = 80;
    const alturaBotao = 30;
    const raio = 10;

    this.botaoMenu.fillRoundedRect(
      x - larguraBotao / 2,
      y - alturaBotao / 2,
      larguraBotao,
      alturaBotao,
      raio
    );

    // Borda do botão
    this.botaoMenu.lineStyle(2, 0x33bfff);
    this.botaoMenu.strokeRoundedRect(
      x - larguraBotao / 2,
      y - alturaBotao / 2,
      larguraBotao,
      alturaBotao,
      raio
    );
  }

  criarParticulasDados() {
    const largura = this.scene.cameras.main.width;
    const altura = this.scene.cameras.main.height;

    // Partículas digitais (0s e 1s) que simulam dados fluindo
    const numParticulas = 10;
    const cores = [0x33ff66, 0x1282a2, 0xffffff];

    for (let i = 0; i < numParticulas; i++) {
      const x = Phaser.Math.Between(0, largura);
      const y = Phaser.Math.Between(0, altura * 0.09);
      const tamanho =
        Math.min(largura, altura) * Phaser.Math.FloatBetween(0.004, 0.008);
      const cor = Phaser.Utils.Array.GetRandom(cores);

      // 50% chance de ser 0 ou 1, 50% de ser ponto
      let particula;
      if (Math.random() > 0.5) {
        const valor = Math.random() > 0.5 ? "0" : "1";
        particula = this.scene.add
          .text(x, y, valor, {
            fontFamily: "Arial",
            fontSize: tamanho + "px",
            fill: "#" + cor.toString(16).padStart(6, "0"),
          })
          .setAlpha(Phaser.Math.FloatBetween(0.3, 0.7));
      } else {
        particula = this.scene.add
          .circle(x, y, tamanho / 3, cor)
          .setAlpha(Phaser.Math.FloatBetween(0.3, 0.7));
      }

      this.particulas.add(particula);

      // Movimento da partícula (fluxo de dados)
      this.scene.tweens.add({
        targets: particula,
        x: Phaser.Math.Between(0, largura),
        y: Phaser.Math.Between(0, altura * 0.09),
        alpha: Phaser.Math.FloatBetween(0.2, 0.8),
        duration: Phaser.Math.Between(3000, 8000),
        repeat: -1,
        yoyo: true,
        ease: "Sine.easeInOut",
      });
    }
  }

  redesenharParticulas() {
    // Remove partículas anteriores
    this.particulas.clear(true, true);

    // Cria novas partículas
    this.criarParticulasDados();

    // Adiciona ao container
    this.container.add(this.particulas.getChildren());
  }

  desenharEscudo() {
    const largura = this.scene.cameras.main.width;
    const altura = this.scene.cameras.main.height;
    const escalaBase = Math.min(largura, altura) * 0.03;

    this.escudoSeguranca.clear();

    // Cor baseada no nível de segurança
    const cor = this.getCorSeguranca();

    // Escudo hexagonal (simboliza proteção de dados)
    this.escudoSeguranca.fillStyle(0x001f54, 0.8);
    this.escudoSeguranca.beginPath();
    this.escudoSeguranca.moveTo(largura * 0.05, altura * 0.02);
    this.escudoSeguranca.lineTo(
      largura * 0.05 + escalaBase * 0.7,
      altura * 0.03
    );
    this.escudoSeguranca.lineTo(
      largura * 0.05 + escalaBase * 0.7,
      altura * 0.05
    );
    this.escudoSeguranca.lineTo(largura * 0.05, altura * 0.07);
    this.escudoSeguranca.lineTo(
      largura * 0.05 - escalaBase * 0.7,
      altura * 0.05
    );
    this.escudoSeguranca.lineTo(
      largura * 0.05 - escalaBase * 0.7,
      altura * 0.03
    );
    this.escudoSeguranca.closePath();
    this.escudoSeguranca.fillPath();

    // Borda do escudo
    this.escudoSeguranca.lineStyle(2, cor);
    this.escudoSeguranca.beginPath();
    this.escudoSeguranca.moveTo(largura * 0.05, altura * 0.02);
    this.escudoSeguranca.lineTo(
      largura * 0.05 + escalaBase * 0.7,
      altura * 0.03
    );
    this.escudoSeguranca.lineTo(
      largura * 0.05 + escalaBase * 0.7,
      altura * 0.05
    );
    this.escudoSeguranca.lineTo(largura * 0.05, altura * 0.07);
    this.escudoSeguranca.lineTo(
      largura * 0.05 - escalaBase * 0.7,
      altura * 0.05
    );
    this.escudoSeguranca.lineTo(
      largura * 0.05 - escalaBase * 0.7,
      altura * 0.03
    );
    this.escudoSeguranca.closePath();
    this.escudoSeguranca.strokePath();

    // Símbolo de cadeado dentro do escudo
    this.escudoSeguranca.fillStyle(cor);
    this.escudoSeguranca.fillRect(
      largura * 0.05 - escalaBase * 0.25,
      altura * 0.04,
      escalaBase * 0.5,
      escalaBase * 0.3
    );
    this.escudoSeguranca.lineStyle(escalaBase * 0.15, cor);
    this.escudoSeguranca.beginPath();
    this.escudoSeguranca.arc(
      largura * 0.05,
      altura * 0.04,
      escalaBase * 0.25,
      Math.PI,
      0
    );
    this.escudoSeguranca.strokePath();
  }

  desenharBarraPontuacao() {
    const largura = this.scene.cameras.main.width;
    const altura = this.scene.cameras.main.height;

    this.barraPontuacao.clear();

    // Fundo da barra com cantos arredondados
    this.barraPontuacao.fillStyle(0x001f54, 0.6);
    this.barraPontuacao.fillRoundedRect(
      largura * 0.15,
      altura * 0.055 - altura * 0.01,
      largura * 0.25,
      altura * 0.02,
      altura * 0.01 // Raio de arredondamento
    );

    // Barra de progresso segmentada baseada em pontuacaoMaxima
    const progresso = this.pontuacao / this.pontuacaoMaxima;
    const numSegmentos = 10;
    const larguraTotal = largura * 0.25 * progresso;

    if (progresso > 0) {
      // Desenhar a barra de progresso segmentada com cantos arredondados
      // Para simular clipping, vamos desenhar apenas até o ponto de progresso
      for (let i = 0; i < numSegmentos; i++) {
        const segmentoX =
          largura * 0.15 + i * ((largura * 0.25) / numSegmentos);
        const segmentoLargura = (largura * 0.25) / numSegmentos;

        // Verificar se este segmento deve ser desenhado
        if (segmentoX < largura * 0.15 + larguraTotal) {
          // Calcular a largura real do segmento (pode ser parcial no último segmento visível)
          const larguraEfetiva = Math.min(
            segmentoLargura,
            largura * 0.15 + larguraTotal - segmentoX
          );

          const corIndex = i % 2;
          const cor = corIndex === 0 ? 0x1282a2 : 0x33bfff;

          this.barraPontuacao.fillStyle(cor);

          // Se for o primeiro segmento, arredondar à esquerda
          if (i === 0) {
            this.barraPontuacao.fillRoundedRect(
              segmentoX,
              altura * 0.055 - altura * 0.01,
              larguraEfetiva,
              altura * 0.02,
              {
                tl: altura * 0.01,
                bl: altura * 0.01,
                tr: 0,
                br: 0,
              }
            );
          }
          // Se for o último segmento visível e completar a barra total, arredondar à direita
          else if (i === numSegmentos - 1 && progresso >= 0.99) {
            this.barraPontuacao.fillRoundedRect(
              segmentoX,
              altura * 0.055 - altura * 0.01,
              larguraEfetiva,
              altura * 0.02,
              {
                tl: 0,
                bl: 0,
                tr: altura * 0.01,
                br: altura * 0.01,
              }
            );
          }
          // Caso contrário, retângulo normal
          else {
            this.barraPontuacao.fillRect(
              segmentoX,
              altura * 0.055 - altura * 0.01,
              larguraEfetiva,
              altura * 0.02
            );
          }
        }
      }
    }

    // Linhas divisórias
    this.barraPontuacao.lineStyle(1, 0xffffff, 0.2);
    for (let i = 1; i < 10; i++) {
      this.barraPontuacao.lineBetween(
        largura * (0.15 + (0.25 * i) / 10),
        altura * 0.055 - altura * 0.01,
        largura * (0.15 + (0.25 * i) / 10),
        altura * 0.055 + altura * 0.01
      );
    }
  }

  desenharBarraSeguranca() {
    const largura = this.scene.cameras.main.width;
    const altura = this.scene.cameras.main.height;

    this.barraSeguranca.clear();

    // Fundo da barra com cantos arredondados
    this.barraSeguranca.fillStyle(0x001f54, 0.6);
    this.barraSeguranca.fillRoundedRect(
      largura * 0.55,
      altura * 0.055 - altura * 0.01,
      largura * 0.25,
      altura * 0.02,
      altura * 0.01 // Raio de arredondamento
    );

    // Cor baseada no nível de segurança
    const cor = this.getCorSeguranca();
    const corClara = this.getCorSegurancaClara();

    // Progresso da barra com efeito pulsante
    const progresso = this.seguranca / 100;
    const numSegmentos = 10;

    if (progresso > 0) {
      // Desenhar a barra de progresso segmentada com cantos arredondados
      for (let i = 0; i < numSegmentos; i++) {
        const segmentoX =
          largura * 0.55 + i * ((largura * 0.25) / numSegmentos);
        const segmentoLargura = (largura * 0.25) / numSegmentos;

        // Verificar se este segmento deve ser desenhado
        if (segmentoX < largura * 0.55 + largura * 0.25 * progresso) {
          // Calcular a largura real do segmento (pode ser parcial no último segmento visível)
          const larguraEfetiva = Math.min(
            segmentoLargura,
            largura * 0.55 + largura * 0.25 * progresso - segmentoX
          );

          const corSegmento = i % 2 === 0 ? cor : corClara;
          this.barraSeguranca.fillStyle(corSegmento);

          // Se for o primeiro segmento, arredondar à esquerda
          if (i === 0) {
            this.barraSeguranca.fillRoundedRect(
              segmentoX,
              altura * 0.055 - altura * 0.01,
              larguraEfetiva,
              altura * 0.02,
              {
                tl: altura * 0.01,
                bl: altura * 0.01,
                tr: 0,
                br: 0,
              }
            );
          }
          // Se for o último segmento visível e completar a barra total, arredondar à direita
          else if (i === numSegmentos - 1 && progresso >= 0.99) {
            this.barraSeguranca.fillRoundedRect(
              segmentoX,
              altura * 0.055 - altura * 0.01,
              larguraEfetiva,
              altura * 0.02,
              {
                tl: 0,
                bl: 0,
                tr: altura * 0.01,
                br: altura * 0.01,
              }
            );
          }
          // Caso contrário, retângulo normal
          else {
            this.barraSeguranca.fillRect(
              segmentoX,
              altura * 0.055 - altura * 0.01,
              larguraEfetiva,
              altura * 0.02
            );
          }
        }
      }
    }

    // Linhas divisórias
    this.barraSeguranca.lineStyle(1, 0xffffff, 0.2);
    for (let i = 1; i < 10; i++) {
      this.barraSeguranca.lineBetween(
        largura * (0.55 + (0.25 * i) / 10),
        altura * 0.055 - altura * 0.01,
        largura * (0.55 + (0.25 * i) / 10),
        altura * 0.055 + altura * 0.01
      );
    }
  }

  desenharLinhasTech() {
    const largura = this.scene.cameras.main.width;
    const altura = this.scene.cameras.main.height;

    this.linhasTech.clear();

    // Linhas de "circuito" (estilo tech)
    this.linhasTech.lineStyle(1, 0x1282a2, 0.5);

    // Linhas horizontais
    this.linhasTech.lineBetween(0, altura * 0.045, largura, altura * 0.045);

    // Linhas verticais
    this.linhasTech.lineBetween(largura * 0.1, 0, largura * 0.1, altura * 0.09);
    this.linhasTech.lineBetween(largura * 0.5, 0, largura * 0.5, altura * 0.09);
    this.linhasTech.lineBetween(largura * 0.9, 0, largura * 0.9, altura * 0.09);

    // Pequenos hexágonos nos cruzamentos (nós de dados)
    const tamanhoHex = Math.min(largura, altura) * 0.004;
    this.desenharHexagono(largura * 0.1, altura * 0.045, tamanhoHex, 0x1282a2);
    this.desenharHexagono(largura * 0.5, altura * 0.045, tamanhoHex, 0x1282a2);
    this.desenharHexagono(largura * 0.9, altura * 0.045, tamanhoHex, 0x1282a2);
  }

  desenharHexagono(x, y, tamanho, cor) {
    this.linhasTech.lineStyle(1, cor, 0.8);
    this.linhasTech.beginPath();

    for (let i = 0; i < 6; i++) {
      const angulo = (Math.PI / 3) * i;
      const pX = x + tamanho * Math.cos(angulo);
      const pY = y + tamanho * Math.sin(angulo);

      if (i === 0) {
        this.linhasTech.moveTo(pX, pY);
      } else {
        this.linhasTech.lineTo(pX, pY);
      }
    }

    this.linhasTech.closePath();
    this.linhasTech.strokePath();
  }

  getCorSeguranca() {
    // Retorna cor baseada no nível de segurança
    if (this.seguranca < 30) {
      return 0xff3333; // Vermelho (baixo)
    } else if (this.seguranca < 70) {
      return 0xffaa00; // Laranja (médio)
    } else {
      return 0x33ff66; // Verde (alto)
    }
  }

  getCorSegurancaClara() {
    // Retorna versão mais clara da cor de segurança
    if (this.seguranca < 30) {
      return 0xff6666; // Vermelho claro
    } else if (this.seguranca < 70) {
      return 0xffcc33; // Laranja claro
    } else {
      return 0x66ff99; // Verde claro
    }
  }

  redimensionar() {
    // Redesenha todos os elementos quando a tela é redimensionada
    this.desenharFundo();
    this.redesenharParticulas();
    this.desenharEscudo();
    this.desenharBarraPontuacao();
    this.desenharBarraSeguranca();
    this.desenharLinhasTech();
    this.desenharBotaoMenu();

    const largura = this.scene.cameras.main.width;
    const altura = this.scene.cameras.main.height;

    // Atualiza posições e tamanhos dos textos
    this.labelPontuacao.setPosition(largura * 0.15, altura * 0.025);
    this.labelPontuacao.setFontSize(Math.min(largura, altura) * 0.018 + "px");

    this.labelSeguranca.setPosition(largura * 0.55, altura * 0.025);
    this.labelSeguranca.setFontSize(Math.min(largura, altura) * 0.018 + "px");

    this.valorPontuacao.setPosition(largura * 0.4, altura * 0.055);
    this.valorPontuacao.setFontSize(Math.min(largura, altura) * 0.022 + "px");

    this.valorSeguranca.setPosition(largura * 0.82, altura * 0.055);
    this.valorSeguranca.setFontSize(Math.min(largura, altura) * 0.022 + "px");

    this.textoMenu.setPosition(largura * 0.95, altura * 0.045);
    this.textoMenu.setFontSize(Math.min(largura, altura) * 0.018 + "px");

    // Atualiza a área de clique do botão
    this.botaoMenuHitArea.x = largura * 0.95 - 40;
    this.botaoMenuHitArea.y = altura * 0.045 - 15;
  }

  mostrar() {
    this.visible = true;
    this.container.setVisible(true);

    // Ao mostrar a HUD pela primeira vez, atualiza a segurança para garantir que esteja sincronizada
    this.atualizarSeguranca();
  }

  esconder() {
    this.visible = false;
    this.container.setVisible(false);
  }

  alterarPontuacao(valor) {
    // Adiciona o valor à pontuação atual
    const pontuacaoAnterior = this.pontuacao;
    this.pontuacao += valor;

    // Garante que a pontuação não seja negativa
    this.pontuacao = Math.max(0, this.pontuacao);

    // Anima a transição da pontuação
    this.scene.tweens.add({
      targets: { valor: pontuacaoAnterior },
      valor: this.pontuacao,
      duration: 800,
      ease: "Power2",
      onUpdate: (tween) => {
        const valorAtual = Math.round(tween.getValue());
        this.valorPontuacao.setText(`${valorAtual}`);
        this.desenharBarraPontuacao();
      },
      onComplete: () => {
        // Atualiza o nível de segurança baseado na nova pontuação
        this.atualizarSeguranca();
      },
    });
  }

  // Novo método para atualizar o nível de segurança com base na pontuação
  atualizarSeguranca() {
    // Calcula a porcentagem baseada na pontuação atual vs pontuação máxima
    const segurancaNova = Math.min(
      100,
      Math.floor((this.pontuacao / this.pontuacaoMaxima) * 100)
    );
    const segurancaAnterior = this.seguranca;

    // Se for diferente, atualiza com animação
    if (segurancaNova !== segurancaAnterior) {
      this.seguranca = segurancaNova;

      // Anima a transição da segurança
      this.scene.tweens.add({
        targets: { valor: segurancaAnterior },
        valor: this.seguranca,
        duration: 800,
        ease: "Power2",
        onUpdate: (tween) => {
          const valorAtual = Math.round(tween.getValue());
          this.valorSeguranca.setText(`${valorAtual}%`);
          this.desenharBarraSeguranca();
          this.desenharEscudo();
        },
      });
    }
  }

  // Método mantido para compatibilidade, mas agora só é usado internamente
  alterarSeguranca(valor) {
    console.warn(
      "O método alterarSeguranca() está obsoleto. A segurança é calculada automaticamente a partir da pontuação."
    );
  }
}
