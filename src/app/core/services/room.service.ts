import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ROOM_STATUS } from '../enums/room-status.enum';
import { IMinifiedIdentity } from '../interfaces/minified.interface';
import { ILobbyRoom } from '../interfaces/room.interface';
import { SessionStorageService, SESSION_KEY } from './session-storage.service';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  readonly room$ = new Subject<ILobbyRoom>();

  constructor(
    private readonly _sessionStorage: SessionStorageService,
  ) { }

  onRoomCreated(identity: IMinifiedIdentity): void {
    this._sessionStorage.setItem(SESSION_KEY.identity, JSON.stringify(identity));
    this.triggerRoomEvent(identity.room.name, ROOM_STATUS.created);
  }

  triggerRoomEvent(roomName: string, roomStatus: ROOM_STATUS): void {
    console.log('triggered');
    this.room$.next({ name: roomName, status: roomStatus });
  }
}
