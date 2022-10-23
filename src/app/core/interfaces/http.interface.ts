import { IMinifiedIdentity } from "./minified.interface";

export interface IUpdateSocketIdPayload {
  socketId: string;
  identity: IMinifiedIdentity;
}

export interface ICreateRoomPayload {
  playerName: string;
  roomName: string;
}