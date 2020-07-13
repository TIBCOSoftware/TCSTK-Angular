import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ProcessId} from '../../models/liveappsdata';
import {LaProcessSelection} from '../../models/tc-case-processes';
import {LiveAppsCreatorSelectorComponent} from '../live-apps-creator-selector/live-apps-creator-selector.component';
import {CustomFormDefs} from '@tibco-tcstk/tc-forms-lib';
import {FormConfig, ProcessFormConfig} from '../../models/tc-liveapps-config';
import {TcFormConfigService} from '../../services/tc-form-config.service';
import {LiveAppsFormConfig} from '../../models/tc-liveapps-form';

/**
 * Wraps case creator selection and execution of creator
 *
 *@example <tcla-live-apps-creators></tcla-live-apps-creators>
 */

@Component({
  selector: 'tcla-live-apps-creators',
  templateUrl: './live-apps-creators.component.html',
  styleUrls: ['./live-apps-creators.component.css']
})
export class LiveAppsCreatorsComponent implements OnInit {
  @ViewChild('creatorSelector', {static: false}) creatorSelector: LiveAppsCreatorSelectorComponent;
  /**
   * sandboxId - this comes from claims resolver
   */
  @Input() sandboxId: number;

  /**
   * lA appId ??
   */
  @Input() applicationId: string;

  /**
   * The LA Application Type Id (generally 1)
   */
  @Input() typeId: string;

  /**
   * Data object that will be displayed on the form. Allows overriding over form data (eg. when selecting data in spotfire)
   */
  @Input() dataOverride: any;

  /**
   * Custom Form Layout Configuration
   */
  @Input() formConfig: FormConfig;

  /**
   * Custom Form configuration file
   */
  @Input() customFormDefs: CustomFormDefs;

  /**
   * Enable legacy creators
   */
  public legacyCreators: boolean = false;
  @Input('legacyCreators') set LegacyCreators(legacyCreators: boolean) {
    if (legacyCreators){
      this.legacyCreators = legacyCreators;
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


  /**
   * ~event caseCreated : Case Creator started (process started)
   * ~payload ProcessId : ProcessId object output on case creation (details of process started)
   */
  @Output() caseCreated: EventEmitter<ProcessId> = new EventEmitter<ProcessId>();

  selectedProcess: LaProcessSelection;
  selectedFormConfig: ProcessFormConfig;
  wcFormConfig: LiveAppsFormConfig;

  // handle form submit
  handleSubmit = (event: any) => {
    this.caseCreated.emit(event);
    /*if (this.creatorSelector) {
      this.creatorSelector.reset();
    }*/
  }

  // handle case creator selection
  handleCreatorSelection = (process: LaProcessSelection) => {
    this.selectedProcess = process;
    this.selectedFormConfig = TcFormConfigService.getProcessFormConfig(process.ref, this.formConfig);
    if (this.legacyCreators) {
      this.wcFormConfig = new LiveAppsFormConfig().deserialize({
        type: 'creator',
        id: process.creator.id,
        sandbox: this.sandboxId.toString(),
        formDivId: 'creatorDialogDiv',
        useCustomForm: (this.selectedFormConfig && this.selectedFormConfig.externalForm) ? this.selectedFormConfig.externalForm.toString() : false,
        name: process.creator.name,
        label: process.creator.label,
        version: process.creator.version.toString(),
        applicationId: process.creator.applicationId,
        applicationName: process.creator.applicationName,
        activityId: process.creator.activityId,
        activityName: process.creator.activityName,
        formRef: process.ref
      });
    }
  }

  constructor() { }

  ngOnInit() {
    console.log(this.applicationId);
  }

}
