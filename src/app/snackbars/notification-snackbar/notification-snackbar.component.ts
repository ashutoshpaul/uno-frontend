import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { NOTIFICATION_EVENT } from 'src/app/core/enums/notification.enum';
import { IRoomNotification } from 'src/app/core/interfaces/notification.interface';

@Component({
  selector: 'app-notification-snackbar',
  templateUrl: './notification-snackbar.component.html',
  styleUrls: ['./notification-snackbar.component.scss']
})
export class NotificationSnackbarComponent implements OnInit {

  public readonly events: typeof NOTIFICATION_EVENT = NOTIFICATION_EVENT;

  constructor(
    private readonly _snackBarRef: MatSnackBarRef<NotificationSnackbarComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public readonly data: IRoomNotification,
  ) { }

  ngOnInit(): void {
  }

}
