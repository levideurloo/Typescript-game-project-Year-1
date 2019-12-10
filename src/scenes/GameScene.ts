export class GameScene extends Phaser.Scene {

    private char: any & { body: Phaser.Physics.Arcade.Body };
    private cursorKeys: any;


    constructor() {
        super('gamescene');

    }

    preload() {
        //load our images or sounds
        this.load.spritesheet('boy', './assets/spritesheets/boy.png', { frameWidth: 64, frameHeight: 64 });

    }

    create() {

        this.char = this.add.sprite(this.game.canvas.width / 2, 200, "boy", 0)
        this.physics.add.existing(this.char);
        this.anims.create({
            key: 'idle',
            repeat: -1,
            frameRate: 1,
            frames: this.anims.generateFrameNumbers('boy', { start: 0, end: 0 })
        });
        this.anims.create({
            key: 'walk',
            repeat: -1,
            frameRate: 12,
            frames: this.anims.generateFrameNumbers('boy', { start: 0, end: 8 })
        });

    }

    update() {
        this.cursorKeys = this.input.keyboard.createCursorKeys();

        if (this.cursorKeys.right.isDown) {
            this.char.body.setVelocityX(85); // move left with 85 speed
            this.char.anims.play('walk', true); // plays walking animation
            this.char.flipX= true; // flip the sprite to the left
        } else if (this.cursorKeys.left.isDown) {
            this.char.body.setVelocityX(-85) // move right with 85 speed
            this.char.anims.play('walk', true); // plays walking animation
            this.char.flipX = false; // use the original sprite looking to the right
        } else {
            this.char.body.setVelocityX(0);
            this.char.anims.play('idle', true); // plays the idle animtaion when no keys are pressed
        }
    }
}