import { ICharacterInfo } from "../interfaces/ICharacterInfo";

export class Game extends Phaser.Game {

    /**
     * Selected character of the game.
     */
    characterInfo: ICharacterInfo | undefined;

    chosenName: string | undefined;

    lives: number = 2;
}