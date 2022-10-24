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

  room$: Observable<ILobbyRoomResponse>;
  otherPlayers: IMinifiedPlayer[];

  readonly roomStatuses: typeof ROOM_STATUS = ROOM_STATUS;

  constructor(
    private readonly _router: Router,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _sessionStorage: SessionStorageService,
    private readonly _roomService: RoomService,
  ) { }

  ngOnInit(): void {
    let identity: IMinifiedIdentity = JSON.parse(this._sessionStorage.getItem(SESSION_KEY.identity));
    if(identity?.room?.id) {
      this._roomService.getRoom(identity.room.id);
    }
    this._roomService.room$.subscribe((data: ILobbyRoom|ILobbyRoomResponse) => {
      identity = JSON.parse(this._sessionStorage.getItem(SESSION_KEY.identity));
      if (identity) {
        const status: ROOM_STATUS = this._roomService.isILobbyRoomResponse(data)
        ? ROOM_STATUS.joined
        : (data as ILobbyRoom).status;
        if (status == ROOM_STATUS.created) {
          this._updateRoom(ROOM_STATUS.created, identity);
        } else if (status == ROOM_STATUS.joined) {
          this._updateRoom(ROOM_STATUS.joined, identity, data as ILobbyRoomResponse);
        }
      }
    });
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

  private _updateRoom(status: ROOM_STATUS, identity: IMinifiedIdentity, room?: ILobbyRoomResponse): void {
    if (status == ROOM_STATUS.created) {
      this.room = {
        createdBy: identity.player,
        id: identity.room.id,
        isGameStarted: false,
        name: identity.room.name,
        players: [],
        status: ROOM_STATUS.created,
      };
    } else if (status == ROOM_STATUS.joined) {
      this.room = room;
      this.room.status = ROOM_STATUS.joined,
      this.otherPlayers = this.room.players?.filter(e => e.id != identity.player.id) ?? [];
    }
    this.room$ = of(this.room);
  }

  private _navigateToGame(): void {
    this._router.navigate(['./../', 'play'], { relativeTo: this._activatedRoute });
  }
}
