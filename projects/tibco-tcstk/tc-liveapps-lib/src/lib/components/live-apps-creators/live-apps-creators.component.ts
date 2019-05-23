import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ProcessId} from '../../models/liveappsdata';
import {LaProcessSelection} from '../../models/tc-case-processes';
import {LiveAppsCreatorSelectorComponent} from '../live-apps-creator-selector/live-apps-creator-selector.component';
import {CustomFormDefs} from '@tibco-tcstk/tc-forms-lib';

/**
 * Wraps case creator selection and execution of creator
 *
 *@example <tcla-live-apps-creators></tcla-live-apps-creators>
 */

@Component({
  selector: 'tcla-live-apps-creators',
  templateUrl: './live-apps-creators.component.html',
  styleUrls: ['./live-apps-creators.component.css']
})
export class LiveAppsCreatorsComponent implements OnInit {
  @ViewChild('creatorSelector') creatorSelector: LiveAppsCreatorSelectorComponent;
  /**
   * sandboxId - this comes from claims resolver
   */
  @Input() sandboxId: number;

  /**
   * lA appId ??
   */
  @Input() applicationId: string;

  /**
   * The LA Application Type Id (generally 1)
   */
  @Input() typeId: string;

  /**
   * Data object that will be displayed on the form. Allows overriding over form data (eg. when selecting data in spotfire)
   */
  @Input() dataOverride: any;

  /**
   * Custom Form configuration file
   */
  @Input() customFormDefs: CustomFormDefs;

  /**
   * ~event caseCreated : Case Creator started (process started)
   * ~payload ProcessId : ProcessId object output on case creation (details of process started)
   */
  @Output() caseCreated: EventEmitter<ProcessId> = new EventEmitter<ProcessId>();

  selectedProcess: LaProcessSelection;

  // handle form submit
  handleSubmit = (data: ProcessId) => {
    this.caseCreated.emit(data);
    /*if (this.creatorSelector) {
      this.creatorSelector.reset();
    }*/
  }

  // handle case creator selection
  handleCreatorSelection = (process: LaProcessSelection) => {
    this.selectedProcess = process;
  }

  constructor() { }

  ngOnInit() {
    console.log(this.applicationId);
  }

}
