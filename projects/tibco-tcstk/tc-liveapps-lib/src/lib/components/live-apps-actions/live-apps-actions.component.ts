import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ProcessId} from '../../models/liveappsdata';
import {LaProcessSelection} from '../../models/tc-case-processes';
import {CustomFormDefs} from '@tibco-tcstk/tc-forms-lib';
import {LiveAppsCaseActionsComponent} from '../live-apps-case-actions/live-apps-case-actions.component';


/**
 * Not used by app but wraps action list and action execution.
 *
 *@example <tcla-live-apps-actions></tcla-live-apps-actions>
 */
@Component({
  selector: 'tcla-live-apps-actions',
  templateUrl: './live-apps-actions.component.html',
  styleUrls: ['./live-apps-actions.component.css']
})
export class LiveAppsActionsComponent implements OnInit {

  @ViewChild(LiveAppsCaseActionsComponent) actionSelector: LiveAppsCaseActionsComponent

  /**
   * The case reference
   */
  @Input() caseRef: string;

  /**
   * The state of the case
   */
  @Input() caseState: string;

  /**
   * sandboxId - this comes from claims resolver
   */
  @Input() sandboxId: number;

  /**
   * LA Application ID
   */
  @Input() applicationId: string;

  /**
   * The LA Application Type Id (generally 1)
   */
  @Input() typeId: string;

  /**
   * Custom Form configuration file
   */
  @Input() customFormDefs: CustomFormDefs;

  /**
   * Allow override of forms framework
   * Options: bootstrap-4 or material-design
   */
  @Input() formsFramework: string = this.formsFramework ? this.formsFramework : 'material-design';


  /**
   * Dont show buttons for any actions that start with this string.
   * eg: '$' will remove the action $Update
   */
  @Input() actionFilter: string[];


  /**
   * ~event caseActioned : Case action starterd (process started)
   * ~payload ProcessId : processId of started process in live apps (action)
   */
  @Output() caseActioned: EventEmitter<ProcessId> = new EventEmitter<ProcessId>();

  selectedAction: LaProcessSelection;

  // action clicked
  handleActionCompleted = (result: ProcessId) => {
    this.caseActioned.emit(result);
    this.actionSelector.toggleEnable();
  }


  handleActionClicked = (action) => {
    this.actionSelector.toggleEnable();
    this.selectedAction = action;
  }

  constructor() { }


  ngOnInit() {
  }

}
