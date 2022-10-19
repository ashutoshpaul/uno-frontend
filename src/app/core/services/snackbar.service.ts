import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationSnackbarComponent } from 'src/app/snackbars/notification-snackbar/notification-snackbar.component';
import { DURATION } from '../constants/durations.constants';
import { SNACKBAR_EVENT } from '../enums/snackbar.enum';
import { ISnackbar } from '../interfaces/snackbar.interface';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(
    private readonly _snackBar: MatSnackBar,
  ) { }

  openSnackbar(snackbarEvent: SNACKBAR_EVENT, isInsideGame : boolean = true): void {
    this._snackBar.openFromComponent(NotificationSnackbarComponent, {
      panelClass: 'snackbar',
      duration: DURATION.snackbar,
      direction: 'ltr',
      horizontalPosition: (isInsideGame) ? 'right' : 'center',
      verticalPosition: (isInsideGame) ? 'top' : 'bottom',
      data: <ISnackbar>{
        event: snackbarEvent,
      },
    });
  }
}
