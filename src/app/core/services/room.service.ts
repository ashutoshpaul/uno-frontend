import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { NOTIFICATION_EVENT } from '../enums/notification.enum';
import { ROOM_STATUS } from '../enums/room-status.enum';
import { RESPONSE_EVENTS } from '../enums/websocket-enums/response-events.enum';
import { IConnectionUpdatedResponse, IJoinRoomResponse, ILobbyRoomResponse, IPlayerRemovePayload } from '../interfaces/response.interface';
import { IMinifiedIdentity, IMinifiedPlayer, IMinifiedRoom } from '../interfaces/minified.interface';
import { IRoomNotification } from '../interfaces/notification.interface';
import { HttpService } from './http.service';
import { IdentityService } from './identity.service';
import { SessionStorageService, SESSION_KEY } from './session-storage.service';
import { SnackbarService } from './snackbar.service';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private readonly _roomSubject$ = new Subject<ILobbyRoomResponse>();
  readonly room$: Observable<any> = this._roomSubject$.asObservable();

  private readonly _connectionUpdatedSubject$ = new Subject<IConnectionUpdatedResponse>();
  readonly connectionUpdated$: Observable<any> = this._connectionUpdatedSubject$.asObservable();

  private readonly _roomDeletedSubject$ = new Subject<null>();
  readonly roomDeleted$: Observable<any> = this._roomDeletedSubject$.asObservable();

  constructor(
    private readonly _router: Router,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _httpService: HttpService,
    private readonly _sessionStorage: SessionStorageService,
    private readonly _snackbarService: SnackbarService,
    private readonly _identityService: IdentityService, 
  ) { }

  createRoom(playerName: string, roomName: string): void {
    this._httpService.createRoom({playerName, roomName}).subscribe(
      (identity: IMinifiedIdentity | null) => {
      console.log(RESPONSE_EVENTS.roomCreated);
      if(identity) {
        this._snackbarService.openSnackbar(<IRoomNotification>{ event: NOTIFICATION_EVENT.roomCreated });
        this._sessionStorage.setItem(SESSION_KEY.identity, JSON.stringify(identity));
        this.triggerRoomEvent();
      }
    });
  }

  joinRoom(playerName: string, room: IMinifiedRoom): void {
    this._httpService.joinRoom({playerName, room}).subscribe(
      (data: IJoinRoomResponse) => {
      console.log(RESPONSE_EVENTS.roomJoined);
      if(data) {
        this._snackbarService.openSnackbar(<IRoomNotification>{ event: NOTIFICATION_EVENT.roomJoined });
        this._sessionStorage.setItem(SESSION_KEY.identity, JSON.stringify(data.identity));
        this.triggerRoomEvent(data.room);
      }
    });
  }

  getRooms(): Observable<IMinifiedRoom[]> {
    return this._httpService.getRooms().pipe(map(res => 
      res.map(e => <IMinifiedRoom>{
        id: e.id,
        name: e.name,
        isAvailable: e.isAvailable,
        ...(e.createdBy && {createdBy: e.createdBy}),
      }),
    ));
  }

  getRoom(roomId: string): void {
    this._httpService.getRoom(roomId).pipe(map(res => <ILobbyRoomResponse>{
      createdBy: res.createdBy,
      id: res.id,
      isGameStarted: res.isGameStarted,
      players: res.players,
      name: res.name,
      status: this.roomStatus(res.createdBy),
    })).subscribe((data: ILobbyRoomResponse) => {
      this.triggerRoomEvent(data);
    });
  }

  deleteRoom(roomId: string): void {
    this._httpService.deleteRoom(roomId).subscribe(_ => {
      console.log('room deleted');
      this.triggerRoomDeletedEvent();
      this._snackbarService.openSnackbar(<IRoomNotification>{ event: NOTIFICATION_EVENT.roomDeleted });
    });
  }

  leaveRoom(roomId: string): void {
    this._httpService.leaveRoom(roomId).subscribe(_ => {
      console.log('room left');
      this.triggerRoomDeletedEvent();
      this._snackbarService.openSnackbar(<IRoomNotification>{ event: NOTIFICATION_EVENT.roomLeft });
    });
  }

  triggerRoomEvent(room?: ILobbyRoomResponse): void {
    if (room) {  // someone joined your room (room created by you)
      this._roomSubject$.next(room);
    } else {  // you created room
      this._roomSubject$.next(null);
    }
  }

  triggerConnectionUpdatedEvent(data: IConnectionUpdatedResponse): void {
    this._connectionUpdatedSubject$.next(data);
  }

  removePlayer(player: IMinifiedPlayer): void {
    const identity: IMinifiedIdentity | null = JSON.parse(this._sessionStorage.getItem(SESSION_KEY.identity));
    if (identity?.player) {
      const roomId: string = identity.room.id;
      const payload: IPlayerRemovePayload = {
        actionPlayer: identity.player,
        playerToBeRemoved: player,
      };
      this._httpService.removePlayer(roomId, payload).subscribe({
        next: (res: ILobbyRoomResponse) => {
          this.triggerRoomEvent(res);
          this._snackbarService.openSnackbar(<IRoomNotification>{
            event: NOTIFICATION_EVENT.playerRemovedByMe,
            additional: {
              playerRemovedName: player.name,
              playerWhoRemovedName: this._identityService.identity.player.name,  // me
            },
          });
        },
        error: () => this._snackbarService.openSnackbar(<IRoomNotification>{ event: NOTIFICATION_EVENT.failed }),
      });
    }
  }

  triggerRoomDeletedEvent(): void {
    this._clearSessionOnRoomDelete();
    this._roomDeletedSubject$.next(null);

    // if player is inside game (uno-board) then redirect back to lobby
    if (this._router.url.includes('play')) {
      this._sessionStorage.setItem(SESSION_KEY.isExit, true);
      this._router.navigate(['./../', 'lobby'], { relativeTo: this._activatedRoute });
    }
  }

  roomStatus(createdBy: IMinifiedPlayer): ROOM_STATUS {
    return this.isRoomCreatedByMe(createdBy) 
    ? ROOM_STATUS.created : ROOM_STATUS.joined;
  }

  isRoomCreatedByMe(createdBy: IMinifiedPlayer): boolean {
    if (this._identityService.identity) {
      return this._identityService.identity.player.id == createdBy?.id;
    } else { return null; }
  }

  private _clearSessionOnRoomDelete(): void {
    this._sessionStorage.remove(SESSION_KEY.hasAllPlayersJoined);
    this._sessionStorage.remove(SESSION_KEY.identity);
    this._sessionStorage.remove(SESSION_KEY.isCardsDistributed);
    this._sessionStorage.remove(SESSION_KEY.isChatOpen);
  }
}
