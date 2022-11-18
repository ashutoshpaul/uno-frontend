import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationSnackbarComponent } from 'src/app/snackbars/notification-snackbar/notification-snackbar.component';
import { DURATION } from '../constants/durations.constants';
import { IRoomNotification } from '../interfaces/notification.interface';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(
    private readonly _snackBar: MatSnackBar,
  ) { }

  // lobby (room events)
  openSnackbar(snackbarEvent: IRoomNotification): void {
    this._snackBar.openFromComponent(NotificationSnackbarComponent, {
      panelClass: 'snackbar',
      duration: DURATION.snackbar,
      direction: 'ltr',
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      data: <IRoomNotification>{
        event: snackbarEvent.event,
        ...(snackbarEvent.additional && { additional: snackbarEvent.additional }),
      },
    });
  }
}
