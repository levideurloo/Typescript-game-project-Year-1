
export class Message {
	private isToggled: boolean = false;
	private sprite: Phaser.GameObjects.Sprite | undefined;

	constructor() {
	}

	public addSprite(sprite: Phaser.GameObjects.Sprite, scaleX: number, scaleY: number) {
		this.sprite = sprite;
		this.sprite.scaleX = scaleX;
		this.sprite.scaleY = scaleY;
	}

	public getSprite() {
		return this.sprite;
	}

	/**
     *  Show/Hide the in-game Phone Messages
     */
	public toggleMessage(displayHeight: number) {
		let height;
		if (this.sprite) {
			if (this.isToggled) {
				height = 250;
				this.sprite.y = (displayHeight + height);
				this.isToggled = false;
			} else {
				height = -300;
				this.sprite.y = (displayHeight + height);
				this.isToggled = true;
			}
		}
		return height;
	}

	public getToggledState() {
		return this.isToggled;
	}

}