import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ROOM_STATUS } from 'src/app/core/enums/room-status.enum';
import { ILobbyRoomResponse } from 'src/app/core/interfaces/http.interface';
import { IMinifiedIdentity, IMinifiedPlayer } from 'src/app/core/interfaces/minified.interface';
import { IdentityService } from 'src/app/core/services/identity.service';
import { RoomService } from 'src/app/core/services/room.service';

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
    private readonly _identityService: IdentityService,
    private readonly _roomService: RoomService,
  ) { }

  ngOnInit(): void {
    if(this._identityService.identity?.room?.id) {
      this._roomService.getRoom(this._identityService.identity.room.id);
    }
    this._roomService.room$.subscribe((data: ILobbyRoomResponse) => {
      if (data) {
        // someone joined room (the room might be created by me)
        this._updateRoom(data as ILobbyRoomResponse);
      } else {
        // i created a new room
        this._updateRoom();
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

  get isRoomCreatedByMe(): boolean {
    return this._roomService.isRoomCreatedByMe(this.room?.createdBy);
  }

  get errorMessage(): string {
    if(this.isRoomDeleted) return "Oops! Room doesn't exist.";
    return "Create or join a room to play.";
  }

  private _updateRoom(room?: ILobbyRoomResponse): void {
    const identity: IMinifiedIdentity = this._identityService.identity;
    if (this._identityService.identity) {
      if (room) {  // someone joined room (the room might be created by me)
        this.room = room;
        this.room.status = this._roomService.roomStatus(room.createdBy);
        this.otherPlayers = this.room.players?.filter(e => e.id != identity.player.id) ?? [];
      } else { // i created a new room
        this.room = {
          createdBy: identity.player,
          id: identity.room.id,
          isGameStarted: false,
          name: identity.room.name,
          players: [],
          status: ROOM_STATUS.created,
        };
      }
      this.room$ = of(this.room);
    } else { throw new Error('Identity missing!'); }
  }

  private _navigateToGame(): void {
    this._router.navigate(['./../', 'play'], { relativeTo: this._activatedRoute });
  }
}
