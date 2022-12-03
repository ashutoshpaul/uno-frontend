import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { IMessage } from '../interfaces/message.interface';
import { IMinifiedIdentity } from '../interfaces/minified.interface';
import { HttpService } from './http.service';
import { IdentityService } from './identity.service';
import { SessionStorageService, SESSION_KEY } from './session-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  readonly unseenChatCount$ = new BehaviorSubject<string>("0");
  readonly ischatOpened$ = new Subject<boolean>();
  readonly message$ = new Subject<IMessage>();
  readonly isMessageNotificationTriggered$ = new BehaviorSubject<boolean>(false);


  constructor(
    private readonly _httpService: HttpService,
    private readonly _identityService: IdentityService,
    private readonly _sessionStorage: SessionStorageService,
  ) {
    // setInterval(() => {
    //   this.emitMessage();
    //   console.log('emitted');
    // }, 2000);
  }

  getMessages(): Observable<IMessage[]> {
    const identity: IMinifiedIdentity = this._identityService.identity; 
    return this._httpService.getMessages(identity.room.id).pipe(switchMap(messages => [
      messages.map(message => {
        message.isSentByMe = message.author.id == identity.player.id;
        return message;
      }),
    ]));
  }

  removeChatStatus(): void {
    this._sessionStorage.remove(SESSION_KEY.isChatOpen);
  }

  toggleChat(): void {
    let isChatOpen: boolean = this._sessionStorage.getItem(SESSION_KEY.isChatOpen) === 'true' ?? false;
    isChatOpen = !isChatOpen;
    this._sessionStorage.setItem(SESSION_KEY.isChatOpen, isChatOpen);
    return this.ischatOpened$.next(isChatOpen);
  }

  resetUnseenChatCount(): void {
    this.unseenChatCount$.next("0");
  }

  postMessage(chat: string): void {
    const identity: IMinifiedIdentity = this._identityService.identity;
    const message: IMessage = {
      author: {
        id: identity.player.id,
        name: identity.player.name,
      },
      content: chat,
      time: new Date().toString(),
    };

    // message of the sender will be displayed once it has been broadcasted to all listerns (players)
    this._httpService.postMessage(identity.room.id, message).subscribe((message: IMessage) => {
      console.log('message sent');
      this.emitMessage(message);
    });
  }

  emitMessage(message: IMessage): void {
    message.isSentByMe = message.author.id == this._identityService.identity.player.id;
    this.message$.next(message);

    if (!message.isSentByMe && !this.isChatOpen) {
      this.toggleMessageNotificationTrigger();
      this._incrementUnseenChatCount();
    }
    // (Math.random() > 0.5) 
    // ? this.message$.next({
      //   author: { name: 'Harry', id: '101' },
      //   isSentByMe: false,
      //   content: `Hello All...${Math.floor(Math.random() * 100)}`,
      //   time: '11:35AM',
      // }) : this.message$.next({
        //   author: { name: 'Samuel', id: '102' },
        //   isSentByMe: true,
        //   content: `Hello From me...the one and only...${Math.floor(Math.random() * 100)}`,
    //   time: '11:35AM',
    // });
  }
  
  toggleMessageNotificationTrigger(isTrigger: boolean = true): void {
    this.isMessageNotificationTriggered$.next(isTrigger);
  }

  get isChatOpen(): boolean {
    return this._sessionStorage.getItem(SESSION_KEY.isChatOpen) === 'true' ?? false;
  }

  private _incrementUnseenChatCount(): void {
    if (this._isNumber(this.unseenChatCount$.value) && +this.unseenChatCount$.value < 9) {
      this.unseenChatCount$.next(+this.unseenChatCount$.value + 1 + "");
    } else {
      this.unseenChatCount$.next("9+");
    }
  }

  private _isNumber(value: string): boolean {
    return !isNaN(parseInt(value)) && isFinite(+value);
  }
}
