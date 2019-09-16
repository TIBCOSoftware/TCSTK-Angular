
import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {Subject} from 'rxjs';
import {LiveAppsService} from '../../services/live-apps.service';
import {map, take, takeUntil, tap} from 'rxjs/operators';
import {CaseAction, CaseType, CaseTypesList, Process} from '../../models/liveappsdata';
import {LaProcessSelection} from '../../models/tc-case-processes';
import {LiveAppsComponent} from '../live-apps-component/live-apps-component.component';
import {TcCaseProcessesService} from '../../services/tc-case-processes.service';
import {CustomFormDefs} from '@tibco-tcstk/tc-forms-lib';


/**
 * Renders case action buttons
 *
 * ![alt-text](../live-apps-case-actions.png "Image")
 *
 *@example <tcla-live-apps-case-actions></tcla-live-apps-case-actions>
 */
@Component({
  selector: 'tcla-live-apps-case-actions',
  templateUrl: './live-apps-case-actions.component.html',
  styleUrls: ['./live-apps-case-actions.component.css']
})
export class LiveAppsCaseActionsComponent extends LiveAppsComponent implements OnInit {
  /**
   * The case reference
   */
  @Input() caseRef: string;

  /**
   * The LA Application Id
   */
  @Input() appId: string;

  /**
   * The LA Application Type Id (generally 1)
   */
  @Input() typeId: string;

  /**
   * sandboxId - this comes from claims resolver
   */
  @Input() sandboxId: number;

  /**
   * Max Actions that can be run simultaneously
   */
  @Input() maxActions = 1;

  /**
   * ~event actionClicked : Case Action selected
   * ~payload LaProcessSelection : LaProcessSelection object output when an action is clicked (ie. message to parent to run action component)
   */
  @Output() actionClicked: EventEmitter<LaProcessSelection> = new EventEmitter<LaProcessSelection>();

  public caseactions: CaseAction[];
  public errorMessage: string;
  public disabled = false;

  appSchema: CaseTypesList;
  caseType: CaseType;
  caseActionList: Process[];

  constructor(protected liveapps: LiveAppsService, protected caseProcessesService: TcCaseProcessesService) {
    super();
  }

  public refresh = () => {
    this.caseProcessesService.getCaseActionsForCaseRef(this.caseRef, this.sandboxId, this.appId, this.typeId)
      .pipe(
        take(1),
        takeUntil(this._destroyed$)
      ).subscribe(
      caseactions => {
        this.caseactions = caseactions.actions;
      }, error => { this.errorMessage = 'Error retrieving case actions: ' + error.error.errorMsg; });
  }

  public toggleEnable = () => {
    this.disabled = !this.disabled;
  }

  public selectAction(action: CaseAction) {

    this.caseProcessesService.getProcessDetails(this.caseRef, this.appId, this.typeId, this.sandboxId, action, null, 100).pipe(
      take(1),
      takeUntil(this._destroyed$),
      tap(processDetails => {
        if (!processDetails || !processDetails.process || (processDetails.process.jsonSchema.$schema === 'NOSCHEMA')) {
          // This will be triggered when no form schema is available
          // Typically happens when:
          // 1) The form has elements that are not supported by the Live Apps API for form schemas such as participant selectors
          // 2) The Live Apps application is legacy and has no form schema at all, redeploying the live apps application would fix this.
            console.error('No schema available for this case type: The form may not be supported or you may need to update/re-deploy the live apps application');
          }
        }
      )
    )
    .subscribe(processSchema => {
      this.actionClicked.emit(processSchema);
      return processSchema;
    }, error => { this.errorMessage = 'Error retrieving case actions: ' + error.error.errorMsg; });
  }

  ngOnInit() {
    this.refresh();
  }

}
