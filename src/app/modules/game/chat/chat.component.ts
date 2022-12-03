import { AfterViewChecked, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { IMessage } from 'src/app/core/interfaces/message.interface';
import { ChatService } from 'src/app/core/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements AfterViewChecked {
  
  @Input() messages$: Observable<IMessage[]>;

  @ViewChild('messages') elRef: ElementRef;
  
  chat: string;

  constructor(
    private readonly _chatService: ChatService,
  ) { }

  ngAfterViewChecked(): void {
    this._scrollToBottom();
  }

  sendChat(): void {
    if (this.isChatValid) {
      this._chatService.postMessage(this.trimmedChat);
      this._clearChat();
    }
  }

  get isChatValid(): boolean {
    return this.trimmedChat.length > 0;
  }

  get trimmedChat(): string {
    return this.chat?.trim() || '';
  }

  private _clearChat(): void {
    this.chat = '';
  }

  private _scrollToBottom(): void {
    this.elRef.nativeElement.scrollTop = this.elRef.nativeElement.scrollHeight;
  }

}
