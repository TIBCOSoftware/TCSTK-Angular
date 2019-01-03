import { Injectable } from '@angular/core';
import {Resolve} from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable()
export class ConfigResolver implements Resolve<Observable<any>> {

  private appConfig = {
    sandboxId: 31,
    applicationId: '1742',
    typeId: '1',
    userId: '256',
    uiAppId: 'testappjs',
    caseIconsFolderId: 'ServiceRequest_Icons',
    caseTypeLabel: 'Partner Request'
  }

  constructor() {}

  resolve() {
    return of(this.appConfig);
  }

}
