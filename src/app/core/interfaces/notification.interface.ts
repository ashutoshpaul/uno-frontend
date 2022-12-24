import { GameNotificationType, RoomNotificationType } from "../enums/notification.enum";

export interface IRoomNotification {
  event: RoomNotificationType;
  additional?: {
    playerWhoRemovedName: string;
    playerRemovedName: string;
  }
}

export interface IGameNotification {
  event: GameNotificationType,
  additional?: {
    playerWhoRemovedName?: string;
    playerRemovedName?: string;

    /**
     * Someone who leaves the ongoing game.
     */
    playerLeftName?: string;
  }
}