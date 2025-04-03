// ./src/index.js
import config from "./config.js";

const game = new Phaser.Game(config);

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
