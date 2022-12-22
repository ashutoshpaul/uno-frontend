import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AnimationEvent } from '@angular/animations';
import { chosenColorAlertTrigger } from 'src/app/core/animations/button.animation';
import { COLOR_CODE, ValidColorCodeType } from 'src/app/core/enums/websocket-enums/card-enums/card-colors.enum';

export interface DialogData {
  chosenColor: ValidColorCodeType;
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
  pickedColor: ValidColorCodeType;

  readonly colors: typeof COLOR_CODE = COLOR_CODE;

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
    this.pickedColor = COLOR_CODE.red;
  }

  restartPromptingColors(event: AnimationEvent): void {
    if(event.toState == 'loaded') {
      this.isDialogStable = true;
    }
    this.state = !this.state;
  }

  isShrank(color: ValidColorCodeType): boolean {
    return this.isPicked && color != this.pickedColor;
  }

  isExpanded(color: ValidColorCodeType): boolean {
    return this.isPicked && color == this.pickedColor;
  }

}
