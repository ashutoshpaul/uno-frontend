import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import * as screenfull from 'screenfull';
import { DURATION } from 'src/app/core/constants/durations.constants';
import { IOptionsResponse } from 'src/app/core/interfaces/dialog-response.interface';
import { ChatService } from 'src/app/core/services/chat.service';
import { RoomService } from 'src/app/core/services/room.service';
import { SessionStorageService, SESSION_KEY } from 'src/app/core/services/session-storage.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-options-dialog',
  templateUrl: './options-dialog.component.html',
  styleUrls: ['./options-dialog.component.scss']
})
export class OptionsDialogComponent implements OnInit, OnDestroy {

  isFullScreen: boolean = false;
  networkType: string;

  unseenChatCount$: Observable<string>;

  private readonly _subSink = new SubSink();

  constructor(
    private readonly _dialogRef: MatDialogRef<OptionsDialogComponent>,
    private readonly _chatService: ChatService,
    private readonly _sessionStorage: SessionStorageService,
    private readonly _roomService: RoomService,
  ) { }

  ngOnInit(): void {
    this.unseenChatCount$ = this._chatService.unseenChatCount$;
    if(screenfull.isEnabled) this.isFullScreen = screenfull['isFullscreen'] ?? false;
    this.networkType = (navigator as Navigator)['connection']['effectiveType'];

    // Close dialog when someone deletes the room and dialog is open at that time.
    this._subSink.add(
      this._roomService.roomDeleted$.subscribe(_ => this.close(true)),
    );
  }

  toggleFullScreen(): void {
    this.close();
    setTimeout(() => {
      this.isFullScreen = !this.isFullScreen;
      if(screenfull.isEnabled) screenfull.toggle();
    }, DURATION.delayOptionsDialog);
  }

  toggleChat(): void {
    this.close();
    setTimeout(() => {
      if(!this._chatService.isChatOpen) {
        this._chatService.resetUnseenChatCount();
      }
      this._chatService.toggleChat();
    }, DURATION.delayOptionsDialog);
  }

  close(isExitGame: boolean = false): void {
    if(isExitGame) this._sessionStorage.setItem(SESSION_KEY.isExit, true);
    this._dialogRef.close(<IOptionsResponse>{ isExit: isExitGame });
  }

  exit(): void {
    this.close(true);
  }

  ngOnDestroy(): void {
    this._subSink.unsubscribe();
  }

}
