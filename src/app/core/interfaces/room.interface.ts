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

export interface ILobbyRoom {
  status: ROOM_STATUS;
  name: string;
}