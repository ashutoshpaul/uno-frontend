import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ROOM_STATUS } from 'src/app/core/enums/room-status.enum';
import { IConnectionUpdatedResponse, ILobbyRoomResponse } from 'src/app/core/interfaces/response.interface';
import { IMinifiedIdentity, IMinifiedPlayer } from 'src/app/core/interfaces/minified.interface';
import { IdentityService } from 'src/app/core/services/identity.service';
import { RoomService } from 'src/app/core/services/room.service';
import { GameService } from 'src/app/core/services/game.service';
import { SubSink } from 'subsink';
import { ConnectionService } from 'src/app/core/services/connection.service';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { IRoomNotification } from 'src/app/core/interfaces/notification.interface';
import { NOTIFICATION_EVENT } from 'src/app/core/enums/notification.enum';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit, OnDestroy {

  room: ILobbyRoomResponse;

  room$: Observable<ILobbyRoomResponse>;
  otherPlayers: IMinifiedPlayer[];

  readonly roomStatusType: typeof ROOM_STATUS = ROOM_STATUS;
  
  private readonly _subSink = new SubSink();

  constructor(
    private readonly _identityService: IdentityService,
    private readonly _roomService: RoomService,
    private readonly _gameService: GameService,
    private readonly _connectionService: ConnectionService,
    private readonly _snackbarService: SnackbarService,
  ) { }

  ngOnInit(): void {
    this._getRoom();
    this._subSink.add(
      this._roomService.roomDeleted$.subscribe(_ => this.roomDeleted())
    );
    this._subSink.add(
      this._roomService.room$.subscribe((data: ILobbyRoomResponse) => {
        if (data) {
          // someone joined room (the room might be created by me)
          this._updateRoom(data as ILobbyRoomResponse);
        } else {
          // i created a new room
          this._updateRoom();
        }
      })
    );
    this._subSink.add(
      this._roomService.connectionUpdated$.subscribe((data: IConnectionUpdatedResponse) => {
        this._updateRoomPlayers(data);
      })
    );

    this._subSink.add(
      this._connectionService.connectivity$.subscribe((isOnline: boolean) => {
        if (!isOnline) {
          this._snackbarService.openSnackbar(<IRoomNotification>{ event: NOTIFICATION_EVENT.networkDisconnected });
        } else {
          this._snackbarService.openSnackbar(<IRoomNotification>{ event: NOTIFICATION_EVENT.networkReconnected });
          this._getRoom();
        }
      })
    );
  }

  invokeAction(): void {
    if(this.isJoinAndStartGameDisabled) return;
    if(this.room.isGameStarted) this._gameService.joinGame();
    else this._gameService.startGame();
  }

  /**
   * As a participant, you left someone's room
   */
  leaveRoom(): void {
    if (this._identityService.identity.player.id != this.room.createdBy.id) {
      this._roomService.leaveRoom(this.room.id);
    } else { console.error('you are host!'); }
  }

  /**
   * As a host, you deleted your room.
   */
  deleteRoom(): void {
    if (this._identityService.identity.player.id == this.room.createdBy.id) {
      this._roomService.deleteRoom(this.room.id);
    } else { console.error('you are not host!'); }
  }

  /**
   * Someone deleted the room.
   */
  roomDeleted(): void {
    this._reset();
  }

  get action() {
    return (this.room.isGameStarted) ? 'Join Game' : 'Start Game';
  }

  get isRoomCreatedByMe(): boolean {
    return this._roomService.isRoomCreatedByMe(this.room?.createdBy);
  }

  get isJoinAndStartGameDisabled(): boolean {
    return !(this.room.players?.length > 1);
  }

  private _getRoom(): void {
    if(this._identityService.identity?.room?.id) {
      this._roomService.getRoom(this._identityService.identity.room.id);
    }
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

  private _updateRoomPlayers(connectionUpdatedData: IConnectionUpdatedResponse): void {
    const identity: IMinifiedIdentity = this._identityService.identity;
    if (this._identityService.identity) {
      this.room = {
        ...this.room,
        players: connectionUpdatedData.players,
      };
      this.otherPlayers = this.room.players?.filter(e => e.id != identity.player.id) ?? [];

      this.room$ = of(this.room);
    } else { throw new Error('Identity missing!'); }
  }

  private _reset(): void {
    this.room = null;
    this.otherPlayers = null;
    this.room$ = of(this.room);
  }

  ngOnDestroy(): void {
    this._subSink.unsubscribe();
  }
}
