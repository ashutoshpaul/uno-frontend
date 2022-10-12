import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, of, interval, timer } from 'rxjs';
import { take, concatMapTo } from 'rxjs/operators';
import { SubSink } from 'subsink';

interface DialogData {
  joinedPlayers: number;
  totalPlayers: number;
}

@Component({
  selector: 'app-join-players-dialog',
  templateUrl: './join-players-dialog.component.html',
  styleUrls: ['./join-players-dialog.component.scss']
})
export class JoinPlayersDialogComponent implements OnInit, OnDestroy {

  message: string = 'Waiting for players to join...';
  startMessage: string = 'Game starts in';

  joinedPlayers: number;
  totalPlayers: number;
  isStartGame: boolean = false;
  isStartGame$: Observable<boolean>;

  secondsCounter: number = 3;
  secondsCounter$: Observable<number>;

  private readonly _subSink = new SubSink();

  constructor(
    private readonly _dialogRef: MatDialogRef<JoinPlayersDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly _data: DialogData,
  ) { }

  ngOnInit(): void {
    this._dialogRef.disableClose = true;
    this.joinedPlayers = this._data.joinedPlayers;
    this.totalPlayers = this._data.totalPlayers;
  }

  startGameAlert(): void {
    this.isStartGame = true;
    this.isStartGame$ = of(this.isStartGame);

    const timer$ = timer(0);
    const interval$ = interval(1000).pipe(take(3));
    const timing$ = timer$.pipe(concatMapTo(interval$));

    this.secondsCounter$ = of(this.secondsCounter);
    this._subSink.add(
      timing$.subscribe(_ => {
        this.secondsCounter$ = of(--this.secondsCounter);
      })
    );

    setTimeout(() => {
      this._dialogRef.close();
    }, 3000);
  }

  ngOnDestroy(): void {
    this._subSink.unsubscribe();
  }

}
