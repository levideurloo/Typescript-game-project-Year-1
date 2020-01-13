import * as Phaser from "phaser";
import { Preloader } from './scenes/Preloader';
import { GameScene } from './scenes/GameScene';
import { Game } from "./models/Game";
import { TitleScene } from './scenes/TitleScene';
import { EnterBuildingScene } from './scenes/EnterBuildingScene';
import { HelpScene } from './scenes/HelpScene';
import { BonBonCafeScene } from "./scenes/BonBonCafeScene";
import { NightScene } from './scenes/NightScene'; 
import { GameOverScene } from './scenes/GameOverScene';
import { VictoryScene } from './scenes/VictoryScene';

const config: GameConfig = {
    type: Phaser.AUTO,
    parent: "canvas",
    width: 960,
    height: 540,
    scene: [
        Preloader,
        GameScene,
        TitleScene,
        HelpScene,
        EnterBuildingScene,
        BonBonCafeScene,
        NightScene,
        GameOverScene,
        VictoryScene
    ],
    physics: {
        default: 'arcade',
        arcade: {
        },
        debug: false,
    }
};

const game = new Game(config);