import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringTrim'
})
export class StringTrimPipe implements PipeTransform {

  transform(value: any,): any {
    return value.trim();
  }

}
