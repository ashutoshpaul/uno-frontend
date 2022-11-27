import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NOTIFICATION_EVENT } from '../enums/notification.enum';
import { IMinifiedIdentity } from '../interfaces/minified.interface';
import { IRoomNotification } from '../interfaces/notification.interface';
import { HttpService } from './http.service';
import { IdentityService } from './identity.service';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(
    private readonly _router: Router,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _httpService: HttpService,
    private readonly _identityService: IdentityService,
    private readonly _snackbarService: SnackbarService,
  ) { }

  startGame(): void {
    const identity: IMinifiedIdentity = this._identityService.identity;
    this._httpService.startGame(identity).subscribe({
      next: () => {
        this._router.navigate(['./../', 'play'], { relativeTo: this._activatedRoute });
      },
      error: () => this._snackbarService.openSnackbar(<IRoomNotification>{ event: NOTIFICATION_EVENT.drawFourCards }),
    });
  }
  
  joinGame(): void {}
}
