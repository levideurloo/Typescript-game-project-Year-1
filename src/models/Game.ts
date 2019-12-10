import { ICharacter } from "../interfaces/ICharacter";

export class Game extends Phaser.Game {

    /**
     * Selected character of the game.
     */
    character: ICharacter | undefined;

}