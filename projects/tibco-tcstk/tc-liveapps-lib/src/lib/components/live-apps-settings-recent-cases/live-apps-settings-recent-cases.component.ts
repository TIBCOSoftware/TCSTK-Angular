import {Component, OnInit} from '@angular/core';
import {LiveAppsConfig} from '../../models/tc-liveapps-config';
import {ActivatedRoute} from '@angular/router';
import {GeneralConfig, Claim, Sandbox} from '@tibco-tcstk/tc-core-lib';
import {TcLiveAppsConfigService} from '../../services/tc-live-apps-config.service';
import {LiveAppsComponent} from '../live-apps-component/live-apps-component.component';
import {LiveAppsSettingsComponent} from '../live-apps-settings/live-apps-settings.component';

/**
 * Allow Selection of live apps applications (part of config)
 *
 * ![alt-text](../live-apps-settings-recent-cases.png "")
 *
 *@example <tcla-live-apps-settings-recent-cases></tcla-live-apps-settings-recent-cases>
 */

@Component({
  selector: 'tcla-live-apps-settings-recent-cases',
  templateUrl: './live-apps-settings-recent-cases.component.html',
  styleUrls: ['./live-apps-settings-recent-cases.component.css']
})
export class LiveAppsSettingsRecentCasesComponent extends LiveAppsSettingsComponent implements OnInit {

  LIVE_APPS_URL = '/apps/dt-app/index.html#/application-content/';
    
  public excludeRecentIds: string[];

  public handleExcludeRecentAppIdSelection(appIds: string[]) {
    this.excludeRecentIds = appIds;
  }

  public ngOnInit() {
    super.ngOnInit();
    this.excludeRecentIds = this.liveAppsConfig.recentExcludedAppIds;
  }

  public runSaveFunction = (): void => {
    const liveAppsConfig = new LiveAppsConfig().deserialize({
      applicationIds: this.selectedAppIds,
      recentExcludedAppIds: this.excludeRecentIds,
      caseIconsFolderId: this.liveAppsConfig.caseIconsFolderId,
      documentAppId: this.liveAppsConfig.documentAppId,
      collaborationAppId: this.liveAppsConfig.documentAppId
    });
    // unable to use super.liveAppsConfigService
    super.getLiveAppsConfigService().updateLiveAppsConfig(this.sandboxId, this.generalConfig.uiAppId, liveAppsConfig, this.liveAppsConfig.id).subscribe(
        result => {
            this.snackBar.open('Recent cases settings saved', 'OK', {
                duration: 3000
            });
        },
        error => {
            this.snackBar.open('Error saving Recent cases settings', 'OK', {
                duration: 3000
            });
        }
    );
  }
}

