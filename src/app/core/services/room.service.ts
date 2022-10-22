import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ROOM_STATUS } from '../enums/room-status.enum';
import { IMinifiedIdentity, IMinifiedRoom } from '../interfaces/minified.interface';
import { ILobbyRoom } from '../interfaces/room.interface';
import { HttpService } from './http.service';
import { SessionStorageService, SESSION_KEY } from './session-storage.service';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  readonly room$ = new Subject<ILobbyRoom>();

  constructor(
    private readonly _httpService: HttpService,
    private readonly _sessionStorage: SessionStorageService,
  ) { }

  getRooms(): Observable<IMinifiedRoom[]> {
    return this._httpService.getRooms().pipe(map(res => 
      res.map(e => <IMinifiedRoom>{
        id: e.id,
        name: e.name,
        ...(e.createdBy && {createdBy: e.createdBy}),
      }),
    ));
  }

  onRoomCreated(identity: IMinifiedIdentity): void {
    this._sessionStorage.setItem(SESSION_KEY.identity, JSON.stringify(identity));
    this.triggerRoomEvent(identity.room.name, ROOM_STATUS.created);
  }

  triggerRoomEvent(roomName: string, roomStatus: ROOM_STATUS): void {
    this.room$.next({ name: roomName, status: roomStatus });
  }
}
