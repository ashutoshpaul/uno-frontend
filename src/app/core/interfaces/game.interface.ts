import { DIRECTION } from "../enums/direction.enum";
import { ValidColorCodeType } from "../enums/websocket-enums/card-enums/card-colors.enum";
import { ICard } from "./card-interfaces/card.interface";
import { ICardPopulatedMappedPlayers, IMappedPlayers } from "./mapped-players.interface";
import { IMessage } from "./message.interface";
import { IMinifiedPlayer } from "./minified.interface";
import { ICurrentPlayer, IPlayer } from "./player.interface";

/**
 * * Stores the current game state in REDIS.
 * * Should NOT be sent to front-end once the game has started because it contains the cards of each player.
 * * Can lead to security issue if sent to front-end!
 * * Use IMappedGame instead.
 */
 export interface IGame {
  players: IPlayer[];
  drawerDeckCards: ICard[];
  discardPileCards: ICard[];
  chats: IMessage[];
  isGameStarted: boolean;

  currentDirection: DIRECTION;

  lastDrawnCard?: ICard;
  currentColor?: ValidColorCodeType;
  currentPlayer?: IMinifiedPlayer;
}

/**
 * * Contains mapped players based on position.
 * * Each player has its own IMappedGame.
 * * Should be sent to front-end once the game has started.
 */
export interface IMappedGame {
  mappedPlayers: IMappedPlayers;
  isGameStarted: boolean;
  
  currentDirection: DIRECTION;
  
  lastDrawnCard?: ICard;
  currentColor?: ValidColorCodeType;
  currentPlayer?: ICurrentPlayer;
}

/**
 * * It holds current game state.
 * * Used for performing logical actions.
 * * Single point of truth.
 */
export interface IClientGameState {
  currentDirection?: DIRECTION;
  currentColor?: ValidColorCodeType;
  currentPlayer?: ICurrentPlayer;
  lastDrawnCard?: ICard;

  mappedPlayers: ICardPopulatedMappedPlayers;
}