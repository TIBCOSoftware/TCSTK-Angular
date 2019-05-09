/**
 * @ngdoc component
 * @name liveAppsCaseActionComponent
 *
 * @description
 * `<tcla-live-apps-case-actions>` is a component providing the ability to list and select case actions.
 *
 * @param {function callback} actionClicked Notify parent that an action has been selected.
 *
 * @usage
 *
 *
 *
 */

import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {Subject} from 'rxjs';
import {LiveAppsService} from '../../services/live-apps.service';
import {map, take, takeUntil, tap} from 'rxjs/operators';
import {CaseAction, CaseType, CaseTypesList, Process} from '../../models/liveappsdata';
import {LaProcessSelection} from '../../models/tc-case-processes';
import {LiveAppsComponent} from '../live-apps-component/live-apps-component.component';
import {TcCaseProcessesService} from '../../services/tc-case-processes.service';

@Component({
  selector: 'tcla-live-apps-case-actions',
  templateUrl: './live-apps-case-actions.component.html',
  styleUrls: ['./live-apps-case-actions.component.css']
})
export class LiveAppsCaseActionsComponent extends LiveAppsComponent implements OnInit {
  @Input() caseRef: string;
  @Input() appId: string;
  @Input() typeId: string;
  @Input() sandboxId: number;
  @Input() caseState: string;
  @Input() maxActions = 1;
  @Output() actionClicked: EventEmitter<LaProcessSelection> = new EventEmitter<LaProcessSelection>();

  public caseactions: CaseAction[];
  public errorMessage: string;

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
        takeUntil(this._destroyed$),
        map(caseactions => {
          this.caseactions = caseactions.actions;
        })
      ).subscribe(
      null, error => { this.errorMessage = 'Error retrieving case actions: ' + error.error.errorMsg; });
  }

  public selectAction(action: CaseAction) {

    this.caseProcessesService.getProcessDetails(this.caseRef, this.appId, this.typeId, this.sandboxId, action, null,100).pipe(
      take(1),
      takeUntil(this._destroyed$),
      tap(processDetails => {
        if (!processDetails || !processDetails.process) {
          // This will be triggered when no form schema is available
          // Typically happens when:
          // 1) The form has elements that are not supported by the Live Apps API for form schemas such as participant selectors
          // 2) The Live Apps application is legacy and has no form schema at all, redeploying the live apps application would fix this.
            console.error('No schema available for this case type: The form may not be supported or you may need to update/re-deploy the live apps application');
          }
        }
      ),
      map(processSchema => {
        this.actionClicked.emit(processSchema);
        return processSchema;
      })
    )
    .subscribe(null, error => { this.errorMessage = 'Error retrieving case actions: ' + error.error.errorMsg; });
  }

  ngOnInit() {
    this.refresh();
  }

}
