import { Injectable } from '@angular/core';
import {forkJoin, Observable} from 'rxjs';
import {LiveAppsService} from '../services/live-apps.service';
import {TcCaseDataService} from '../services/tc-case-data.service';
import {AuditEventList} from '../models/liveappsdata';
import {map, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {StateTrackerData, StateTracker} from '../models/tc-case-states';

@Injectable({
  providedIn: 'root'
})
export class TcCaseStatesService {

  constructor(private http: HttpClient, private liveAppsService: LiveAppsService, private caseDataService: TcCaseDataService) { }

  private getTrackerData = (caseRef: string, sandboxId: number, appId: string): Observable<StateTrackerData> => {
    const caseState$ = this.caseDataService.getCaseState(caseRef, sandboxId);
    const possibleStates$ = this.liveAppsService.getCaseTypeStates(sandboxId, appId, 100);
    const stateAudit$ = this.getCaseStateAudit(caseRef, sandboxId);
    return forkJoin([caseState$, possibleStates$, stateAudit$]).pipe(
      map(resultArr => {
        return new StateTrackerData().deserialize({ possibleStates: resultArr[1], currentState: resultArr[0], caseAudit: resultArr[2] });
      })
    );
  }

  public getTracker = (caseRef: string, sandboxId: number, appId: string): Observable<StateTracker> => {

  }

  public getCaseStateAudit(caseRef: string, sandboxId: number): Observable<AuditEventList> {
    const url = '/event/v1/auditEvents?$sandbox=' + sandboxId
      + '&$filter=type eq \'casestate\''
      + ' and id eq \'' + caseRef + '\'';

    return this.http.get(url)
      .pipe(
        tap( val => sessionStorage.setItem('tcsTimestamp', Date.now().toString())),
        map(caseaudit => new AuditEventList().deserialize(caseaudit)));
  }
}
