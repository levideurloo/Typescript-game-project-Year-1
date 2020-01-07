import { Game } from "./../models/Game";
import { Phone } from './../models/Phone';

export class BonBonCafeScene extends Phaser.Scene {

    private char: any;
    private phone: Phone;
    private cursorKeys: any;
    private spaceBar: any;
    private enterKey: any;
    private map: any;
    private arrow: any;

    constructor() {
        super({ key: 'bonboncafescene' });
        this.phone = new Phone();
    }

    preload() {

        // Load in the Bon Bon Cafe map
        this.load.image('cafe', './assets/images/cafe.png');

        // Recieves character info from selection screen
        const info = (this.game as Game).characterInfo;

        // Load character 
        if (info) {
            this.load.spritesheet(info.name, info.spreadsheetUri, { frameWidth: 64, frameHeight: 64 });
        }
    }

    create() {
        // Get game information
        const info = (this.game as Game).characterInfo;

        // Get character name, by default 'boy' if none is selected
        const characterName = info ? info.name : 'boy';

        // Add map to the scene
        this.map = this.add.image(100, this.game.canvas.height / 2, "cafe")
        this.map.displayWidth = 1500;
        this.map.displayHeight = this.game.canvas.height;

        // Set world bounds
        this.physics.world.setBounds(-770, 0, this.map.displayWidth, this.map.displayHeight, true, true, true, true);

        // Add character to the scene
        this.char = this.add.sprite(-575, 400, characterName, 0);
        this.char.flipX = true;
        this.char.setScale(4);
        this.physics.world.enableBody(this.char);

        // Makes the character collide with world bounds
        this.char.body.setCollideWorldBounds(true);
        this.char.body.onWorldBounds = true;

        this.physics.add.existing(this.char);

        // Animates the idle state of the character
        this.anims.create({
            key: 'idle',
            repeat: -1,
            frameRate: 1,
            frames: this.anims.generateFrameNumbers(characterName, { start: 0, end: 0 })
        });

        // Animates the walking state of the character
        this.anims.create({
            key: 'walk',
            repeat: -1,
            frameRate: 8,
            frames: this.anims.generateFrameNumbers(characterName, { start: 0, end: 8 })
        });

        // Create the in-game phone
        const phoneSprite = this.add.sprite(0, this.map.displayHeight + 250, 'phone', 0);
        phoneSprite.setDepth(1);

        this.phone.addSprite(phoneSprite, .38, .38);
    }

    update() {
        this.cursorKeys = this.input.keyboard.createCursorKeys();
        this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        if (this.cursorKeys.right.isDown) {
            this.char.body.setVelocityX(190); // move right with 75 speed
            this.char.anims.play('walk', true); // plays walking animation
            this.char.flipX = true; // flip the sprite to the left

        } else if (this.cursorKeys.left.isDown) {
            this.char.body.setVelocityX(-190) // move left with 75 speed
            this.char.anims.play('walk', true); // plays walking animation
            this.char.flipX = false; // use the original sprite looking to the right

        } else {
            this.char.body.setVelocityX(0);
            this.char.anims.play('idle', true); // plays the idle animtaion when no keys are pressed
        }

        // Using the JustDown function to prevent infinity repeat
        if (Phaser.Input.Keyboard.JustDown(this.spaceBar))
            this.togglePhone();

        this.cameras.main.setBounds(-770, 0, this.map.displayWidth + 300, this.map.displayHeight);
        this.cameras.main.startFollow(this.char);

        const phoneSprite = this.phone.getSprite();

        if (phoneSprite)
            phoneSprite.setX(this.char.body.x + 385);

        this.boundPhone();

    }

    /**
 * Function which displays a notification by playing a sound and showing a message.
 */
    private notify() {

        // play sound
        const notificationSound = this.sound.add('NOTIFICATION');
        notificationSound.play();

        // display message
        const textBubble = this.add.image(this.char.body.x + 100, this.char.body.y - 50, "notification-textbubble")

        setTimeout(function () {
            textBubble.destroy();
        }, 10000);

    }

    /**
     * Let the phone appear on the screen
     */
    private togglePhone() {
        if (this.phone)
            this.phone.togglePhone(this.map.displayHeight);
    }

    /**
     * Let the phone appear on the screen
     */
    private boundPhone() {
        if (this.char.body.x > (this.game.canvas.width + 100) && this.phone.getToggledState())
            this.phone.togglePhone(this.map.displayHeight);
    }

}