import {Component, Input, OnInit} from '@angular/core';
import {CaseType} from '../../models/liveappsdata';

@Component({
  selector: 'tcla-live-apps-app-configuration-widget',
  templateUrl: './live-apps-app-configuration-widget.component.html',
  styleUrls: ['./live-apps-app-configuration-widget.component.css']
})
export class LiveAppsAppConfigurationWidgetComponent implements OnInit {
  @Input() appIds: string[];
  @Input() sandboxId: number;
  @Input() uiAppId: string;
  @Input() folderId: string;

  public selectedAppConfig: CaseType;

  constructor() { }

  handleConfigAppSelection = (application: CaseType) => {
    // handle selection of app to config
    this.selectedAppConfig = application;
  }

  ngOnInit() {
  }

}
