import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function selectFromAvailableRoom(rooms: string[]): ValidatorFn {
  
  return (control: AbstractControl) : ValidationErrors | null => {
    const value = control.value;
    if (rooms.includes(value)) {
      return null;
    }
    return { isNotAnAvailableRoom: true };
  }

}