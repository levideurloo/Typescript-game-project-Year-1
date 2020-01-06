import { Phone } from './../models/Phone';
import { Game } from "../models/Game";

export class GameScene extends Phaser.Scene {

    private char: any; // & { body: Phaser.Physics.Arcade.Body }
    private phone: Phone;
    private question: Phaser.GameObjects.Text | any;
    private cursorKeys: any;
    private spaceBar: any;
    private map: any;
    private mother: any;

    private bulliedChar: any;
    private bullyOne: any;
    private bullyTwo: any;
    private bullyThree: any;

    private text1: Phaser.GameObjects.Text | any;
    private text2: Phaser.GameObjects.Text | any;
    private text3: Phaser.GameObjects.Text | any;
    private text4: Phaser.GameObjects.Text | any;


    /**
     * Boolean to check MOTHER
     */
    private hasReceivedNotificationBullies: boolean = false;


    constructor() {
        super({ key: 'gamescene' });
        this.phone = new Phone();
    }

    preload() {

        //load in the map
        this.load.image('map', './assets/images/map.png');
        this.load.image('bully-text', './assets/images/bully-text.gif');
        this.load.image('notification-textbubble', './assets/images/notification-textbubble.gif');
        // this.phoneMessage = this.load.spritesheet('phone-message', './assets/images/phone_message.png', { frameWidth: 600, frameHeight: 300,  });
        // this.phoneMessage.scaleX = .20;
        // this.phoneMessage.scaleY = .20;

        const info = (this.game as Game).characterInfo;


        //load character 
        if (info) {
            this.load.spritesheet(info.name, info.spreadsheetUri, { frameWidth: 64, frameHeight: 64 });
        }

        // load bully character
        this.load.spritesheet('bulliedBoy', './assets/spritesheets/boy_2.png', { frameWidth: 64, frameHeight: 64 })

        this.load.spritesheet('bully', './assets/spritesheets/boy_3.png', { frameWidth: 64, frameHeight: 64 })

        this.phone.addAnswer('Antwoord A');
        this.phone.addAnswer('Antwoord B');
        this.phone.addAnswer('Antwoord C');
        this.phone.addAnswer('Antwoord D');

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
        this.char = this.add.sprite(-600, 485, characterName, 0);
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

        const messageSprite = this.add.sprite(0, this.map.displayHeight + 250, 'phone_message', 0);
        messageSprite.setDepth(7);

        const answerSprite1 = this.add.sprite(0, this.map.displayHeight + 250, 'phone_message', 0);

        const answerSprite2 = this.add.sprite(0, this.map.displayHeight + 250, 'phone_message', 0);

        const answerSprite3 = this.add.sprite(0, this.map.displayHeight + 250, 'phone_message', 0);

        const answerSprite4 = this.add.sprite(0, this.map.displayHeight + 250, 'phone_message', 0);

        this.phone.setSprite(phoneSprite, .38, .38);
        this.phone.setQuestionSprite(messageSprite, .47, .30);

        const answerHeight = .15;
        this.phone.setAnswerSprite(1, answerSprite1, .47, answerHeight);
        this.phone.setAnswerSprite(2, answerSprite2, .47, answerHeight);
        this.phone.setAnswerSprite(3, answerSprite3, .47, answerHeight);
        this.phone.setAnswerSprite(4, answerSprite4, .47, answerHeight);
        this.loadBullies();
    }

    update() {
        this.cursorKeys = this.input.keyboard.createCursorKeys();
        this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        if (this.cursorKeys.right.isDown) {
            this.char.body.setVelocityX(275); // move right with 75 speed
            this.char.anims.play('walk', true); // plays walking animation
            this.char.flipX = true; // flip the sprite to the left

        } else if (this.cursorKeys.left.isDown) {
            this.char.body.setVelocityX(-275) // move left with 75 speed
            this.char.anims.play('walk', true); // plays walking animation
            this.char.flipX = false; // use the original sprite looking to the right

        } else {
            this.char.body.setVelocityX(0);
            this.char.anims.play('idle', true); // plays the idle animtaion when no keys are pressed
        }

        // Using the JustDown function to prevent infinity repeat
        if (Phaser.Input.Keyboard.JustDown(this.spaceBar) && this.hasReceivedNotificationBullies && !this.phone.isToggled) {
            const displayHeight = this.phone.togglePhone(this.map.displayHeight);
            this.toggleQuestion(displayHeight);
        }

        this.cameras.main.setBounds(-770, 0, this.map.displayWidth, this.map.displayHeight);
        this.cameras.main.startFollow(this.char);

        this.onCollideBullies();
        // this.receiveNotificationMother();

        const phoneSprite = this.phone.getSprite();
        const messageSprite = this.phone.getQuestionSprite();
        const answer1 = this.phone.getAnswerSprite(1);
        const answer2 = this.phone.getAnswerSprite(2);
        const answer3 = this.phone.getAnswerSprite(3);
        const answer4 = this.phone.getAnswerSprite(4);

        if (phoneSprite) {
            phoneSprite.setX(this.char.body.x + 385);
            phoneSprite.setDepth(6);
        }

        if (messageSprite)
            messageSprite.setX(this.char.body.x + 385);

        if (answer1)
            answer1.setX(this.char.body.x + 385);

        if (answer2)
            answer2.setX(this.char.body.x + 385);

        if (answer3)
            answer3.setX(this.char.body.x + 385);

        if (answer4)
            answer4.setX(this.char.body.x + 385);

        if (this.question)
            this.question.setX(this.char.body.x + 307);

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
        const textBubble = this.add.image(this.char.body.x + 100, this.char.body.y - 50, "notification-textbubble");
        this.phone.setQuestion('Een klasgenoot wordt gepest. Wat is de juiste actie?');

        setTimeout(function () {
            textBubble.destroy();
        }, 10000);
    }

    /**
     * Let the phone appear on the screen
     */
    private boundPhone() {
        if (this.char.body.x > (this.game.canvas.width + 100) && this.phone.getToggledState()) {
            this.phone.togglePhone(this.map.displayHeight);
            this.toggleQuestion(305);
        }
    }

    /**
     * Toggle the question & answers
     */
    private toggleQuestion(displayHeight: number | undefined) {

        //Stop player from moving
        // this.char.setVelocityX(0);
        this.char.body.moves = false

        // Toggle the question
        if (this.question)
            this.question.y = (this.map.displayHeight + displayHeight - 35);
        else {
            this.question = this.add.text(this.char.body.x + 307, (this.map.displayHeight + displayHeight - 35), this.phone.getQuestion(), { fontFamily: 'Verdana, "Times New Roman", Tahoma, serif', fontSize: '12px', color: 'black', wordWrap: { width: 170 } });
            this.question.setDepth(9);
        }

        // Toggle the answers
        const answers = this.phone.getAnswers();

        for (let i = 0; i < answers.length; i++) {
            const sprite = this.phone.getAnswerSprite(i + 1);

            if (sprite) {
                sprite.setDepth(9);

                const text = this.add.text(this.char.body.x + 307, sprite.y - 12, answers[i], { fontFamily: 'Verdana, "Times New Roman", Tahoma, serif', fontSize: '12px', color: 'black', wordWrap: { width: 170 } });
                text.setDepth(10);
            }

        }

    }

    /**
     * Loads the Bullies 
     */
    private loadBullies() {

        // Add bullied character to the scene
        this.bulliedChar = this.add.sprite(130, 485, 'bulliedBoy', 9); // -500 X-position  485 Y-postion

        this.bullyOne = this.add.sprite(90, 485, 'bully', 9); // -500 X-position  485 Y-postion
        this.bullyTwo = this.add.sprite(150, 485, 'bully', 9); // -500 X-position  485 Y-postion
        this.bullyThree = this.add.sprite(170, 485, 'bully', 9); // -500 X-position  485 Y-postion

        this.bullyOne.flipX = true;

        this.physics.world.enableBody(this.bulliedChar);
        this.physics.world.enableBody(this.bullyOne);
        this.physics.world.enableBody(this.bullyTwo);
        this.physics.world.enableBody(this.bullyThree);

        this.physics.add.existing(this.bulliedChar);
        this.physics.add.existing(this.bullyOne);
        this.physics.add.existing(this.bullyTwo);
        this.physics.add.existing(this.bullyThree);

        const bullyTextBubble = this.add.image(this.bullyOne.body.x + 100, this.bullyOne.body.y - 50, "bully-text")
    }


    private onCollideBullies() {

        //get x from characters
        const playerX = this.char.body.x;

        //is player in reach && scenario not played yet
        if (!this.hasReceivedNotificationBullies && playerX + 250 > this.bullyOne.body.x) {

            this.hasReceivedNotificationBullies = true;
            const textBubble = this.add.image(this.char.body.x + 100, this.char.body.y - 50, "notification-textbubble");

            setTimeout(function () {
                textBubble.destroy();
            }, 10000);

            this.notify();

        }
    }
    // private receiveNotificationMother() {

    //     const playerX = this.char.body.x;
    //     const motherX = this.mother.body.x
    //     const notificaitonX = motherX + 780;

    //     if (!this.hasReceivedNotificationMother && playerX > notificaitonX) {
    //         this.hasReceivedNotificationMother = true;
    //         this.notify();
    //     }
    // }

}