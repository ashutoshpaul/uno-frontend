import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DIRECTION } from 'src/app/core/enums/direction.enum';
import { ValidColorCodeType } from 'src/app/core/enums/websocket-enums/card-enums/card-colors.enum';

interface DialogData {
  color: ValidColorCodeType;
  direction: DIRECTION;
}

@Component({
  selector: 'app-reverse-dialog',
  templateUrl: './reverse-dialog.component.html',
  styleUrls: ['./reverse-dialog.component.scss']
})
export class ReverseDialogComponent implements OnInit {

  color: ValidColorCodeType;
  isClockwise: boolean = true;

  constructor(
    private readonly _dialogRef: MatDialogRef<ReverseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly _data: DialogData,
  ) { }

  ngOnInit(): void {
    this._dialogRef.disableClose = true;
    this.color = this._data.color;
    this.isClockwise = this._data.direction == DIRECTION.clockwise;
  }

}
