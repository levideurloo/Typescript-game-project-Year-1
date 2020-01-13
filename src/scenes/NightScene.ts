import { Phone } from './../models/Phone';
import { Game } from "../models/Game";

export class NightScene extends Phaser.Scene {
    private char: any; // & { body: Phaser.Physics.Arcade.Body }
    private phone: Phone;
    private cursorKeys: any;
    private spaceBar: any;
    private enterKey: Phaser.Input.Keyboard.Key | undefined;
    private map: any;
    private arrow: Phaser.GameObjects.Sprite | undefined;

    private conversationStarted: boolean = false;
    private notified: boolean = false;

    private sextingBubble: any;

    private snapchatGirl: any;
    private oldBoyFriend: any;

    private answerSprite1: any;
    private answerSprite2: any;
    private answerSprite3: any;
    private answerSprite4: any;

    private answerCorrect: boolean = false;
    private nametag: any;

    constructor(
        private lifesAmount: number,
        private allLifes: Phaser.GameObjects.Image,
        private lastLife: Phaser.GameObjects.Image
    ) {
        super({ key: 'nightscene' });
        this.phone = new Phone();
    }

    init(data: any) {
        this.lifesAmount = data.lifesAmount;
    }

    preload() {
        const info = (this.game as Game).characterInfo;

        //load character 
        if (info)
            this.load.spritesheet(info.name, info.spreadsheetUri, { frameWidth: 64, frameHeight: 64 });
    }

    create() {
        //get game info
        const info = (this.game as Game).characterInfo;

        //get character name, by default boy if none is selected
        const characterName = info ? info.name : 'boy';

        this.createLifes();

        // Add map to the scene
        this.map = this.add.image(this.game.canvas.width / 2, this.game.canvas.height / 2, "map-night")
        this.map.displayWidth = 2500;
        this.map.displayHeight = this.game.canvas.height;

        // Set world bounds
        this.physics.world.setBounds(-770, 0, this.map.displayWidth, this.map.displayHeight, true, true, true, true);

        // Add character to the scene
        this.char = this.add.sprite(443, 485, characterName, 0);
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

        //Animate Floating Arrow
        this.anims.create({
            key: 'point',
            repeat: -1,
            frameRate: 30,
            frames: this.anims.generateFrameNumbers('arrow', { start: 0, end: 19 })
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

        this.loadSceneCharacters();

        const chosenName = (this.game as Game).chosenName;

        if (chosenName) {
            this.nametag = this.add.text(this.char.x - 18, this.char.body.y - 50, chosenName, { fontFamily: 'Verdana, "Times New Roman", Tahoma, serif', backgroundColor: 'rgba(0, 0, 0, 0.39)', fontWeight: 'bold', fontSize: '16px', color: 'white', wordWrap: { width: 170 } });
            this.nametag.setDepth(5);
        }

        this.arrow = this.add.sprite(1490, 370, 'arrow', 0);
        this.arrow.anims.play('point', true);
        this.arrow.scaleY = 3.5;
        this.arrow.scaleX = 3.5;
        this.arrow.angle = 90;
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
        if (Phaser.Input.Keyboard.JustDown(this.spaceBar) && this.notified && !this.phone.isToggled) {
            this.phone.togglePhone(this.map.displayHeight);

            const self = this;

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
            self.phone.setAnswerSprite(1, self.answerSprite1, .47, (answerHeight * 1.5));
            self.phone.setAnswerSprite(2, self.answerSprite2, .47, answerHeight);
            self.phone.setAnswerSprite(3, self.answerSprite3, .47, answerHeight);
            self.phone.setAnswerSprite(4, self.answerSprite4, .47, answerHeight);

            const messageText = self.add.text(x - 80, self.map.displayHeight / 2 - 40, "Wat raadt je het meisje aan om te doen?", { fontFamily: 'Verdana, "Times New Roman", Tahoma, serif', fontSize: '12px', color: 'black', wordWrap: { width: 170 } });

            const answer1 = self.add.text(x - 80, self.map.displayHeight / 2 + 25, "Melding maken bij de politie", { fontFamily: 'Verdana, "Times New Roman", Tahoma, serif', fontSize: '12px', color: 'black', wordWrap: { width: 170 } });
            const answer2 = self.add.text(x - 80, self.map.displayHeight / 2 + 75, "Ex-vriendje bedreigen", { fontFamily: 'Verdana, "Times New Roman", Tahoma, serif', fontSize: '12px', color: 'black', wordWrap: { width: 170 } });
            const answer3 = self.add.text(x - 80, self.map.displayHeight / 2 + 115, "Ex-vriendje uitschelden", { fontFamily: 'Verdana, "Times New Roman", Tahoma, serif', fontSize: '12px', color: 'black', wordWrap: { width: 170 } });
            const answer4 = self.add.text(x - 80, self.map.displayHeight / 2 + 155, "Vriendinnen inlichten", { fontFamily: 'Verdana, "Times New Roman", Tahoma, serif', fontSize: '12px', color: 'black', wordWrap: { width: 170 } });

            messageText.setDepth(101);

            answer1.setDepth(101);
            answer2.setDepth(101);
            answer3.setDepth(101);
            answer4.setDepth(101);

            [answer1, answer2, answer3, answer4].forEach(function (element) {
                element.setInteractive().on('pointerdown', function (this: Phaser.GameObjects.Image) {

                    if (!self.answerCorrect) {
                        if (element.text === "Melding maken bij de politie") {
                            element.setColor("green");

                            const background = self.add.sprite(self.char.x - 100, self.game.canvas.height * 0.5, 'msg-background', 0);
                            background.setScale(0.6);
                            background.setDepth(15);

                            const headerText = self.add.text(self.char.body.x - 250, self.game.canvas.height * 0.25, "Helemaal goed!", { fontFamily: 'Verdana, "Times New Roman", Tahoma, serif', fontSize: '18px', color: 'green', wordWrap: { width: 170 } });
                            headerText.setDepth(16);

                            const textMsg = "Om fotos van internet te verwijderen die daar onbedoeld zijn gekomen heb je de politie nodig.";

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
                                self.answerCorrect = true;
                                self.sextingBubble.destroy();
                                self.thankPlayer();
                            });
                        } else {
                            element.setColor("red");
                            if (self.lifesAmount)
                                self.lifesAmount = self.lifesAmount - 1;
                        }
                    }
                });
            }, self);


            this.char.body.moves = false
        }

        this.cameras.main.setBounds(-770, 0, this.map.displayWidth, this.map.displayHeight);
        this.cameras.main.startFollow(this.char);

        this.updateLifes();


        const phoneSprite = this.phone.getSprite();

        if (phoneSprite)
            phoneSprite.setX(this.char.body.x + 385);

        if (this.nametag)
            this.nametag.setX(this.char.x - 18);

        if (this.char.body.x > 640 && this.conversationStarted == false)
            this.showConversation();

        if (this.notified && this.answerCorrect == false)
            this.walkingGirl();

        if ((this.char.body.x > 1470) && (this.char.body.x < 1490))
            this.finishGame();
        
    }

    /**
     * Function which displays a notification by playing a sound and showing a message.
     */
    private notify() {
        // play sound
        const notificationSound = this.sound.add('NOTIFICATION');
        notificationSound.play();
        this.notified = true;

        // display message
        const textBubble = this.add.image(500, this.char.body.y - 50, "notification-textbubble");

        setTimeout(() => {
            textBubble.destroy();
        }, 9000);
    }

    private loadSceneCharacters() {
        // Add Snapchat-girl to scene
        this.snapchatGirl = this.add.sprite(840, 485, 'snapchatGirl', 9);
        this.snapchatGirl.flipX = true;
        this.oldBoyFriend = this.add.sprite(880, 485, 'oldBoyFriend', 9);

        this.physics.world.enableBody(this.snapchatGirl);
        this.physics.world.enableBody(this.oldBoyFriend);

        this.anims.create({
            key: 'idleGirl',
            repeat: -1,
            frameRate: 1,
            frames: this.anims.generateFrameNumbers('snapchatGirl', { start: 0, end: 0 })
        });

        // Animates the walking state of the character
        this.anims.create({
            key: 'walkGirl',
            repeat: -1,
            frameRate: 12,
            frames: this.anims.generateFrameNumbers('snapchatGirl', { start: 0, end: 8 })
        });

        // Animates the walking state of the character
        this.anims.create({
            key: 'walkBoy',
            repeat: -1,
            frameRate: 12,
            frames: this.anims.generateFrameNumbers('oldBoyFriend', { start: 0, end: 8 })
        });
    }

    private showConversation() {
        this.conversationStarted = true;
        this.char.body.moves = false;

        // display flits
        const flitsBubble = this.add.image(850, this.oldBoyFriend.body.y - 5, "flits-bubble");
        const bullyMessage = this.add.image(860, this.oldBoyFriend.body.y - 45, "bully-bubble");

        bullyMessage.visible = false;

        setTimeout(() => {
            bullyMessage.visible = true;
        }, 1500);

        setTimeout(() => {
            flitsBubble.visible = false;
        }, 2750);

        setTimeout(() => {
            bullyMessage.visible = false;

            this.oldBoyFriend.flipX = true;
            this.oldBoyFriend.body.setVelocityX(85);
            this.oldBoyFriend.anims.play('walkBoy', true);
        }, 4100);

        setTimeout(() => {
            this.oldBoyFriend.visible = false;

            this.sextingBubble = this.add.image(840, this.snapchatGirl.body.y - 35, "sexting-bubble");
        }, 8000);

        setTimeout(() => {
            this.notify();
        }, 9500);
    }

    private walkingGirl() {
        if (this.snapchatGirl.body.x < 830) {
            this.snapchatGirl.body.setVelocityX(55);
            this.snapchatGirl.anims.play('walkGirl', true);
            this.snapchatGirl.flipX = true;
        }
        if (this.snapchatGirl.body.x > 895) {
            this.snapchatGirl.body.setVelocityX(0);
            this.snapchatGirl.anims.play('walkGirl', false);
            this.snapchatGirl.flipX = false;

            this.snapchatGirl.body.setVelocityX(-55);
            this.snapchatGirl.anims.play('walkGirl', true);
        }
    }

    private thankPlayer() {
        const thanksBubble = this.add.image(840, this.snapchatGirl.body.y - 35, "sexting-thanks");
        thanksBubble.visible = false;

        this.snapchatGirl.anims.play('idleGirl', true);
        this.snapchatGirl.body.setVelocityX(0);
        this.snapchatGirl.flipX = false;

        setTimeout(() => {
            thanksBubble.visible = true;
        }, 1500);

        setTimeout(() => {
            this.snapchatGirl.anims.play('walkGirl', true);
            this.snapchatGirl.flipX = true;
            this.snapchatGirl.body.setVelocityX(95);
        }, 3500);

        setTimeout(() => {
            thanksBubble.destroy();
            this.char.body.moves = true;
        }, 4100);

        setTimeout(() => {
            this.snapchatGirl.visible = false;
        }, 11000);
    }

    private finishGame() {
        if (this.arrow && this.enterKey && Phaser.Input.Keyboard.JustDown(this.enterKey))
            this.scene.start('VictoryScene');
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
        if (this.char.body.x >= -321) {
            this.allLifes.setX(this.char.body.x - 409);
            this.lastLife.setX(this.char.body.x - 409);
        }
        else {
            this.allLifes.setX(-731);
            this.lastLife.setX(-731);
        }
    }
}

 