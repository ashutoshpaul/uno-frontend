import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function selectFromAvailableRoom(rooms: string[]): ValidatorFn {
  return (control: AbstractControl) : ValidationErrors | null => {
    const value = control.value;
    if (rooms.includes(value)) {
      return null;
    }
    return { isNotValidRoom: true };
  }
}

export function unavailableRoom(unavailableRooms: string[]): ValidatorFn {
  return (control: AbstractControl) : ValidationErrors | null => {
    const value = control.value;
    if (unavailableRooms.includes(value)) {
      return { isRoomUnavailable: true };
    }
    return null;
  }
}

export function roomAlreadyExists(existingRooms: string[]): ValidatorFn {
  return (control: AbstractControl) : ValidationErrors | null => {
    const value = control.value;
    if (existingRooms.includes(value)) {
      return { isRoomAlreadyExisting: true };
    }
    return null;
  }
}