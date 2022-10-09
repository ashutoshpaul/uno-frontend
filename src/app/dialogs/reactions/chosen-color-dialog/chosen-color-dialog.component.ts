import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AnimationEvent } from '@angular/animations';
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

  state: boolean;
  isPicked: boolean = false;
  isDialogStable: boolean = false;
  pickedColor: VALID_COLOR_CODE;

  readonly colors: typeof COLOR_CODE_ENUM = COLOR_CODE_ENUM

  constructor(
    private readonly _dialogRef: MatDialogRef<ChosenColorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly _data: DialogData,
  ) { }

  ngOnInit(): void {
    this._dialogRef.disableClose = true;
 
    // setTimeout(() => {
    //   this._dialogRef.close();
    // }, 3000);
  }

  colorPicked(): void {
    this.isPicked = !this.isPicked;
    this.pickedColor = COLOR_CODE_ENUM.red;
  }

  restartPromptingColors(event: AnimationEvent): void {
    if(event.toState == 'loaded') {
      this.isDialogStable = true;
    }
    this.state = !this.state;
  }

  isShrank(color: VALID_COLOR_CODE): boolean {
    return this.isPicked && color != this.pickedColor;
  }

  isExpanded(color: VALID_COLOR_CODE): boolean {
    return this.isPicked && color == this.pickedColor;
  }

}
