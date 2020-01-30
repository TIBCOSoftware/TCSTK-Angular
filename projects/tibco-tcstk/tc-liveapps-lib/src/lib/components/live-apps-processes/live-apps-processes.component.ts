import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {LaProcessSelection} from '../../models/tc-case-processes';
import {CaseType, CaseTypesList, JsonSchema, Process} from '../../models/liveappsdata';
import {LiveAppsService} from '../../services/live-apps.service';
import {TcCaseProcessesService} from '../../services/tc-case-processes.service';


@Component({
  selector: 'tcla-live-apps-processes',
  templateUrl: './live-apps-processes.component.html',
  styleUrls: ['./live-apps-processes.component.css']
})
export class LiveAppsProcessesComponent implements OnChanges {

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
   * includeCaseDataPage - include case data page as process selection
   */
  @Input() includeCaseDataPage: boolean = this.includeCaseDataPage ? this.includeCaseDataPage : false;

  /**
   * ~event processClicked : Process selected
   * ~payload LaProcessSelection : LaProcessSelection object output when a process is clicked
   */
  @Output() processClicked: EventEmitter<Process> = new EventEmitter<Process>();

  caseType: CaseType;
  processes: Process[];
  selectedProcess: Process;

  constructor(protected liveapps: LiveAppsService) { }

  selectProcess = (process: Process) => {
    this.processClicked.emit(process);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.appId && this.typeId && this.sandboxId &&
      (changes.appId.currentValue !== changes.appId.previousValue
        || changes.typeId.currentValue !== changes.typeId.previousValue
        || changes.sandboxId.currentValue !== changes.sandboxId.previousValue)) {
      this.liveapps.getCaseTypeSchema(this.sandboxId, this.appId, 100).subscribe(
        (next: CaseTypesList) => {
          // should only get one main case type back as filtered for this appId
          const caseTypes = next.casetypes.filter(ct => {
            return ct.id === '1';
          });
          if (caseTypes && caseTypes.length > 0) {
            this.caseType = caseTypes[0];
            this.processes = [];
            if (this.includeCaseDataPage) {
              // Format of ref is <applicationName>.<applicationInternalName>.<processType>.<processName>
              const cdProcess = new Process().deserialize(
                {
                  jsonSchema: this.caseType.jsonSchema,
                  name: 'Data Page',
                  id: 'casedata',
                  formTag: this.caseType.applicationName + '.' + this.caseType.applicationInternalName + '.' + 'casedata.default',
                  processType: 'casedata',
                  unsupportedForm: false
                }
              );
              this.processes.push(cdProcess);
            }
            if (this.caseType.creators) {
              this.processes.push(...this.caseType.creators);
            }
            if (this.caseType.actions) {
              this.processes.push(...this.caseType.actions);
            }
          } else {
            console.error('No main case type returned for this application: ', next);
          }
        }
      );
    }
  }

}
