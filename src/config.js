// ./src/config.js

import MainMenu from "./cenas/menus/MenuPrincipal.js";
import SelecaoPersonagem from "./cenas/menus/SelecaoPersonagem.js";
import DialogoInicial from "./cenas/dialogos/DialogoInicial.js";
import MapaInicial from "./cenas/mapas/MapaInicial.js";
import MapaEscola from "./cenas/mapas/MapaEscola.js";
import MapaTeste from "./cenas/mapas/MapaTeste.js"; // Nova importação
import JogoCelular from "./cenas/mini-games/celular/JogoCelular.js";
import InterfaceCelular from "./cenas/mini-games/celular/InterfaceCelular.js";
import TelaIntroducao from "./cenas/mini-games/celular/TelaIntroducao.js";
import QuizLgpd from "./cenas/mini-games/quiz/QuizLgpd.js";
import DialogoProfessora from "./cenas/dialogos/DialogoProfessora.js";

const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: "#000000",
  scene: [
    MainMenu,
    SelecaoPersonagem,
    DialogoInicial,
    MapaInicial,
    MapaEscola,
    MapaTeste, 
    JogoCelular,
    InterfaceCelular,
    TelaIntroducao,
    QuizLgpd,
    DialogoProfessora,
  ],
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 }, // Sem gravidade para jogos top-down
      debug: false,
    },
  },
  scale: {
    mode: Phaser.Scale.RESIZE,
    width: "100%",
    height: "100%",
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  autoRound: false,
};

export default config;
