import { AfterViewChecked, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IMessage } from 'src/app/core/interfaces/message.interface';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewChecked {
  
  @Input() message$: Observable<IMessage>;

  @ViewChild('messages') elRef: ElementRef;
  
  messages: IMessage[] = [];
  messages$: Observable<IMessage[]>;
  
  chat: string;

  constructor() { }

  ngOnInit(): void {
    this.message$.pipe(tap((message: IMessage) => {
      message.isSentByMe = message.name == 'Samuel' ? true : false ;
      return message;
    })).subscribe((message: IMessage) => {
      this.messages.push(message);
      this.messages$ = of(this.messages);
    });
  }

  ngAfterViewChecked(): void {
    // console.log('scrolled');
    this._scrollToBottom();
  }

  sendChat(): void {
    if (this.isChatValid) {
      console.log(this.trimmedChat);
      this._clearChat();
    }
  }

  get isChatValid(): boolean {
    return this.trimmedChat.length > 0;
  }

  get trimmedChat(): string {
    return this.chat?.trim() || '';
  }

  private _clearChat() {
    this.chat = '';
  }

  private _scrollToBottom() {
    this.elRef.nativeElement.scrollTop = this.elRef.nativeElement.scrollHeight;
  }

}
