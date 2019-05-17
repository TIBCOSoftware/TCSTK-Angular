/* truncates string to a set length using ellipsis ... */

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ellipsis'
})
export class EllipsisPipe implements PipeTransform {

  transform(value: any, args?: number): any {
    if (args === undefined) {
      return value;
    }

    if (value && value.length > args) {
      return value.substring(0, args) + '...';
    } else {
      return value;
    }
  }

}
