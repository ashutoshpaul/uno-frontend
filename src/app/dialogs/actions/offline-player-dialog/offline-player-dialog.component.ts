import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';

interface DialogData {
  playerName: string;
}

@Component({
  selector: 'app-offline-player-dialog',
  templateUrl: './offline-player-dialog.component.html',
  styleUrls: ['./offline-player-dialog.component.scss']
})
export class OfflinePlayerDialogComponent implements OnInit {

  isPlayerBackOnline: boolean = false;
  playerBackOnline$: Observable<boolean>;

  playerName: string;
  rejoinMessage: string = 'Waiting to rejoin...';

  constructor(
    private readonly _dialogRef: MatDialogRef<OfflinePlayerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly _data: DialogData,
  ) { }

  ngOnInit(): void {
    this._dialogRef.disableClose = true;
    this.playerName = this._data.playerName;
    this.playerBackOnline$ = of(this.isPlayerBackOnline);
  }

  playerBackOnline(): void {
    this.isPlayerBackOnline = true;
    this.playerBackOnline$ = of(this.isPlayerBackOnline);
    setTimeout(() => {
      this._dialogRef.close();
    }, 1000);
  }

  removePlayer(): void {
    console.log('closed', this.isPlayerBackOnline);
    this._dialogRef.close();
  }

}
