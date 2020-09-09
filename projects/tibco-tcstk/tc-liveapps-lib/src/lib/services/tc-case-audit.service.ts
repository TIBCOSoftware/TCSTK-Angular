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

  public getCaseAudit(caseRef: string, sandboxId: number, startAt: string, top: number,
    creationTime: string, caseType: CaseTypeAudit, orderBy: OrderBy): Observable<AuditEventList> {

    const select = 's';
    let url = '/event/v1/auditEvents?$sandbox=' + sandboxId
      + '&$filter=type eq \'' + (caseType ? caseType : 'case') + '\''
      + ' and id eq \'' + caseRef + '\'';
    url = creationTime ? (url + ' and creationTime gt ' + creationTime) : url;
    url = startAt ? (url + '&$startat=' + startAt) : url;
    url = top ? (url + '&$top=' + top) : url;
    url = orderBy ? (url + '&orderby=creationTime ' + orderBy) : url;

    return this.http.get(url)
      .pipe(
        tap( val => sessionStorage.setItem('tcsTimestamp', Date.now().toString())),
        map(caseaudit => new AuditEventList().deserialize(caseaudit)));
  }
}

export enum OrderBy {
  asc,
  desc
}

export enum CaseTypeAudit {
  case,
  casestate,
  casedata
}