import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { NOTIFICATION_EVENT } from '../enums/notification.enum';
import { ROOM_STATUS } from '../enums/room-status.enum';
import { RESPONSE_EVENTS } from '../enums/websocket-enums/response-events.enum';
import { IJoinRoomResponse, ILobbyRoomResponse } from '../interfaces/http.interface';
import { IMinifiedIdentity, IMinifiedPlayer, IMinifiedRoom } from '../interfaces/minified.interface';
import { IRoomNotification } from '../interfaces/notification.interface';
import { ILobbyRoom } from '../interfaces/room.interface';
import { HttpService } from './http.service';
import { SessionStorageService, SESSION_KEY } from './session-storage.service';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  readonly roomSubject$ = new Subject<ILobbyRoomResponse|ILobbyRoom>();
  readonly room$: Observable<any> = this.roomSubject$.asObservable();

  constructor(
    private readonly _httpService: HttpService,
    private readonly _sessionStorage: SessionStorageService,
    private readonly _snackbarService: SnackbarService,
  ) { }

  createRoom(playerName: string, roomName: string): void {
    this._httpService.createRoom({playerName, roomName}).subscribe(
      (identity: IMinifiedIdentity | null) => {
      console.log(RESPONSE_EVENTS.roomCreated);
      if(identity) {
        this._snackbarService.openSnackbar(<IRoomNotification>{ event: NOTIFICATION_EVENT.roomCreated });
        this.onRoomCreated(identity);
      }
    });
  }

  joinRoom(playerName: string, room: IMinifiedRoom): void {
    this._httpService.joinRoom({playerName, room}).subscribe(
      (data: IJoinRoomResponse) => {
      console.log(RESPONSE_EVENTS.roomJoined);
      if(data) {
        this._snackbarService.openSnackbar(<IRoomNotification>{ event: NOTIFICATION_EVENT.roomJoined });
          this.onRoomJoined(data.identity, data.room);
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
      status: this._roomStatus(res.createdBy),
    })).subscribe((data: ILobbyRoomResponse) => {
      this.roomSubject$.next(data);
    });
  }

  onRoomCreated(identity: IMinifiedIdentity): void {
    this._sessionStorage.setItem(SESSION_KEY.identity, JSON.stringify(identity));
    this.triggerRoomEvent(ROOM_STATUS.created, identity);
  }

  onRoomJoined(identity: IMinifiedIdentity, room: ILobbyRoomResponse): void {
    this._sessionStorage.setItem(SESSION_KEY.identity, JSON.stringify(identity));
    this.triggerRoomEvent(ROOM_STATUS.joined, identity, room);
  }

  triggerRoomEvent(roomStatus: ROOM_STATUS, identity: IMinifiedIdentity, room?: ILobbyRoomResponse): void {
    console.log("triggerRoomEvent", room);
    if (roomStatus == ROOM_STATUS.created) { 
      this.roomSubject$.next({
        name: identity.room.name,
        status: roomStatus,
      });
    } else if (roomStatus == ROOM_STATUS.joined) {
      if(room) this.roomSubject$.next(room);
    }
  }

  isILobbyRoomResponse(obj: ILobbyRoom | ILobbyRoomResponse): obj is ILobbyRoomResponse {
    return (obj as ILobbyRoomResponse).createdBy !== undefined &&
      (obj as ILobbyRoomResponse).id !== undefined &&
      (obj as ILobbyRoomResponse).isGameStarted !== undefined &&
      (obj as ILobbyRoomResponse).name !== undefined &&
      (obj as ILobbyRoomResponse).players !== undefined;
  }

  private _roomStatus(createdBy: IMinifiedPlayer): ROOM_STATUS {
    const playerId: string = this._sessionStorage.getItem(SESSION_KEY.playerId);
    return (this._isCreatedByMe(playerId, createdBy)) ? ROOM_STATUS.created : ROOM_STATUS.joined;
  }

  private _isCreatedByMe(playerId: string, createdBy: IMinifiedPlayer): boolean {
    return playerId == createdBy?.id;
  }
}
