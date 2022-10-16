import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { IMessage } from '../interfaces/message.interface';
import { SessionStorageService } from './session-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  readonly unseenChatCount$ = new BehaviorSubject<number>(0);

  readonly chat$ = new Subject<boolean>();

  readonly message$ = new Subject<IMessage>();

  constructor(
    private readonly _sessionStorage: SessionStorageService,
  ) {
    // setInterval(() => {
    //   this.emitMessage();
    // }, 3000);
  }

  removeChatStatus(): void {
    this._sessionStorage.remove('isChatOpen');
  }

  toggleChat(): void {
    let isChatOpen: boolean = this._sessionStorage.getItem('isChatOpen') === 'true' ?? false;
    isChatOpen = !isChatOpen;
    this._sessionStorage.setItem('isChatOpen', isChatOpen);
    return this.chat$.next(isChatOpen);
  }

  resetUnseenChatCount(): void {
    this.unseenChatCount$.next(0);
  }

  incrementUnseenChatCount(): void {
    this.unseenChatCount$.next(this.unseenChatCount$.value + 1);
  }

  emitMessage(): void {
    // this.message$.next({
    //   name: 'Harry',
    //   content: `Hello All...${Math.floor(Math.random() * 100)}`,
    //   time: '11:35AM',
    // });
    (Math.random() > 0.5) 
    ? this.message$.next({
      name: 'Harry',
      content: `Hello All...${Math.floor(Math.random() * 100)}`,
      time: '11:35AM',
    }) : this.message$.next({
      name: 'Samuel',
      content: `Hello From me...the one and only...${Math.floor(Math.random() * 100)}`,
      time: '11:35AM',
    });
  }

  get isChatOpen(): boolean {
    return this._sessionStorage.getItem('isChatOpen') === 'true' ?? false;
  }
}
