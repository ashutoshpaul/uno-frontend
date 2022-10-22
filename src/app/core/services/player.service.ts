import { Injectable } from '@angular/core';
import { IUpdateSocketIdPayload } from '../interfaces/http.interface';
import { IMinifiedIdentity } from '../interfaces/minified.interface';
import { HttpService } from './http.service';
import { SessionStorageService, SESSION_KEY } from './session-storage.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(
    private readonly _sessionStorage: SessionStorageService,
    private readonly _httpService: HttpService,
  ) { }

  connection(): void {
    const identity: IMinifiedIdentity | null = JSON.parse(this._sessionStorage.getItem(SESSION_KEY.identity));
    const socketId: string = this._sessionStorage.getItem(SESSION_KEY.socketId);
    if(identity && socketId) {
      // update identity with current connection (socket.id)
      const payload: IUpdateSocketIdPayload = { socketId: socketId, identity: identity };
      this._httpService.updatePlayerSocketId(payload).subscribe(_ => console.log);
    }
  }

}
