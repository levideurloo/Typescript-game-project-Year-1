import "phaser";
import { Preloader } from './scenes/Preloader';
import { TitleScene } from './scenes/TitleScene';
    
const config: GameConfig = {
    type: Phaser.AUTO,
    parent: "canvas",
    width: 960,
    height: 540,
    scene: [
        Preloader,
        TitleScene,
    ]
};

const game = new Phaser.Game(config);