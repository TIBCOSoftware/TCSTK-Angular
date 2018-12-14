import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {LiveAppsService} from '../../../services/live-apps.service';
import {Subject} from 'rxjs';
import {AppStateConfig} from '../../../models/liveappsdata';
import {map, take, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-live-apps-case-state-config',
  templateUrl: './live-apps-case-state-config.component.html',
  styleUrls: ['./live-apps-case-state-config.component.css']
})
export class LiveAppsCaseStateConfigComponent implements OnInit, OnDestroy {
  @Input() sandboxId: number;
  @Input() appId: string;
  @Input() typeId: string;
  @Input() uiAppId: string;

  // use the _destroyed$/takeUntil pattern to avoid memory leaks if a response was never received
  private _destroyed$ = new Subject();

  private appStateConfig: AppStateConfig;
  private appStateConfigJson: string;
  private errorMessage: string;

  constructor(private liveapps: LiveAppsService) { }

  private saveStateConfig = () => {
    const newConfigjson = JSON.parse(this.appStateConfigJson);
    const newConfig = new AppStateConfig().deserialize(newConfigjson);
    this.liveapps.updateAppStateConfig(this.sandboxId, this.appId, this.uiAppId, newConfig, newConfig.id)
      .pipe(
        take(1),
        takeUntil(this._destroyed$),
        map(appStateConfig => {
          this.appStateConfig = appStateConfig;
          this.appStateConfigJson = JSON.stringify(appStateConfig);
          console.log('Written shared state config');
          return appStateConfig;
          })
      )
      .subscribe(
        null, error => { this.errorMessage = 'Error creating new app config: ' + error.error.errorMsg; });
  }

  ngOnInit() {
    this.liveapps.getAppStateConfig(this.appId, this.uiAppId)
      .pipe(
        take(1),
        takeUntil(this._destroyed$),
        map(appStateConfig => {
          if (appStateConfig) {
            this.appStateConfig = appStateConfig;
            this.appStateConfigJson = JSON.stringify(appStateConfig);
          } else {
            // create one
            this.liveapps.createAppStateConfig(this.sandboxId, this.appId, this.uiAppId)
              .pipe(
                take(1),
                takeUntil(this._destroyed$),
                map( value => {
                  if (value) {
                    this.appStateConfig = new AppStateConfig().deserialize({ id: value, stateMap: [] });
                    this.appStateConfigJson = JSON.stringify(appStateConfig);
                  }
                })
              )
              .subscribe(
                null, error => { this.errorMessage = 'Error creating new app config: ' + error.error.errorMsg; });
          }
        })
      ).subscribe(
      null, error => { this.errorMessage = 'Error retrieving app config: ' + error.error.errorMsg; });
  }

  ngOnDestroy(): void {
    this._destroyed$.next();
  }

}
