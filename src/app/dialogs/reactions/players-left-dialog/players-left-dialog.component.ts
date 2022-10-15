import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-players-left-dialog',
  templateUrl: './players-left-dialog.component.html',
  styleUrls: ['./players-left-dialog.component.scss']
})
export class PlayersLeftDialogComponent implements OnInit {

  isNoPlayers: boolean = true;
  message: string = 'All players left';
  playerName: string = 'Samuel';

  isNoPlayers$: Observable<boolean>;

  constructor(
    private readonly _dialogRef: MatDialogRef<PlayersLeftDialogComponent>,
  ) { }

  ngOnInit(): void {
    this._dialogRef.disableClose = true;
    this.isNoPlayers$ = of(this.isNoPlayers);
  }

  leaveRoom(): void {
    this._dialogRef.close();
  }

  playerBackOnline(): void {
    this.isNoPlayers = false;
    this.isNoPlayers$ = of(this.isNoPlayers);
    setTimeout(() => {
      this._dialogRef.close();
    }, 1000);
  }

}
