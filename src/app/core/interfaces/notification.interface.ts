import { GameNotificationType, NOTIFICATION_EVENT, RoomNotificationType } from "../enums/notification.enum";

interface INotification {
  event: NOTIFICATION_EVENT;
}

export interface IRoomNotification extends INotification {
  event: RoomNotificationType;
}

export interface IGameNotification extends INotification {
  event: GameNotificationType,
  additional?: {
    playerName: string;
    removedPlayerName: string;
  }
}