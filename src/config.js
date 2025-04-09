// ./src/config.js

import MainMenu from "./cenas/menus/MenuPrincipal.js";
import SelecaoPersonagem from "./cenas/menus/SelecaoPersonagem.js";
import Tutorial from "./cenas/menus/Tutorial.js";
import Configuracoes from "./cenas/menus/Configuracoes.js";
import DialogoInicial from "./cenas/dialogos/DialogoInicial.js";
import MapaInicial from "./cenas/mapas/MapaInicial.js";
import MapaEscola from "./cenas/mapas/MapaEscola.js";
import JogoCelular from "./cenas/mini-games/celular/JogoCelular.js";
import InterfaceCelular from "./cenas/mini-games/celular/InterfaceCelular.js";
import InterfaceCelularDois from "./cenas/mini-games/celular/InterfaceCelularDois.js";
import InterfaceCelularTres from "./cenas/mini-games/celular/InterfaceCelularTres.js";
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
  Tutorial,
  Configuracoes,
  DialogoInicial,
  MapaInicial,
  MapaEscola,
  QuizLgpd,
  DialogoProfessora,
  TelaIntroducao,
  JogoCelular,
  InterfaceCelular,
  InterfaceCelularDois,
  InterfaceCelularTres,
   
  ],
  scale: {
    mode: Phaser.Scale.RESIZE,
    width: "100%",
    height: "100%",
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  autoRound: false,
};

export default config;
