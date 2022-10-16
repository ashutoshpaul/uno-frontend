import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IMessage } from 'src/app/core/interfaces/message.interface';
import { ChatService } from 'src/app/core/services/chat.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  isChatOpen$: Observable<boolean>;
  message$: Observable<IMessage>;

  constructor(
    private readonly _chatService: ChatService,
  ) { }

  ngOnInit(): void {
    this._chatService.removeChatStatus();
    this.isChatOpen$ = this._chatService.chat$;

    this.message$ = this._chatService.message$;
  }

}
