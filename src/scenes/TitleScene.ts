export class TitleScene extends Phaser.Scene {

    constructor() {
        super("main");
    }

    create() {

        // Play music by default
        const music = this.sound.add('DOG');
        music.play();

        

    }
}