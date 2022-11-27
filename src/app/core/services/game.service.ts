import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgDialogAnimationService } from 'ng-dialog-animation';
import { Observable, Subject } from 'rxjs';
import { JoinPlayersDialogComponent } from 'src/app/dialogs/reactions/join-players-dialog/join-players-dialog.component';
import { optionsDialogIncomingOptionsConstant, optionsDialogOutgoingOptionsConstant } from '../constants/animations.constants';
import { NOTIFICATION_EVENT } from '../enums/notification.enum';
import { IMinifiedIdentity } from '../interfaces/minified.interface';
import { IRoomNotification } from '../interfaces/notification.interface';
import { IJoinedPlayersResponse } from '../interfaces/response.interface';
import { HttpService } from './http.service';
import { IdentityService } from './identity.service';
import { SessionStorageService, SESSION_KEY } from './session-storage.service';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private readonly _playerJoinedSubject$ = new Subject<IJoinedPlayersResponse>();
  readonly playerJoined$: Observable<any> = this._playerJoinedSubject$.asObservable();

  constructor(
    private readonly _router: Router,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _httpService: HttpService,
    private readonly _dialog: NgDialogAnimationService,
    private readonly _identityService: IdentityService,
    private readonly _snackbarService: SnackbarService,
    private readonly _sessionStorage: SessionStorageService,
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
   */
  openJoinedPlayersPopup(): void {
    this._httpService.joinedPlayersCount(this._identityService.identity.room.id).subscribe({
      next: (data: IJoinedPlayersResponse) => {
        this._dialog.open(JoinPlayersDialogComponent, {
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
      },
      error: () => this._snackbarService.openSnackbar(<IRoomNotification>{ event: NOTIFICATION_EVENT.failed }),
    });
  }

  private _startAndJoinGame(): void {
    this._router.navigate(['./../', 'play'], { relativeTo: this._activatedRoute });
    this._sessionStorage.setItem(SESSION_KEY.hasAllPlayersJoined, false);

    this.openJoinedPlayersPopup();
  }
}
