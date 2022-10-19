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
  
  message: string;

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

  sendMessage(): void {
    if (this.isMessageValid) {
      console.log(this.message);
      this._clearMessage();
    }
  }

  get isMessageValid(): boolean {
    return this.message?.trim().length > 0;
  }

  private _clearMessage() {
    this.message = '';
  }

  private _scrollToBottom() {
    this.elRef.nativeElement.scrollTop = this.elRef.nativeElement.scrollHeight;
  }

}
