import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { COLOR_CODE_ENUM, VALID_COLOR_CODE } from 'src/app/core/enums/color-code.enum';
import { chosenColorAlertTrigger } from 'src/app/dashboard-animations.animation';

export interface DialogData {
  chosenColor: VALID_COLOR_CODE;
}

@Component({
  selector: 'app-chosen-color-dialog',
  templateUrl: './chosen-color-dialog.component.html',
  styleUrls: ['./chosen-color-dialog.component.scss'],
  animations: [chosenColorAlertTrigger],
})
export class ChosenColorDialogComponent implements OnInit {

  sectionCount: number = 0;
  state: boolean;

  constructor(
    private readonly _dialogRef: MatDialogRef<ChosenColorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly _data: DialogData,
  ) { }

  ngOnInit(): void {
    this._dialogRef.disableClose = true;
    this.sectionCount = this.getSectionCount(this._data.chosenColor);
    console.log(this.sectionCount);

    // setTimeout(() => {
    //   this._dialogRef.close();
    // }, 3000);
  }

  getSectionCount(color: VALID_COLOR_CODE): number {
    switch(color) {
      case COLOR_CODE_ENUM.blue:
        return 1;
      case COLOR_CODE_ENUM.green:
        return 2;
      case COLOR_CODE_ENUM.red:
        return 3;
      case COLOR_CODE_ENUM.yellow:
        return 4;
    }
  }

  colorPicked(): void {
    this.state = true;
  }

  restartPromptingColors(): void {
    this.state = !this.state;
  }

}
