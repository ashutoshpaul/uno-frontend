import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { SessionStorageService } from './session-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  readonly unseenChatCount$ = new BehaviorSubject<number>(0);

  readonly chat = new Subject<boolean>();

  constructor(
    private readonly _sessionStorage: SessionStorageService,
  ) { }

  removeChatStatus(): void {
    this._sessionStorage.remove('isChatOpen');
  }

  toggleChat(): void {
    let isChatOpen: boolean = this._sessionStorage.getItem('isChatOpen') === 'true' ?? false;
    isChatOpen = !isChatOpen;
    this._sessionStorage.setItem('isChatOpen', isChatOpen);
    return this.chat.next(isChatOpen);
  }

  resetUnseenChatCount(): void {
    this.unseenChatCount$.next(0);
  }

  incrementUnseenChatCount(): void {
    this.unseenChatCount$.next(this.unseenChatCount$.value + 1);
  }

  get isChatOpen(): boolean {
    return this._sessionStorage.getItem('isChatOpen') === 'true' ?? false;
  }
}
