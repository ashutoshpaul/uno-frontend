import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PLAYER_POSITION } from 'src/app/multi-player/multi-player.component';

interface DialogData {
  position: PLAYER_POSITION;
}

@Component({
  selector: 'app-skip-dialog',
  templateUrl: './skip-dialog.component.html',
  styleUrls: ['./skip-dialog.component.scss']
})
export class SkipDialogComponent implements OnInit {

  constructor(
    private readonly _dialogRef: MatDialogRef<SkipDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly _data: DialogData,
  ) { }

  ngOnInit(): void {
    this._dialogRef.disableClose = true;
  }

}
