export default class HUD {
  constructor(scene) {
    this.scene = scene;

    // Inicializar com valores padrão seguros
    this._pontuacao = 0;
    this._pontuacaoMaxima = 100;
    this._seguranca = 0;

    // Verificar se já existem valores no Registry global do Phaser
    if (this.scene.registry.has("pontuacao")) {
      this._pontuacao = this.scene.registry.get("pontuacao");
    } else {
      this.scene.registry.set("pontuacao", 0);
    }

    if (this.scene.registry.has("pontuacaoMaxima")) {
      this._pontuacaoMaxima = this.scene.registry.get("pontuacaoMaxima");
    } else {
      this.scene.registry.set("pontuacaoMaxima", 100);
    }

    // Sempre calcular a segurança com base na pontuação
    this._seguranca =
      Math.min(
        100,
        Math.floor((this._pontuacao / this._pontuacaoMaxima) * 100)
      ) || 0;
    this.scene.registry.set("seguranca", this._seguranca);

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

  // Propriedades com getters e setters para maior segurança
  get pontuacao() {
    return this._pontuacao;
  }

  set pontuacao(valor) {
    this._pontuacao = valor;
    this.scene.registry.set("pontuacao", valor);
  }

  get pontuacaoMaxima() {
    return this._pontuacaoMaxima;
  }

  set pontuacaoMaxima(valor) {
    this._pontuacaoMaxima = valor;
    this.scene.registry.set("pontuacaoMaxima", valor);
    // Ao alterar a pontuação máxima, recalcula a segurança
    this.atualizarSeguranca();
  }

  get seguranca() {
    return this._seguranca;
  }

  set seguranca(valor) {
    this._seguranca = valor;
    this.scene.registry.set("seguranca", valor);
  }

  inicializar() {
    const largura = this.scene.cameras.main.width;
    const altura = this.scene.cameras.main.height;

    // Garantir que segurança seja um número válido
    this._seguranca =
      Math.min(
        100,
        Math.floor((this._pontuacao / this._pontuacaoMaxima) * 100)
      ) || 0;

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
        fontSize: Math.min(largura, altura) * 0.022 + "px",
        fill: "#FFFFFF",
      })
      .setOrigin(0, 0.5);

    this.labelSeguranca = this.scene.add
      .text(largura * 0.55, altura * 0.025, "SEGURANÇA DA CIDADE", {
        fontFamily: "Rainyhearts",
        fontSize: Math.min(largura, altura) * 0.022 + "px",
        fill: "#FFFFFF",
      })
      .setOrigin(0, 0.5);

    // Valores numéricos (inicializados com os valores atuais)
    this.valorPontuacao = this.scene.add
      .text(largura * 0.4, altura * 0.055, String(this._pontuacao), {
        fontFamily: "Rainyhearts",
        fontSize: Math.min(largura, altura) * 0.022 + "px",
        fill: "#FFFFFF",
      })
      .setOrigin(1, 0.5);

    // Exibir a porcentagem correta garantindo que não é NaN
    this.valorSeguranca = this.scene.add
      .text(largura * 0.82, altura * 0.055, `${this._seguranca}%`, {
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

      // Resetar valores antes de ir para o menu
      this.resetarValores();

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

  // AO escudo muda de cor de acordo com o nível de segurança
  desenharEscudo() {
    const largura = this.scene.cameras.main.width;
    const altura = this.scene.cameras.main.height;
    const escalaBase = Math.min(largura, altura) * 0.04; // Aumentado para melhor visualização

    this.escudoSeguranca.clear();

    // Cor baseada no nível de segurança
    const cor = this.getCorSeguranca();

    // Escudo mais proporcional (menos achatado)
    this.escudoSeguranca.fillStyle(0x001f54, 0.8);
    this.escudoSeguranca.beginPath();

    // Ponto superior central
    this.escudoSeguranca.moveTo(largura * 0.05, altura * 0.015);

    // Ponto superior direito
    this.escudoSeguranca.lineTo(
      largura * 0.05 + escalaBase * 0.7,
      altura * 0.03
    );

    // Ponto inferior direito
    this.escudoSeguranca.lineTo(
      largura * 0.05 + escalaBase * 0.7,
      altura * 0.065
    );

    // Ponto inferior central
    this.escudoSeguranca.lineTo(largura * 0.05, altura * 0.08);

    // Ponto inferior esquerdo
    this.escudoSeguranca.lineTo(
      largura * 0.05 - escalaBase * 0.7,
      altura * 0.065
    );

    // Ponto superior esquerdo
    this.escudoSeguranca.lineTo(
      largura * 0.05 - escalaBase * 0.7,
      altura * 0.03
    );

    this.escudoSeguranca.closePath();
    this.escudoSeguranca.fillPath();

    // Borda do escudo
    this.escudoSeguranca.lineStyle(2, cor);
    this.escudoSeguranca.beginPath();

    // Repetir os mesmos pontos para a borda
    this.escudoSeguranca.moveTo(largura * 0.05, altura * 0.015);
    this.escudoSeguranca.lineTo(
      largura * 0.05 + escalaBase * 0.7,
      altura * 0.03
    );
    this.escudoSeguranca.lineTo(
      largura * 0.05 + escalaBase * 0.7,
      altura * 0.065
    );
    this.escudoSeguranca.lineTo(largura * 0.05, altura * 0.08);
    this.escudoSeguranca.lineTo(
      largura * 0.05 - escalaBase * 0.7,
      altura * 0.065
    );
    this.escudoSeguranca.lineTo(
      largura * 0.05 - escalaBase * 0.7,
      altura * 0.03
    );

    this.escudoSeguranca.closePath();
    this.escudoSeguranca.strokePath();

    // Símbolo de cadeado dentro do escudo (ajustado para a nova forma)
    this.escudoSeguranca.fillStyle(cor);
    this.escudoSeguranca.fillRect(
      largura * 0.05 - escalaBase * 0.25,
      altura * 0.042,
      escalaBase * 0.5,
      escalaBase * 0.3
    );

    // Arco do cadeado (parte superior)
    this.escudoSeguranca.lineStyle(escalaBase * 0.15, cor);
    this.escudoSeguranca.beginPath();
    this.escudoSeguranca.arc(
      largura * 0.05,
      altura * 0.042,
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

    // Barra de progresso com cor uniforme
    const progresso = this._pontuacao / this._pontuacaoMaxima;

    if (progresso > 0) {
      // Usar uma cor uniforme para toda a barra de progresso
      this.barraPontuacao.fillStyle(0x1282a2);

      // Desenhar a barra com cantos arredondados à esquerda
      if (progresso >= 0.99) {
        // Se a barra estiver quase cheia, desenhar com cantos arredondados em ambos os lados
        this.barraPontuacao.fillRoundedRect(
          largura * 0.15,
          altura * 0.055 - altura * 0.01,
          largura * 0.25,
          altura * 0.02,
          altura * 0.01
        );
      } else {
        // Caso contrário, apenas cantos arredondados à esquerda
        this.barraPontuacao.fillRoundedRect(
          largura * 0.15,
          altura * 0.055 - altura * 0.01,
          largura * 0.25 * progresso,
          altura * 0.02,
          {
            tl: altura * 0.01,
            bl: altura * 0.01,
            tr: 0,
            br: 0,
          }
        );
      }
    }

    // Linhas divisórias (opcional - pode remover se preferir uma barra lisa)
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

    // Progresso da barra
    const progresso = this._seguranca / 100;

    if (progresso > 0) {
      // Desenhar a barra com cor uniforme baseada no nível de segurança
      this.barraSeguranca.fillStyle(cor);

      // Desenhar a barra com cantos arredondados
      if (progresso >= 0.99) {
        // Se a barra estiver quase cheia, desenhar com cantos arredondados em ambos os lados
        this.barraSeguranca.fillRoundedRect(
          largura * 0.55,
          altura * 0.055 - altura * 0.01,
          largura * 0.25,
          altura * 0.02,
          altura * 0.01
        );
      } else {
        // Caso contrário, apenas cantos arredondados à esquerda
        this.barraSeguranca.fillRoundedRect(
          largura * 0.55,
          altura * 0.055 - altura * 0.01,
          largura * 0.25 * progresso,
          altura * 0.02,
          {
            tl: altura * 0.01,
            bl: altura * 0.01,
            tr: 0,
            br: 0,
          }
        );
      }
    }

    // Linhas divisórias (opcional - pode remover se preferir uma barra lisa)
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
    if (this._seguranca < 30) {
      return 0xff3333; // Vermelho (baixo)
    } else if (this._seguranca < 70) {
      return 0xffaa00; // Laranja (médio)
    } else {
      return 0x33ff66; // Verde (alto)
    }
  }

  // Método não mais utilizado, mas mantido para compatibilidade
  getCorSegurancaClara() {
    return this.getCorSeguranca();
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

    // Garantir que os valores estejam sincronizados e atualizados
    this._seguranca =
      Math.min(
        100,
        Math.floor((this._pontuacao / this._pontuacaoMaxima) * 100)
      ) || 0;

    // Atualizar visualmente os valores atuais
    if (this.valorPontuacao)
      this.valorPontuacao.setText(String(this._pontuacao));
    if (this.valorSeguranca) this.valorSeguranca.setText(`${this._seguranca}%`);

    this.desenharBarraPontuacao();
    this.desenharBarraSeguranca();
    this.desenharEscudo();
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

    // Atualiza o Registry global
    this.scene.registry.set("pontuacao", this.pontuacao);

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

      // Atualiza o Registry global
      this.scene.registry.set("seguranca", this.seguranca);

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

  // Adicionar setter para pontuacaoMaxima para que atualize o Registry
  set pontuacaoMaxima(valor) {
    this._pontuacaoMaxima = valor;
    this.scene.registry.set("pontuacaoMaxima", valor);
    // Ao alterar a pontuação máxima, recalcula a segurança
    this.atualizarSeguranca();
  }

  // Getter para pontuacaoMaxima
  get pontuacaoMaxima() {
    return this._pontuacaoMaxima;
  }

  // Método para resetar todos os valores da HUD globalmente
  resetarValores() {
    this.pontuacao = 0;
    this.scene.registry.set("pontuacao", 0);
    this.seguranca = 0;
    this.scene.registry.set("seguranca", 0);

    this.valorPontuacao.setText("0");
    this.valorSeguranca.setText("0%");

    this.desenharBarraPontuacao();
    this.desenharBarraSeguranca();
    this.desenharEscudo();
  }
}
