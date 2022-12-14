import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { IMinifiedRoom } from 'src/app/core/interfaces/minified.interface';
import { selectFromAvailableRoom, unavailableRoom } from 'src/app/core/validators/room.validator';
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
  selectedRoom: IMinifiedRoom;

  filteredRooms$: Observable<IMinifiedRoom[]>;

  constructor(
    private readonly _dialogRef: MatDialogRef<CreateRoomDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly _data: JoinRoomDialogData,
    private readonly _formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.rooms = this._data.rooms;

    const availableRoomNames: string[] = this.rooms.filter(room => room.isAvailable).map(room => room.name);
    const unavailableRoomNames: string[] = this.rooms.filter(room => !room.isAvailable).map(room => room.name);

    this.roomControl = this._formBuilder.control('', [
      Validators.required,
      selectFromAvailableRoom(availableRoomNames),
      unavailableRoom(unavailableRoomNames),
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
    if (!this.selectedRoom) {
      this.selectedRoom = this.rooms.find(room => room.name == this.roomControl.value);
    }
    if(!this.isInvalid) {
      this.close(this.selectedRoom);
    }
  }

  select(room: IMinifiedRoom): void {
    this.roomControl.setValue(room.name);
    this.selectedRoom = room;
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
    if (this.roomControl.hasError("isRoomUnavailable")) { return "Room unavailable"; }
    if (this.roomControl.hasError("isNotValidRoom")) { return "Select a room"; }
    return null;
  }

  private _filter(name: string): IMinifiedRoom[] {
    const filterValue = name.toLowerCase();
    return this.rooms.filter(room => room.name.toLowerCase().includes(filterValue));
  }

}
