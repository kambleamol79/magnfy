import { AbstractControl } from '@angular/forms';

export function trimValidator(control: AbstractControl) {
  if (control.value && (control.value.startsWith(' ') || control.value.endsWith(' '))) {
    return { trimError: true };
  }
  return true;
}