import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { NOTIFICATION_EVENT } from '../enums/notification.enum';
import { ROOM_STATUS } from '../enums/room-status.enum';
import { RESPONSE_EVENTS } from '../enums/websocket-enums/response-events.enum';
import { IJoinRoomResponse, ILobbyRoomResponse, IPlayerRemovePayload } from '../interfaces/response.interface';
import { IMinifiedIdentity, IMinifiedPlayer, IMinifiedRoom } from '../interfaces/minified.interface';
import { IRoomNotification } from '../interfaces/notification.interface';
import { HttpService } from './http.service';
import { IdentityService } from './identity.service';
import { SessionStorageService, SESSION_KEY } from './session-storage.service';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  readonly roomSubject$ = new Subject<ILobbyRoomResponse>();
  readonly room$: Observable<any> = this.roomSubject$.asObservable();

  readonly roomDeletedSubject$ = new Subject<null>();
  readonly roomDeleted$: Observable<any> = this.roomDeletedSubject$.asObservable();

  constructor(
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
      this.roomSubject$.next(room);
    } else {  // you created room
      this.roomSubject$.next(null);
    }
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
              playerRemoved: player.name,
              playerWhoRemoved: this._identityService.identity.player.name,  // me
            },
          });
        },
        error: () => this._snackbarService.openSnackbar(<IRoomNotification>{ event: NOTIFICATION_EVENT.failed }),
      });
    }
  }

  triggerRoomDeletedEvent(): void {
    this._sessionStorage.remove(SESSION_KEY.identity);
    this.roomDeletedSubject$.next(null);
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
}
