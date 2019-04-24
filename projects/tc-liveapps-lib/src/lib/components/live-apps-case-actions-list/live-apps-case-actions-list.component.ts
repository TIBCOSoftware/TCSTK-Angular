import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { LiveAppsService } from '../../services/live-apps.service';
import { map, takeUntil, take, tap } from 'rxjs/operators';
import { Process, CaseAction } from '../../models/liveappsdata';
import { LaProcessSelection } from '../../models/tc-case-processes';
import { LiveAppsCaseActionsComponent } from '../live-apps-case-actions/live-apps-case-actions.component';

@Component({
    selector: 'tcla-live-apps-case-actions-list',
    templateUrl: './live-apps-case-actions-list.component.html',
    styleUrls: ['./live-apps-case-actions-list.component.css']
})
export class LiveAppsCaseActionsListComponent extends LiveAppsCaseActionsComponent implements OnInit, OnChanges {

    @Input() seletedActionId: string;

    caseActionList: Process[];
    selectedAction: Process;

    public refresh = () => {
        // retrieve the schema for this case type so we can display case creators and case actions for this case type
        this.liveapps.getCaseTypeSchema(this.sandboxId, this.appId, 100).pipe(
            map(schema => {
                // this.appSchema = schema;
                schema.casetypes.forEach((casetype) => {
                    // the schema will contain definitions for both the 'case' and any defined types in that case.
                    // We want the schema for this 'case'.
                    if (casetype.applicationId === this.appId && casetype.id === this.typeId) {
                        if (casetype.jsonSchema !== undefined) {
                            // this.caseType = casetype;
                            this.caseActionList = casetype.actions ? casetype.actions : [];
                            // if (this.caseActionList.length == 1) {
                            //     this.selectProcess(this.caseActionList[0]);
                            // }
                        } else {
                            console.error('No schema returned for this case type: You may need to update/re-deploy the live apps application');
                        }
                    }
                }
                );
            }
            )
        ).subscribe();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.appId && (changes.appId.currentValue !== changes.appId.previousValue)) {
            this.caseActionList = [];
            this.refresh();
        }
    }

    compareObjects = (o1: any, o2: any): boolean => {
        return o1.id === this.seletedActionId;
    }

    public selectAction(action: CaseAction) {
        this.caseProcessesService.getProcessDetails(this.caseReference, this.appId, this.typeId, this.sandboxId, action, 100).pipe(
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
}
