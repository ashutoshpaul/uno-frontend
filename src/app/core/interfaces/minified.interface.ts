export interface IMinifiedRoom {
  id: string;
  isAvailable: boolean;
  name: string;
  createdBy?: IMinifiedPlayer;
}

export interface IMinifiedPlayer {
  id: string;
  name: string;
}

export interface IMinifiedIdentity {
  player: IMinifiedPlayer;
  room: IMinifiedRoom;
}