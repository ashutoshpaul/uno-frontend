import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IMinifiedRoom } from 'src/app/core/interfaces/room-minified.interface';
import { CreateRoomDialogComponent } from '../create-room-dialog/create-room-dialog.component';

export interface JoinRoomDialogData {
  rooms?: IMinifiedRoom[];
  selectedRoom?: IMinifiedRoom;
}

@Component({
  selector: 'app-join-room-dialog',
  templateUrl: './join-room-dialog.component.html',
  styleUrls: ['./join-room-dialog.component.scss']
})
export class JoinRoomDialogComponent implements OnInit {

  roomControl: FormControl;

  constructor(
    private readonly _dialogRef: MatDialogRef<CreateRoomDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly _data: JoinRoomDialogData,
    private readonly _formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.roomControl = this._formBuilder.control('', Validators.required);
  }

  joinRoom(): void {
    if(!this.isInvalid) {
      console.log('create room');
      this.close();
    }
  }

  close(selectedRoom?: IMinifiedRoom): void {
    this._dialogRef.close(<JoinRoomDialogData>{ selectedRoom: selectedRoom });
  }

  get isInvalid(): boolean {
    return this.roomControl.invalid;
  }

  get isDirty(): boolean {
    return this.roomControl.dirty;
  }

  get errorMessage(): string {
    if (this.roomControl.hasError("required")) { return "Enter value"; }
    return null;
  }

}
