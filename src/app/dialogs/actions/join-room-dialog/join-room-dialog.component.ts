import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

interface DialogData {
  rooms: string[];
}

@Component({
  selector: 'app-join-room-dialog',
  templateUrl: './join-room-dialog.component.html',
  styleUrls: ['./join-room-dialog.component.scss']
})
export class JoinRoomDialogComponent implements OnInit {

  constructor(
    private readonly _dialogRef: MatDialogRef<JoinRoomDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly _data: DialogData,
  ) { }

  ngOnInit(): void {
  }

}
