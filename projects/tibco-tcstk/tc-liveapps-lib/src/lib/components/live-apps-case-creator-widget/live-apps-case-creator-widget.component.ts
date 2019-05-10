import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {CaseType, ProcessId} from '../../models/liveappsdata';
import {LaProcessSelection} from '../../models/tc-case-processes';
import {CustomFormDefs} from '@tibco-tcstk/tc-forms-lib';

@Component({
  selector: 'tcla-live-apps-case-creator-widget',
  templateUrl: './live-apps-case-creator-widget.component.html',
  styleUrls: ['./live-apps-case-creator-widget.component.css']
})
export class LiveAppsCaseCreatorWidgetComponent implements OnInit {
  @Input() application: CaseType;
  @Input() sandboxId: number;
  @Input() uiAppId: string;
  @Input() initialData: any;
  @Input() customFormDefs: CustomFormDefs;
  @Output() caseCreated: EventEmitter<ProcessId> = new EventEmitter<ProcessId>();

  constructor() { }

  // handle case created
  public handleCaseCreation = (processId: ProcessId) => {
    this.caseCreated.emit(processId);
  }

  ngOnInit(): void {
  }

}
