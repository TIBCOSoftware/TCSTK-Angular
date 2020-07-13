import { Component, OnInit } from '@angular/core';
import {LiveAppsSettingsComponent} from '../live-apps-settings/live-apps-settings.component';
import {CaseCardConfig} from '../../models/tc-case-card-config';
import { take, takeUntil} from 'rxjs/operators';
import {TcCaseCardConfigService} from '../../services/tc-case-card-config.service';
import {ActivatedRoute} from '@angular/router';
import {TcLiveAppsConfigService} from '../../services/tc-live-apps-config.service';
import {CaseType} from '../../models/liveappsdata';
import { MatSnackBar } from '@angular/material/snack-bar';


/**
 * Configuration of summary cards
 *
 * ![alt-text](../live-apps-settings-summary-cards.png "")
 *
 *@example <tcla-live-apps-settings-summary-cards></tcla-live-apps-settings-summary-cards>
 */
@Component({
  selector: 'tcla-live-apps-settings-summary-cards',
  templateUrl: './live-apps-settings-summary-cards.component.html',
  styleUrls: ['./live-apps-settings-summary-cards.component.css']
})
export class LiveAppsSettingsSummaryCardsComponent extends LiveAppsSettingsComponent {

  public caseCardConfig: CaseCardConfig;
  public selectedApp: CaseType;

  constructor(protected caseCardConfigService: TcCaseCardConfigService, protected routeExt: ActivatedRoute, protected liveAppsConfigServiceExt: TcLiveAppsConfigService, protected snackBar: MatSnackBar) {
    super(routeExt, liveAppsConfigServiceExt, snackBar);
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
        takeUntil(this._destroyed$)
      ).subscribe(
          result => {
              this.caseCardConfig = result;
              this.snackBar.open('Summary cards settings saved', 'OK', {
                  duration: 3000
              });
          },
          error => {
              this.snackBar.open('Error saving Summary Cards settings', 'OK', {
                  duration: 3000
              });
              console.log('Unable to update case card config: ' + error.errorMsg);
          }
    );
  }

}
