import { ROOM_STATUS } from "../enums/room-status.enum";
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

export interface ILobbyRoomResponse {
  createdBy: IMinifiedPlayer;
  isGameStarted: boolean;
  status: ROOM_STATUS; // OPTIONAL is back-end
  players: IMinifiedPlayer[],
  name: string;
  id: string;
}