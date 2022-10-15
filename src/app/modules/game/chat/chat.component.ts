import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  message: string;

  constructor() { }

  ngOnInit(): void {
  }

  sendMessage(): void {
    console.log(this.message);
    this._clearMessage();
  }

  private _clearMessage() {
    this.message = '';
  }

}
