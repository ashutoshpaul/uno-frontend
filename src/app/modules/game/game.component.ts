import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IMessage } from 'src/app/core/interfaces/message.interface';
import { ChatService } from 'src/app/core/services/chat.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnDestroy {

  isChatOpen$: Observable<boolean>;

  messages$: Observable<IMessage[]>;
  
  private _messages: IMessage[] = [];
  private readonly _subSink = new SubSink();

  constructor(
    private readonly _chatService: ChatService,
  ) { }

  ngOnInit(): void {
    this._chatService.removeChatStatus();
    this.isChatOpen$ = this._chatService.ischatOpened$;

    this._subSink.add(
      this._chatService.getMessages().subscribe((messages: IMessage[]) => {
        this._messages = messages;
        this.messages$ = of(this._messages);
      })
    );
    
    this._subSink.add(
      this._chatService.message$.subscribe((message: IMessage) => {
        this._messages.push(message);
        this.messages$ = of(this._messages);
      })
    );
  }

  ngOnDestroy(): void {
    this._subSink.unsubscribe();
  }

}
