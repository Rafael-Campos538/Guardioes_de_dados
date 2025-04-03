// ./src/config.js

// Import all scenes dynamically
import MainMenu from "./cenas/menus/MenuPrincipal.js";
import SelecaoPersonagem from "./cenas/menus/SelecaoPersonagem.js";
import DialogoInicial from "./cenas/dialogos/DialogoInicial.js";
import MapaInicial from "./cenas/mapas/MapaInicial.js";
import MapaEscola from "./cenas/mapas/MapaEscola.js";
import JogoCelular from "./cenas/mini-games/celular/JogoCelular.js";
import InterfaceCelular from "./cenas/mini-games/celular/InterfaceCelular.js";
import TelaIntroducao from "./cenas/mini-games/celular/TelaIntroducao.js";
import QuizLgpd from "./cenas/mini-games/quiz/QuizLgpd.js";

// Game configuration
const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  scene: [
    MainMenu,
    SelecaoPersonagem,
    DialogoInicial,
    MapaInicial,
    MapaEscola,
    JogoCelular,
    InterfaceCelular,
    TelaIntroducao,
    QuizLgpd,
  ],
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    min: { width: 320, height: 240 },
    max: { width: window.innerWidth, height: window.innerHeight },
  },
};

export default config;
