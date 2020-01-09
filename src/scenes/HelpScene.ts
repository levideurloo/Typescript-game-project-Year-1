export class HelpScene extends Phaser.Scene {

  constructor() {
    super({
      key: 'HelpScene',
      pack: {
        files: [
          { type: 'image', key: 'game-title', url: './assets/images/game-title.png' },
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
    const title = this.add.image(this.game.canvas.width / 2, this.game.canvas.height / 5, 'game-title');
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
    const text = 'Spatie: hiermee opent je telefoon waar je notificaties op krijgt\nEnter: hiermee kun je een gebouw betreden\nLinker pijltoets: hiermee loopt je poppetje naar links op de map.\nRechter pijltoets: hiermee loopt je poppetje naar rechts op de map.\n\n\nKlik op het kruisje links onderin om weer terug te gaan naar het spel.';
    
    //Add text to canvas
    const addText = this.add.text(200, this.game.canvas.height / 3, text, { fontFamily: 'Verdana, "Times New Roman", Tahoma, serif', fontSize: '16px', color: 'white'});
  }

}