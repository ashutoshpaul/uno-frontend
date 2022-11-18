import { GameNotificationType, NOTIFICATION_EVENT, RoomNotificationType } from "../enums/notification.enum";

interface INotification {
  event: NOTIFICATION_EVENT;
  additional?: {
    playerWhoRemoved: string;
    playerRemoved: string;
  }
}

export interface IRoomNotification extends INotification {
  event: RoomNotificationType;
  additional?: {
    playerWhoRemoved: string;
    playerRemoved: string;
  }
}

export interface IGameNotification extends INotification {
  event: GameNotificationType,
  additional?: {
    playerWhoRemoved: string;
    playerRemoved: string;
  }
}