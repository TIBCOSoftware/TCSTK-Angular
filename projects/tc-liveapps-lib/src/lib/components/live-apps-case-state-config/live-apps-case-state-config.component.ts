import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {LiveAppsService} from '../../services/live-apps.service';
import {Subject} from 'rxjs';
import {AppConfig} from '../../models/liveappsdata';
import {map, take, takeUntil} from 'rxjs/operators';
import {LiveAppsComponent} from '../live-apps-component/live-apps-component.component';

@Component({
  selector: 'tcla-live-apps-case-state-config',
  templateUrl: './live-apps-case-state-config.component.html',
  styleUrls: ['./live-apps-case-state-config.component.css']
})
export class LiveAppsCaseStateConfigComponent extends LiveAppsComponent implements OnInit {
  @Input() sandboxId: number;
  @Input() appId: string;
  @Input() typeId: string;
  @Input() uiAppId: string;

  public appStateConfig: AppConfig;
  public appStateConfigJson: string;
  public errorMessage: string;

  constructor(private liveapps: LiveAppsService) {
    super();
  }

  public saveStateConfig = () => {
    const newConfigjson = JSON.parse(this.appStateConfigJson);
    const newConfig = new AppConfig().deserialize(newConfigjson);
    this.liveapps.updateAppConfig(this.sandboxId, this.appId, this.uiAppId, newConfig, newConfig.id)
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
    this.liveapps.getAppConfig(this.appId, this.uiAppId, true, false)
      .pipe(
        take(1),
        takeUntil(this._destroyed$),
        map(appStateConfig => {
          if (appStateConfig) {
            this.appStateConfig = appStateConfig;
            this.appStateConfigJson = JSON.stringify(appStateConfig);
          } else {
            // create one
            this.liveapps.createAppConfig(this.sandboxId, this.appId, this.uiAppId)
              .pipe(
                take(1),
                takeUntil(this._destroyed$),
                map( value => {
                  if (value) {
                    this.appStateConfig = new AppConfig().deserialize({ id: value, stateMap: [] });
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

}
