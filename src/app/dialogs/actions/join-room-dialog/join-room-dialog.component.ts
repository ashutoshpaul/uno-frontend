import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { IMinifiedRoom } from 'src/app/core/interfaces/minified.interface';
import { selectFromAvailableRoom } from 'src/app/core/validators/select-from-available-room.validator';
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

  rooms: IMinifiedRoom[] = [];
  filteredRooms$: Observable<IMinifiedRoom[]>;

  constructor(
    private readonly _dialogRef: MatDialogRef<CreateRoomDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly _data: JoinRoomDialogData,
    private readonly _formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.rooms = this._data.rooms;
    this.roomControl = this._formBuilder.control('', [
      Validators.required,
      selectFromAvailableRoom(this.rooms.map(room => room.name)),
    ]);

    this.filteredRooms$ = this.roomControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.rooms.slice();
      }),
    );
  }

  joinRoom(): void {
    if(!this.isInvalid) {
      console.log('create room');
      this.close();
    }
  }

  select(room: IMinifiedRoom): void {
    this.roomControl.setValue(room.name);
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
    if (this.roomControl.hasError("isNotAnAvailableRoom")) { return "Select a room"; }
    return null;
  }

  private _filter(name: string): IMinifiedRoom[] {
    const filterValue = name.toLowerCase();
    return this.rooms.filter(room => room.name.toLowerCase().includes(filterValue));
  }

}
