import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'twConvertDate'
})
export class TwConvertDatePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    let dt = new Date(value);
    let monthArr = ['Jan','Feb', 'Mar', 'Apr', 'May','Jun','Jul','Aug','Sep', 'Oct', 'Nov','Dec'];
    return monthArr[dt.getMonth() + 1] + ' ' + dt.getDate() + ', at ' + dt.getMinutes() + ':' + dt.getSeconds();
  }

}
