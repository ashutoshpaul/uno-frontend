import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Observable, of } from 'rxjs';

export enum ROOM_STATUS {
  roomCreated = 'roomCreated',
  roomJoined = 'roomJoined',
  roomDeleted = 'roomDeleted',
  roomLeft = 'roomLeft',
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
export class RoomComponent implements OnChanges, OnInit {

  @Input() room: IRoom;
  @Input() isGameStarted: boolean = false;

  room$: Observable<IRoom>;

  players: string[] = ['Samuel', 'Jack', 'Harry'];
  roomStatus: ROOM_STATUS;

  readonly roomStatuses: typeof ROOM_STATUS = ROOM_STATUS;

  constructor() { }

  ngOnChanges(): void {
    this.roomStatus = this.room.status;
    this.room$ = of(this.room);
  }

  ngOnInit(): void {
  }

  invokeAction(): void {
    if(this.isGameStarted) {
      this.joinGame();
    } else {
      this.startGame();
    }
  }

  joinGame(): void {}

  startGame(): void {}

  leaveRoom(): void {}

  deleteRoom(): void {}

  get action() {
    return (this.isGameStarted) ? 'Join Game' : 'Start Game';
  }

  get isRoomDeleted(): boolean {
    return this.room.status == ROOM_STATUS.roomDeleted;
  }

}
