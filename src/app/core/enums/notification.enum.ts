export enum NOTIFICATION_EVENT {
  roomCreated = 'roomCreated',
  roomJoined = 'roomJoined',
  roomLeft = 'roomLeft', // i left someone's room
  opponentLeftRoom = 'opponentLeftRoom', // player left our room
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
  NOTIFICATION_EVENT.roomLeft,
  NOTIFICATION_EVENT.opponentLeftRoom,
  NOTIFICATION_EVENT.roomDoesNotExists,
  NOTIFICATION_EVENT.roomJoined,
  NOTIFICATION_EVENT.failed,
]>;

export type GameNotificationType = Exclude<NOTIFICATION_EVENT, [
  NOTIFICATION_EVENT.roomCreated,
  NOTIFICATION_EVENT.roomDeleted,
  NOTIFICATION_EVENT.roomLeft,
  NOTIFICATION_EVENT.opponentLeftRoom,
  NOTIFICATION_EVENT.roomDoesNotExists,
  NOTIFICATION_EVENT.roomJoined,
]>;
