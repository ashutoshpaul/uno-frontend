import { Component, Input, OnInit } from '@angular/core';

export enum ROOM_STATUS {
  roomCreated = 'roomCreated',
  roomJoined = 'roomJoined',
}

export interface IRoom {
  status: ROOM_STATUS;
  name: string;
}

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  @Input() room: IRoom;
  @Input() isGameStarted: boolean = false;

  players: string[] = ['Samuel', 'Jack', 'Harry'];

  readonly roomStatuses: typeof ROOM_STATUS = ROOM_STATUS;

  constructor() { }

  ngOnInit(): void {
  }

  get action() {
    return (this.isGameStarted) ? 'Join Game' : 'Start Game';
  }

}
