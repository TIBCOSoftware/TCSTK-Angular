import { Component, OnInit } from '@angular/core';
import { LiveAppsConfig } from '../../models/tc-liveapps-config';
import { ActivatedRoute } from '@angular/router';
import { GeneralConfig } from 'tc-core-lib';
import {Claim, Sandbox} from '../../models/liveappsdata';

@Component({
  selector: 'tcla-live-apps-settings',
  templateUrl: './live-apps-settings.component.html',
  styleUrls: ['./live-apps-settings.component.css']
})
export class LiveAppsSettingsComponent implements OnInit {

  public liveAppsConfig: LiveAppsConfig;
  public generalConfig: GeneralConfig;
  public claims: Claim;
  public sandbox: Sandbox;
  public selectedAppIds: string[];

  constructor(private route: ActivatedRoute) { }

  public handleAppIdSelection(appIds: string[]) {
    console.log('Selected: ', appIds);
    this.selectedAppIds = appIds;
  }

  ngOnInit() {
    this.generalConfig = this.route.snapshot.data.laConfigHolder.generalConfig;
    this.liveAppsConfig = this.route.snapshot.data.laConfigHolder.liveAppsConfig;
    this.claims = this.route.snapshot.data.claims;
    this.sandbox = this.claims.primaryProductionSandbox;
    this.selectedAppIds = this.liveAppsConfig.applicationIds;
  }

}
