import { IMappedOpponentPlayer, IPlayer, ISecuredPlayer } from "./player.interface";

export interface IMappedPlayers {
  top: ISecuredPlayer | null;
  right: ISecuredPlayer | null;
  left: ISecuredPlayer | null;
  bottom: IPlayer; // me
}

/**
 * Contains IOpponentCard[] in place of cardsCount.
 * Should be used in client side only.
 */
export interface ICardPopulatedMappedPlayers {
  top?: IMappedOpponentPlayer,
  right?: IMappedOpponentPlayer,
  left?: IMappedOpponentPlayer,
  bottom?: IPlayer,
}