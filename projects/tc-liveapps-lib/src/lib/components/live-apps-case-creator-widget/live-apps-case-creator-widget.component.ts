import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {CaseType, ProcessId} from '../../models/liveappsdata';
import {LaProcessSelection} from '../../models/tc-case-processes';

@Component({
  selector: 'tcla-live-apps-case-creator-widget',
  templateUrl: './live-apps-case-creator-widget.component.html',
  styleUrls: ['./live-apps-case-creator-widget.component.css']
})
export class LiveAppsCaseCreatorWidgetComponent implements OnInit {
  @Input() appIds: string[];
  @Input() sandboxId: number;
  @Input() uiAppId: string;
  @Output() caseCreated: EventEmitter<ProcessId> = new EventEmitter<ProcessId>();

  public selectedApp: CaseType = undefined;


  constructor() { }
  // handle selection of application
  public handleAppSelection = (application: CaseType) => {
    this.selectedApp = application;
  }

  // handle case created
  public handleCaseCreation = (processId: ProcessId) => {
    this.caseCreated.emit(processId);
  }

  ngOnInit(): void {
    console.log(this.appIds);
    console.log(this.selectedApp);
  }

}
