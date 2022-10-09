import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VALID_COLOR_CODE } from 'src/app/core/enums/color-code.enum';
import { GAME_DIRECTIONS } from 'src/app/multi-player/multi-player.component';

interface DialogData {
  color: VALID_COLOR_CODE;
  direction: GAME_DIRECTIONS,
}

@Component({
  selector: 'app-reverse-dialog',
  templateUrl: './reverse-dialog.component.html',
  styleUrls: ['./reverse-dialog.component.scss']
})
export class ReverseDialogComponent implements OnInit {

  color: VALID_COLOR_CODE;
  isClockwise: boolean = true;

  constructor(
    private readonly _dialogRef: MatDialogRef<ReverseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly _data: DialogData,
  ) { }

  ngOnInit(): void {
    this._dialogRef.disableClose = true;
    this.color = this._data.color;
    this.isClockwise = this._data.direction == GAME_DIRECTIONS.clockwise;
  }

}
