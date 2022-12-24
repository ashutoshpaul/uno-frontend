import { DIRECTION } from "../enums/direction.enum";
import { ValidColorCodeType } from "../enums/websocket-enums/card-enums/card-colors.enum";
import { ICard } from "./card-interfaces/card.interface";
import { ICardPopulatedMappedPlayers, IMappedPlayers } from "./mapped-players.interface";
import { ICurrentPlayer } from "./player.interface";

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
 * * Holds updated value of properties which needs to be updated in IClientGameState.
 * * Is used as a medium to send updated values of properties (not a whole object) from backend.
 * * Usecase:
 * > 1. game color/direction/current-player is changed.
 * > 2. opponent throws a new card (lastDrawnCard and card-animation changes, etc.)
 * > 3. game-actions like skip/reverse/etc are received from the server.
 * > 4. etc.
 * 
 * > At such usecases, entire IMappedGame need not be sent. Only respective properties of the game
 * that are changed should be sent for smooth flow of the game (because IMappedGame is huge).
 * At such time, this interface is used as a medium.
 */
export interface IMappedGameChanges {
  currentColor?: ValidColorCodeType;
  currentDirection?: DIRECTION;
  currentPlayer?: ICurrentPlayer;
  lastDrawnCard?: ICard;

  // TODO: need to add mapped players
}

/**
 * * It holds current game state.
 * * Used for performing logical actions.
 * * NOT present in backend.
 * * Single point of truth.
 */
export interface IClientGameState {
  currentDirection?: DIRECTION;
  currentColor?: ValidColorCodeType;
  currentPlayer?: ICurrentPlayer;
  lastDrawnCard?: ICard;

  mappedPlayers: ICardPopulatedMappedPlayers;
}