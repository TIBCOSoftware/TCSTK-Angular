import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import {LiveAppsService} from '../../../services/live-apps.service';
import {AppStateConfig, CaseTypeState, StateMap} from '../../../models/liveappsdata';
import {map, take, takeUntil} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {LiveAppsCaseDataComponent} from '../live-apps-case-data/live-apps-case-data.component';
import {LiveAppsStateIconComponent} from '../live-apps-state-icon/live-apps-state-icon.component';
import {LiveAppsCaseSummaryComponent} from '../live-apps-case-summary/live-apps-case-summary.component';

@Component({
  selector: 'app-live-apps-application-configuration',
  templateUrl: './live-apps-application-configuration.component.html',
  styleUrls: ['./live-apps-application-configuration.component.css']
})
export class LiveAppsApplicationConfigurationComponent implements OnInit, OnDestroy {
  // The ViewChild declarations give access to components marked on the template so that I can call public functions like refresh
  @ViewChildren('iconcomp') stateIconComponents: QueryList<LiveAppsStateIconComponent>;
  @ViewChildren(LiveAppsCaseSummaryComponent) caseSummaryComponent: QueryList<LiveAppsCaseSummaryComponent>;

  @Input() appId: string;
  @Input() sandboxId: number;
  @Input() uiAppId: string;
  @Output() configChanged = new EventEmitter();

  private states: CaseTypeState[];
  private errorMessage: string;
  private appStateConfig: AppStateConfig;
  private selectedStateConfig: StateMap;

  // use the _destroyed$/takeUntil pattern to avoid memory leaks if a response was never received
  private _destroyed$ = new Subject();

  private getConfigForState = (state): StateMap => {
    let reqStateMap: StateMap;
    this.appStateConfig.stateMap.forEach((stateMap) => {
      if (stateMap.state === state.value) {
        reqStateMap = stateMap;
      }
    });
    return reqStateMap ? reqStateMap : new StateMap(state, '#8197c0', 'assets/icons/ic-generic-state.svg');
  }

  private setFill = (fill, stateConfig: StateMap) => {
    this.caseSummaryComponent.forEach((comp: LiveAppsCaseSummaryComponent) => {
      comp.restylePreview(stateConfig.icon, fill);
    });
    this.stateIconComponents.find(function(comp) {
      return comp.id === stateConfig.state;
    }).refillSVG(fill);
}

  private selectState = (state: CaseTypeState) => {
    this.selectedStateConfig = this.getConfigForState(state);
    this.caseSummaryComponent.restylePreview(this.selectedStateConfig.icon, this.selectedStateConfig.fill);
  }

  private saveConfig = () => {
    this.liveapps.updateAppStateConfig(this.sandboxId, this.appId, this.uiAppId, this.appStateConfig, this.appStateConfig.id)
      .pipe(
        take(1),
        takeUntil(this._destroyed$),
        map( val => {
            this.configChanged.emit(this.appStateConfig);
          })
      ).subscribe(null, error => { console.log('Unable to retrieve icon: ' + error.errorMsg); }
    );
}

  constructor(private http: HttpClient, private sanitizer: DomSanitizer, private liveapps: LiveAppsService) { }

  ngOnInit() {
    // get states for application
    this.liveapps.getCaseTypeStates(this.sandboxId, this.appId)
      .pipe(
        take(1),
        takeUntil(this._destroyed$),
        map(states => this.states = states.states)
      ).subscribe(
      null, error => { this.errorMessage = 'Error retrieving case type states: ' + error.error.errorMsg; });

    this.liveapps.getAppStateConfig(this.appId, this.uiAppId)
      .pipe(
        take(1),
        takeUntil(this._destroyed$),
        map(config => {
          this.appStateConfig = config;
          if (this.appStateConfig && this.appStateConfig.stateMap.length > 0) {
            this.selectedStateConfig = this.appStateConfig.stateMap[0];
          }
          return config;
        })
      ).subscribe(
      null, error => { this.errorMessage = 'Error retrieving application config: ' + error.error.errorMsg; });
  }

  ngOnDestroy() {
    this._destroyed$.next();
  }

}
