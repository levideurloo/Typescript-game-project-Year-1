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
    private whatsappNextSprite: any;
    private receivedWhatsappNotification: boolean = false;

    private answerSprite1: any;
    private answerSprite2: any;
    private answerSprite3: any;
    private answerSprite4: any;

    private answerCorrect: boolean = false;


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
        this.load.image('next-btn', './assets/images/volgende-button.png');
        this.load.image('msg-background', './assets/images/msg-background.jpg');

        const info = (this.game as Game).characterInfo;

        //load character 
        if (info) {
            this.load.spritesheet(info.name, info.spreadsheetUri, { frameWidth: 64, frameHeight: 64 });
        }

        // Load pointing arrow spritesheet
        this.load.spritesheet('arrow', './assets/spritesheets/arrow.png', { frameWidth: 28, frameHeight: 21 })

        this.phone.addAnswer('Sla de pestkop in elkaar');
        this.phone.addAnswer('Zoek hulp bij een leraar');
        this.phone.addAnswer('Help de pesters');
        this.phone.addAnswer('Doe niks');
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

            const self = this;

            setTimeout(function () {

                self.whatsappNextSprite = self.add.sprite(0, self.map.displayHeight - 40, 'next-btn', 0).setDepth(7).setScale(0.5);
                self.whatsappNextSprite.setScale(0.5);
                self.whatsappNextSprite.setDepth(16);

                self.whatsappNextSprite.setInteractive().on('pointerdown', () => {

                    self.whatsappSprite.destroy();
                    self.whatsappNextSprite.destroy();

                    const x = self.char.body.x + 385;

                    const messageSprite = self.add.sprite(x, self.map.displayHeight / 2 - 10, 'phone_message', 0);
                    self.answerSprite1 = self.add.sprite(x, self.map.displayHeight / 2 + 50, 'phone_message', 0);
                    self.answerSprite2 = self.add.sprite(x, self.map.displayHeight / 2 + 90, 'phone_message', 0);
                    self.answerSprite3 = self.add.sprite(x, self.map.displayHeight / 2 + 130, 'phone_message', 0);
                    self.answerSprite4 = self.add.sprite(x, self.map.displayHeight / 2 + 170, 'phone_message', 0);

                    messageSprite.setDepth(100);
                    self.answerSprite1.setDepth(100);
                    self.answerSprite2.setDepth(100);
                    self.answerSprite3.setDepth(100);
                    self.answerSprite4.setDepth(100);

                    self.phone.setQuestionSprite(messageSprite, .47, .30);

                    const answerHeight = .15;
                    self.phone.setAnswerSprite(1, self.answerSprite1, .47, answerHeight);
                    self.phone.setAnswerSprite(2, self.answerSprite2, .47, answerHeight);
                    self.phone.setAnswerSprite(3, self.answerSprite3, .47, answerHeight);
                    self.phone.setAnswerSprite(4, self.answerSprite4, .47, answerHeight);

                    const messageText = self.add.text(x - 80, self.map.displayHeight / 2 - 40, "Wat is jouw actie op de situatie?", { fontFamily: 'Verdana, "Times New Roman", Tahoma, serif', fontSize: '12px', color: 'black', wordWrap: { width: 170 } });

                    const answer1 = self.add.text(x - 80, self.map.displayHeight / 2 + 35, "Antwoord A", { fontFamily: 'Verdana, "Times New Roman", Tahoma, serif', fontSize: '12px', color: 'black', wordWrap: { width: 170 } });
                    const answer2 = self.add.text(x - 80, self.map.displayHeight / 2 + 75, "Antwoord B", { fontFamily: 'Verdana, "Times New Roman", Tahoma, serif', fontSize: '12px', color: 'black', wordWrap: { width: 170 } });
                    const answer3 = self.add.text(x - 80, self.map.displayHeight / 2 + 115, "Antwoord C", { fontFamily: 'Verdana, "Times New Roman", Tahoma, serif', fontSize: '12px', color: 'black', wordWrap: { width: 170 } });
                    const answer4 = self.add.text(x - 80, self.map.displayHeight / 2 + 155, "Antwoord D", { fontFamily: 'Verdana, "Times New Roman", Tahoma, serif', fontSize: '12px', color: 'black', wordWrap: { width: 170 } });

                    messageText.setDepth(101);

                    answer1.setDepth(101);
                    answer2.setDepth(101);
                    answer3.setDepth(101);
                    answer4.setDepth(101);

                    [answer1, answer2, answer3, answer4].forEach(function (element) {
                        element.setInteractive().on('pointerdown', function (this: Phaser.GameObjects.Image) {

                            if (!self.answerCorrect) {
                                if (element.text === "Antwoord A") {
                                    self.answerCorrect = true;

                                    element.setColor("green");

                                    const background = self.add.sprite(self.char.x - 100, self.game.canvas.height * 0.5, 'msg-background', 0);
                                    background.setScale(0.6);
                                    background.setDepth(15);

                                    const headerText = self.add.text(self.char.body.x - 250, self.game.canvas.height * 0.25, "Helemaal goed!", { fontFamily: 'Verdana, "Times New Roman", Tahoma, serif', fontSize: '18px', color: 'green', wordWrap: { width: 170 } });
                                    headerText.setDepth(16);

                                    const textMsg = "Lorem Ipsum is slechts een proeftekst uit het drukkerij- en zetterijwezen. Lorem Ipsum is de standaard proeftekst in deze bedrijfstak sinds de 16e eeuw, toen een onbekende drukker een zethaak met letters nam en ze door elkaar husselde om een font-catalogus te maken.";

                                    const infoText = self.add.text(self.char.body.x - 250, self.game.canvas.height * 0.35, textMsg, { fontFamily: 'Verdana, "Times New Roman", Tahoma, serif', fontSize: '12px', color: 'black', wordWrap: { width: 400 } });
                                    infoText.setDepth(16);

                                    const nextButton = self.add.sprite(self.char.x - 230, self.game.canvas.height * 0.6, 'next-btn', 0);
                                    nextButton.setScale(0.65);
                                    nextButton.setDepth(16);

                                    nextButton.setInteractive().on('pointerdown', () => {
                                        background.destroy();
                                        headerText.destroy();
                                        infoText.destroy();
                                        nextButton.destroy();
                                        answer1.destroy();
                                        answer2.destroy();
                                        answer3.destroy();
                                        answer4.destroy();
                                        messageText.destroy();
                                        self.phone.deleteAll();
                                        self.char.body.moves = true;
                                    });

                                } else {
                                    element.setColor("red");
                                }
                            }
                        });
                    }, self);

                });


            }, 10);

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

        if (this.whatsappNextSprite) {
            this.whatsappNextSprite.setX(this.char.body.x + 385);
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

