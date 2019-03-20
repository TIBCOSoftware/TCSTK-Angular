import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CaseType} from '../../models/liveappsdata';
import {CaseCardConfig} from '../../models/tc-case-card-config';

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
  @Output() configChanged: EventEmitter<CaseCardConfig> = new EventEmitter<CaseCardConfig>();
  @Output() appSelected: EventEmitter<CaseType> = new EventEmitter<CaseType>();

  public selectedAppConfig: CaseType;

  constructor() { }

  handleConfigAppSelection = (application: CaseType) => {
    // handle selection of app to config
    this.selectedAppConfig = application;
    this.appSelected.emit(application);
  }

  handleConfigChanged = (caseCardConfig: CaseCardConfig) => {
    this.configChanged.emit(caseCardConfig);
  }

  ngOnInit() {
  }

}
