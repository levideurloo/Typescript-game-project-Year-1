import { Game } from './../models/Game';
import { Phone } from './../models/Phone';

export class GameScene extends Phaser.Scene {
    private char: any; // & { body: Phaser.Physics.Arcade.Body }
    private phone: Phone;
    private question: Phaser.GameObjects.Text | any;
    private cursorKeys: any;
    private spaceBar: any;
    private map: any;

    private bulliedChar: any;
    private bullyOne: any;
    private bullyTwo: any;
    private bullyThree: any;

    private nametag: any;
    // private lifesText: Phaser.GameObjects.Text | any;

    private answerCorrect: boolean = false;
    private conversationStarted: boolean = false;

    /**
     * Boolean to check MOTHER
     */
    private hasReceivedNotificationBullies: boolean = false;


    constructor(
        private lifesAmount: number,
        private allLifes: Phaser.GameObjects.Image,
        private lastLife: Phaser.GameObjects.Image
        ) {
        super({ key: 'gamescene' });
        this.phone = new Phone();
    }

    preload() {
        const info = (this.game as Game).characterInfo;

        //load character 
        if (info)
            this.load.spritesheet(info.name, info.spreadsheetUri, { frameWidth: 64, frameHeight: 64 });

        if (info && info.lifes)
            this.lifesAmount = info.lifes;

        // this.lifes = new Phaser.GameObjects.Image(this, 0, 0, '', undefined);

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

        this.createLifes();

        // Add map to the scene
        this.map = this.add.image(this.game.canvas.width / 2, this.game.canvas.height / 2, "map");
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

        const chosenName = (this.game as Game).chosenName;

        if (chosenName) {
            this.nametag = this.add.text(this.char.x - 18, this.char.body.y - 40, chosenName, { fontFamily: 'Verdana, "Times New Roman", Tahoma, serif', backgroundColor: 'rgba(0, 0, 0, 0.39)', fontWeight: 'bold', fontSize: '16px', color: 'white', wordWrap: { width: 170 } });
            this.nametag.setDepth(5);
        }

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

        //temp hide since we dont need

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
        if (Phaser.Input.Keyboard.JustDown(this.spaceBar) && this.hasReceivedNotificationBullies && !this.phone.isToggled) {
            const displayHeight = this.phone.togglePhone(this.map.displayHeight);
            this.toggleQuestion(displayHeight);
        }

        this.cameras.main.setBounds(-770, 0, this.map.displayWidth, this.map.displayHeight);
        this.cameras.main.startFollow(this.char);

        this.updateLifes();

        this.onCollideBullies();

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

        if (this.nametag)
            this.nametag.setX(this.char.x - 18);

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
        // Stop player from moving
        this.char.body.moves = false;

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

                sprite.setInteractive().on('pointerdown', () => {

                    if (!this.answerCorrect) {
                        if (answers[i] === "Zoek hulp bij een leraar") {
                            this.answerCorrect = true;

                            text.setColor("green");

                            const background = this.add.sprite(this.char.x - 100, this.game.canvas.height * 0.5, 'msg-background', 0);
                            background.setScale(0.6);
                            background.setDepth(15);

                            const headerText = this.add.text(this.char.body.x - 250, this.game.canvas.height * 0.25, "Helemaal goed!", { fontFamily: 'Verdana, "Times New Roman", Tahoma, serif', fontSize: '18px', color: 'green', wordWrap: { width: 170 } });
                            headerText.setDepth(16);

                            const textMsg = "In deze situatie is het inderdaad het meest verstandig om een leraar te roepen. Zo weet je zeker dat de situatie niet uit loopt op ruzie.";

                            const infoText = this.add.text(this.char.body.x - 250, this.game.canvas.height * 0.35, textMsg, { fontFamily: 'Verdana, "Times New Roman", Tahoma, serif', fontSize: '12px', color: 'black', wordWrap: { width: 400 } });
                            infoText.setDepth(16);

                            const nextButton = this.add.sprite(this.char.x - 230, this.game.canvas.height * 0.6, 'next-btn', 0);
                            nextButton.setScale(0.65);
                            nextButton.setDepth(16);

                            nextButton.setInteractive().on('pointerdown', () => {
                                this.scene.start('enterbuildingscene', { charX: this.char.x });
                            });
                        } else {
                            text.setColor("red");

                            if (this.lifesAmount)
                                this.lifesAmount = this.lifesAmount - 1;
                        }
                    }
                });
            }
        }
    }

    /**
     * Loads the Bullies 
     */
    private loadBullies() {
        // Add bullied character to the scene
        this.bulliedChar = this.add.sprite(130, 485, 'bulliedBoy', 9); // -500 X-position  485 Y-postion

        this.bullyOne = this.add.sprite(90, 485, 'bullyGirl', 9); // -500 X-position  485 Y-postion
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

        this.anims.create({
            key: 'walkBullyGirl',
            repeat: -1,
            frameRate: 12,
            frames: this.anims.generateFrameNumbers('bullyGirl', { start: 0, end: 8 })
        });

        this.anims.create({
            key: 'walkBully',
            repeat: -1,
            frameRate: 12,
            frames: this.anims.generateFrameNumbers('bully', { start: 0, end: 8 })
        });
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
            this.showConversation();
        }

        if (!this.conversationStarted && playerX + 150 > this.bullyOne.body.x)
            this.showConversation();
    }

    private showConversation() {
        this.conversationStarted = true;

        const bullyTextBubble = this.add.image(this.bullyOne.body.x + 120, this.bullyOne.body.y - 17, "bully-text");
        bullyTextBubble.visible = false;

        this.jumpBully();

        this.bullyOne.anims.play('walkBullyGirl', true);

        this.bullyThree.anims.play('walkBully', true);

        setInterval(() => {
            if (this.bullyOne.body.flipX === true)
                this.bullyOne.body.flipX = false;
            else
                this.bullyOne.body.flipX = true;

            this.jumpBully();
        }, 4000);


        setTimeout(() => {
            bullyTextBubble.visible = true;
        }, 3000);

        setTimeout(() => {
            bullyTextBubble.visible = false;
        }, 6500);

        setInterval(() => {
            bullyTextBubble.visible = true;

            setTimeout(() => {
                bullyTextBubble.visible = false;
            }, 4000);
        }, 12000);

    }

    private jumpBully() {
        setTimeout(() => {
            this.bullyTwo.body.setVelocityY(-50);
        }, 200);
        setTimeout(() => {
            this.bullyTwo.body.setVelocityY(50);
        }, 300);
        setTimeout(() => {
            this.bullyTwo.body.setVelocityY(0);
        }, 400);

        setTimeout(() => {
            this.bullyTwo.body.setVelocityY(-50);
        }, 700);
        setTimeout(() => {
            this.bullyTwo.body.setVelocityY(50);
        }, 800);
        setTimeout(() => {
            this.bullyTwo.body.setVelocityY(0);
        }, 900);
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