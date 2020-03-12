// todo: JS deprecate this since now using private API to allow only listing of enabled creators

import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {CaseType, CaseTypesList, Process} from '../../models/liveappsdata';
import {LaProcessSelection} from '../../models/tc-case-processes';
import {LiveAppsComponent} from '../live-apps-component/live-apps-component.component';
import {LiveAppsService} from '../../services/live-apps.service';
import {map} from 'rxjs/operators';
import {LiveAppsStateIconComponent} from '../live-apps-state-icon/live-apps-state-icon.component';
import {MatSelect} from '@angular/material';

@Component({
  selector: 'tcla-live-apps-creator-selector',
  templateUrl: './live-apps-creator-selector.component.html',
  styleUrls: ['./live-apps-creator-selector.component.css']
})
export class LiveAppsCreatorSelectorComponent extends LiveAppsComponent implements OnChanges {
  @ViewChild('creatorSelector', {static: false}) creatorSelector: MatSelect;
  @Input() sandboxId: number;
  @Input() appId: string;
  @Input() typeId: string = this.typeId ? this.typeId : '1';
  /**
   * ~event creatorSelection : Case Creator selected
   * ~payload LaProcessSelection : LaProcessSelection object output when a creator is selected from a drop down
   */

  /**
   * Pre-select specified creatorId
   */
  @Input() seletedCreatorId: string;

  /**
   * Use Form field rendering around the selection box
   */
  @Input() formFieldRendering: boolean = this.formFieldRendering ? this.formFieldRendering : false;

  /**
   * Label for the actions selector
   */
  @Input() label: string = this.label ? this.label : 'Case Creators'

  @Output() creatorSelection = new EventEmitter<LaProcessSelection>();

  appSchema: CaseTypesList;
  caseType: CaseType;
  caseCreatorList: Process[];

  // run when the user clicks on a case creator
  public selectProcess = (process) => {
    this.creatorSelection.emit(new LaProcessSelection('creator', this.appSchema, this.getCaseIDAttributeName(), process,
      // Format of ref is <applicationName>.<applicationInternalName>.<processType>.<processName>
      (this.caseType.applicationName + '.' + this.caseType.applicationInternalName + '.' + 'creator' + '.' + process.name),
      undefined, undefined, undefined
    ));
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

  public refresh = () => {
    // retrieve the schema for this case type so we can display case creators and case actions for this case type
    this.liveapps.getCaseTypeSchema(this.sandboxId, this.appId, 100)
    .subscribe(schema => {
      this.appSchema = schema;
      schema.casetypes.forEach((casetype) => {
          // the schema will contain definitions for both the 'case' and any defined types in that case.
          // We want the schema for this 'case'.
          if (casetype.applicationId === this.appId && casetype.id === this.typeId) {
            if (casetype.jsonSchema !== undefined) {
              this.caseType = casetype;
              this.caseCreatorList = casetype.creators ? casetype.creators : [];
              if (this.caseCreatorList.length === 1) {
                this.selectProcess(this.caseCreatorList[0]);
              }
            } else {
              console.error('No schema returned for this case type: You may need to update/re-deploy the live apps application');
            }
          }
        }
      );
    }
    );
  }

  public compareProcessId = (o1: any, o2: any): boolean => {
    return o1.id === this.seletedCreatorId;
  }

  constructor(protected liveapps: LiveAppsService) {
    super();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.appId && (changes.appId.currentValue !== changes.appId.previousValue)) {
        this.caseCreatorList = [];
      this.refresh();
    }
  }
}
