import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

export interface CreateRoomDialogData {
  isCreateRoom: boolean;
  roomName: string;
}

@Component({
  selector: 'app-create-room-dialog',
  templateUrl: './create-room-dialog.component.html',
  styleUrls: ['./create-room-dialog.component.scss']
})
export class CreateRoomDialogComponent implements OnInit {

  roomNameControl: FormControl;

  constructor(
    private readonly _dialogRef: MatDialogRef<CreateRoomDialogComponent>,
    private readonly _formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.roomNameControl = this._formBuilder.control('', [
      Validators.required, 
      Validators.minLength(5),
      Validators.maxLength(15),
      Validators.pattern('[a-zA-Z0-9]+'), // only letters and digits allowed
    ]);
  }

  createRoom(): void {
    if(!this.isInvalid) {
      this.close(true);
    }
  }

  close(isCreateRoom: boolean = false): void {
    this._dialogRef.close(<CreateRoomDialogData>{ 
      isCreateRoom: isCreateRoom,
      roomName: this.roomNameControl.value.toString(),
    });
  }

  get isInvalid(): boolean {
    return this.roomNameControl.invalid;
  }

  get isDirty(): boolean {
    return this.roomNameControl.dirty;
  }

  get errorMessage(): string {
    if (this.roomNameControl.hasError("required")) { return "Enter value"; }
    if (this.roomNameControl.hasError("minlength")) { return "Should be more than 4 letters"; }
    if (this.roomNameControl.hasError("maxlength")) { return "Should be less than 16 letter"; }
    if (this.roomNameControl.hasError("pattern")) { return "Only letter and digits allowed"; }
    return null;
  }

}
