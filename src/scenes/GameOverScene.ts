import { Game } from "../models/Game";

export class GameOverScene extends Phaser.Scene {

    constructor() {
      super({
        key: 'GameOverScene',
        pack: {
          files: [
            { type: 'image', key: 'game-over', url: './assets/images/game-over.png' },
            { type: 'image', key: 'exit-button', url: './assets/images/exit-button.png'}
          ]
        }
      })
    }
  
    public preload() {
    }
  
    public create() {
      this.loadTitle();
      this.loadExitButton();
      this.loadText();
    }
  
    private loadTitle() {
      //Add title image
      const title = this.add.image(this.game.canvas.width / 2, this.game.canvas.height / 5, 'game-over');
    }
  
    private loadExitButton() {
      //Add exit button image
      const exitButton = this.add.image(60, this.game.canvas.height * 0.9, 'exit-button');
  
      //Add pointer down listener
      exitButton.setInteractive().on('pointerdown', () => {
        this.scene.start('main');
      });
    }
  
    private loadText() {
      //Define what text is
      const text = 'Je hebt teveel vragen verkeerd beantwoord.';
      
      //Add text to canvas
      const addText = this.add.text(300, this.game.canvas.height / 2, text, { fontFamily: 'Verdana, "Times New Roman", Tahoma, serif', fontSize: '16px', color: 'white'});
    }
  
  }