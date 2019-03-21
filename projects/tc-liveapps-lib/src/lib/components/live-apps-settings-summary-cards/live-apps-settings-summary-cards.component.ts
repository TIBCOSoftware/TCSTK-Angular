import { Component, OnInit } from '@angular/core';
import {LiveAppsSettingsComponent} from '../live-apps-settings/live-apps-settings.component';
import {CaseCardConfig} from '../../models/tc-case-card-config';
import {map, take, takeUntil} from 'rxjs/operators';
import {TcCaseCardConfigService} from '../../services/tc-case-card-config.service';
import {HttpClient} from '@angular/common/http';
import {DomSanitizer} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';
import {TcLiveAppsConfigService} from '../../services/tc-live-apps-config.service';
import {CaseType} from '../../models/liveappsdata';

@Component({
  selector: 'tcla-live-apps-settings-summary-cards',
  templateUrl: './live-apps-settings-summary-cards.component.html',
  styleUrls: ['./live-apps-settings-summary-cards.component.css']
})
export class LiveAppsSettingsSummaryCardsComponent extends LiveAppsSettingsComponent {

  public caseCardConfig: CaseCardConfig;
  public selectedApp: CaseType;

  constructor(private caseCardConfigService: TcCaseCardConfigService, private routeExt: ActivatedRoute, private liveAppsConfigServiceExt: TcLiveAppsConfigService) {
    super(routeExt, liveAppsConfigServiceExt);
  }

  public handleConfigChanged = (caseCardConfig: CaseCardConfig) => {
    this.caseCardConfig = caseCardConfig;
    console.log(caseCardConfig);
  }

  public handleAppSelection = (application: CaseType) => {
    this.selectedApp = application;
  }

  public runSaveFunction = (): void => {
    this.caseCardConfigService.updateCaseCardConfig(this.sandboxId, this.selectedApp.applicationId, this.generalConfig.uiAppId, this.caseCardConfig)
      .pipe(
        take(1),
        takeUntil(this._destroyed$),
        map(caseCardConfig => {
          this.caseCardConfig = caseCardConfig;
        })
      ).subscribe(null, error => { console.log('Unable to update case card config: ' + error.errorMsg); }
    );
  }

}
