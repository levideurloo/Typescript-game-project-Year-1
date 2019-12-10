import { Game } from "../models/Game";

export class TitleScene extends Phaser.Scene {

    private selectedCharacterText: Phaser.GameObjects.Text | undefined;

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
        this.loadMusic();
        this.loadTitle();
        this.loadCharacters();
        this.loadNextBtn();
    }

    private loadTitle() {
        const title = this.add.image(this.game.canvas.width / 2, this.game.canvas.height / 5, 'title');
    }

    /**
     * Play music by default
     */
    private loadMusic() {
        const music = this.sound.add('DOG');
        music.play();
    }

    /**
     * Add next button to screen
     */
    private loadNextBtn() {

        // Add next button image
        const nextBtn = this.add.image(this.game.canvas.width / 2, this.game.canvas.height * 0.9, 'next').setScale(0.2);

        //Add pointer down listener
        nextBtn.setInteractive().on('pointerdown', () => {
            alert("clicked");

            //check if a character is selected
            if (!(this.game as Game).characterInfo) {
                alert("Selecteer eerst een speler!");
                return false;
            }
        });
    }

    /**
     * Add characters to screen
     */
    private loadCharacters() {

        //Add characters
        const boyCharacter = this.add.image(this.game.canvas.width * 0.25, this.game.canvas.height * 0.5, 'boy').setScale(0.2).setName("boy");
        const girlCharacter = this.add.image(this.game.canvas.width * 0.75, this.game.canvas.height * 0.5, 'girl').setScale(0.2).setName("girl");

        //Add pointer down listener
        [boyCharacter, girlCharacter].forEach(function (element) {
            element.setInteractive().on('pointerdown', function (this: Phaser.GameObjects.Image) {

                //destroy text
                const selectedCharacterText = (this.scene as TitleScene).selectedCharacterText;

                if (selectedCharacterText) {
                    selectedCharacterText.destroy();
                }

                //set game property
                (this.scene.game as Game).characterInfo = { name: element.name, spreadsheetUri: `./assets/spritesheets/${element.name}.jpg` };

                //set selected text
                (this.scene as TitleScene).selectedCharacterText = this.scene.add.text(this.x - this.displayWidth / 2, (this.y + this.displayHeight) + 20, "Geselecteerd").setColor("white");

            });
        }, this);

    }
}