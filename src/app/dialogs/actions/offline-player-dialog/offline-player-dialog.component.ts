import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

interface DialogData {
  playerName: string;
}

@Component({
  selector: 'app-offline-player-dialog',
  templateUrl: './offline-player-dialog.component.html',
  styleUrls: ['./offline-player-dialog.component.scss']
})
export class OfflinePlayerDialogComponent implements OnInit {

  playerName: string;

  constructor(
    private readonly _dialogRef: MatDialogRef<OfflinePlayerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly _data: DialogData,
  ) { }

  ngOnInit(): void {
    this.playerName = this._data.playerName;
  }

}
