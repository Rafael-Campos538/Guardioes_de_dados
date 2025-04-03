// ./src/index.js
import config from "./config.js";

// Create the Phaser game
const game = new Phaser.Game(config);

// Fullscreen toggle functionality
document.addEventListener("keydown", function (event) {
  if (event.key === "F11") {
    if (!game.scale.isFullscreen) {
      game.scale.startFullscreen();
    } else {
      game.scale.stopFullscreen();
    }
    event.preventDefault();
  }
});

export default game;
