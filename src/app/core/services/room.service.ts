import { Injectable } from '@angular/core';
import { IMinifiedIdentity } from '../interfaces/minified.interface';
import { SessionStorageService, SESSION_KEY } from './session-storage.service';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(
    private readonly _sessionStorage: SessionStorageService,
  ) { }

  onRoomCreated(identity: IMinifiedIdentity): void {
    this._sessionStorage.setItem(SESSION_KEY.identity, JSON.stringify(identity));
  }
}
