import { Injectable } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NgDialogAnimationService } from 'ng-dialog-animation';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { JoinPlayersDialogComponent } from 'src/app/dialogs/reactions/join-players-dialog/join-players-dialog.component';
import { optionsDialogIncomingOptionsConstant, optionsDialogOutgoingOptionsConstant } from '../constants/animations.constants';
import { NOTIFICATION_EVENT } from '../enums/notification.enum';
import { IMappedGame } from '../interfaces/game.interface';
import { IMinifiedIdentity } from '../interfaces/minified.interface';
import { IRoomNotification } from '../interfaces/notification.interface';
import { IJoinedPlayersResponse } from '../interfaces/response.interface';
import { HttpService } from './http.service';
import { IdentityService } from './identity.service';
import { PlayerService } from './player.service';
import { SessionStorageService, SESSION_KEY } from './session-storage.service';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  joinPlayersDialogRef: MatDialogRef<JoinPlayersDialogComponent>;

  private readonly _playerJoinedSubject$ = new Subject<IJoinedPlayersResponse>();
  readonly playerJoined$: Observable<IJoinedPlayersResponse> = this._playerJoinedSubject$.asObservable();

  /**
   * * Created to handle an exception case.
   * * Handles page refreshed by host when countdown (3..2..1..) has started BUT not finished.
   * * (Used in uno-board-component along with isSocketConnectedToServer$)
   * 
   * * Emits:
   *   1. true  - when join-players-dialog is opened.
   *   2. false - when join-players-dialog was closed.
   *   3. null  - player refreshed the screen when countdown was happening and had not finished (default).
   *           join-players-dialog was neither opened nor closed.
   */
  private readonly _isCountDownStartedSubject$ = new BehaviorSubject<boolean>(null);
  readonly isCountDownStarted$: Observable<boolean> = this._isCountDownStartedSubject$.asObservable();

  constructor(
    private readonly _router: Router,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _httpService: HttpService,
    private readonly _dialog: NgDialogAnimationService,
    private readonly _identityService: IdentityService,
    private readonly _snackbarService: SnackbarService,
    private readonly _sessionStorage: SessionStorageService,
    private readonly _playerService: PlayerService,
  ) { }

  startGame(): void {
    const identity: IMinifiedIdentity = this._identityService.identity;
    this._httpService.startGame(identity).subscribe({
      next: () => this._startAndJoinGame(),
      error: () => this._snackbarService.openSnackbar(<IRoomNotification>{ event: NOTIFICATION_EVENT.failed }),
    });
  }
  
  joinGame(): void {
    const identity: IMinifiedIdentity = this._identityService.identity;
    this._httpService.joinGame(identity).subscribe({
      next: () => this._startAndJoinGame(),
      error: () => this._snackbarService.openSnackbar(<IRoomNotification>{ event: NOTIFICATION_EVENT.failed }),
    });
  }

  /**
   * Triggered whenever any player sharing the same room joins the game.
   * 
   * @param data IJoinedPlayersResponse
   */
  triggerPlayerJoinedEvent(data: IJoinedPlayersResponse): void {
    this._playerJoinedSubject$.next(data);
  }

  /**
   * Manually open JoinPlayersDialogComponent.
   * Use case: When game has started and user refreshes the page.
   * Incase 'hasAllPlayersJoined' is false, then to display JoinPlayersDialogComponent.
   * 
   * After all players have joined and dialog is closed then send 'distribute' request if the player is Host.
   */
  openJoinedPlayersPopup(): void {
    this._httpService.joinedPlayersCount(this._identityService.identity.room.id).subscribe({
      next: (data: IJoinedPlayersResponse) => {
        this._emitIsCountDownStarted();
        this.joinPlayersDialogRef = this._dialog.open(JoinPlayersDialogComponent, {
          animation: {
            to: "top",
            incomingOptions: optionsDialogIncomingOptionsConstant,
            outgoingOptions: optionsDialogOutgoingOptionsConstant,
          },
          panelClass: 'join-players-dialog',
          position: { bottom: "0rem" },
          data: {
            joinedPlayers: data.joinedPlayersCount,
            totalPlayers: data.totalPlayersCount,
          },
        });
        this.joinPlayersDialogRef.afterClosed().subscribe(_ => {
          this._emitIsCountDownStarted(false);
          this._identityService.isHost && this._playerService.distributeCards();
        });
      },
      error: () => this._snackbarService.openSnackbar(<IRoomNotification>{ event: NOTIFICATION_EVENT.failed }),
    });
  }

  /**
   * Usecase: When countdown (3..2..1..) has started BUT not finished and in between the player went offline.
   * At that time when offline-dialog pops up then JoinPlayersDialogComponent should close. 
   */
  closeJoinedPlayersPopup(): void {
    this.joinPlayersDialogRef?.close();
  }

  getGameState(): Observable<IMappedGame> {
    const identity: IMinifiedIdentity = this._identityService.identity;
    return this._httpService.getGameState(identity.room.id, identity.player.id);
  }

  private _startAndJoinGame(): void {
    this._router.navigate(['./../', 'play'], { relativeTo: this._activatedRoute });
    this._sessionStorage.setItem(SESSION_KEY.hasAllPlayersJoined, false);

    this.openJoinedPlayersPopup();
  }

  private _emitIsCountDownStarted(isCountDownStarted: boolean = true): void {
    this._isCountDownStartedSubject$.next(isCountDownStarted);
  }
}
