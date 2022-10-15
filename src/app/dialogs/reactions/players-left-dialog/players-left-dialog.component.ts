import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-players-left-dialog',
  templateUrl: './players-left-dialog.component.html',
  styleUrls: ['./players-left-dialog.component.scss']
})
export class PlayersLeftDialogComponent implements OnInit {

  message: string = 'All players left';

  constructor(
    private readonly _dialogRef: MatDialogRef<PlayersLeftDialogComponent>,
  ) { }

  ngOnInit(): void {
    this._dialogRef.disableClose = true;
  }

  leaveRoom(): void {
    this._dialogRef.close();
  }

}
