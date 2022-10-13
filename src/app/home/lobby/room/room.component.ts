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

  readonly roomStatuses: typeof ROOM_STATUS = ROOM_STATUS;

  constructor() { }

  ngOnInit(): void {
  }

}
