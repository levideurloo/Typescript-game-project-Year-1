export class Phone {
	private isToggled: boolean = false;
	private sprite: Phaser.GameObjects.Sprite | undefined;
	private questionSprite: Phaser.GameObjects.Sprite | undefined;
	// private questionText: Phaser.GameObjects.Text | undefined;

	constructor(
		private answers: string[] = [],
		private question: string = ''
	) {
	}

	/**
     *  Show/Hide the in-game phone
     */
	public togglePhone(displayHeight: number) {
		let height;

		if (this.sprite && this.questionSprite) {
			if (this.isToggled) {
				height = 250;
				this.sprite.y = (displayHeight + 250);
				this.questionSprite.y = (displayHeight + height);
				this.isToggled = false;
			} else {
				height = -300;
				this.sprite.y = (displayHeight - 175);
				this.questionSprite.y = (displayHeight + height);
				this.isToggled = true;
			}
		}
		return height;
	}

	public getToggledState() {
		return this.isToggled;
	}

	public setSprite(sprite: Phaser.GameObjects.Sprite, scaleX: number, scaleY: number) {
		this.sprite = sprite;
		this.sprite.scaleX = scaleX;
		this.sprite.scaleY = scaleY;
	}

	public getSprite() {
		return this.sprite;
	}

	public setQuestionSprite(sprite: Phaser.GameObjects.Sprite, scaleX: number, scaleY: number) {
		this.questionSprite = sprite;
		this.questionSprite.scaleX = scaleX;
		this.questionSprite.scaleY = scaleY;
	}

	public getQuestionSprite() {
		return this.questionSprite;
	}

	public setQuestion(question: string) {
		this.question = question;

		// if (this.questionText) {
		// 	this.questionText.text = question;
		// 	this.questionText.style.fontFamily = 'Verdana, "Times New Roman", Tahoma, serif';
		// 	this.questionText.style.fontSize = '12px';
		// 	this.questionText.style.color = 'black';
		// 	this.questionText.style.setWordWrapWidth(170);
		// 	this.questionText.setDepth(3);
		// }
	}

	public getQuestion(): string {
		return this.question;
	}

	public addAnswer(answer: string) {
		this.answers.push(answer);
	}

	public getAnswers() {
		return this.answers;
	}

}