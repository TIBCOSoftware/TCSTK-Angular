import {Component, EventEmitter, Input, Output, OnDestroy, SimpleChanges, OnChanges, OnInit} from '@angular/core';
import {LiveAppsComponent} from '../live-apps-component/live-apps-component.component';
import {CaseCreator, Process, ProcessId} from '../../models/liveappsdata';
import {LiveAppsService} from '../../services/live-apps.service';
import {take, takeUntil} from 'rxjs/operators';
import {TcCaseProcessesService} from '../../services/tc-case-processes.service';
import {TcCaseDataService} from '../../services/tc-case-data.service';

/**
 * Handles rendering of case creator form.
 *
 *@example <tcla-live-apps-case-creator></tcla-live-apps-case-creator>
 */

@Component({
  selector: 'tcla-live-apps-creator-standalone',
  templateUrl: './live-apps-creator-standalone.component.html',
  styleUrls: ['./live-apps-creator-standalone.component.css']
})
export class LiveAppsCreatorStandaloneComponent extends LiveAppsComponent implements OnChanges, OnInit {

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
  @Input() processName: string;

  /**
   * Data object that will be displayed on the form. Allows overriding over form data (eg. when selecting data in spotfire)
   */
  @Input() dataOverride: any;

  /**
   * Custom Form tag if using an external form app
   */
  @Input() customFormTag: string;

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
  @Output() caseCreated: EventEmitter<ProcessId> = new EventEmitter<ProcessId>();

  data: any;
  layout: any[];
  options: any;
  process: Process;
  isCustomForm = false;
  customFormDefs: any;
  useLegacy = false;

  handleSubmit = (data, caseRef) => {
    // if no_process_submit then no need to run process as this was done inside a custom form app
    if (data !== 'NO_PROCESS_SUBMIT') {
      // run the process
      this.liveapps.runProcess(this.sandboxId, this.applicationId, this.process.id, caseRef, data)
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
                this.caseCreated.emit(processResponse);
                this.process = undefined;
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
      this.caseCreated.emit(processResponse);
      this.process = undefined;
      this.data = undefined;
      this.layout = undefined;
    }
  }

  handleLegacyProcessComplete = () => {
    const processResponse = new ProcessId().deserialize({'caseIdentifier': undefined, 'caseReference': undefined});
    this.caseCreated.emit(processResponse);
  }

  handleLegacyProcessCancelled = () => {
    // -1 for caseReference means cancelled
    const processResponse = new ProcessId().deserialize({'caseIdentifier': undefined, 'caseReference': '-1'});
    this.caseCreated.emit(processResponse);
  }

  constructor(protected liveapps: LiveAppsService, protected processesService: TcCaseProcessesService, protected caseDataService: TcCaseDataService) {
    super();
  }

  ngOnInit() {
    this.options = {
      defaultOptions: {
        'appearance': 'legacy'
      }
    };
  }

  ngOnChanges(changes: SimpleChanges) {
    // initialize once data is available
    if (this.applicationId && this.processName && this.typeId && this.sandboxId) {
      if (this.legacyCreators) {
        // use legacy creator iframe
        this.useLegacy = this.legacyCreators;
      }
      // use rendered form
      if (this.customFormTag) {
        // use custom form
        this.customFormDefs = { customForms: [this.customFormTag] };
      }
      // get schema
      this.processesService.getProcess(this.sandboxId, this.applicationId, this.typeId, this.processName, 'creator').subscribe(
        next => {
          this.process = next;
        },
        error => {
          console.error('Unable to get creator info');
          console.error(error);
        }
      );
    }
  }

}
