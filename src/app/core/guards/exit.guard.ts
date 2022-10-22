import { Injectable } from '@angular/core';
import { ActivatedRoute, CanDeactivate, Router } from '@angular/router';
import { NgDialogAnimationService } from 'ng-dialog-animation';
import { Observable, of } from 'rxjs';
import { OptionsDialogComponent } from 'src/app/dialogs/actions/options-dialog/options-dialog.component';
import { optionsDialogIncomingOptionsConstant, optionsDialogOutgoingOptionsConstant } from '../constants/animations.constants';
import { DURATION } from '../constants/durations.constants';
import { IOptionsResponse } from '../interfaces/response.interface';
import { SessionStorageService, SESSION_KEY } from '../services/session-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ExitGuard implements CanDeactivate<OptionsDialogComponent> {

  constructor(
    private readonly _router: Router,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _dialog: NgDialogAnimationService,
    private readonly _sessionStorage: SessionStorageService,
  ) {}

  canDeactivate() : Observable<boolean> {
    const isExit: boolean = this._sessionStorage.getItem(SESSION_KEY.isExit) == 'true' ?? false;
    this._sessionStorage.remove(SESSION_KEY.isExit); // clear session

    if(isExit) {
      return of(true);
    } else {
      const dialogRef = this._dialog.open(OptionsDialogComponent, {
        animation: {
          to: "top",
          incomingOptions: optionsDialogIncomingOptionsConstant,
          outgoingOptions: optionsDialogOutgoingOptionsConstant,
        },
        panelClass: 'options-dialog',
        position: { bottom: "0rem", right: "1.5vw" }
      });

      dialogRef.afterClosed().subscribe((response: IOptionsResponse) => {
        if(response?.isExit) {
          setTimeout(() => {
            this._router.navigate(['./../', 'lobby'], { relativeTo: this._activatedRoute });
          }, DURATION.delayOptionsDialog);
        }
        return false;
      });
    }
  }

}
