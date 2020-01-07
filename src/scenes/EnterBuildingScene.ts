import { Phone } from './../models/Phone';
import { Game } from "../models/Game";

export class EnterBuildingScene extends Phaser.Scene {

    private char: any; // & { body: Phaser.Physics.Arcade.Body }
    private phone: Phone;
    private cursorKeys: any;
    private spaceBar: any;
    private enterKey: any;
    private map: any;
    private arrow: any;
    private canEnter: any;

    private charX: number = 0;

    private whatsappSprite: any;
    private receivedWhatsappNotification: boolean = false;

    constructor() {
        super({ key: 'enterbuildingscene' });
        this.phone = new Phone();
    }

    init(data: any) {
        this.charX = data.charX;
    }

    preload() {

        //load in the map
        this.load.image('map', './assets/images/map.png');
        this.load.image('notification-textbubble', './assets/images/notification-textbubble.gif');
        this.load.image('whatsapp', './assets/images/whatsapp.png');

        const info = (this.game as Game).characterInfo;

        //load character 
        if (info) {
            this.load.spritesheet(info.name, info.spreadsheetUri, { frameWidth: 64, frameHeight: 64 });
        }

        // Load pointing arrow spritesheet
        this.load.spritesheet('arrow', './assets/spritesheets/arrow.png', { frameWidth: 28, frameHeight: 21 })

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

        // Set world bounds
        this.physics.world.setBounds(-770, 0, this.map.displayWidth, this.map.displayHeight, true, true, true, true);

        // Add character to the scene
        this.char = this.add.sprite(300, 485, characterName, 0);
        this.char.x = this.charX;
        this.char.flipX = true;
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
            frameRate: 12,
            frames: this.anims.generateFrameNumbers(characterName, { start: 0, end: 8 })
        });

        // Create the in-game phone
        const phoneSprite = this.add.sprite(0, this.map.displayHeight + 250, 'phone', 0);

        phoneSprite.setDepth(6);

        this.phone.setSprite(phoneSprite, .38, .38);

        const messageSprite = this.add.sprite(0, this.map.displayHeight + 250, 'phone_message', 0);
        messageSprite.setDepth(7);

        const answerSprite1 = this.add.sprite(0, this.map.displayHeight + 250, 'phone_message', 0);

        const answerSprite2 = this.add.sprite(0, this.map.displayHeight + 250, 'phone_message', 0);

        const answerSprite3 = this.add.sprite(0, this.map.displayHeight + 250, 'phone_message', 0);

        const answerSprite4 = this.add.sprite(0, this.map.displayHeight + 250, 'phone_message', 0);

        this.phone.setQuestionSprite(messageSprite, .47, .30);

        const answerHeight = .15;
        this.phone.setAnswerSprite(1, answerSprite1, .47, answerHeight);
        this.phone.setAnswerSprite(2, answerSprite2, .47, answerHeight);
        this.phone.setAnswerSprite(3, answerSprite3, .47, answerHeight);
        this.phone.setAnswerSprite(4, answerSprite4, .47, answerHeight);

        //temp hide since we dont need
        messageSprite.destroy();
        answerSprite1.destroy();
        answerSprite2.destroy();
        answerSprite3.destroy();
        answerSprite4.destroy();

        //Add arrow above Bon Bon Cafe
        this.arrow = this.add.sprite(442, 445, 'arrow', 0);

        //Animate Floating Arrow
        this.anims.create({
            key: 'point',
            repeat: -1,
            frameRate: 30,
            frames: this.anims.generateFrameNumbers('arrow', { start: 0, end: 19 })
        });
    }

    update() {
        this.cursorKeys = this.input.keyboard.createCursorKeys();
        this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        if (this.cursorKeys.right.isDown) {
            this.char.body.setVelocityX(75); // move right with 75 speed
            this.char.anims.play('walk', true); // plays walking animation
            this.char.flipX = true; // flip the sprite to the left

        } else if (this.cursorKeys.left.isDown) {
            this.char.body.setVelocityX(-75) // move left with 75 speed
            this.char.anims.play('walk', true); // plays walking animation
            this.char.flipX = false; // use the original sprite looking to the right

        } else {
            this.char.body.setVelocityX(0);
            this.char.anims.play('idle', true); // plays the idle animtaion when no keys are pressed
        }

        // Using the JustDown function to prevent infinity repeat
        if (Phaser.Input.Keyboard.JustDown(this.spaceBar) && this.receivedWhatsappNotification && !this.phone.isToggled) {
            this.phone.togglePhone(this.map.displayHeight);
            this.whatsappSprite = this.add.sprite(0, this.map.displayHeight - 190, 'whatsapp', 0).setDepth(7).setScale(0.5);
            this.whatsappSprite.displayHeight = 350;
            this.whatsappSprite.displayWidth = 190;
            this.char.body.moves = false
        }

        this.cameras.main.setBounds(-770, 0, this.map.displayWidth, this.map.displayHeight);
        this.cameras.main.startFollow(this.char);

        const phoneSprite = this.phone.getSprite();

        if (phoneSprite) {
            phoneSprite.setX(this.char.body.x + 385);
        }

        if (this.whatsappSprite) {
            this.whatsappSprite.setX(this.char.body.x + 385);

        }

        // Play the animation for the pointing arrow
        this.arrow.anims.play('point', true);

        // Rotate the arrow
        this.arrow.angle = 90;

        // Checks if player is in front of building
        if (this.char.body.x > 400) {
            this.canEnter = true;
        } else {
            this.canEnter = false;
        }

        const self = this;

        if (!self.receivedWhatsappNotification) {
            self.receivedWhatsappNotification = true;

            setTimeout(function () {
                self.notify();
            }, 1500);
        }

        // Function that allow players to enter a building
        this.enterBuilding();
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

    private enterBuilding() {
        if (this.canEnter == true && Phaser.Input.Keyboard.JustDown(this.enterKey) && this.receivedWhatsappNotification) {
            this.scene.start('bonboncafescene')
        }
    }


}

