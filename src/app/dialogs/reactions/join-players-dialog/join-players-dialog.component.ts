import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

interface DialogData {
  joinedPlayers: number;
  totalPlayers: number;
}

@Component({
  selector: 'app-join-players-dialog',
  templateUrl: './join-players-dialog.component.html',
  styleUrls: ['./join-players-dialog.component.scss']
})
export class JoinPlayersDialogComponent implements OnInit {

  message: string = 'Waiting for players to join...';
  joinedPlayers: number;
  totalPlayers: number;

  constructor(
    private readonly _dialogRef: MatDialogRef<JoinPlayersDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly _data: DialogData,
  ) { }

  ngOnInit(): void {
    this.joinedPlayers = this._data.joinedPlayers;
    this.totalPlayers = this._data.totalPlayers;
  }

}
