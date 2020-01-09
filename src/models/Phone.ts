export class Phone {
	public isToggled: boolean = false;
	private sprite: Phaser.GameObjects.Sprite | undefined;
	private questionSprite: Phaser.GameObjects.Sprite | undefined;
	private answer1: Phaser.GameObjects.Sprite | undefined;
	private answer2: Phaser.GameObjects.Sprite | undefined;
	private answer3: Phaser.GameObjects.Sprite | undefined;
	private answer4: Phaser.GameObjects.Sprite | undefined;

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

				if (this.answer1)
					this.answer1.y = (displayHeight + height);
				if (this.answer2)
					this.answer2.y = (displayHeight + height);
				if (this.answer3)
					this.answer3.y = (displayHeight + height);
				if (this.answer4)
					this.answer4.y = (displayHeight + height);

				this.isToggled = false;
			} else {
				height = -300;
				this.sprite.y = (displayHeight - 175);
				this.questionSprite.y = (displayHeight + height);

				if (this.answer1)
					this.answer1.y = ((displayHeight + height) + 45);
				if (this.answer2)
					this.answer2.y = ((displayHeight + height) + 85);
				if (this.answer3)
					this.answer3.y = ((displayHeight + height) + 125);
				if (this.answer4)
					this.answer4.y = ((displayHeight + height) + 165);

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

	public setAnswerSprite(index: number, sprite: Phaser.GameObjects.Sprite, scaleX: number, scaleY: number) {
		if (index === 1) {
			this.answer1 = sprite;
			this.answer1.scaleX = scaleX;
			this.answer1.scaleY = scaleY;
		}
		if (index === 2) {
			this.answer2 = sprite;
			this.answer2.scaleX = scaleX;
			this.answer2.scaleY = scaleY;
		}
		if (index === 3) {
			this.answer3 = sprite;
			this.answer3.scaleX = scaleX;
			this.answer3.scaleY = scaleY;
		}
		if (index === 4) {
			this.answer4 = sprite;
			this.answer4.scaleX = scaleX;
			this.answer4.scaleY = scaleY;
		}
	}

	public getAnswerSprite(index: number) {
		if (index === 1)
			return this.answer1;
		if (index === 2)
			return this.answer2;
		if (index === 3)
			return this.answer3;
		if (index === 4)
			return this.answer4;
	}

	public setQuestion(question: string) {
		this.question = question;
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

	public deleteAll() {
		[this.answer1, this.answer2, this.answer3, this.answer4, this.questionSprite, this.sprite].forEach(element => {
			if (element) element.destroy();
		});
	}
}