import { Pipe, PipeTransform } from '@angular/core';
import {AuditEvent} from '../models/tc-case-audit';

@Pipe({
  name: 'parseAuditMessage'
})
export class ParseAuditMessagePipe implements PipeTransform {

  transform(value: any, item: AuditEvent): any {
    // replace any {{paramX}} with the value in the item
    value = value.replace('{{param0}}', item.param0.value);
    value = value.replace('{{param1}}', item.param1.value);
    return value;
  }

}
