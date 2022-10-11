import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-offline-dialog',
  templateUrl: './offline-dialog.component.html',
  styleUrls: ['./offline-dialog.component.scss']
})
export class OfflineDialogComponent implements OnInit {

  message: string = "Oops! You went offline.";

  constructor(
    private readonly _dialogRef: MatDialogRef<OfflineDialogComponent>,
  ) { }

  ngOnInit(): void {
    this._dialogRef.disableClose = true;
  }

  refresh(): void {
    this._dialogRef.close();
    location.reload();
  }

}
