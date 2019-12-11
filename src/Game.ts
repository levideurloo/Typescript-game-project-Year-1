import * as Phaser from "phaser";
import { Preloader } from './scenes/Preloader';
import { GameScene } from './scenes/GameScene';
import { Game } from "./models/Game";
import { TitleScene } from './scenes/TitleScene';


const config: GameConfig = {
    type: Phaser.AUTO,
    parent: "canvas",
    width: 960,
    height: 540,
    scene: [
        Preloader,
        GameScene,
        TitleScene,
    ],
    physics: {
        default: 'arcade',
        arcade: {
        },
            debug: false,
    }
};

const game = new Game(config);