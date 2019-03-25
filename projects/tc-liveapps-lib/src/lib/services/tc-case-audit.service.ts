import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {AuditEventList} from '../models/tc-case-audit';

@Injectable({
  providedIn: 'root'
})
export class TcCaseAuditService {

  constructor(private http: HttpClient) { }

  public getCaseAudit(caseRef: string, sandboxId: number, skip: number, top: number): Observable<AuditEventList> {
    const select = 's';
    let url = '/event/v1/auditEvents?$sandbox=' + sandboxId
      + '&$filter=type eq \'case\''
      + ' and id eq \'' + caseRef + '\'';
    url = (skip !== undefined) ? (url + '&$skip=' + skip) : url;
    url = top ? (url + '&$top=' + top) : url;

    return this.http.get(url)
      .pipe(
        tap( val => sessionStorage.setItem('tcsTimestamp', Date.now().toString())),
        map(caseaudit => new AuditEventList().deserialize(caseaudit)));
  }
}
