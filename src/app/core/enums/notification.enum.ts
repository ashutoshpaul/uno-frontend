export enum NOTIFICATION_EVENT {
  roomCreated = 'roomCreated',
  roomJoined = 'roomJoined',
  roomLeft = 'roomLeft', // i left someone's room
  roomDeleted = 'roomDeleted', // i deleted the room
  roomDoesNotExists = 'roomDoesNotExists', // someone deleted the room

  drawFourCards = 'drawFourCards',
  drawTwoCards = 'drawTwoCards',

  playerRemoved = 'playerRemoved',
  playerRemovedByMe = 'playerRemovedByMe',
  playerRemovedMe = 'playerRemovedMe',

  networkDisconnected = 'networkDisconnected',
  networkReconnected = 'networkReconnected',

  failed = 'failed',
}

export type RoomNotificationType = Extract<NOTIFICATION_EVENT, [
  NOTIFICATION_EVENT.roomCreated,
  NOTIFICATION_EVENT.roomDeleted,
  NOTIFICATION_EVENT.roomLeft,
  NOTIFICATION_EVENT.roomDoesNotExists,
  NOTIFICATION_EVENT.roomJoined,
  NOTIFICATION_EVENT.playerRemoved,
  NOTIFICATION_EVENT.playerRemovedByMe,
  NOTIFICATION_EVENT.playerRemovedMe,
  NOTIFICATION_EVENT.networkDisconnected,
  NOTIFICATION_EVENT.networkReconnected,
  NOTIFICATION_EVENT.failed,
]>;

export type GameNotificationType = Extract<NOTIFICATION_EVENT, [
  NOTIFICATION_EVENT.drawFourCards,
  NOTIFICATION_EVENT.drawTwoCards,
  NOTIFICATION_EVENT.playerRemoved,
  NOTIFICATION_EVENT.roomLeft,
  NOTIFICATION_EVENT.failed,
]>;
