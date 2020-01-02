import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {AuditEventList} from '../models/tc-case-audit';
import {TC_API_KEY, TC_BASE_URL} from '@tibco-tcstk/tc-core-lib';

@Injectable({
  providedIn: 'root'
})
export class TcCaseAuditService {

  constructor(private http: HttpClient) { }

  public getCaseAudit(caseRef: string, sandboxId: number, startAt: string, top: number): Observable<AuditEventList> {
    const select = 's';
    let url = TC_BASE_URL + '/event/v1/auditEvents?$sandbox=' + sandboxId
      + '&$filter=type eq \'case\''
      + ' and id eq \'' + caseRef + '\'';
    url = (startAt !== undefined) ? (url + '&$startat=' + startAt) : url;
    url = top ? (url + '&$top=' + top) : url;
    if (TC_API_KEY) {
      url = url + '&' + TC_API_KEY;
    }

    return this.http.get(url, { withCredentials: true })
      .pipe(
        tap( val => sessionStorage.setItem('tcsTimestamp', Date.now().toString())),
        map(caseaudit => new AuditEventList().deserialize(caseaudit)));
  }
}
