import { Component, OnInit } from '@angular/core';
import { LiveAppsConfig } from 'tc-liveapps-lib';
import { ActivatedRoute } from '@angular/router';
import { GeneralConfig } from 'tc-core-lib';

@Component({
  selector: 'tcla-live-apps-settings',
  templateUrl: './live-apps-settings.component.html',
  styleUrls: ['./live-apps-settings.component.css']
})
export class LiveAppsSettingsComponent implements OnInit {
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    const generalConfig: GeneralConfig = this.route.snapshot.data.laConfigHolder.generalConfig;
    const liveAppsConfig: LiveAppsConfig = this.route.snapshot.data.laConfigHolder.liveAppsConfig;

  }

}
