export class TitleScene extends Phaser.Scene {

    constructor() {
        super({
            key: 'main',
            pack: {
                files: [
                    { type: 'image', key: 'title', url: './assets/images/game-title.png' },
                    { type: 'image', key: 'next', url: './assets/images/next-button.jpg' },

                ]
            }
        });
    }

    create() {

        // Play music by default
        const music = this.sound.add('DOG');
        music.play();

        // Add title image
        const title = this.add.image(this.sys.canvas.width / 2, this.sys.canvas.height / 5, 'title');

        // Add next button image
        const nextBtn = this.add.image(this.sys.canvas.width / 2, this.sys.canvas.height * 0.9, 'next');
        nextBtn.setScale(0.2);
        nextBtn.setInteractive();

    }
}