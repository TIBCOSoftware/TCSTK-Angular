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
import {map, take, takeUntil} from 'rxjs/operators';
import {CaseAction, CaseType, CaseTypesList, LaProcessSelection, Process} from '../../models/liveappsdata';
import {LiveAppsComponent} from '../live-apps-component/live-apps-component.component';

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

  private getCaseIDAttributeName = () => {
    let caseIdAttrib: any;
    this.caseType.attributes.forEach((attribute) => {
      if (attribute.isIdentifier) {
        caseIdAttrib = attribute;
      }
    });
    return caseIdAttrib;
  }

  public refresh = () => {
    this.liveapps.getCaseActions(this.caseReference, this.sandboxId, this.appId, this.typeId, this.caseState)
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
    // retrieve action definition then emit CaseAction object including process def
    this.liveapps.getCaseTypeSchema(this.sandboxId, this.appId, 100).pipe(
      map(schema => {
          this.appSchema = schema;
          let selectedProcess: LaProcessSelection;
          schema.casetypes.forEach((casetype) => {
              // the schema will contain definitions for both the 'case' and any defined types in that case.
              // We want the schema for this 'case'.
              if (casetype.applicationId === this.appId && casetype.id === this.typeId) {
                if (casetype.jsonSchema !== undefined) {
                  this.caseType = casetype;
                  this.caseActionList = casetype.actions ? casetype.actions : [];
                  // now find the selected action
                  this.caseActionList.forEach((actionDef) => {
                    if (action.id === Number(actionDef.id)) {
                      selectedProcess = new LaProcessSelection(
                        'action', this.appSchema, this.getCaseIDAttributeName(), actionDef,
                          // Format of ref is <applicationName>.<applicationInternalName>.<processType>.<processName>
                          (this.caseType.applicationName + '.' + this.caseType.applicationInternalName + '.' + 'action' + '.' + actionDef.name),
                          undefined
                        );
                    }
                  });
                } else {
                  console.error('No schema returned for this case type: You may need to update/re-deploy the live apps application');
                }
              }
            }
          );
          this.actionClicked.emit(selectedProcess);
        }
      )
      ).subscribe();
    }

  constructor(private liveapps: LiveAppsService) {
    super();
  }

  ngOnInit() {
    this.refresh();
  }

}
