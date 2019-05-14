import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CaseType} from '../../models/liveappsdata';
import {CaseCardConfig} from '../../models/tc-case-card-config';


/**
 * Manages liveapps settings for Config page
 *
 *@example <tcla-live-apps-app-configuration-widget></tcla-live-apps-app-configuration-widget>
 */
@Component({
  selector: 'tcla-live-apps-app-configuration-widget',
  templateUrl: './live-apps-app-configuration-widget.component.html',
  styleUrls: ['./live-apps-app-configuration-widget.component.css']
})


export class LiveAppsAppConfigurationWidgetComponent implements OnInit {
  /**
   * The list of LA Application IDs you want to handle
   */
  @Input() appIds: string[];

  /**
   * sandboxId - this comes from claims resolver
   */
  @Input() sandboxId: number;

  /**
   * The Application ID of the UI (should ideally be unique as it is shared state key)
   */
  @Input() uiAppId: string;

  /**
   * The organisation folder to store/retrieve documents
   */
  @Input() folderId: string;

  /**
   *##OUTPUT-configChanged##
   * CaseCardConfig object when configuration is changed (so called can do a save with data)
   */
  @Output() configChanged: EventEmitter<CaseCardConfig> = new EventEmitter<CaseCardConfig>();

  /**
   *##OUTPUT-appSelected##
   * CaseType object of app selected
   */
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
