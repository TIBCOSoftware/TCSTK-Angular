import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {LiveAppsCaseCreatorComponent} from '../live-apps-case-creator/live-apps-case-creator.component';
import {LiveAppsService} from '../../services/live-apps.service';
import {map, take, takeUntil} from 'rxjs/operators';
import {CaseType, ProcessId} from '../../models/liveappsdata';
import {LaProcessSelection} from '../../models/tc-case-processes';
import {LiveAppsLegacyProcessComponent} from '../live-apps-legacy-process/live-apps-legacy-process.component';
import {TcFormConfigService} from '../../services/tc-form-config.service';
import {LiveAppsFormConfig} from '../../models/tc-liveapps-form';
import {FormConfig, ProcessFormConfig} from '../../models/tc-liveapps-config';
import {LiveAppsFormWcComponent} from '../live-apps-form-wc/live-apps-form-wc.component';


/**
 * Wraps rendering an execution of an action
 *
 *@example <tcla-live-apps-case-action></tcla-live-apps-case-action>
 */

@Component({
  selector: 'tcla-live-apps-case-action',
  templateUrl: './live-apps-case-action.component.html',
  styleUrls: ['./live-apps-case-action.component.css']
})
export class LiveAppsCaseActionComponent extends LiveAppsCaseCreatorComponent implements OnInit, OnChanges {
  /**
   * The case reference
   */
  @Input() caseRef: string;

  /**
   * Whether to show the header bar in the widget - eg. favorites on home page (contains icon etc) - if off icons still appear without bar
   */
  @Input() showHeader: boolean;

  /**
   * Enable legacy actions
   */
  public legacyActions: boolean = false;
  @Input('legacyActions') set LegacyActions(legacyActions: boolean) {
    if (legacyActions){
      this.legacyActions = legacyActions;
    }
  }

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


  @ViewChild(LiveAppsLegacyProcessComponent, {static: false}) legacyProcessComponent: LiveAppsLegacyProcessComponent;
  @ViewChild('actionFormWc', {static: false}) actionFormWc: LiveAppsFormWcComponent;

  originalData: any;
  caseState: string;
  wcFormConfig: LiveAppsFormConfig;
  selectedFormConfig: ProcessFormConfig;

  private getMainCaseTypeFromSchema(typeId: string, process: LaProcessSelection): CaseType {
    let requestedType: CaseType;
    process.appSchema.casetypes.forEach((cType) => {
      if (cType.id === typeId) {
        requestedType = cType;
      }
    });
    return requestedType;
  }

  test = (event) => {
    console.log(event);
  }

  private getCaseData = (caseRef) => {
    // retrieve the case data for this case reference
    this.data = undefined;
    this.caseState = undefined;
    this.liveapps.getCase(this.caseRef, this.sandboxId, this.applicationId, this.typeId )
      .pipe(
        take(1),
        takeUntil(this._destroyed$)
      )
      .subscribe(result => {
        if (result.metadata.applicationId === this.applicationId.toString()) {
          const casedata = result.untaggedCasedataObj;
          this.caseState = casedata.state;
          this.originalData = {
            [this.process.process.name]: casedata
          };
          // JS: use name rather than internalObjectName to handle appliction name change
          const caseTypeName = this.getMainCaseTypeFromSchema(this.typeId, this.process).name;
          this.data = {
            [caseTypeName]: casedata
          };
        } else {
          console.error('The selected case is not the right case type for this action');
        }
      }, error => {
        // Emit any error retrieving case data to the parent
        console.error('Unable to retrieve case data');
        console.error(error);
      });
  }

  public cancelAction = () => {
    if (this.legacyProcessComponent) {
      this.legacyProcessComponent.cancelProcess();
    }
    if (this.actionFormWc) {
      this.actionFormWc.cancel();
    }
    if (this.formRef) {
      // this.formRef.detail.form.destroy();
      this.formRef.detail.form.invokeAction('cancel');
      this.formRef = undefined;
    }
  }

  constructor(protected lasvc: LiveAppsService, protected tcfcs: TcFormConfigService) {
    super(lasvc, tcfcs);
  }

  private buildWcFormConfig = (process: LaProcessSelection, selectedFormConfig: ProcessFormConfig, caseRef: string) => {
    this.wcFormConfig = new LiveAppsFormConfig().deserialize({
      type: 'action',
      id: process.action.id,
      sandbox: this.sandboxId.toString(),
      formDivId: 'actionDialogDiv',
      useCustomForm: (selectedFormConfig && selectedFormConfig.externalForm) ? selectedFormConfig.externalForm.toString() : false,
      name: process.action.name,
      label: process.action.label,
      version: process.action.version.toString(),
      applicationId: process.action.applicationId,
      applicationName: process.action.applicationName,
      activityId: process.action.activityId,
      activityName: process.action.activityName,
      caseRef: caseRef,
      formRef: process.ref
    });
  }

  ngOnInit() {
    // set default layout
    // this.layout = [];
  }

  ngOnChanges(changes: SimpleChanges) {
    // the extended class will detect change in the process and layout passed
    super.ngOnChanges(changes);

    // setup form config for WC forms
    if (this.legacyActions && this.formConfig && this.process && this.caseRef) {
      this.selectedFormConfig = TcFormConfigService.getProcessFormConfig(this.process.ref, this.formConfig);
      this.buildWcFormConfig(this.process, this.selectedFormConfig, this.caseRef);
    } else {
      // non WC forms:
      if (this.process && this.caseRef) {
        this.getCaseData(this.caseRef);
      }
    }
  }

}
