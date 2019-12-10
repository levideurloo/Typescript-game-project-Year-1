import { Game } from "../models/Game";

export class TitleScene extends Phaser.Scene {

    /**
     * Selected character of the scene.
     */
    private selectedCharacterImage: Phaser.GameObjects.Image | undefined;

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
        this.initMusic();
        this.initTitle();
        this.initCharacters();
        this.initNextBtn();
    }

    private initTitle() {
        const title = this.add.image(this.game.canvas.width / 2, this.game.canvas.height / 5, 'title');
    }

    /**
     * Play music by default
     */
    private initMusic() {
        const music = this.sound.add('DOG');
        music.play();
    }

    /**
     * Add next button to screen
     */
    private initNextBtn() {

        // Add next button image
        const nextBtn = this.add.image(this.game.canvas.width / 2, this.game.canvas.height * 0.9, 'next').setScale(0.2);

        nextBtn.setInteractive().on('pointerdown', () => {
            alert("clicked");
        });
    }

    /**
     * Add characters to screen
     */
    private initCharacters() {

        //Add characters
        const boyCharacter = this.add.image(this.game.canvas.width * 0.25, this.game.canvas.height * 0.5, 'boy').setScale(0.2).setName("boy");
        const girlCharacter = this.add.image(this.game.canvas.width * 0.75, this.game.canvas.height * 0.5, 'girl').setScale(0.2).setName("girl");


        //Add click listener
        [boyCharacter, girlCharacter].forEach(function (element) {
            element.setInteractive().on('pointerdown', function () { //120 / 200
                // (this.game as Game).character = { name: boyCharacter.name, spreadsheetUri: `./assets/spritesheets/${boyCharacter.name}.jpg` };

            });
        });
    }
}