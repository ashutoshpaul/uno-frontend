import { ROOM_STATUS } from "../enums/room-status.enum";
// TODO remove this file
/**
 * Used only for room-create/room-join trigger
 */
export interface ILobbyRoom {
  name: string;
  status: ROOM_STATUS;
}