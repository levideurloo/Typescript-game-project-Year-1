export class GameScene extends Phaser.Scene {

    private char: any;
    constructor() {
        super('gamescene');

    }

    preload() {
        //load our images or sounds
        this.load.spritesheet('boy', './assets/spritesheets/boy.png', { frameWidth: 64, frameHeight: 64 });

    }

    create() {

        this.char = this.add.sprite(this.game.canvas.width / 2, 200, "boy", 0)



    }

    update() {
    }
}