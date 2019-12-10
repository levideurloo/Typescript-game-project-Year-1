export class TitleScene extends Phaser.Scene {

    constructor() {
        super({
            key: 'main',
            pack: {
                files: [
                    { type: 'image', key: 'title', url: './assets/images/game-title.png' },
                    { type: 'image', key: 'next', url: './assets/images/next-button.jpg' },
                    { type: 'image', key: 'boy', url: './assets/images/boy-img.jpg' },
                    { type: 'image', key: 'girl', url: './assets/images/girl-img.jpg' },
                ]
            }
        });
    }

    create() {

        // Play music by default
        const music = this.sound.add('DOG');
        music.play();

        // Add title image
        const title = this.add.image(this.sys.canvas.width / 2, this.game.canvas.height / 5, 'title');

        //Add characters
        const girlCharacter = this.add.image(this.sys.canvas.width / 4, this.game.canvas.height * 0.5, 'next').setScale(0.2);

        // Add next button image
        const nextBtn = this.add.image(this.sys.canvas.width / 2, this.game.canvas.height * 0.9, 'next').setScale(0.2);

        nextBtn.setInteractive().on('pointerdown', () => {
            alert("clicked");
        });


    }
}