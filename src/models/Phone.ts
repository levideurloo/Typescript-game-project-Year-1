
export class Phone {
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
     *  Show/Hide the in-game phone
     */
	public togglePhone(displayHeight: number) {
		if (this.sprite) {
			if (this.isToggled) {
				this.sprite.y = (displayHeight + 250);
				this.isToggled = false;
			} else {
				this.sprite.y = (displayHeight - 175);
				this.isToggled = true;
			}
		}
	}

	public getToggledState() {
		return this.isToggled;
	}

}