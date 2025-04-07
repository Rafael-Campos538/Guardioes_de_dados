// ./src/componentes/HUD.js
export default class HUD {
  constructor(scene) {
    this.scene = scene;
    this.visible = false;

    // Inicialização do registro global
    if (this.scene.registry.get("nivelSeguranca") === undefined) {
      this.scene.registry.set("nivelSeguranca", 75);
    }

    if (this.scene.registry.get("infracoes") === undefined) {
      this.scene.registry.set("infracoes", 0);
    }

    // Valores atuais
    this.nivelSeguranca = this.scene.registry.get("nivelSeguranca");
    this.infracoes = this.scene.registry.get("infracoes");

    // Referências para os elementos visuais
    this.elements = {};

    // Containers principais
    this.mainContainer = null;
    this.securityContainer = null;
    this.infractionsContainer = null;
    this.menuContainer = null;

    // Configurações de animação
    this.animConfig = {
      scanDuration: 3000,
      glowIntensity: 0.7,
      pulseDuration: 1500,
    };

    // Efeitos visuais em execução
    this.activeEffects = {
      scanLines: null,
      glowTweens: [],
    };
  }

  criar() {
    // Limpar se já existir
    if (this.mainContainer) {
      this.mainContainer.destroy();
      if (this.activeEffects.scanLines) {
        this.activeEffects.scanLines.remove();
      }
      this.activeEffects.glowTweens.forEach((tween) => {
        if (tween.isPlaying()) tween.stop();
      });
      this.activeEffects.glowTweens = [];
    }

    // Dimensões da tela
    const width = this.scene.cameras.main.width;
    const height = this.scene.cameras.main.height;

    // Container principal
    this.mainContainer = this.scene.add.container(0, 0);
    this.mainContainer.setDepth(9999);

    // ===== DESIGN DE FUNDO FUTURISTA =====
    this.elements.background = this.scene.add.graphics();

    // Painel superior com forma futurista (borda angulada)
    this.elements.background.fillStyle(0x0a1f34, 0.85);
    this.elements.background.fillRect(0, 0, width, 50);

    // Detalhes angulados nas bordas
    this.elements.background.fillStyle(0x00a8ff, 0.4);
    // Esquerda
    this.elements.background.fillTriangle(0, 50, 20, 50, 0, 70);
    // Direita
    this.elements.background.fillTriangle(width, 50, width - 20, 50, width, 70);

    // Linhas de contorno estilo "circuito"
    this.elements.circuits = this.scene.add.graphics();
    this.elements.circuits.lineStyle(1, 0x00a8ff, 0.6);

    // Linha horizontal na base do painel
    this.elements.circuits.lineBetween(0, 50, width, 50);

    // Pequenos detalhes de circuito
    const circuitPoints = [
      [100, 50, 100, 40],
      [100, 40, 150, 40],
      [width - 100, 50, width - 100, 40],
      [width - 100, 40, width - 150, 40],
      [width / 2 - 50, 50, width / 2 - 50, 35],
      [width / 2 + 50, 50, width / 2 + 50, 35],
      [width / 2 - 50, 35, width / 2 + 50, 35],
    ];

    circuitPoints.forEach((point) => {
      this.elements.circuits.lineBetween(
        point[0],
        point[1],
        point[2],
        point[3]
      );
    });

    // ===== EFEITO DE ESCANEAMENTO =====
    // Linha de scan que se move pelo painel
    this.elements.scanLine = this.scene.add.graphics();
    this.elements.scanLine.lineStyle(2, 0x00ffff, 0.7);
    this.elements.scanLine.lineBetween(0, 25, width, 25);

    // Configurar animação de escaneamento
    this.activeEffects.scanLines = this.scene.tweens.add({
      targets: this.elements.scanLine,
      y: 25,
      duration: this.animConfig.scanDuration,
      ease: "Sine.easeInOut",
      yoyo: true,
      repeat: -1,
      onUpdate: () => {
        this.elements.scanLine.clear();
        this.elements.scanLine.lineStyle(2, 0x00ffff, 0.7);
        const y = this.elements.scanLine.y;
        this.elements.scanLine.lineBetween(0, y, width, y);
      },
    });

    // ===== CONTAINER DE SEGURANÇA =====
    this.securityContainer = this.scene.add.container(width * 0.25, 25);

    // HEX GRID - Fundo de grade hexagonal para o medidor de segurança
    this.elements.hexGridSecurity = this.createHexagonalGrid(
      200,
      30,
      6,
      6,
      0x00a8ff,
      0.2
    );

    // Painel de segurança com forma de trapézio
    this.elements.securityPanel = this.scene.add.graphics();
    this.elements.securityPanel.fillStyle(0x051525, 0.7);
    this.elements.securityPanel.fillRoundedRect(0, -15, 200, 30, 5);
    this.elements.securityPanel.lineStyle(1, 0x00a8ff, 0.8);
    this.elements.securityPanel.strokeRoundedRect(0, -15, 200, 30, 5);

    // Barra de progresso de segurança - visual de "energia"
    this.elements.energyBar = this.scene.add.graphics();
    this.updateSecurityBar(this.nivelSeguranca);

    // Texto "SEGURANÇA" holográfico
    this.elements.securityLabel = this.scene.add
      .text(-90, 0, "SEGURANÇA", {
        fontFamily: "Arial",
        fontSize: "14px",
        fontStyle: "bold",
        color: "#00a8ff",
      })
      .setOrigin(0.5);

    // Valor numérico da segurança
    this.elements.securityValue = this.scene.add
      .text(100, 0, `${this.nivelSeguranca}%`, {
        fontFamily: "Arial",
        fontSize: "16px",
        fontStyle: "bold",
        color: "#ffffff",
        stroke: "#00a8ff",
        strokeThickness: 1,
      })
      .setOrigin(0.5);

    // Adicionar efeito de brilho ao texto de segurança
    this.addGlowEffect(this.elements.securityValue);

    // Adicionar elementos ao container de segurança
    this.securityContainer.add([
      this.elements.hexGridSecurity,
      this.elements.securityPanel,
      this.elements.energyBar,
      this.elements.securityLabel,
      this.elements.securityValue,
    ]);

    // ===== CONTAINER DE INFRAÇÕES =====
    this.infractionsContainer = this.scene.add.container(width * 0.7, 25);

    // HEX GRID - Fundo de grade hexagonal para o contador de infrações
    this.elements.hexGridInfractions = this.createHexagonalGrid(
      150,
      30,
      6,
      6,
      0xff3333,
      0.15
    );

    // Painel de infrações com estilo de "alerta"
    this.elements.infractionsPanel = this.scene.add.graphics();
    this.elements.infractionsPanel.fillStyle(0x051525, 0.7);
    this.elements.infractionsPanel.fillRoundedRect(0, -15, 150, 30, 5);
    this.elements.infractionsPanel.lineStyle(1, 0xff3333, 0.8);
    this.elements.infractionsPanel.strokeRoundedRect(0, -15, 150, 30, 5);

    // Símbolo de alerta dinâmico
    this.elements.alertSymbol = this.scene.add.graphics();
    this.drawAlertSymbol(this.elements.alertSymbol, -60, 0);

    // Texto "INFRAÇÕES" holográfico
    this.elements.infractionsLabel = this.scene.add
      .text(0, 0, "INFRAÇÕES", {
        fontFamily: "Arial",
        fontSize: "14px",
        fontStyle: "bold",
        color: "#ff3333",
      })
      .setOrigin(0.5);

    // Contador de infrações
    this.elements.infractionsCount = this.scene.add
      .text(60, 0, this.infracoes.toString().padStart(2, "0"), {
        fontFamily: "Arial",
        fontSize: "16px",
        fontStyle: "bold",
        color: "#ffffff",
        stroke: "#ff3333",
        strokeThickness: 1,
      })
      .setOrigin(0.5);

    // Adicionar efeito de brilho ao contador
    this.addGlowEffect(this.elements.infractionsCount, 0xff3333);

    // Adicionar elementos ao container de infrações
    this.infractionsContainer.add([
      this.elements.hexGridInfractions,
      this.elements.infractionsPanel,
      this.elements.alertSymbol,
      this.elements.infractionsLabel,
      this.elements.infractionsCount,
    ]);

    // ===== BOTÃO DE MENU HOLOGRÁFICO =====
    this.menuContainer = this.scene.add.container(width * 0.9, 25);

    // Fundo com efeito de botão cibernético
    this.elements.menuHexBg = this.createHexButton(0, 0, 80, 30, 0x00a8ff);

    // Texto do menu
    this.elements.menuText = this.scene.add
      .text(0, 0, "MENU", {
        fontFamily: "Arial",
        fontSize: "16px",
        fontStyle: "bold",
        color: "#ffffff",
        stroke: "#00a8ff",
        strokeThickness: 1,
      })
      .setOrigin(0.5);

    // Área de hitbox para o botão
    this.elements.menuHitArea = this.scene.add
      .zone(0, 0, 80, 30)
      .setInteractive({ useHandCursor: true })
      .on("pointerover", () => {
        // Efeito hover
        this.elements.menuHexBg.clear();
        this.createHexButton(0, 0, 80, 30, 0x00ccff, this.elements.menuHexBg);
        this.elements.menuText.setScale(1.1);
      })
      .on("pointerout", () => {
        // Voltar ao normal
        this.elements.menuHexBg.clear();
        this.createHexButton(0, 0, 80, 30, 0x00a8ff, this.elements.menuHexBg);
        this.elements.menuText.setScale(1);
      })
      .on("pointerdown", () => {
        // Efeito de clique
        this.elements.menuHexBg.clear();
        this.createHexButton(0, 0, 80, 30, 0x0066ff, this.elements.menuHexBg);
        this.elements.menuText.setScale(0.9);

        // Som e ação
        try {
          if (this.scene.sound && this.scene.sound.add) {
            const somBotao = this.scene.sound.add("botao", {
              loop: false,
              volume: 0.7,
            });
            somBotao.play();
          }
        } catch (e) {
          console.log("Som não disponível");
        }

        this.scene.time.delayedCall(100, () => {
          this.scene.scene.start("MenuPrincipal");
        });
      });

    // Adicionar elementos ao container de menu
    this.menuContainer.add([
      this.elements.menuHexBg,
      this.elements.menuText,
      this.elements.menuHitArea,
    ]);

    // Adicionar todos os containers ao container principal
    this.mainContainer.add([
      this.elements.background,
      this.elements.circuits,
      this.elements.scanLine,
      this.securityContainer,
      this.infractionsContainer,
      this.menuContainer,
    ]);

    // Inicialmente invisível
    this.mainContainer.setVisible(false);

    // Configurar evento de redimensionamento
    this.scene.scale.on("resize", this.redimensionar, this);

    return this;
  }

  // Criar grade hexagonal para fundos futuristas
  createHexagonalGrid(width, height, cols, rows, color, alpha) {
    const graphics = this.scene.add.graphics();
    const hexSize = 5;

    graphics.lineStyle(1, color, alpha);

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const centerX = col * 2 * hexSize - width / 2 + hexSize;
        const centerY = row * Math.sqrt(3) * hexSize - height / 2 + hexSize;

        // Desenhar hexágono
        graphics.beginPath();
        for (let i = 0; i < 6; i++) {
          const angle = ((2 * Math.PI) / 6) * i;
          const x = centerX + hexSize * Math.cos(angle);
          const y = centerY + hexSize * Math.sin(angle);

          if (i === 0) {
            graphics.moveTo(x, y);
          } else {
            graphics.lineTo(x, y);
          }
        }
        graphics.closePath();
        graphics.strokePath();
      }
    }

    return graphics;
  }

  // Desenhar símbolo de alerta angular e futurista
  drawAlertSymbol(graphics, x, y) {
    graphics.clear();
    graphics.lineStyle(2, 0xff3333, 0.9);

    // Triângulo de alerta
    graphics.beginPath();
    graphics.moveTo(x, y - 10);
    graphics.lineTo(x + 8, y + 5);
    graphics.lineTo(x - 8, y + 5);
    graphics.closePath();
    graphics.strokePath();

    // Ponto de exclamação
    graphics.fillStyle(0xff3333, 0.9);
    graphics.fillCircle(x, y + 1, 2);
  }

  // Criar botão hexagonal futurista
  createHexButton(x, y, width, height, color, graphics = null) {
    if (!graphics) {
      graphics = this.scene.add.graphics();
    }

    const cornerRadius = 8;

    // Fundo do botão
    graphics.fillStyle(0x051525, 0.7);
    graphics.fillRoundedRect(
      x - width / 2,
      y - height / 2,
      width,
      height,
      cornerRadius
    );

    // Bordas com efeito de energia
    graphics.lineStyle(2, color, 0.8);
    graphics.strokeRoundedRect(
      x - width / 2,
      y - height / 2,
      width,
      height,
      cornerRadius
    );

    // Detalhes angulares nas pontas
    graphics.lineStyle(1, color, 0.6);

    // Canto superior esquerdo
    graphics.lineBetween(
      x - width / 2,
      y - height / 4,
      x - width / 3,
      y - height / 2
    );

    // Canto superior direito
    graphics.lineBetween(
      x + width / 2,
      y - height / 4,
      x + width / 3,
      y - height / 2
    );

    // Canto inferior esquerdo
    graphics.lineBetween(
      x - width / 2,
      y + height / 4,
      x - width / 3,
      y + height / 2
    );

    // Canto inferior direito
    graphics.lineBetween(
      x + width / 2,
      y + height / 4,
      x + width / 3,
      y + height / 2
    );

    return graphics;
  }

  // Atualizar a barra de segurança
  updateSecurityBar(value) {
    if (!this.elements.energyBar) return;

    this.elements.energyBar.clear();

    // Determinar cor baseada no valor
    let color;
    if (value > 60) {
      color = 0x00ff66; // Verde
    } else if (value > 30) {
      color = 0xffcc00; // Amarelo
    } else {
      color = 0xff3333; // Vermelho
    }

    // Desenhar barras de energia
    const segmentWidth = 8;
    const gap = 2;
    const maxSegments = 20;
    const segments = Math.ceil((value / 100) * maxSegments);

    this.elements.energyBar.fillStyle(color, 0.9);

    for (let i = 0; i < segments; i++) {
      const x = 5 + i * (segmentWidth + gap);
      const height = 20 - Math.abs(i - maxSegments / 2) * 0.5; // Altura variável para efeito arqueado
      this.elements.energyBar.fillRect(x, -10, segmentWidth, height);
    }

    // Adicionar brilho à barra
    this.elements.energyBar.lineStyle(1, color, 0.4);
    this.elements.energyBar.strokeRect(5, -10, 194, 20);
  }

  // Adicionar efeito de brilho a um elemento
  addGlowEffect(element, color = 0x00a8ff) {
    const glowTween = this.scene.tweens.add({
      targets: element,
      alpha: 0.7,
      duration: this.animConfig.pulseDuration,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
    });

    this.activeEffects.glowTweens.push(glowTween);
  }

  // Método para mostrar a HUD
  mostrar() {
    if (!this.mainContainer) {
      this.criar();
    }

    this.visible = true;
    this.mainContainer.setVisible(true);

    // Efeito de entrada
    this.mainContainer.setAlpha(0);
    this.scene.tweens.add({
      targets: this.mainContainer,
      alpha: 1,
      duration: 500,
      ease: "Power2",
    });

    return this;
  }

  // Método para esconder a HUD
  esconder() {
    if (!this.mainContainer) return this;

    // Efeito de saída
    this.scene.tweens.add({
      targets: this.mainContainer,
      alpha: 0,
      duration: 300,
      ease: "Power2",
      onComplete: () => {
        this.visible = false;
        this.mainContainer.setVisible(false);
      },
    });

    return this;
  }

  // Método para alterar o nível de segurança
  alterarSeguranca(valor) {
    // Calcular novo valor com limites
    this.nivelSeguranca = Math.max(
      0,
      Math.min(100, this.nivelSeguranca + valor)
    );
    this.scene.registry.set("nivelSeguranca", this.nivelSeguranca);

    // Atualizar a barra de segurança
    this.updateSecurityBar(this.nivelSeguranca);

    // Atualizar o texto
    if (this.elements.securityValue) {
      this.elements.securityValue.setText(`${this.nivelSeguranca}%`);

      // Flash de cor baseado em aumento ou diminuição
      const flashColor = valor > 0 ? "#00ff66" : "#ff3333";
      const originalColor = "#ffffff";

      this.scene.tweens.addCounter({
        from: 0,
        to: 100,
        duration: 200,
        ease: "Power2",
        yoyo: true,
        onUpdate: (tween) => {
          const progress = tween.getValue() / 100;
          if (progress < 0.5) {
            this.elements.securityValue.setColor(flashColor);
          } else {
            this.elements.securityValue.setColor(originalColor);
          }
        },
      });

      // Efeito de escala
      this.scene.tweens.add({
        targets: this.elements.securityValue,
        scaleX: 1.3,
        scaleY: 1.3,
        duration: 150,
        yoyo: true,
        ease: "Back.easeOut",
      });
    }

    // Efeito de "energia" percorrendo o circuito
    if (this.elements.circuits) {
      const circuitFlash = this.scene.add.graphics();
      circuitFlash.lineStyle(2, valor > 0 ? 0x00ff66 : 0xff3333, 0.8);

      // Começar da esquerda ou direita dependendo se aumentou ou diminuiu
      const startX = valor > 0 ? 0 : this.scene.cameras.main.width;
      const endX = valor > 0 ? this.scene.cameras.main.width : 0;

      // Linha base
      circuitFlash.lineBetween(startX, 50, startX, 50);

      this.mainContainer.add(circuitFlash);

      // Animar a linha atravessando o circuito
      this.scene.tweens.add({
        targets: {},
        duration: 500,
        onUpdate: (tween) => {
          const progress = tween.progress;
          const currentX = startX + (endX - startX) * progress;

          circuitFlash.clear();
          circuitFlash.lineStyle(
            2,
            valor > 0 ? 0x00ff66 : 0xff3333,
            0.8 * (1 - progress)
          );
          circuitFlash.lineBetween(startX, 50, currentX, 50);
        },
        onComplete: () => {
          circuitFlash.destroy();
        },
      });
    }

    return this.nivelSeguranca;
  }

  // Método para alterar infrações
  alterarInfracoes(valor) {
    this.infracoes = Math.max(0, this.infracoes + valor);
    this.scene.registry.set("infracoes", this.infracoes);

    // Atualizar o texto
    if (this.elements.infractionsCount) {
      this.elements.infractionsCount.setText(
        this.infracoes.toString().padStart(2, "0")
      );
    }

    // Efeitos visuais para novas infrações
    if (valor > 0) {
      // Pulsar o símbolo de alerta
      const originalRotation = this.elements.alertSymbol.rotation;
      this.scene.tweens.add({
        targets: this.elements.alertSymbol,
        scaleX: 1.5,
        scaleY: 1.5,
        rotation: originalRotation + 0.2,
        duration: 100,
        yoyo: true,
        repeat: 3,
        ease: "Sine.easeInOut",
        onComplete: () => {
          this.elements.alertSymbol.rotation = originalRotation;
        },
      });

      // Flash vermelho no painel
      if (this.elements.infractionsPanel) {
        const flashGraphics = this.scene.add.graphics();
        flashGraphics.fillStyle(0xff3333, 0.4);
        flashGraphics.fillRoundedRect(0, -15, 150, 30, 5);

        this.infractionsContainer.add(flashGraphics);

        this.scene.tweens.add({
          targets: flashGraphics,
          alpha: 0,
          duration: 300,
          repeat: 2,
          yoyo: true,
          onComplete: () => {
            flashGraphics.destroy();
          },
        });
      }

      // Efeito de escala no contador
      this.scene.tweens.add({
        targets: this.elements.infractionsCount,
        scaleX: 1.5,
        scaleY: 1.5,
        duration: 200,
        ease: "Back.easeOut",
        yoyo: true,
      });

      // Tremer os hexágonos de fundo
      if (this.elements.hexGridInfractions) {
        this.scene.tweens.add({
          targets: this.elements.hexGridInfractions,
          x: { from: -2, to: 2 },
          y: { from: -2, to: 2 },
          duration: 50,
          yoyo: true,
          repeat: 5,
          ease: "Sine.easeInOut",
        });
      }
    }

    return this.infracoes;
  }

  // Redimensionar a HUD quando a tela muda
  redimensionar() {
    const wasVisible = this.visible;
    this.criar();
    if (wasVisible) this.mostrar();
  }
}
