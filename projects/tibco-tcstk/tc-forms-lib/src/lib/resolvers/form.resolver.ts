import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {Observable} from 'rxjs';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Location} from '@angular/common';
import {TcCoreCommonFunctions} from '@tibco-tcstk/tc-core-lib';
import {map} from 'rxjs/operators';
import {CustomFormDefs} from '../models/tc-custom-forms';

@Injectable()
export class FormResolver implements Resolve<Observable<CustomFormDefs>> {

  CUSTOM_FORMS_CONFIG_URL = 'assets/config/customForms.json';

  constructor(private http: HttpClient, private location: Location) {
  }

  resolve(): Observable<CustomFormDefs> {
    const headers = new HttpHeaders().set('cacheResponse', 'true');
    return this.http.get(TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, this.CUSTOM_FORMS_CONFIG_URL), { headers, withCredentials: true }).pipe(
      map(formsConfig => {
        return new CustomFormDefs().deserialize(formsConfig);
      })
    );
  }

}
