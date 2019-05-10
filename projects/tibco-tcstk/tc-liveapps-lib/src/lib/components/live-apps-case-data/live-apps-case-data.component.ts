import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {LiveAppsService} from '../../services/live-apps.service';
import {CaseInfo, JsonSchema, Metadata} from '../../models/liveappsdata';
import {map, take, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {LiveAppsComponent} from '../live-apps-component/live-apps-component.component';
import {TcCaseDataService} from '../../services/tc-case-data.service';
import {CustomFormDefs} from '@tibco-tcstk/tc-forms-lib';

@Component({
  selector: 'tcla-live-apps-case-data',
  templateUrl: './live-apps-case-data.component.html',
  styleUrls: ['./live-apps-case-data.component.css']
})
export class LiveAppsCaseDataComponent extends LiveAppsComponent implements OnInit {
  @Input() caseRef: string;
  @Input() appId: string;
  @Input() typeId: string;
  @Input() sandboxId: number;
  @Input() uiAppId: string;
  @Input() showHeader: boolean;
  @Input() layout: any[];
  @Input() customFormDefs: CustomFormDefs;
  @Input() formRef: string;
  @Input() customDataId = this.customDataId ? this.customDataId : 'default';

  public casedata: any;
  public summary: any;
  public metadata: Metadata;
  public errorMessage: string;
  public schema: JsonSchema;

  constructor(private caseDataService: TcCaseDataService) {
    super();
  }

  public refresh = () => {
    this.caseDataService.getCaseWithSchema(this.caseRef, this.sandboxId, this.appId, this.typeId, this.uiAppId)
      .pipe(
        take(1),
        takeUntil(this._destroyed$),
        map(result => {
          this.casedata = result.caseInfo.untaggedCasedataObj;
          this.metadata = result.caseInfo.metadata;
          this.summary = result.caseInfo.summaryObj;
          this.schema = result.caseSchema;
          this.formRef = result.applicationName + '.' + result.applicationInternalName + '.casedata.' + this.customDataId;
        })
      ).subscribe(
      null, error => { this.errorMessage = 'Error retrieving case data: ' + error.error.errorMsg; });
  }

  ngOnInit() {
    this.refresh();
  }

}
