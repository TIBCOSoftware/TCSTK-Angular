import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Subject} from 'rxjs';
import {LiveAppsService} from '../../../services/live-apps.service';
import {AppStateConfig, CaseTypeState, StateMap} from '../../../models/liveappsdata';
import {map, take, takeUntil} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-live-apps-application-configuration',
  templateUrl: './live-apps-application-configuration.component.html',
  styleUrls: ['./live-apps-application-configuration.component.css']
})
export class LiveAppsApplicationConfigurationComponent implements OnInit, OnDestroy {
  @Input() appId: string;
  @Input() sandboxId: number;
  @Input() uiAppId: string;
  @Output() configChanged = new EventEmitter();

  private states: CaseTypeState[];
  private errorMessage: string;
  private appStateConfig: AppStateConfig;

  // use the _destroyed$/takeUntil pattern to avoid memory leaks if a response was never received
  private _destroyed$ = new Subject();

  private getConfigForState = (state): StateMap => {
    let reqStateMap: StateMap;
    this.appStateConfig.stateMap.forEach((stateMap) => {
      if (stateMap.state === state) {
        reqStateMap = stateMap;
      }
    });
    return reqStateMap ? reqStateMap : new StateMap(state, undefined, undefined);
  }

  private getSVG = (state: string) => {
    const stateConfig = this.getConfigForState(state);
    const headers = new HttpHeaders().set('cacheResponse', 'true');
    this.http.get(stateConfig.icon, {responseType: 'text', headers: headers } )
      .pipe(
        take(1),
        takeUntil(this._destroyed$),
        map(val => {
            val = val.toString().replace('fill="<DYNAMICFILL>"', 'fill="' + stateConfig.fill + '"');
            const newval = this.sanitizer.bypassSecurityTrustHtml(val);
            return newval;
          }
        )
      ).subscribe(val => {
          return(val);
        }
        , error => { console.log('Unable to retrieve icon: ' + error.errorMsg); }
      );
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
        map(config => this.appStateConfig = config)
      ).subscribe(
      null, error => { this.errorMessage = 'Error retrieving application config: ' + error.error.errorMsg; });
  }

  ngOnDestroy() {
    this._destroyed$.next();
  }

}
