import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ChatService } from 'src/app/core/services/chat.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  isChatOpen$: Observable<boolean>;

  constructor(
    private readonly _chatService: ChatService,
  ) { }

  ngOnInit(): void {
    this.isChatOpen$ = this._chatService._chat;
  }

}
