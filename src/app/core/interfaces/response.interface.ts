import { PLAYER_POSITION } from "../enums/player-position.enum";
import { ROOM_STATUS } from "../enums/room-status.enum";
import { IMappedGame } from "./game.interface";
import { IMinifiedIdentity, IMinifiedPlayer, IMinifiedRoom } from "./minified.interface";

export interface IUpdateSocketIdPayload {
  socketId: string;
  identity: IMinifiedIdentity;
}

export interface ICreateRoomPayload {
  playerName: string;
  roomName: string;
}

export interface IJoinRoomPayload {
  playerName: string;
  room: IMinifiedRoom;
}

export interface IPlayerRemovePayload {
  actionPlayer: IMinifiedPlayer;
  playerToBeRemoved: IMinifiedPlayer;
}

export interface IJoinRoomResponse {
  identity: IMinifiedIdentity;
  room: ILobbyRoomResponse;
}

export interface ILobbyRoomResponse {
  createdBy: IMinifiedPlayer;
  isGameStarted: boolean;
  status: ROOM_STATUS; // OPTIONAL in back-end
  players: IMinifiedPlayer[],
  name: string;
  id: string;
}

export interface IPlayerLeftRoomResponse {
  playerName: string;
  room: ILobbyRoomResponse;
}

export interface IPlayerRemovedResponse {
  actionPlayer: string;
  playerRemoved: IMinifiedPlayer;
  room: ILobbyRoomResponse;
}

export interface IJoinedPlayersResponse {
  joinedPlayersCount: number;
  totalPlayersCount: number;
}

export interface IDistributeCardsResponse {
  /**
   * If isCardsShuffledEventEmitted == true, that means 'distribute-cards' functionality is invoked in backend
   * and 'shuffle-cards' event will be trigerred to the client (host sending http request).
   */
  isCardsShuffledEventEmitted: boolean
}

export interface IDistributeCardsWebsocketResponse {
  mappedGame: IMappedGame;
  
  /**
   * * Use hostPosition as a start position to distribute cards.
   * * Note: Distribution of cards starts from Host.
   */
  hostPosition: PLAYER_POSITION;
}


/**
 * Should sent to all clients if any player's network goes offline and on back-to-online.
 * Contains list of all players with their current status.
 */
 export interface IConnectionUpdatedResponse {
  players: IMinifiedPlayer[];
}