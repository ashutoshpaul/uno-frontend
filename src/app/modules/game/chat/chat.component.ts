import { Component, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IMessage } from 'src/app/core/interfaces/message.interface';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  
  @Input() message$: Observable<IMessage>;
  
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

  sendMessage(): void {
    console.log(this.message);
    this._clearMessage();
  }

  private _clearMessage() {
    this.message = '';
  }

}
