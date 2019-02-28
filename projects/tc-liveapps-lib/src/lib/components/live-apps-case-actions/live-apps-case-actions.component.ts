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

import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
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
  @Input() caseReference: string;
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

  constructor(private liveapps: LiveAppsService, private caseProcessesService: TcCaseProcessesService) {
    super();
  }

  public refresh = () => {
    this.caseProcessesService.getCaseActionsForCaseRef(this.caseReference, this.sandboxId, this.appId, this.typeId)
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
    this.caseProcessesService.getProcessDetails(this.caseReference, this.appId, this.typeId, this.sandboxId, action, 100).pipe(
      take(1),
      takeUntil(this._destroyed$),
      tap(processDetails => {
        if (!processDetails.process) {
            console.error('No schema available for this case type: You may need to update/re-deploy the live apps application');
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
