// ./src/index.js
import config from "./config.js";

// Cria uma div container para o jogo
const gameContainer = document.createElement("div");
gameContainer.id = "game-container";
gameContainer.style.margin = "0";
gameContainer.style.padding = "0";
gameContainer.style.width = "100vw";
gameContainer.style.height = "100vh";
gameContainer.style.overflow = "hidden";
document.body.appendChild(gameContainer);

// Adiciona estilos ao body e html para garantir que o jogo ocupe a tela inteira
document.body.style.margin = "0";
document.body.style.padding = "0";
document.body.style.overflow = "hidden";
document.body.style.backgroundColor = "#000";
document.documentElement.style.margin = "0";
document.documentElement.style.padding = "0";
document.documentElement.style.overflow = "hidden";
document.documentElement.style.backgroundColor = "#000";

// Atualiza o config para usar o container
config.parent = "game-container";

// Cria a instância do jogo
const game = new Phaser.Game(config);

// Função para atualizar o tamanho quando a janela for redimensionada
function resizeGame() {
  if (game.scale) {
    game.scale.resize(window.innerWidth, window.innerHeight);
    game.scale.refresh();
  }
}

// Adiciona o listener de evento para redimensionamento
window.addEventListener("resize", resizeGame);

// Função para alternar tela cheia
function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch((err) => {
      console.error(`Erro ao tentar entrar em tela cheia: ${err.message}`);
    });
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}

// Tecla F11 para tela cheia
document.addEventListener("keydown", function (event) {
  if (event.key === "F11") {
    event.preventDefault();
    toggleFullscreen();
  }
});

export default game;
