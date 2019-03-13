import { Component, OnInit } from '@angular/core';
import { LiveAppsConfig } from 'tc-liveapps-lib';
import { ActivatedRoute } from '@angular/router';
import { GeneralConfig } from 'tc-core-lib';

@Component({
  selector: 'tcpd-settings-liveapps',
  templateUrl: './settings-liveapps.component.html',
  styleUrls: ['./settings-liveapps.component.css']
})
export class SettingsLiveappsComponent implements OnInit {
  
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    var generalConfig: GeneralConfig = this.route.snapshot.data.laConfigHolder.generalConfig;
    var liveAppsConfig: LiveAppsConfig = this.route.snapshot.data.laConfigHolder.liveAppsConfig;

  }

}
