import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ROOM_STATUS } from 'src/app/core/enums/room-status.enum';
import { ILobbyRoom } from 'src/app/core/interfaces/room.interface';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnChanges, OnInit {

  @Input() room: ILobbyRoom;
  @Input() isGameStarted: boolean = false;

  room$: Observable<ILobbyRoom>;

  players: string[] = [];
  roomStatus: ROOM_STATUS;

  readonly roomStatuses: typeof ROOM_STATUS = ROOM_STATUS;

  constructor(
    private readonly _router: Router,
    private readonly _activatedRoute: ActivatedRoute,
  ) { }

  ngOnChanges(): void {
    this.roomStatus = this.room?.status;
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

  joinGame(): void {
    this._navigateToGame();
  }

  startGame(): void {
    this._navigateToGame();
  }

  leaveRoom(): void {}

  deleteRoom(): void {}

  get action() {
    return (this.isGameStarted) ? 'Join Game' : 'Start Game';
  }

  get isRoomDeleted(): boolean {
    return this.room?.status == ROOM_STATUS.deleted;
  }

  get isRoomAvailable(): boolean {
    return !!this.room;
  }

  get errorMessage(): string {
    if(this.isRoomDeleted) return "Oops! Room doesn't exist.";
    return "Create or join a room to play.";
  }

  private _navigateToGame(): void {
    this._router.navigate(['./../', 'play'], { relativeTo: this._activatedRoute });
  }
}
