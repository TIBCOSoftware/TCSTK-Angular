/**
 * @ngdoc component
 * @name laCaseSchemaListComponent
 *
 * @description
 * `<app-la-case-schema-list>` is a component that lists case creators and actions
 *
 * @param {string=} sandboxId The Live Apps sandboxId.
 * @param {string=} applicationId The Live Apps applicationId.
 * @param {string=} caseId The Live Apps caseId.
 * @param {string} caseReference optional case reference (useful if parent just created a case)
 * @param {function callback} selector triggered when an action or case creator is clicked.
 *
 * @usage
 *
 * Regular:
 *
 * <app-la-case-schema-list [sandboxId]="23" [applicationId]="'71'" [caseTypeId]="'1'"
 *      (selection)="onSelection($event)"></app-la-case-schema-list>
 *
 */


import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {LiveAppsService} from '../../../services/live-apps.service';
import {map, take, takeUntil} from 'rxjs/operators';
import {LaProcessSelection} from '../../../models/liveappsdata';
import {CaseType, CaseTypesList, JsonSchema, Process} from '../../../models/liveappsdata';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-live-apps-case-schema-list',
  templateUrl: './live-apps-case-schema-list.component.html',
  styleUrls: ['./live-apps-case-schema-list.component.css']
})
export class LiveAppsCaseSchemaListComponent implements OnInit, OnDestroy {
  @Input() sandboxId: number;
  @Input() applicationId: string;
  @Input() caseTypeId: string;
  @Input() mode: string;
  @Input() caseReference: string;
  @Output() selection = new EventEmitter<LaProcessSelection>();

  caseCreatorList: Process[];
  caseActionList: Process[];
  appSchema: CaseTypesList;
  caseType: CaseType;
  // caseReference: string;
  errorMessage: string;

  // use the _destroyed$/takeUntil pattern to avoid memory leaks if a response was never received
  private _destroyed$ = new Subject();

  // run when the user clicks on a process (action or case creator)
  private selectProcess = (type, process) => {
    this.selection.emit({
      type: type,
      appSchema: this.appSchema,
      caseIdAttribute: this.getCaseIDAttributeName(),
      process: process,
      // Format of ref is <applicationName>.<applicationInternalName>.<processType>.<processName>
      ref: this.caseType.applicationName + '.' + this.caseType.applicationInternalName + '.' + type + '.' + process.name,
      caseReference: this.caseReference
    });
    this.caseReference = undefined;
  }

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
    // retrieve the schema for this case type so we can display case creators and case actions for this case type
    this.liveapps.getCaseTypeSchema(this.sandboxId, this.applicationId).pipe(
      take(1),
      takeUntil(this._destroyed$),
      map(schema => {
          this.appSchema = schema;
          schema.casetypes.forEach((casetype) => {
              // the schema will contain definitions for both the 'case' and any defined types in that case.
              // We want the schema for this 'case'.
              if (casetype.applicationId === this.applicationId && casetype.id === this.caseTypeId) {
                this.caseType = casetype;
                this.caseCreatorList = casetype.creators ? casetype.creators : [];
                this.caseActionList = casetype.actions ? casetype.actions : [];
              }
            }
          );
        }
      )
    ).subscribe(null, error => {
      this.errorMessage = 'Error getting case app schema: ' + error.error.errorMsg;
    });
  }

  constructor(private liveapps: LiveAppsService) {
  }


  ngOnInit() {
    this.refresh();
  }

  ngOnDestroy() {
    this._destroyed$.next();
  }
}
