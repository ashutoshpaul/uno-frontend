import { ROOM_STATUS } from "../enums/room-status.enum";
import { IGame } from "./game.interface";
import { IMinifiedPlayer } from "./minified.interface";

export interface IRoom {
  id: string;
  name: string;
  game: IGame;
  createdBy: IMinifiedPlayer;
  isAvailable: boolean;
}

/**
 * Used only for room-create/room-join trigger
 */
export interface ILobbyRoom {
  name: string;
  status: ROOM_STATUS;
}