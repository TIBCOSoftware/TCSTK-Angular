import {Component, OnInit} from '@angular/core';
import {LiveAppsConfig} from '../../models/tc-liveapps-config';
import {ActivatedRoute} from '@angular/router';
import {GeneralConfig, Claim, Sandbox} from 'tc-core-lib';
import {TcLiveAppsConfigService} from '../../services/tc-live-apps-config.service';
import {LiveAppsComponent} from '../live-apps-component/live-apps-component.component';

@Component({
  selector: 'tcla-live-apps-settings',
  templateUrl: './live-apps-settings.component.html',
  styleUrls: ['./live-apps-settings.component.css']
})
export class LiveAppsSettingsComponent extends LiveAppsComponent implements OnInit {

  LIVE_APPS_URL = '/apps/dt-app/index.html#/application-content/';

  public sandboxId: number;
  public selectedAppIds: string[];
  public liveAppsConfig: LiveAppsConfig;
  public generalConfig: GeneralConfig;
  public claims: Claim;

  constructor(protected route: ActivatedRoute, protected liveAppsConfigService: TcLiveAppsConfigService) {
    super();
  }

  protected getLiveAppsConfigService(): TcLiveAppsConfigService {
    return this.liveAppsConfigService;
  }

  public handleAppIdSelection(appIds: string[]) {
    console.log('Selected: ', appIds);
    this.selectedAppIds = appIds;
  }

  public handleEditLiveAppClick = () => {
    // window.open(this.LIVE_APPS_URL + applicationId);
    // currently no public API to get the appId version for design time to populate the URL
    window.open(this.LIVE_APPS_URL);
  }

  public ngOnInit() {
    this.generalConfig = this.route.snapshot.data.laConfigHolder.generalConfig;
    this.liveAppsConfig = this.route.snapshot.data.laConfigHolder.liveAppsConfig;
    this.claims = this.route.snapshot.data.claims;
    this.sandboxId = Number(this.claims.primaryProductionSandbox.id).valueOf();
    this.selectedAppIds = this.liveAppsConfig.applicationIds;
  }

  public runSaveFunction = (): void => {
    const liveAppsConfig = new LiveAppsConfig().deserialize({
      applicationIds: this.selectedAppIds,
      caseIconsFolderId: this.liveAppsConfig.caseIconsFolderId,
      documentAppId: this.liveAppsConfig.documentAppId,
      collaborationAppId: this.liveAppsConfig.documentAppId
    });
    this.liveAppsConfigService.updateLiveAppsConfig(this.sandboxId, this.generalConfig.uiAppId, liveAppsConfig, this.liveAppsConfig.id).subscribe();
  }
}

