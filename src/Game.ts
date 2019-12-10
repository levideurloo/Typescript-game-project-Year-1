import "phaser";
import { Preloader } from './scenes/Preloader';
import { TitleScene } from './scenes/TitleScene';
import { Game } from "./models/Game";
// import { Game } from "./models/Game";


const config: GameConfig = {
    type: Phaser.AUTO,
    parent: "canvas",
    width: 960,
    height: 540,
    scene: [
        Preloader,
        TitleScene,
    ],
};

const game = new Game(config);