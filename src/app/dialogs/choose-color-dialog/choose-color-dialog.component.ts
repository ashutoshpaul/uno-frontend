import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

enum COLORS {
  blue = 'blue',
  green = 'green',
  red = 'red',
  yellow = 'yellow',
}

@Component({
  selector: 'app-choose-color-dialog',
  templateUrl: './choose-color-dialog.component.html',
  styleUrls: ['./choose-color-dialog.component.scss']
})
export class ChooseColorDialogComponent implements OnInit {

  colors: typeof COLORS = COLORS;

  constructor(
    private readonly _dialogRef: MatDialogRef<ChooseColorDialogComponent>,
  ) { }

  ngOnInit(): void {
    this._dialogRef.disableClose = true;
  }

  pick(color: COLORS): void {
    this._dialogRef.close(color);
  }

}
