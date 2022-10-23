import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { NOTIFICATION_EVENT } from '../enums/notification.enum';
import { ROOM_STATUS } from '../enums/room-status.enum';
import { RESPONSE_EVENTS } from '../enums/websocket-enums/response-events.enum';
import { IMinifiedIdentity, IMinifiedRoom } from '../interfaces/minified.interface';
import { IRoomNotification } from '../interfaces/notification.interface';
import { ILobbyRoom } from '../interfaces/room.interface';
import { HttpService } from './http.service';
import { SessionStorageService, SESSION_KEY } from './session-storage.service';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  readonly room$ = new Subject<ILobbyRoom>();

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
      (identity: IMinifiedIdentity | null) => {
      console.log(RESPONSE_EVENTS.roomJoined);
      if(identity) {
        this._snackbarService.openSnackbar(<IRoomNotification>{ event: NOTIFICATION_EVENT.roomJoined });
          this.onRoomJoined(identity);
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

  onRoomCreated(identity: IMinifiedIdentity): void {
    this._sessionStorage.setItem(SESSION_KEY.identity, JSON.stringify(identity));
    this.triggerRoomEvent(identity.room.name, ROOM_STATUS.created);
  }

  onRoomJoined(identity: IMinifiedIdentity): void {
    this._sessionStorage.setItem(SESSION_KEY.identity, JSON.stringify(identity));
    this.triggerRoomEvent(identity.room.name, ROOM_STATUS.joined);
  }

  triggerRoomEvent(roomName: string, roomStatus: ROOM_STATUS): void {
    this.room$.next({ name: roomName, status: roomStatus });
  }
}
