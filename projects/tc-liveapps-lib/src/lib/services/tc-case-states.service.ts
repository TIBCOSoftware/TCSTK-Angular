import { Injectable } from '@angular/core';
import {forkJoin, Observable} from 'rxjs';
import {LiveAppsService} from '../services/live-apps.service';
import {TcCaseDataService} from '../services/tc-case-data.service';
import {AuditEventList} from '../models/liveappsdata';
import {map, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {StateTrackerData, StateTracker, TrackerState, StateAuditEventList, StateAuditEvent} from '../models/tc-case-states';

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
        return new StateTrackerData().deserialize({ possibleStates: resultArr[1], currentState: resultArr[0], caseAudit: resultArr[2].auditEvents });
      })
    );
  }

  private buildTracker = (trackerData: StateTrackerData): StateTracker => {
    const tracker = new StateTracker();
    tracker.states = [];
    // work out the status of each state
    // possible states: 'pending', 'inprogress', 'completed'
    trackerData.possibleStates.states.forEach(state => {
      const stateLabel = state.label;
      const stateName = state.value;
      const trackerState = new TrackerState();
      trackerState.phase = '';
      trackerState.previousPhase = '';
      // no specific name coming from API so use label.
      trackerState.name = state.label;
      trackerState.label = state.label;
      trackerState.isTerminal = state.isTerminal ? state.isTerminal : false;
      // find last event for this state
      // todo **** reverse is reversing the array too!!!
      const reversedEvents = [];
      Object.assign(reversedEvents, trackerData.caseAudit);
      reversedEvents.reverse();
      const idx = reversedEvents.findIndex(auditEvent => auditEvent.caseState.value === state.value);
      const origIdx = (trackerData.caseAudit.length - 1) - idx;
      let thisEvent: StateAuditEvent;
      if (idx === -1) {
        // no audit events so we haven't reached this state yet
        trackerState.status = 'pending';
      } else {
        thisEvent = trackerData.caseAudit[origIdx];
        trackerState.phase = thisEvent.phaseLabel ? thisEvent.phaseLabel.value : undefined;
        trackerState.previousPhase = thisEvent.previousPhaseLabel ? thisEvent.previousPhaseLabel.value : undefined;
        if (state.isTerminal) {
          // if we have audit for this state and it is terminal it must be completed
          trackerState.status = 'completed';
        } else if ((trackerData.caseAudit.length - 1) === origIdx) {
          // if this is the last audit entry then it is in progress
          trackerState.status = 'inprogress';
        } else {
          // otherwise it must be completed
          trackerState.status = 'completed';
        }
      }
      tracker.states.push(trackerState);
    });
    return tracker;
  }

  public getTracker = (caseRef: string, sandboxId: number, appId: string): Observable<StateTracker> => {
    const tracker$ = this.getTrackerData(caseRef, sandboxId, appId).pipe(
      map(trackerData => {
        return this.buildTracker(trackerData);
      })
    );
    return tracker$;
  }

  public getCaseStateAudit(caseRef: string, sandboxId: number): Observable<StateAuditEventList> {
    const url = '/event/v1/auditEvents?$sandbox=' + sandboxId
      + '&$filter=type eq \'casestate\''
      + ' and id eq \'' + caseRef + '\'';

    return this.http.get(url)
      .pipe(
        tap( val => sessionStorage.setItem('tcsTimestamp', Date.now().toString())),
        map(caseaudit => new StateAuditEventList().deserialize(caseaudit)));
  }
}
