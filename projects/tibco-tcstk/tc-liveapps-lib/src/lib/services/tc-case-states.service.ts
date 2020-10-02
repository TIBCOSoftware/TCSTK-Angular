import { Injectable } from '@angular/core';
import {forkJoin, Observable} from 'rxjs';
import {LiveAppsService} from './live-apps.service';
import {TcCaseDataService} from './tc-case-data.service';
import {map, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {StateTrackerData, StateTracker, TrackerState, StateAuditEventList, StateAuditEvent} from '../models/tc-case-states';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {Location} from '@angular/common';
import {TcAppDefinitionService} from '../services/tc-app-definition.service';
import {CaseTypeStatesList} from '../models/liveappsdata';

const MILESTONE_SVG = {
  END_SECTION_COMPLETED_SVG: '<svg xmlns="http://www.w3.org/2000/svg" width="94" height="36" viewBox="0 0 94 36">\n' +
  '    <path class="{{milestoneBgClass}}" fill="none" fill-rule="evenodd" d="M0 0h76c9.941 0 18 8.059 18 18s-8.059 18-18 18H0c6.095-3.675 10.172-10.361 10.172-18C10.172 10.361 6.095 3.675 0 0z"/>\n' +
  '    <text fill="#FFF" font-family="SourceSansPro-Regular, Source Sans Pro" font-size="{{fontSize}}">\n' +
  '        <tspan x="16" y="23" class="{{milestoneLabelClass}}">{{milestoneLabel}}</tspan>\n' +
  '    </text>\n' +
  '</svg>\n',
  END_SECTION_INPROGESS_SVG: '<svg xmlns="http://www.w3.org/2000/svg" width="94" height="36" viewBox="0 0 94 36">\n' +
  '    <path class="{{milestoneBgClass}}" fill="none" fill-rule="evenodd" d="M0 0h76c9.941 0 18 8.059 18 18s-8.059 18-18 18H0c6.095-3.675 10.172-10.361 10.172-18C10.172 10.361 6.095 3.675 0 0z"/>\n' +
  '    <text fill="#FFF" font-family="SourceSansPro-Regular, Source Sans Pro" font-size="{{fontSize}}">\n' +
  '        <tspan x="16" y="23" class="{{milestoneLabelClass}}">{{milestoneLabel}}</tspan>\n' +
  '    </text>\n' +
  '</svg>\n',
  END_SECTION_PENDING_SVG: '<svg xmlns="http://www.w3.org/2000/svg" width="94" height="36" viewBox="0 0 94 36">\n' +
  '    <path class="{{milestoneBgClass}}" fill="none" fill-rule="evenodd" d="M0 0h76c9.941 0 18 8.059 18 18s-8.059 18-18 18H0c6.095-3.675 10.172-10.361 10.172-18C10.172 10.361 6.095 3.675 0 0z"/>\n' +
  '    <text class="pending-text" fill="#FFF" font-family="SourceSansPro-Regular, Source Sans Pro" font-size="{{fontSize}}">\n' +
  '        <tspan x="16" y="23" class="{{milestoneLabelClass}}">{{milestoneLabel}}</tspan>\n' +
  '    </text>\n' +
  '</svg>\n',
  FIRST_SECTION_COMPLETED_SVG: '<svg xmlns="http://www.w3.org/2000/svg" width="94" height="36" viewBox="0 0 94 36">\n' +
  '<path class="{{milestoneBgClass}}" fill="none" fill-rule="evenodd" d="M93.42 0C87.176 3.675 83 10.361 83 18c0 7.639 4.176 14.325 10.42 18H0c6.36-3.675 10.614-10.361 10.614-18C10.614 10.361 6.36 3.675 0 0h93.42z"/>\n' +
  '<text fill="#FFF" font-family="SourceSansPro-Regular, Source Sans Pro" font-size="{{fontSize}}">\n' +
  '    <tspan x="16" y="23" class="{{milestoneLabelClass}}">{{milestoneLabel}}</tspan>\n' +
  '</text>\n' +
  '</svg>\n',
  FIRST_SECTION_INPROGRESS_SVG: '<svg xmlns="http://www.w3.org/2000/svg" width="94" height="36" viewBox="0 0 94 36">\n' +
  '    <path class="{{milestoneBgClass}}" fill="none" fill-rule="evenodd" d="M93.42 0C87.176 3.675 83 10.361 83 18c0 7.639 4.176 14.325 10.42 18H0c6.36-3.675 10.614-10.361 10.614-18C10.614 10.361 6.36 3.675 0 0h93.42z"/>\n' +
  '    <text fill="#FFF" font-family="SourceSansPro-Regular, Source Sans Pro" font-size="{{fontSize}}">\n' +
  '        <tspan x="16" y="23" class="{{milestoneLabelClass}}">{{milestoneLabel}}</tspan>\n' +
  '    </text>\n' +
  '</svg>',
  FIRST_SECTION_PENDING_SVG: '<svg xmlns="http://www.w3.org/2000/svg" width="94" height="36" viewBox="0 0 94 36">\n' +
  '    <path class="{{milestoneBgClass}}" fill="none" fill-rule="evenodd" d="M93.42 0C87.176 3.675 83 10.361 83 18c0 7.639 4.176 14.325 10.42 18H0c6.36-3.675 10.614-10.361 10.614-18C10.614 10.361 6.36 3.675 0 0h93.42z"/>\n' +
  '    <text fill="#FFF" font-family="SourceSansPro-Regular, Source Sans Pro" font-size="{{fontSize}}">\n' +
  '        <tspan x="16" y="23" class="{{milestoneLabelClass}}">{{milestoneLabel}}</tspan>\n' +
  '    </text>\n' +
  '</svg>\n',
  MIDDLE_SECTION_COMPLETED_SVG: '<svg xmlns="http://www.w3.org/2000/svg" width="164" height="36" viewBox="0 0 164 36">\n' +
  '    <path class="{{milestoneBgClass}}" fill="none" fill-rule="evenodd" d="M164 0c-6.09 3.675-10.163 10.361-10.163 18 0 7.639 4.073 14.325 10.163 18H0c6.095-3.675 10.172-10.361 10.172-18C10.172 10.361 6.095 3.675 0 0h164z"/>\n' +
  '    <text fill="#FFF" font-family="SourceSansPro-Regular, Source Sans Pro" font-size="{{fontSize}}">\n' +
  '        <tspan x="16" y="23" class="{{milestoneLabelClass}}">{{milestoneLabel}}</tspan>\n' +
  '    </text>\n' +
  '</svg>\n',
  MIDDLE_SECTION_INPROGRESS_SVG: '<svg xmlns="http://www.w3.org/2000/svg" width="164" height="36" viewBox="0 0 164 36">\n' +
  '    <path class="{{milestoneBgClass}}" fill="none" fill-rule="evenodd" d="M164 0c-6.09 3.675-10.163 10.361-10.163 18 0 7.639 4.073 14.325 10.163 18H0c6.095-3.675 10.172-10.361 10.172-18C10.172 10.361 6.095 3.675 0 0h164z"/>\n' +
  '    <text fill="#FFF" font-family="SourceSansPro-Regular, Source Sans Pro" font-size="{{fontSize}}">\n' +
  '        <tspan x="16" y="23" class="{{milestoneLabelClass}}">{{milestoneLabel}}</tspan>\n' +
  '    </text>\n' +
  '</svg>\n',
  MIDDLE_SECTION_PENDING_SVG: '<svg xmlns="http://www.w3.org/2000/svg" width="164" height="36" viewBox="0 0 164 36">\n' +
  '    <path class="{{milestoneBgClass}}" fill="none" fill-rule="evenodd" d="M164 0c-6.09 3.675-10.163 10.361-10.163 18 0 7.639 4.073 14.325 10.163 18H0c6.095-3.675 10.172-10.361 10.172-18C10.172 10.361 6.095 3.675 0 0h164z"/>\n' +
  '    <text class="pending-text" fill="#FFF" font-family="SourceSansPro-Regular, Source Sans Pro" font-size="{{fontSize}}">\n' +
  '        <tspan x="16" y="23" class="{{milestoneLabelClass}}">{{milestoneLabel}}</tspan>\n' +
  '    </text>\n' +
  '</svg>\n'
}

@Injectable({
  providedIn: 'root'
})
export class TcCaseStatesService {

  constructor(private http: HttpClient,
              private liveAppsService: LiveAppsService,
              private caseDataService: TcCaseDataService,
              private appDefinitionService: TcAppDefinitionService,
              private sanitizer: DomSanitizer,
              private location: Location) { }

  private getTrackerData = (caseRef: string, sandboxId: number, appId: string): Observable<StateTrackerData> => {
    const possibleStates = new CaseTypeStatesList().deserialize(this.appDefinitionService.getCaseTypeByAppId(appId).states);
    // merge the result of these two API calls into one object
    const caseState$ = this.caseDataService.getCaseState(caseRef, sandboxId);
    const stateAudit$ = this.getCaseStateAudit(caseRef, sandboxId);
    return forkJoin([caseState$, stateAudit$]).pipe(
      map(resultArr => {
        return new StateTrackerData().deserialize(
          { possibleStates: possibleStates, currentState: resultArr[0], caseAudit: resultArr[1].auditEvents }
          );
      })
    );
  }

  private buildTracker = (trackerData: StateTrackerData): StateTracker => {
    const tracker = new StateTracker();
    tracker.states = [];
    if (trackerData.caseAudit.length <= 0) {
      // if no audit it has likely been deleted and we cannot create a milestone trailer
      tracker.valid = false;
    } else {
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
          trackerState.user = thisEvent.principalName ? thisEvent.principalName.value : 'system';
          trackerState.changed = thisEvent.creationTime ? thisEvent.creationTime.value : '';
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
        tracker.valid = true;
      });
    }
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

  public getCaseStateAuditWithTerminal(caseRef: string, sandboxId: number, appId: string): Observable<StateAuditEventList> {
    const possibleStates = new CaseTypeStatesList().deserialize(this.appDefinitionService.getCaseTypeByAppId(appId).states);
    const caseStateAudit$ = this.getCaseStateAudit(caseRef, sandboxId);
    return caseStateAudit$.pipe(
      map(result => {
        const caseStateAudit = result;
        // mark if any are terminal states
        caseStateAudit.auditEvents.forEach(auditEvent => {
          const foundState = possibleStates.states.find(state => state.value === auditEvent.caseState.value);
          auditEvent.isTerminal = foundState.isTerminal ? foundState.isTerminal : false;
        });
        return caseStateAudit;
      })
    );
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

  public getMilestoneSectionSvg(stateLabel: string, labelClass: string, bgClass: string, svgFileName: string, fontSize?: string): SafeHtml {
    /*return this.liveAppsService.getIconSVGText(TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, 'assets/icons/milestones/' + svgFileName)).pipe(
      map(svgcontents => {
        let updatedsvg = svgcontents.replace('{{milestoneLabel}}', stateLabel);
        updatedsvg = updatedsvg.replace('{{milestoneBgClass}}', bgClass);
        updatedsvg = updatedsvg.replace('{{milestoneLabelClass}}', labelClass);
        const newval = this.sanitizer.bypassSecurityTrustHtml(updatedsvg);
        return newval;
      })
    );*/
    // convert svgFileName to the inline property name
    svgFileName = svgFileName.toUpperCase();
    const regEx = /-|\./gi;
    svgFileName = svgFileName.replace(regEx, '_');
    const svgcontents = MILESTONE_SVG[svgFileName];
    if (svgcontents) {
      let updatedsvg = svgcontents.replace('{{milestoneLabel}}', stateLabel);
      updatedsvg = updatedsvg.replace('{{milestoneBgClass}}', bgClass);
      updatedsvg = updatedsvg.replace('{{milestoneLabelClass}}', labelClass);
      updatedsvg = updatedsvg.replace('{{fontSize}}', fontSize ? fontSize : '14px');
      const newval = this.sanitizer.bypassSecurityTrustHtml(updatedsvg);
      return newval;
    } else {
      return undefined;
    }
  }
}
