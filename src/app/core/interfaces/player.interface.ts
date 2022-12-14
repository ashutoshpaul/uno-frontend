import { PLAYER_POSITION } from "../enums/player-position.enum";
import { STATUS } from "../enums/status.enum";
import { ICard, IOpponentCard } from "./card-interfaces/card.interface";
import { IMinifiedPlayer } from "./minified.interface";

export interface IPlayer {
  id: string;
  name: string;
  score: number;

  /**
   * false (default) when the player is removed from the game. Set to true when player enters the game
   *  */
  isActive: boolean;

  status: STATUS;
  cards: ICard[];  // cards in the player's cards tray.
  isCardLeft: boolean; // false when the player has played all his/her cards
}

/**
 * * Copy of IPlayer with a single difference.
 * * Has cardsCount (number) instead of cards (ICard[]).
 * * Used in IMappedPlayers and sent to front-end.
 */
export interface ISecuredPlayer {
  id: string;
  name: string;
  score: number;

  /**
   * false (default) when the player is removed from the game. Set to true when player enters the game
   *  */
  isActive: boolean;

  status: STATUS;
  cardsCount: number;  // cards in the player's cards tray.
  isCardLeft: boolean; // false when the player has played all his/her cards
}

/**
 * * Copy of ISecuredPlayer with a single diffence.
 * * Contains IOpponentCard[] in place of cardsCount.
 */
export interface IMappedOpponentPlayer {
  id: string;
  name: string;

  isActive: boolean;

  status: STATUS;
  cards: IOpponentCard[];  // cards in the player's cards tray.
  isCardLeft: boolean; // false when the player has played all his/her cards
}

/**
 * Used in IMappedPlayers
 */
export interface ICurrentPlayer {
  player: IMinifiedPlayer;
  position: PLAYER_POSITION;
}