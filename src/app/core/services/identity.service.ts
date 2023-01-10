import { Injectable } from '@angular/core';
import { IMinifiedIdentity } from '../interfaces/minified.interface';
import { SessionStorageService, SESSION_KEY } from './session-storage.service';

@Injectable({
  providedIn: 'root'
})
export class IdentityService {

  constructor(
    private readonly _sessionStorage: SessionStorageService,
  ) { }

  get identity(): IMinifiedIdentity {
    try {
      return JSON.parse(this._sessionStorage.getItem(SESSION_KEY.identity));
    } catch (err) {
      console.log('json.parse failed to parse identity');
      this._sessionStorage.remove(SESSION_KEY.identity);
      return null;
    }
  }

  get isHost(): boolean {
    return this.identity && this.identity.player.id == this.identity.room.createdBy.id;
  }
}
