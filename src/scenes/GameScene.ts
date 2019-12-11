import { Game } from "../models/Game";
import { ICharacterInfo } from "../interfaces/ICharacterInfo";

export class GameScene extends Phaser.Scene {

    private char: any; // & { body: Phaser.Physics.Arcade.Body }
    private cursorKeys: any;
    private map: any;

    constructor() {
        super({ key: 'gamescene' });
    }

    preload() {

        //load in the map
        this.load.image('map', './assets/images/map.png');

        const info = (this.game as Game).characterInfo;

        //load character 
        if (info) {
            this.load.spritesheet(info.name, info.spreadsheetUri, { frameWidth: 64, frameHeight: 64 });
        }
    }

    create() {

        //get game info
        const info = (this.game as Game).characterInfo;

        //get character name, by default boy if none is selected
        const characterName = info ? info.name : 'boy';

        // Add map to the scene
        this.map = this.add.image(this.game.canvas.width / 2, this.game.canvas.height / 2, "map")
        this.map.displayWidth = 2500;
        this.map.displayHeight = this.game.canvas.height;

        // Set physics bounds
        this.physics.world.setBounds(-770, 0, this.map.displayWidth, this.map.displayHeight, true, true, true, true);

        // Add character to the scene
        this.char = this.add.sprite(-600, 485, characterName, 0);
        this.physics.world.enableBody(this.char);

        this.char.body.setCollideWorldBounds(true);
        this.char.body.onWorldBounds = true;

        this.physics.add.existing(this.char);
        this.anims.create({
            key: 'idle',
            repeat: -1,
            frameRate: 1,
            frames: this.anims.generateFrameNumbers(characterName, { start: 0, end: 0 })
        });
        this.anims.create({
            key: 'walk',
            repeat: -1,
            frameRate: 12,
            frames: this.anims.generateFrameNumbers(characterName, { start: 0, end: 8 })
        });

    }

    update() {
        this.cursorKeys = this.input.keyboard.createCursorKeys();

        if (this.cursorKeys.right.isDown) {
            this.char.body.setVelocityX(50); // move left with 85 speed
            this.char.anims.play('walk', true); // plays walking animation
            this.char.flipX = true; // flip the sprite to the left

        } else if (this.cursorKeys.left.isDown) {
            this.char.body.setVelocityX(-50) // move right with 85 speed
            this.char.anims.play('walk', true); // plays walking animation
            this.char.flipX = false; // use the original sprite looking to the right

        } else {
            this.char.body.setVelocityX(0);
            this.char.anims.play('idle', true); // plays the idle animtaion when no keys are pressed
        }
        this.cameras.main.setBounds(-770, 0, this.map.displayWidth, this.map.displayHeight);
        this.cameras.main.startFollow(this.char);
    }


    /**
     * Function which displays a notification by playing a sound and showing a message.
     */
    private notify() {

        // play sound
        const notificationSound = this.sound.add('NOTIFICATION');
        notificationSound.play();

        // display message
        alert("Hey! Je hebt een whatsapp'je ontvangen. Open de telefoon via de spacebar.");
    }
}