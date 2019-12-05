import {Component, EventEmitter, Input, Output, OnDestroy, SimpleChanges, OnChanges, OnInit} from '@angular/core';
import {LiveAppsComponent} from '../live-apps-component/live-apps-component.component';
import {CaseCreator, CaseInfo, Process, ProcessId} from '../../models/liveappsdata';
import {LiveAppsService} from '../../services/live-apps.service';
import {take, takeUntil} from 'rxjs/operators';
import {TcCaseProcessesService} from '../../services/tc-case-processes.service';
import {LiveAppsCreatorStandaloneComponent} from '../live-apps-creator-standalone/live-apps-creator-standalone.component';
import {forkJoin, throwError} from 'rxjs';
import {CaseInfoWithSchema} from '../../models/tc-case-data';

/**
 * Handles rendering of case action.
 *
 *@example <tcla-live-apps-action-standalone></tcla-live-apps-action-standalone>
 */

@Component({
  selector: 'tcla-live-apps-action-standalone',
  templateUrl: './live-apps-action-standalone.component.html',
  styleUrls: ['./live-apps-action-standalone.component.css']
})
export class LiveAppsActionStandaloneComponent extends LiveAppsCreatorStandaloneComponent implements OnChanges {

  /**
   * sandboxId - this comes from claims resolver
   */
  @Input() sandboxId: number;

  /**
   * LA application ID
   */
  @Input() applicationId: string;

  /**
   * The LA Application Type Id (generally 1)
   */
  @Input() typeId: string;

  /**
   * The process definition of the action or creator to execute
   */
  @Input() processName: string;

  /**
   * The case reference on which to run the action
   */
  @Input() caseRef: string;


  /**
   * Data object that will be displayed on the form. Allows overriding over form data (eg. when selecting data in spotfire)
   */
  @Input() dataOverride: any;

  /**
   * Custom Form tag if using an external form app
   */
  @Input() customFormTag: string;

  /**
   * Enable legacy actions
   */
  @Input() legacyActions: boolean = this.legacyActions ? this.legacyActions : false;

  /**
   * Allow override of forms framework
   * Options: bootstrap-4 or material-design
   */
  @Input() formsFramework: string = this.formsFramework ? this.formsFramework : 'material-design';

  /**
   * ~event caseChanged : Case action started (process started)
   * ~payload ProcessId : ProcessId object passed when a case has been updated or created by a process (action/creator)
   */
  @Output() caseCreated: EventEmitter<ProcessId> = new EventEmitter<ProcessId>();

  data: any;
  layout: any[];
  options: any;
  process: Process;
  isCustomForm = false;
  customFormDefs: any;
  useLegacy = false;
  caseState: string;

  ngOnChanges(changes: SimpleChanges) {
    // initialize once data is available
    if (this.applicationId && this.processName && this.typeId && this.sandboxId && this.caseRef) {
      if (this.legacyActions) {
        // use legacy creator iframe
        this.useLegacy = this.legacyActions;
      }
      // use rendered form
      if (this.customFormTag) {
        // use custom form
        this.customFormDefs = { customForms: [this.customFormTag] };
      }
      // get process details and case data
      const forkJoinArray = [];
      const processDetails$ = this.processesService.getProcess(this.sandboxId, this.applicationId, this.typeId, this.processName, 'action').pipe(
        take(1),
        takeUntil(this._destroyed$)
      );

      /*.subscribe(
        next => {
          this.process = next;
        },
        error => {
          console.error('Unable to get action info');
          console.error(error);
        }
      );*/
      forkJoinArray.push(processDetails$);
      const caseData$ = this.caseDataService.getCaseWithSchema(this.caseRef, this.sandboxId, this.applicationId, this.typeId, undefined)
        .pipe(
          take(1),
          takeUntil(this._destroyed$)
        );
      forkJoinArray.push(caseData$);

      forkJoin(forkJoinArray).subscribe(
        (result: any[])  => {
          // handle results

          // process details
          if (result[0]) {
            this.process = new Process().deserialize(result[0]);
          } else {
            console.error('Unable to get action info');
            throwError('Unable to get action info');
          }

          // case data
          if (result[1]) {
            const caseDetails = new CaseInfoWithSchema().deserialize(result[1]);
            if (caseDetails.caseInfo.metadata.applicationId === this.applicationId.toString()) {
              const casedata = caseDetails.caseInfo.untaggedCasedataObj;
              this.caseState = casedata.state;
              // JS: use name rather than internalObjectName to handle appliction name change
              const caseTypeName = caseDetails.name;
              this.data = {
                [caseTypeName]: casedata
              };
            } else {
              console.error('The selected case is not the right case type for this action');
            }
          }

        }
      );
    }
  }

}
