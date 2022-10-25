export enum NOTIFICATION_EVENT {
  roomCreated = 'roomCreated',
  roomJoined = 'roomJoined',
  roomDeleted = 'roomDeleted', // i deleted the room
  roomDoesNotExists = 'roomDoesNotExists', // someone deleted the room

  drawFourCards = 'drawFourCards',
  drawTwoCards = 'drawTwoCards',

  playerRemoved = 'playerRemoved',

  failed = 'failed',
}

export type RoomNotificationType = Extract<NOTIFICATION_EVENT, [
  NOTIFICATION_EVENT.roomCreated,
  NOTIFICATION_EVENT.roomDeleted,
  NOTIFICATION_EVENT.roomDoesNotExists,
  NOTIFICATION_EVENT.roomJoined,
  NOTIFICATION_EVENT.failed,
]>;

export type GameNotificationType = Exclude<NOTIFICATION_EVENT, [
  NOTIFICATION_EVENT.roomCreated,
  NOTIFICATION_EVENT.roomDeleted,
  NOTIFICATION_EVENT.roomDoesNotExists,
  NOTIFICATION_EVENT.roomJoined,
]>;
