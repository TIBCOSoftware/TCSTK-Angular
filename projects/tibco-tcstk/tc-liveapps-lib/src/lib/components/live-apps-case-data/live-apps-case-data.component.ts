import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {LiveAppsService} from '../../services/live-apps.service';
import {CaseInfo, JsonSchema, Metadata} from '../../models/liveappsdata';
import {map, take, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {LiveAppsComponent} from '../live-apps-component/live-apps-component.component';
import {TcCaseDataService} from '../../services/tc-case-data.service';
import {CustomFormDefs} from '@tibco-tcstk/tc-forms-lib';


/**
 * Displays data for a case in a widget (high level)
 *
 *@example <tcla-live-apps-case-data></tcla-live-apps-case-data>
 */
@Component({
  selector: 'tcla-live-apps-case-data',
  templateUrl: './live-apps-case-data.component.html',
  styleUrls: ['./live-apps-case-data.component.css']
})
export class LiveAppsCaseDataComponent extends LiveAppsComponent implements OnInit {
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
   * The Application ID of the UI (should ideally be unique as it is shared state key)
   */
  @Input() uiAppId: string;

  /**
   * Whether to show the header bar in the widget - eg. favorites on home page (contains icon etc) - if off icons still appear without bar
   */
  @Input() showHeader: boolean;

  /**
   * Layout object that can be passed to override default layout of the form renderer
   */
  @Input() layout: any[];

  /**
   * Custom Form configuration file
   */
  @Input() customFormDefs: CustomFormDefs;

  /**
   * not used
   */
  @Input() customDataId = this.customDataId ? this.customDataId : 'default';

  public casedata: any;
  public summary: any;
  public metadata: Metadata;
  public errorMessage: string;
  public schema: JsonSchema;
  public formRef: string;

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
