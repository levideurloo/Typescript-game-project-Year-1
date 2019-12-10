export class TitleScene extends Phaser.Scene {

    constructor() {
        super({
            key: 'main',
            pack: {
                files: [
                    { type: 'image', key: 'title', url: './assets/images/game-title.png' },
                ]
            }
        });
    }

    create() {

        // Play music by default
        const music = this.sound.add('DOG');
        music.play();

        // Add title image
        const titleImg = this.add.image(this.sys.canvas.width / 2, this.sys.canvas.height / 4, 'title');
        titleImg.setInteractive();

    }
}