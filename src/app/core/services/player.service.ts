import { Injectable } from '@angular/core';
import { ROOM_STATUS } from '../enums/room-status.enum';
import { IUpdateSocketIdPayload } from '../interfaces/http.interface';
import { IMinifiedIdentity } from '../interfaces/minified.interface';
import { HttpService } from './http.service';
import { RoomService } from './room.service';
import { SessionStorageService, SESSION_KEY } from './session-storage.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(
    private readonly _sessionStorage: SessionStorageService,
    private readonly _httpService: HttpService,
    private readonly _roomService: RoomService,
  ) { }

  connection(): void {
    const identity: IMinifiedIdentity | null = JSON.parse(this._sessionStorage.getItem(SESSION_KEY.identity));
    const socketId: string = this._sessionStorage.getItem(SESSION_KEY.socketId);
    if(identity && socketId) {
      // update identity with current connection (socket.id)
      const payload: IUpdateSocketIdPayload = { socketId: socketId, identity: identity };
      this._httpService.updatePlayerSocketId(payload).subscribe(_ => {
        const isRoomCreatedByMe: boolean = identity.room.createdBy?.id == identity.player.id;
        this._roomService.triggerRoomEvent(
          identity.room.name, 
          (isRoomCreatedByMe) ?ROOM_STATUS.created : ROOM_STATUS.joined,
        );
      });
    }
  }

}