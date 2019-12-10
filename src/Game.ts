import * as Phaser from "phaser";
import { Preloader } from './scenes/Preloader';
import { Main } from './scenes/Main';
import { GameScene } from './scenes/GameScene';

const config: GameConfig = {
    type: Phaser.AUTO,
    parent: "canvas",
    width: 960,
    height: 540,
    scene: [
        Preloader,
        Main,
        GameScene
    ],
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
        },
    }
};

const game = new Phaser.Game(config);