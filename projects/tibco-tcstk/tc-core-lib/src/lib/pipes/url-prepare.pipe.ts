import { Pipe, PipeTransform } from '@angular/core';
import { TcCoreCommonFunctions} from '../common/tc-core-common-functions';
import { Location } from '@angular/common';

@Pipe({
  name: 'urlPrepare'
})
export class UrlPrepare implements PipeTransform {

  transform(url: any, location: Location): any {
    return TcCoreCommonFunctions.prepareUrlForStaticResource(location, url);
  }

}
