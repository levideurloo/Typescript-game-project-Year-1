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
    private bulliedChar: any;
    private isInRange: boolean = false;
    private bullyTextBubble: any;

    private charX: number = 0;

    private whatsappSprite: any;
    private whatsappNextSprite: any;
    private receivedWhatsappNotification: boolean = false;

    private answerSprite1: any;
    private answerSprite2: any;
    private answerSprite3: any;
    private answerSprite4: any;
    private nametag: any;

    private answerCorrect: boolean = false;

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

        // Load bullied character
        this.load.spritesheet('bulliedBoy', './assets/spritesheets/boy_2.png', { frameWidth: 64, frameHeight: 64 })

        // Load bullied characters text bubble
        this.load.image('bullied-bubble', './assets/images/onlinegepest-bubble.gif');

        // Load in the background music
        this.load.audio('music', './assets/audio/NGGUU.mp3');

        // Load in the phone chat and button parts
        this.load.image('whatsapp', './assets/images/classchat.png');
        this.load.image('next-btn', './assets/images/volgende-button.png');
        this.load.image('msg-background', './assets/images/msg-background.jpg');

        // Add anwsers to the phone
        this.phone.addAnswer('Sla de pestkop in elkaar');
        this.phone.addAnswer('Zoek hulp bij een leraar');
        this.phone.addAnswer('Help de pesters');
        this.phone.addAnswer('Doe niks');
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

        // Plays Never Gonna Give You Up 8Bit on entry
        let backgroundMusic = this.sound.add('music');
        backgroundMusic.play();


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

        // Create the bullied character
        this.bulliedChar = this.add.sprite(300, 400, 'bulliedBoy', 9);
        this.bulliedChar.setScale(4);
        this.physics.world.enableBody(this.bulliedChar);

        // Shows the bullied characters message when in range
        const chosenName = (this.game as Game).chosenName;

        if (chosenName) {
            this.nametag = this.add.text(this.char.x - 30, this.char.body.y - 100, chosenName, { fontFamily: 'Verdana, "Times New Roman", Tahoma, serif', fontWeight: 'bold', fontSize: '24px', color: 'white', wordWrap: { width: 170 } });
            this.nametag.setDepth(5);
        }
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
        if (Phaser.Input.Keyboard.JustDown(this.spaceBar) && this.isInRange == true && !this.phone.isToggled) {
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

                    const answerHeight = .22;
                    self.phone.setAnswerSprite(1, self.answerSprite1, .47, answerHeight);
                    self.phone.setAnswerSprite(2, self.answerSprite2, .47, answerHeight);
                    self.phone.setAnswerSprite(3, self.answerSprite3, .47, answerHeight);
                    self.phone.setAnswerSprite(4, self.answerSprite4, .47, answerHeight);

                    const messageText = self.add.text(x - 80, self.map.displayHeight / 2 - 44, "De jongen wordt nog steeds gepest wat ga je hier aandoen?", { fontFamily: 'Verdana, "Times New Roman", Tahoma, serif', fontSize: '12px', color: 'black', wordWrap: { width: 170 } });

                    const answer1 = self.add.text(x - 80, self.map.displayHeight / 2 + 27, "Ik app naar de pesters om ze te laten stoppen", { fontFamily: 'Verdana, "Times New Roman", Tahoma, serif', fontSize: '12px', color: 'black', wordWrap: { width: 170 } });
                    const answer2 = self.add.text(x - 80, self.map.displayHeight / 2 + 67, "Ik screenshot de chat en stuur die naar de leraar", { fontFamily: 'Verdana, "Times New Roman", Tahoma, serif', fontSize: '12px', color: 'black', wordWrap: { width: 170 } });
                    const answer3 = self.add.text(x - 80, self.map.displayHeight / 2 + 107, "Ik vertel de jongen dat hij er niet zo mee moet zitten", { fontFamily: 'Verdana, "Times New Roman", Tahoma, serif', fontSize: '12px', color: 'black', wordWrap: { width: 170 } });
                    const answer4 = self.add.text(x - 80, self.map.displayHeight / 2 + 150, "Ik doe niks", { fontFamily: 'Verdana, "Times New Roman", Tahoma, serif', fontSize: '12px', color: 'black', wordWrap: { width: 170 } });

                    messageText.setDepth(101);

                    answer1.setDepth(101);
                    answer2.setDepth(101);
                    answer3.setDepth(101);
                    answer4.setDepth(101);

                    [answer1, answer2, answer3, answer4].forEach(function (element) {
                        element.setInteractive().on('pointerdown', function (this: Phaser.GameObjects.Image) {

                            if (!self.answerCorrect) {
                                if (element.text === "Ik screenshot de chat en stuur die naar de leraar") {
                                    self.answerCorrect = true;

                                    element.setColor("green");

                                    const background = self.add.sprite(self.char.x - 100, self.game.canvas.height * 0.5, 'msg-background', 0);
                                    background.setScale(0.6);
                                    background.setDepth(15);

                                    const headerText = self.add.text(self.char.body.x - 250, self.game.canvas.height * 0.25, "Helemaal goed!", { fontFamily: 'Verdana, "Times New Roman", Tahoma, serif', fontSize: '18px', color: 'green', wordWrap: { width: 170 } });
                                    headerText.setDepth(16);

                                    const textMsg = "Wanneer je ziet dat iemand online gepest wordt is het verstandig om dit aan een volwassen te melden. LET OP!: Zorg dat je de chat screenshot zo is er bewijs van de daad.";

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


        // Check if player is in range of bullied charater. Then shows text bubble
        if (this.char.body.x > this.bulliedChar.body.x - 200) {
            this.showBulliedMessage();

        }

        if (this.nametag) {
            this.nametag.setX(this.char.x - 30);
        }
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

    private showBulliedMessage() {
        // Adds the text bubble
        const bullyTextBubble = this.add.image(this.bulliedChar.body.x + 200, this.bulliedChar.body.y - 25, "bullied-bubble");

        this.isInRange = true;
        // Stop player from moving
        this.char.body.moves = false;



    }
}
