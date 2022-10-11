import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import * as screenfull from 'screenfull';
import { IOptions } from 'src/app/multi-player/multi-player.component';

@Component({
  selector: 'app-options-dialog',
  templateUrl: './options-dialog.component.html',
  styleUrls: ['./options-dialog.component.scss']
})
export class OptionsDialogComponent implements OnInit {

  isFullScreen = false;

  constructor(
    private readonly _dialogRef: MatDialogRef<OptionsDialogComponent>,
  ) { }

  ngOnInit(): void {
    if(screenfull.isEnabled) this.isFullScreen = screenfull['isFullscreen'] ?? false;
  }

  toggleFullScreen(): void {
    this.close();
    setTimeout(() => {
      this.isFullScreen = !this.isFullScreen;
      if(screenfull.isEnabled) screenfull.toggle();
    }, 500);
  }

  close(options?: IOptions): void {
    this._dialogRef.close(options);
  }

  exit(): void {
    this._dialogRef.close();
  }

}
