// ./src/game.js

const config = {
  type: Phaser.AUTO,
  width: window.innerWidth, // Usa o tamanho da janela
  height: window.innerHeight,
  scene: [
    MainMenu,
    Personagens,
    Conversation,
    Gameinicial,
    Cenainicial,
    CenaEscola,
    Telaminigamedois,
    Conversationdois,
    Gamedoismini,
    Celulargrupoum,
  ],
  scale: {
    mode: Phaser.Scale.RESIZE, // Permite redimensionamento automático
    autoCenter: Phaser.Scale.CENTER_BOTH, // Centraliza o jogo
    min: { width: 320, height: 240 }, // Define o tamanho mínimo
    max: { width: window.innerWidth, height: window.innerHeight }, // Usa o tamanho da tela inteira
  },
};

// Criar o jogo Phaser
const game = new Phaser.Game(config);

// Verificar se o jogo está em tela cheia ao pressionar F11
document.addEventListener("keydown", function (event) {
  if (event.key === "F11") {
    if (!game.scale.isFullscreen) {
      game.scale.startFullscreen();
    } else {
      game.scale.stopFullscreen();
    }
    event.preventDefault(); // Impede o comportamento padrão do F11
  }
});
