import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import * as screenfull from 'screenfull';
import { ChatService } from 'src/app/core/services/chat.service';
import { IOptions } from 'src/app/multi-player/multi-player.component';

@Component({
  selector: 'app-options-dialog',
  templateUrl: './options-dialog.component.html',
  styleUrls: ['./options-dialog.component.scss']
})
export class OptionsDialogComponent implements OnInit {

  isFullScreen: boolean = false;
  networkType: string;

  readonly DELAY: number = 500;

  constructor(
    private readonly _dialogRef: MatDialogRef<OptionsDialogComponent>,
    private readonly _chatService: ChatService,
  ) { }

  ngOnInit(): void {
    if(screenfull.isEnabled) this.isFullScreen = screenfull['isFullscreen'] ?? false;
    this.networkType = (navigator as Navigator)['connection']['effectiveType'];
  }

  toggleFullScreen(): void {
    this.close();
    setTimeout(() => {
      this.isFullScreen = !this.isFullScreen;
      if(screenfull.isEnabled) screenfull.toggle();
    }, this.DELAY);
  }

  toggleChat(): void {
    this.close();
    setTimeout(() => {
      this._chatService.toggleChat();
    }, this.DELAY);
  }

  close(options?: IOptions): void {
    this._dialogRef.close(options);
  }

  exit(): void {
    this._dialogRef.close();
  }

}
