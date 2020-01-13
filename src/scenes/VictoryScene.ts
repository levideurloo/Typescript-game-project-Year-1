export class VictoryScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'VictoryScene',
      pack: {
        files: [
          { type: 'image', key: 'you-win', url: './assets/images/you-win.png' },
          { type: 'image', key: 'exit-button', url: './assets/images/exit-button.png' }
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
    const title = this.add.image(this.game.canvas.width / 2, this.game.canvas.height / 5, 'you-win');
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
    const text = ('Goed gedaan,\n\nJe bent erin geslaagd alle vragen goed te beantwoorden.\nNu kun jij veilig het internet op!');

    //Add text to canvas
    const addText = this.add.text(260, this.game.canvas.height / 3, text, { fontFamily: 'Verdana, "Times New Roman", Tahoma, serif', fontSize: '16px', color: 'white' });
  }

}