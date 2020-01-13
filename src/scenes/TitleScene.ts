import { Game } from "../models/Game";

export class TitleScene extends Phaser.Scene {

    private selectedCharacterText: Phaser.GameObjects.Text | undefined;
    private music: Phaser.Sound.BaseSound | undefined;
    private inputGroup: HTMLElement;
    private inputName: HTMLInputElement;

    constructor() {
        super({
            key: 'main',
            pack: {
                files: [
                    { type: 'image', key: 'game-title', url: './assets/images/game-title.png' },
                    { type: 'image', key: 'start-button', url: './assets/images/start-button.png' },
                    { type: 'image', key: 'help-button', url: './assets/images/help-button.png' },
                    { type: 'image', key: 'mute-button', url: './assets/images/mute-button.png' },
                    { type: 'image', key: 'boy-1-image', url: './assets/images/boy-1-img.png' },
                    { type: 'image', key: 'boy-2-image', url: './assets/images/boy-2-img.png' },
                    { type: 'image', key: 'girl-1-image', url: './assets/images/girl-1-img.png' },
                    { type: 'image', key: 'girl-2-image', url: './assets/images/girl-2-img.png' }
                ]
            }
        });

        this.inputName = document.getElementById("inputName") as HTMLInputElement;
        this.inputGroup = document.getElementById("inputGroup") as HTMLElement;
    }

    public preload() {
        this.loadMusic();
    }

    public create() {
        this.loadTitle();
        this.loadCharacters();
        this.loadStartButton();
        this.loadHelpButton();
        this.loadMutebutton();
        this.loadText();

        this.inputGroup.style.display = 'block';
    }

    private loadTitle() {
        // Add title image
        const title = this.add.image(this.game.canvas.width / 2, this.game.canvas.height / 5, 'game-title');
    }

    /**
     * Load music function
     */
    private loadMusic() {
        if (!this.music)
            this.music = this.sound.add('DOG');

        this.music.play();
    }

    /**
    * Stop music
    */
    private stopMusic() {
        if (this.music)
            this.music.stop();
    }

    /**
     * Add start button to screen
     */
    private loadStartButton() {
        // Add start button image
        const startButton = this.add.image(this.game.canvas.width / 2, this.game.canvas.height * 0.9, 'start-button');

        // Add pointer down listener
        startButton.setInteractive().on('pointerdown', () => {
            // Check if a character is selected
            if (!(this.game as Game).characterInfo || !this.inputName.value) {
                // If not selected add following message to canvas ('Selecteer eerst je poppetje!')
                const selectFirst = 'Selecteer een poppetje & een naam!';
                const addText = this.add.text(this.game.canvas.width / 2 - 100, 440, selectFirst, { fontFamily: 'Verdana, "Times New Roman", Tahoma, serif', fontSize: '14px', color: 'white' });
                return false;
            }

            //set name
            (this.game as Game).chosenName = this.inputName.value;

            //hide input
            this.inputGroup.style.display = 'none';

            this.scene.start('gamescene', { charX: 60 });
        });


    }

    /**
     * Add help button to screen
     */
    private loadHelpButton() {
        // Add help button image
        const helpButton = this.add.image(60, this.game.canvas.height * 0.9, 'help-button');

        //Add pointer down listener
        helpButton.setInteractive().on('pointerdown', () => {
            this.scene.start('HelpScene');
        })
    }

    private loadMutebutton() {
        // Add mute button image
        const muteButton = this.add.image(this.game.canvas.width - 60, this.game.canvas.height * 0.9, 'mute-button');

        muteButton.setInteractive().on('pointerdown', () => {
            if (this.music) {
                if (this.music.isPlaying)
                    this.stopMusic();
                else
                    this.loadMusic();
            }
        });
    }

    /**
     * Add characters to screen
     */
    private loadCharacters() {
        //Add characters
        const boy_1 = this.add.image(this.game.canvas.width * 0.35, this.game.canvas.height * 0.5, 'boy-1-image').setName('boy_1');
        const boy_2 = this.add.image(this.game.canvas.width * 0.45, this.game.canvas.height * 0.5, 'boy-2-image').setName('boy_2');
        const girl_1 = this.add.image(this.game.canvas.width * 0.55, this.game.canvas.height * 0.5, 'girl-1-image').setName('girl_1');
        const girl_2 = this.add.image(this.game.canvas.width * 0.65, this.game.canvas.height * 0.5, 'girl-2-image').setName('girl_2');

        //Add pointer down listener
        [boy_1, boy_2, girl_1, girl_2].forEach(function (element) {
            element.setInteractive().on('pointerdown', function (this: Phaser.GameObjects.Image) {

                //destroy text
                const selectedCharacterText = (this.scene as TitleScene).selectedCharacterText;

                if (selectedCharacterText)
                    selectedCharacterText.destroy();

                //set game property
                (this.scene.game as Game).characterInfo = { name: element.name, spreadsheetUri: `./assets/spritesheets/${element.name}.png`, lifes: 2 };

                //set selected text
                (this.scene as TitleScene).selectedCharacterText = this.scene.add.text(this.x - this.displayWidth / 2 + 20, (this.y + this.displayHeight - 35), 'ˆ').setColor('#baff80').setFontSize(32);
            });
        }, this);

    }

    private loadText() {
        //Define what text is
        const text = 'Kies je poppetje';

        //Add text to canvas
        const addText = this.add.text(this.game.canvas.width / 2 - 60, this.game.canvas.height / 3, text, { fontFamily: 'Verdana, "Times New Roman", Tahoma, serif', fontSize: '14px', color: 'white' });
    }
}