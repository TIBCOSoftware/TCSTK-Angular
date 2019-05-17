/* orders array by date */

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderByDate'
})
export class OrderByDatePipe implements PipeTransform {

  transform(array: any[], field: string): any[] {
    return array.sort(function(a, b) {
        a = new Date(a[field]);
        b = new Date(b[field]);
        return a > b ? -1 : a < b ? 1 : 0;
    });
  }
}
