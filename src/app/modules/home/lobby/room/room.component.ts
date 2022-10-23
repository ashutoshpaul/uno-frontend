import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ROOM_STATUS } from 'src/app/core/enums/room-status.enum';
import { ILobbyRoomResponse } from 'src/app/core/interfaces/http.interface';
import { IMinifiedIdentity, IMinifiedPlayer } from 'src/app/core/interfaces/minified.interface';
import { ILobbyRoom } from 'src/app/core/interfaces/room.interface';
import { RoomService } from 'src/app/core/services/room.service';
import { SessionStorageService, SESSION_KEY } from 'src/app/core/services/session-storage.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  room: ILobbyRoomResponse;

  room$: Observable<ILobbyRoomResponse|ILobbyRoom>;
  otherPlayers$: Observable<IMinifiedPlayer[]>;

  readonly roomStatuses: typeof ROOM_STATUS = ROOM_STATUS;

  constructor(
    private readonly _router: Router,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _sessionStorage: SessionStorageService,
    private readonly _roomService: RoomService,
  ) { }

  ngOnInit(): void {
    const identity: IMinifiedIdentity = JSON.parse(this._sessionStorage.getItem(SESSION_KEY.identity));
    if(identity?.room?.id) {
      this._roomService.getRoom(identity.room.id).subscribe((room: ILobbyRoomResponse) => {
        this.room$ = of(room);
        this._updateRoom(identity, room);
      });
    }
    this.room$ = this._roomService.room$;
    this.room$.subscribe((room: ILobbyRoomResponse) => this._updateRoom(identity, room));
  }

  invokeAction(): void {
    if(this.room.isGameStarted) {
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
    return (this.room.isGameStarted) ? 'Join Game' : 'Start Game';
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

  private _updateRoom(identity: IMinifiedIdentity, room: ILobbyRoomResponse): void {
    this.room = room;
    this.otherPlayers$ = of(
      this.room.players?.filter(e => e.id != identity.player.id) ?? []
    );
  }

  private _navigateToGame(): void {
    this._router.navigate(['./../', 'play'], { relativeTo: this._activatedRoute });
  }
}
