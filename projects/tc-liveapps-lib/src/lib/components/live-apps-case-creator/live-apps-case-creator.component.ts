import {Component, EventEmitter, Input, OnInit, Output, OnDestroy, SimpleChanges, OnChanges} from '@angular/core';
import {LiveAppsComponent} from '../../components/live-apps-component/live-apps-component.component';
import {LaProcessSelection, ProcessId} from '../../models/liveappsdata';
import {LiveAppsService} from '../../services/live-apps.service';
import {map, take, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'tcla-live-apps-case-creator',
  templateUrl: './live-apps-case-creator.component.html',
  styleUrls: ['./live-apps-case-creator.component.css']
})
export class LiveAppsCaseCreatorComponent extends LiveAppsComponent implements OnInit, OnChanges {
  @Input() sandboxId: number;
  @Input() applicationId: string;
  @Input() typeId: string;
  @Input() process: LaProcessSelection;
  @Output() caseCreated: EventEmitter<ProcessId> = new EventEmitter<ProcessId>();

  data: any;
  schema: any;
  layout: any[];

  handleSubmit = (data, caseRef) => {
    // run the process
    this.liveapps.runProcess(this.sandboxId, this.applicationId, this.process.process.id, caseRef, data)
      .pipe(
        take(1),
        takeUntil(this._destroyed$),
        map(response => {
          if (response) {
            if (!response.data.errorMsg) {
              // parse data to object
              response.data = JSON.parse(response.data);
              // case created send back response including caseIdentifier if one is present - otherwise return -1
              let caseIdentifier;
              let caseReference;
              if (response.caseIdentifier) {
                caseIdentifier = response.caseIdentifier;
              }
              if (response.caseReference) {
                caseReference = response.caseReference;
              }
              const processResponse = new ProcessId().deserialize({'caseIdentifier': caseIdentifier, 'caseReference': caseReference });
              this.caseCreated.emit(processResponse);
              this.schema = undefined;
              this.data = undefined;
              this.layout = undefined;
            } else {
              console.error('Unable to run case creator');
              console.error(response.data.errorMsg);
            }
          }
        })
      )
      .subscribe(success => success, error => {
          console.error('Unable to run case creator');
          console.error(error);
        }
      );
  }

  constructor(protected liveapps: LiveAppsService) {
    super();
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    // handle input param changes
    if (changes.process && (changes.process.currentValue !== changes.process.previousValue)) {
      this.schema = changes.process.currentValue.process.jsonSchema;
    }
  }

}
