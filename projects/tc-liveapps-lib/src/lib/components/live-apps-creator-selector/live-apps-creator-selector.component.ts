import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {CaseType, CaseTypesList, LaProcessSelection, Process} from '../../models/liveappsdata';
import {LiveAppsComponent} from '../../components/live-apps-component/live-apps-component.component';
import {LiveAppsService} from '../../services/live-apps.service';
import {map} from 'rxjs/operators';
import {LiveAppsStateIconComponent} from '../../components/live-apps-state-icon/live-apps-state-icon.component';
import {MatSelect} from '@angular/material';

@Component({
  selector: 'tcla-live-apps-creator-selector',
  templateUrl: './live-apps-creator-selector.component.html',
  styleUrls: ['./live-apps-creator-selector.component.css']
})
export class LiveAppsCreatorSelectorComponent extends LiveAppsComponent implements OnInit {
  @ViewChild('creatorSelector') creatorSelector: MatSelect;
  @Input() sandboxId: number;
  @Input() appId: string;
  @Input() typeId: string;
  @Output() creatorSelection = new EventEmitter<LaProcessSelection>();

  appSchema: CaseTypesList;
  caseType: CaseType;
  caseCreatorList: Process[];

  // run when the user clicks on a case creator
  public selectProcess = (process) => {
    this.creatorSelection.emit({
      type: 'creator',
      appSchema: this.appSchema,
      caseIdAttribute: this.getCaseIDAttributeName(),
      process: process,
      // Format of ref is <applicationName>.<applicationInternalName>.<processType>.<processName>
      ref: this.caseType.applicationName + '.' + this.caseType.applicationInternalName + '.' + 'creator' + '.' + process.name,
      caseReference: undefined
    });
  }

  public reset = () => {
    this.creatorSelector.value = undefined;
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


  constructor(private liveapps: LiveAppsService) {
    super();
  }

  ngOnInit() {
// retrieve the schema for this case type so we can display case creators and case actions for this case type
    this.liveapps.getCaseTypeSchema(this.sandboxId, this.appId, 50).pipe(
      map(schema => {
          this.appSchema = schema;
          schema.casetypes.forEach((casetype) => {
              // the schema will contain definitions for both the 'case' and any defined types in that case.
              // We want the schema for this 'case'.
              if (casetype.applicationId === this.appId && casetype.id === this.typeId) {
                if (casetype.jsonSchema !== undefined) {
                  this.caseType = casetype;
                  this.caseCreatorList = casetype.creators ? casetype.creators : [];
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
}
