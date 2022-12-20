import { Injectable } from '@angular/core';
import { IDistributeCardsResponse, IUpdateSocketIdPayload } from '../interfaces/response.interface';
import { IMinifiedIdentity } from '../interfaces/minified.interface';
import { HttpService } from './http.service';
import { SessionStorageService, SESSION_KEY } from './session-storage.service';
import { IdentityService } from './identity.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  readonly isShuffleCardsEventTriggered$ = new Subject<boolean>();

  constructor(
    private readonly _identityService: IdentityService,
    private readonly _sessionStorage: SessionStorageService,
    private readonly _httpService: HttpService,
  ) { }

  connection(): void {
    const identity: IMinifiedIdentity = this._identityService.identity;
    const socketId: string = this._sessionStorage.getItem(SESSION_KEY.socketId);
    if(identity && socketId) {
      // update identity with current connection (socket.id)
      const payload: IUpdateSocketIdPayload = { socketId: socketId, identity: identity };
      this._httpService.updatePlayerSocketId(payload).subscribe(_ => {
        console.log('identity updated');
      });
    }
  }

  distributeCards(): void {
    console.log('distributeCards()');
    this._httpService.distributeCards(this._identityService.identity).subscribe(_ => {
      // DO NOT REMOVE .subscribe()
    });
  }

  toggleShuffleCardsEventTrigger(isTrigger: boolean = true): void {
    this.isShuffleCardsEventTriggered$.next(isTrigger);
  }

}
