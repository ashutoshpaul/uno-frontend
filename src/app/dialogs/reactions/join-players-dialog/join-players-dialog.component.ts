import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, of, interval, timer } from 'rxjs';
import { take, concatMapTo } from 'rxjs/operators';
import { IJoinedPlayersResponse } from 'src/app/core/interfaces/response.interface';
import { GameService } from 'src/app/core/services/game.service';
import { RoomService } from 'src/app/core/services/room.service';
import { SessionStorageService, SESSION_KEY } from 'src/app/core/services/session-storage.service';
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
    private readonly _gameService: GameService,
    private readonly _roomService: RoomService,
    private readonly _sessionStorage: SessionStorageService,
  ) { }

  ngOnInit(): void {
    this._dialogRef.disableClose = true;
    this.joinedPlayers = this._data.joinedPlayers;
    this.totalPlayers = this._data.totalPlayers;

    if (this._data.joinedPlayers == this._data.totalPlayers) {
      this._sessionStorage.setItem(SESSION_KEY.hasAllPlayersJoined, true);
      this._startGameAlert();
    }

    this._subSink.add(
      this._gameService.playerJoined$.subscribe((data: IJoinedPlayersResponse) => {
        this.joinedPlayers = data.joinedPlayersCount;
        this.totalPlayers = data.totalPlayersCount;
        
        if (data.joinedPlayersCount == data.totalPlayersCount) {
          this._sessionStorage.setItem(SESSION_KEY.hasAllPlayersJoined, true);
          this._startGameAlert();
        }
      }),
    );

    this._subSink.add(
      this._roomService.roomDeleted$.subscribe(_ => this.close()),
    );
  }

  private _startGameAlert(): void {
    this.isStartGame = true;
    this.isStartGame$ = of(this.isStartGame);

    const timer$ = timer(0);
    const interval$ = interval(1000).pipe(take(3));
    const timing$ = timer$.pipe(concatMapTo(interval$));

    this.secondsCounter$ = of(this.secondsCounter);
    this._subSink.add(
      timing$.subscribe(_ => {
        this.secondsCounter$ = of(--this.secondsCounter);

        if (this.secondsCounter == 0) this.close();
      })
    );
  }

  close(): void {
    this._dialogRef?.close();
  }

  ngOnDestroy(): void {
    this._subSink.unsubscribe();
  }

}
