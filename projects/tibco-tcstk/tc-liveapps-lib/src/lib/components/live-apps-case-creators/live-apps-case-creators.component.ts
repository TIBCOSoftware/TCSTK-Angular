

import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {Subject} from 'rxjs';
import {LiveAppsService} from '../../services/live-apps.service';
import {map, take, takeUntil, tap} from 'rxjs/operators';
import {CaseCreator, CaseType, CaseTypesList, Process} from '../../models/liveappsdata';
import {LaProcessSelection} from '../../models/tc-case-processes';
import {LiveAppsComponent} from '../live-apps-component/live-apps-component.component';
import {TcCaseProcessesService} from '../../services/tc-case-processes.service';
import {CustomFormDefs} from '@tibco-tcstk/tc-forms-lib';


/**
 * Wraps case creator and case creator list
 *
 *@example <tcla-live-apps-case-creators></tcla-live-apps-case-creators>
 */
@Component({
  selector: 'tcla-live-apps-case-creators',
  templateUrl: './live-apps-case-creators.component.html',
  styleUrls: ['./live-apps-case-creators.component.css']
})
export class LiveAppsCaseCreatorsComponent extends LiveAppsComponent implements OnInit {
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
   * ~event creatorClicked : Case Creator selected
   * ~payload LaProcessSelection : LaProcessSelection object output when an action is clicked (ie. message to parent to run creator component)
   */
  @Output() creatorClicked: EventEmitter<LaProcessSelection> = new EventEmitter<LaProcessSelection>();


  public casecreators: CaseCreator[];
  public errorMessage: string;

  appSchema: CaseTypesList;
  caseType: CaseType;
  caseActionList: Process[];

  constructor(protected liveapps: LiveAppsService, protected caseProcessesService: TcCaseProcessesService) {
    super();
  }

  public refresh = () => {
    this.caseProcessesService.getCaseCreators(this.sandboxId, this.appId, this.typeId)
      .pipe(
        take(1),
        takeUntil(this._destroyed$),
        map(casecreators => {
          this.casecreators = casecreators.creators;
          if (this.casecreators.length === 1) {
            this.selectCreator(this.casecreators[0]);
          }
        })
      ).subscribe(
      null, error => { this.errorMessage = 'Error retrieving case actions: ' + error.error.errorMsg; });
  }

  public selectCreator(creator: CaseCreator) {
    this.caseProcessesService.getProcessDetails(null, this.appId, this.typeId, this.sandboxId, null, creator, 100).pipe(
      take(1),
      takeUntil(this._destroyed$),
      tap(processDetails => {
        if (!processDetails || !processDetails.process || (processDetails.process.jsonSchema.$schema === 'NOSCHEMA')) {
          // This will be triggered when no form schema is available
          // Typically happens when:
          // 1) The form has elements that are not supported by the Live Apps API for form schemas such as participant selectors
          // 2) The Live Apps application is legacy and has no form schema at all, redeploying the live apps application would fix this.
            console.error('No schema available for this case type: The form may not be supported or you may need to update/re-deploy the live apps application. Alternatively use a custom form.');
          }
        }
      ),
      map(processSchema => {
        this.creatorClicked.emit(processSchema);
        return processSchema;
      })
    )
    .subscribe(null, error => { this.errorMessage = 'Error retrieving case actions: ' + error.error.errorMsg; });
  }

  ngOnInit() {
    this.refresh();
  }

}
