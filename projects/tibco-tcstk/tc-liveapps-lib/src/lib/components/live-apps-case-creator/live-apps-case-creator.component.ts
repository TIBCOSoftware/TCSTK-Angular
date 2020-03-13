import {Component, EventEmitter, Input, OnInit, Output, OnDestroy, SimpleChanges, OnChanges} from '@angular/core';
import {LiveAppsComponent} from '../live-apps-component/live-apps-component.component';
import {ProcessId} from '../../models/liveappsdata';
import {LaProcessSelection} from '../../models/tc-case-processes';
import {LiveAppsService} from '../../services/live-apps.service';
import {map, take, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {CustomFormDefs} from '@tibco-tcstk/tc-forms-lib';
import {FormConfig} from '../../models/tc-liveapps-config';
import {TcFormConfigService} from '../../services/tc-form-config.service';

/**
 * Handles rendering of case creator form.
 *
 *@example <tcla-live-apps-case-creator></tcla-live-apps-case-creator>
 */
@Component({
  selector: 'tcla-live-apps-case-creator',
  templateUrl: './live-apps-case-creator.component.html',
  styleUrls: ['./live-apps-case-creator.component.css']
})
export class LiveAppsCaseCreatorComponent extends LiveAppsComponent implements OnInit, OnChanges {
  /**
   * sandboxId - this comes from claims resolver
   */
  @Input() sandboxId: number;

  /**
   * LA application ID
   */
  @Input() applicationId: string;

  /**
   * The LA Application Type Id (generally 1)
   */
  @Input() typeId: string;

  /**
   * The process definition of the action or creator to execute
   */
  @Input() process: LaProcessSelection;

  /**
   * Data object that will be displayed on the form. Allows overriding over form data (eg. when selecting data in spotfire)
   */
  @Input() dataOverride: any;

  /**
   * Custom Form Layout Configuration
   */
  @Input() formConfig: FormConfig = this.formConfig ? this.formConfig : new FormConfig();

  /**
   * Custom Form configuration file
   */
  @Input() customFormDefs: CustomFormDefs;

  /**
   * Enable legacy creators
   */
  @Input() legacyCreators: boolean = this.legacyCreators ? this.legacyCreators : false;

  /**
   * Allow override of forms framework
   * Options: bootstrap-4 or material-design
   */
  @Input() formsFramework: string = this.formsFramework ? this.formsFramework : 'material-design';

  /**
   * ~event caseChanged : Case action started (process started)
   * ~payload ProcessId : ProcessId object passed when a case has been updated or created by a process (action/creator)
   */
  @Output() caseChanged: EventEmitter<ProcessId> = new EventEmitter<ProcessId>();

  data: any;
  schema: any;
  layout: any[];
  options: any;
  isCustomForm = false;
  formRef: any;

  public handleFormOpen = (event) => {
    this.formRef = event;
  }

  handleSubmit = (data, caseRef) => {
    // if no_process_submit then no need to run process as this was done inside a custom form app
    if (data !== 'NO_PROCESS_SUBMIT') {
      // run the process
      this.liveapps.runProcess(this.sandboxId, this.applicationId, this.process.process.id, caseRef, data)
        .pipe(
          take(1),
          takeUntil(this._destroyed$)
        )
        .subscribe(response => {
          if (response) {
            if (!response.data.errorMsg) {
              // parse data to object
              response.data = JSON.parse(response.data);
              // case created send back response including caseIdentifier if one is present
              let caseIdentifier;
              let caseReference;
              if (response.caseIdentifier) {
                caseIdentifier = response.caseIdentifier;
              }
              if (response.caseReference) {
                caseReference = response.caseReference;
              }
              const processResponse = new ProcessId().deserialize({'caseIdentifier': caseIdentifier, 'caseReference': caseReference});
              this.caseChanged.emit(processResponse);
              this.schema = undefined;
              this.data = undefined;
              this.layout = undefined;
            } else {
              console.error('Unable to run case creator');
              console.error(response.data.errorMsg);
            }
          }
        }, error => {
            console.error('Unable to run case creator');
            console.error(error);
          }
        );
    } else {
      const processResponse = new ProcessId().deserialize({'caseIdentifier': undefined, 'caseReference': undefined});
      this.caseChanged.emit(processResponse);
      this.schema = undefined;
      this.data = undefined;
      this.layout = undefined;
    }
  }

  handleLegacyProcessComplete = (event) => {
    // event.detail.destroy();
    const processResponse = new ProcessId().deserialize({'caseIdentifier': undefined, 'caseReference': undefined});
    this.formRef = undefined;
    this.caseChanged.emit(processResponse);
  }

  handleLegacyProcessCancelled = (event) => {
    // event.detail.destroy();
    // -1 for caseReference means cancelled
    const processResponse = new ProcessId().deserialize({'caseIdentifier': undefined, 'caseReference': '-1'});
    this.formRef.detail.form.destroy();
    this.formRef = undefined;
    this.caseChanged.emit(processResponse);
  }

  constructor(protected liveapps: LiveAppsService, protected formConfigService: TcFormConfigService) {
    super();
  }

  ngOnInit() {
    this.options = {
      defaultOptions: {
        'appearance': 'legacy'
      }
    };
  }

  initialize() {
    if (this.formConfig) {
      this.layout = this.formConfigService.getLayoutFromConfig(this.process.ref, this.formConfig);
    }
    if (this.customFormDefs && this.customFormDefs.customForms) {
      this.isCustomForm = (this.customFormDefs.customForms.findIndex((form) => {
        return (form === this.process.ref);
      }) !== -1);
    } else {
      this.isCustomForm = false;
    }
    if (this.process.process.jsonSchema.$schema === 'NOSCHEMA') {
      this.schema = undefined;
    } else {
      this.schema = this.process.process.jsonSchema;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    // handle input param changes
    /* if (changes.process && changes.process.currentValue && (changes.process.currentValue !== changes.process.previousValue)) {
      this.initialize(changes.process.currentValue);
    } else if (changes.applicationId && (changes.applicationId.currentValue !== changes.applicationId.previousValue)) {
      // appId has changed: make sure no process selected/form displayed
      this.process = undefined;
    }*/
    /*if (changes.layout && (changes.layout.currentValue !== changes.layout.previousValue)) {
      this.layout = changes.layout.currentValue;
    }*/
    if (changes.dataOverride && (changes.dataOverride.currentValue !== changes.dataOverride.previousValue)) {
      this.data = this.dataOverride;
    }

    if (this.process) {
      this.initialize();
    }

  }

}
