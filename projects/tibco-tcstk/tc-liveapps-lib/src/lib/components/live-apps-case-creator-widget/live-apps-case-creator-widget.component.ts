import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {CaseType, ProcessId} from '../../models/liveappsdata';
import {LaProcessSelection} from '../../models/tc-case-processes';
import {CustomFormDefs} from '@tibco-tcstk/tc-forms-lib';

/**
 * Wraps case creators component (high level component)
 *
 *@example <tcla-live-apps-case-creator-widget></tcla-live-apps-case-creator-widget>
 */
@Component({
  selector: 'tcla-live-apps-case-creator-widget',
  templateUrl: './live-apps-case-creator-widget.component.html',
  styleUrls: ['./live-apps-case-creator-widget.component.css']
})
export class LiveAppsCaseCreatorWidgetComponent implements OnInit {
  /**
   * CaseType model for the case type you want to run a case creator for (normally comes from an application selector component)
   */
  @Input() application: CaseType;

  /**
   * sandboxId - this comes from claims resolver
   */
  @Input() sandboxId: number;

  /**
   * The Application ID of the UI (should ideally be unique as it is shared state key)
   */
  @Input() uiAppId: string;

  /**
   * override the initial data for a case creator
   */
  @Input() initialData: any;

  /**
   * Custom Form configuration file
   */
  @Input() customFormDefs: CustomFormDefs;


  /**
   * ~event caseCreated : Case Creator started (process started)
   * ~payload ProcessId : ProcessId object output on case creation (details of process started)
   */
  @Output() caseCreated: EventEmitter<ProcessId> = new EventEmitter<ProcessId>();
  constructor() { }

  // handle case created
  public handleCaseCreation = (processId: ProcessId) => {
    this.caseCreated.emit(processId);
  }

  ngOnInit(): void {
  }

}
