import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {LiveAppsService} from '../../services/live-apps.service';
import {CaseInfo, JsonSchema, Metadata} from '../../models/liveappsdata';
import {map, take, takeUntil} from 'rxjs/operators';
import {ReplaySubject} from 'rxjs';
import {LiveAppsComponent} from '../live-apps-component/live-apps-component.component';
import {TcCaseDataService} from '../../services/tc-case-data.service';
import {CustomFormDefs} from '@tibco-tcstk/tc-forms-lib';
import {FormConfig} from '../../models/tc-liveapps-config';
import {TcFormConfigService} from '../../services/tc-form-config.service';


/**
 * Displays data for a case in a widget (high level)
 *
 * ![alt-text](../live-apps-case-data.png "Image")
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
   * Custom Form Layout Configuration
   */
  public formConfig: FormConfig = new FormConfig();
  @Input('formConfig') set FormConfig(formConfig: FormConfig) {
    if (formConfig){
      this.formConfig = formConfig;
    }
  }

  /**
   * Layout object that can be passed to override default layout of the form renderer
   */
  @Input() layout: any[];

  /**
   * Allow override of forms framework
   * Options: bootstrap-4 or material-design
   */
  public formsFramework: string = 'material-design';
  @Input('formsFramework') set FormsFramework(formsFramework: string) {
    if (formsFramework){
      this.formsFramework = formsFramework;
    }
  }

  /**
   * Custom Form configuration file
   */
  @Input() customFormDefs: CustomFormDefs;

  /**
   * not used
   */
  public customDataId: string = 'default';
  @Input('customDataId') set CustomDataId(customDataId: string) {
    if (customDataId){
      this.customDataId = customDataId;
    }
  }

  /**
   * Emit event to cause refresh of page
   * **/
  @Output() refreshEvent = new EventEmitter();

  public casedata: any;
  protected casedata$ = new ReplaySubject<any>();
  protected summary$ = new ReplaySubject<any>();
  protected metadata$ = new ReplaySubject<Metadata>();
  protected schema$ = new ReplaySubject<JsonSchema>();
  public summary: any;
  public metadata: Metadata;
  public errorMessage: string;
  public schema: JsonSchema;
  public formRef: string;
  public name: string;

  constructor(protected caseDataService: TcCaseDataService, protected formConfigService: TcFormConfigService) {
    super();
  }

  public triggerRefresh = () => {
    this.refreshEvent.emit();
  }

  public refresh = () => {
    this.caseDataService.getCaseWithSchema(this.caseRef, this.sandboxId, this.appId, this.typeId, this.uiAppId)
      .pipe(
        take(1),
        takeUntil(this._destroyed$)
      ).subscribe(
      result => {
        this.casedata = result.caseInfo.untaggedCasedataObj;
        this.metadata = result.caseInfo.metadata;
        this.summary = result.caseInfo.summaryObj;
        this.schema = result.caseSchema;
        this.name = result.name;
        // Format of ref is <applicationName>.<applicationInternalName>.<processType>.<processName>
        this.formRef = result.applicationName + '.' + result.applicationInternalName + '.casedata.' + this.customDataId;
        if (this.formConfig) {
          this.layout = this.formConfigService.getLayoutFromConfig(this.formRef, this.formConfig);
        }
        this.casedata$.next(this.casedata);
        this.summary$.next(this.summary);
        this.metadata$.next(this.metadata);
        this.schema$.next(this.schema);
      }, error => { this.errorMessage = 'Error retrieving case data: ' + error.error.errorMsg; });
  }

  ngOnInit() {
    this.refresh();
  }

}
