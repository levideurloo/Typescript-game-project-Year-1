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
    private hasAnwsered: boolean = false;

    private whatsappSprite: any;
    private whatsappNextSprite: any;

    private answerSprite1: any;
    private answerSprite2: any;
    private answerSprite3: any;
    private answerSprite4: any;
    private nametag: any;

    private backgroundMusic: any;
    private answerCorrect: boolean = false;

    private hasPlayedBulliedBoyLeaveAnimation: boolean = false;

    constructor(
        private lifesAmount: number,
        private allLifes: Phaser.GameObjects.Image,
        private lastLife: Phaser.GameObjects.Image
    ) {
        super({ key: 'bonboncafescene' });
        this.phone = new Phone();
    }

    init(data: any) {
        this.lifesAmount = data.lifesAmount;
    }

    preload() {
        // Recieves character info from selection screen
        const info = (this.game as Game).characterInfo;

        // Load character 
        if (info)
            this.load.spritesheet(info.name, info.spreadsheetUri, { frameWidth: 64, frameHeight: 64 });
        
        // Load in the background music
        this.load.audio('music', './assets/audio/NGGUU.mp3');
    }

    create() {
        // Get game information
        const info = (this.game as Game).characterInfo;

        // Get character name, by default 'boy' if none is selected
        const characterName = info ? info.name : 'boy';

        this.createLifes();

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

        this.anims.create({
            key: 'walkChar',
            repeat: -1,
            frameRate: 8,
            frames: this.anims.generateFrameNumbers('bulliedBoy', { start: 0, end: 8 })
        });

        // Plays Never Gonna Give You Up 8Bit on entry
        this.backgroundMusic = this.sound.add('music');
        this.backgroundMusic.play();

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
            this.nametag = this.add.text(this.char.x - 30, this.char.body.y - 100, chosenName, { fontFamily: 'Verdana, "Times New Roman", Tahoma, serif', backgroundColor: 'rgba(0, 0, 0, 0.39)', fontWeight: 'bold', fontSize: '24px', color: 'white', wordWrap: { width: 170 } });
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
            this.char.body.moves = false;

            this.phone.togglePhone(this.map.displayHeight);
            this.whatsappSprite = this.add.sprite(0, this.map.displayHeight - 190, 'classchat', 0).setDepth(7).setScale(0.5);

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
                                    background.setDepth(103);

                                    const headerText = self.add.text(self.char.body.x - 250, self.game.canvas.height * 0.25, "Helemaal goed!", { fontFamily: 'Verdana, "Times New Roman", Tahoma, serif', fontSize: '18px', color: 'green', wordWrap: { width: 170 } });
                                    headerText.setDepth(104);

                                    const textMsg = "Wanneer je ziet dat iemand online gepest wordt is het verstandig om dit aan een volwassen te melden. LET OP!: Zorg dat je de chat screenshot zo is er bewijs van de daad.";

                                    const infoText = self.add.text(self.char.body.x - 250, self.game.canvas.height * 0.35, textMsg, { fontFamily: 'Verdana, "Times New Roman", Tahoma, serif', fontSize: '12px', color: 'black', wordWrap: { width: 400 } });
                                    infoText.setDepth(104);

                                    const nextButton = self.add.sprite(self.char.x - 230, self.game.canvas.height * 0.6, 'next-btn', 0);
                                    nextButton.setScale(0.65);
                                    nextButton.setDepth(104);

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

                                        if (!self.hasAnwsered == true) {
                                            //Add arrow above Bon Bon Cafe
                                            self.arrow = self.add.sprite(-575, 200, 'arrow', 0);
                                            self.arrow.setScale(4);

                                            //Animate Floating Arrow
                                            self.anims.create({
                                                key: 'point',
                                                repeat: -1,
                                                frameRate: 30,
                                                frames: self.anims.generateFrameNumbers('arrow', { start: 0, end: 19 })
                                            });
                                            self.hasAnwsered = true;
                                        };
                                        self.arrow.anims.play('point', true);
                                        self.arrow.angle = 90;

                                    });

                                } else {
                                    self.changeLifes();
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
        this.updateLifes();
        this.cameras.main.setBounds(-770, 0, this.map.displayWidth + 100, this.map.displayHeight);
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

            // Adds the text bubble
            if (!this.bullyTextBubble) 
                this.bullyTextBubble = this.add.image(this.bulliedChar.body.x + 200, this.bulliedChar.body.y - 25, "bullied-bubble");
            
            this.isInRange = true;

            //can play leave animation?
            if (this.answerCorrect && !this.hasPlayedBulliedBoyLeaveAnimation) {
                this.hasPlayedBulliedBoyLeaveAnimation = true;

                this.bullyTextBubble.destroy();

                const self = this;

                setTimeout(() => {
                    this.bulliedChar.flipX = true;
                    this.bulliedChar.anims.play('walkChar', true); // plays walking animation
                    this.bulliedChar.body.setVelocityX(75); // move right with 75 speed

                    setTimeout(() => {
                        self.char.body.moves = true;
                    }, 5000);

                }, 1000);
            }
        }

        // Leave the building
        this.leaveBuilding();

        if (this.nametag)
            this.nametag.setX(this.char.x - 30);
    }


    private canExit() {
        return this.char.body.x < -475;
    }

    private leaveBuilding() {
        if (this.answerCorrect && this.canExit() && Phaser.Input.Keyboard.JustDown(this.enterKey)) {
            this.backgroundMusic.stop();
            this.scene.start('nightscene', { lifesAmount: this.lifesAmount });
        }
    }

    private createLifes() {
        this.allLifes = this.add.image(0, 25, 'lifes-all', undefined);
        this.allLifes.scaleX = .03;
        this.allLifes.scaleY = .03;
        this.allLifes.setDepth(5);

        this.lastLife = this.add.image(0, 25, 'lifes-1', undefined);
        this.lastLife.scaleX = .03;
        this.lastLife.scaleY = .03;
        this.lastLife.setDepth(5);

        if (this.lifesAmount > 1) {
            this.lastLife.visible = false;
            this.allLifes.visible = true;
        }

        if (this.lifesAmount == 1) {
            this.allLifes.visible = false;
            this.lastLife.visible = true;
        }
    }

    private updateLifes() {
        if (this.lifesAmount > 1) {
            this.lastLife.visible = false;
            this.allLifes.visible = true;
        }

        if (this.lifesAmount == 1) {
            this.allLifes.visible = false;
            this.lastLife.visible = true;
        }
        if (this.lifesAmount < 1) {
            this.lastLife.visible = false;
            this.scene.start('GameOverScene');
        }

        // Positionate lifes on canvas
        if ((this.char.body.x >= -300) && (this.char.body.x <= +300)) {
            this.allLifes.setX(this.char.body.x - 309);
            this.lastLife.setX(this.char.body.x - 309);
        }
        else {
            this.allLifes.setX(-607);
            this.lastLife.setX(-607);
        }
    }

    private changeLifes() {
        if (this.lifesAmount)
            this.lifesAmount = this.lifesAmount - 1;

        this.updateLifes();
    }
}