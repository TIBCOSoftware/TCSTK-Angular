import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProcessId} from '../../models/liveappsdata';
import {LaProcessSelection} from '../../models/tc-case-processes';
import {CustomFormDefs} from '@tibco-tcstk/tc-forms-lib';

@Component({
  selector: 'tcla-live-apps-actions',
  templateUrl: './live-apps-actions.component.html',
  styleUrls: ['./live-apps-actions.component.css']
})
export class LiveAppsActionsComponent implements OnInit {
  @Input() caseRef: string;
  @Input() caseState: string;
  @Input() sandboxId: number;
  @Input() applicationId: string;
  @Input() typeId: string;
  @Input() customFormDefs: CustomFormDefs;
  @Output() caseActioned: EventEmitter<ProcessId> = new EventEmitter<ProcessId>();

  selectedAction: LaProcessSelection;

  // action clicked
  handleActionCompleted = (result: ProcessId) => {
    this.caseActioned.emit(result);
  }

  handleActionClicked = (action) => {
    this.selectedAction = action;
  }

  constructor() { }

  ngOnInit() {
  }

}
