import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { SNACKBAR_EVENT } from 'src/app/core/enums/snackbar.enum';
import { ISnackbar } from 'src/app/core/interfaces/snackbar.interface';

@Component({
  selector: 'app-notification-snackbar',
  templateUrl: './notification-snackbar.component.html',
  styleUrls: ['./notification-snackbar.component.scss']
})
export class NotificationSnackbarComponent implements OnInit {

  public readonly events: typeof SNACKBAR_EVENT = SNACKBAR_EVENT;

  constructor(
    private readonly _snackBarRef: MatSnackBarRef<NotificationSnackbarComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public readonly data: ISnackbar,
  ) { }

  ngOnInit(): void {
  }

}
