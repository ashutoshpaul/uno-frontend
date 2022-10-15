import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SessionStorageService } from './session-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  readonly _chat = new Subject<boolean>();

  constructor(
    private readonly _sessionStorage: SessionStorageService,
  ) { }

  toggleChat(): void {
    let isChatOpen: boolean = this._sessionStorage.getItem('isChatOpen') === 'true' ?? false;
    isChatOpen = !isChatOpen;
    this._sessionStorage.setItem('isChatOpen', isChatOpen);
    return this._chat.next(isChatOpen);
  }
}
