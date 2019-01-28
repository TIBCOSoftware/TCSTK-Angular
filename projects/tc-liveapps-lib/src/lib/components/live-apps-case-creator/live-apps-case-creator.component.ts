import {Component, EventEmitter, Input, OnInit, Output, OnDestroy} from '@angular/core';
import {LiveAppsComponent} from '../../components/live-apps-component/live-apps-component.component';
import {LaProcessSelection} from '../../models/liveappsdata';
import {LiveAppsService} from '../../services/live-apps.service';
import {map, take, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'tcla-live-apps-case-creator',
  templateUrl: './live-apps-case-creator.component.html',
  styleUrls: ['./live-apps-case-creator.component.css']
})
export class LiveAppsCaseCreatorComponent extends LiveAppsComponent implements OnInit {
  @Input() sandboxId: number;
  @Input() applicationId: string;
  @Input() typeId: string;
  @Input() process: LaProcessSelection;
  @Output() caseCreated = new EventEmitter();

  data: any = {};
  schema: any;
  layout: any[] = [];

  handleSubmit = (data) => {
    // run the process
    this.liveapps.runProcess(this.sandboxId, this.applicationId, this.process.process.id, null, data)
      .pipe(
        take(1),
        takeUntil(this._destroyed$),
        map(response => {
          if (response) {
            if (!response.data.errorMsg) {
              // parse data to object
              response.data = JSON.parse(response.data);
              // case created send back response
              this.caseCreated.emit(response);
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

  constructor(private liveapps: LiveAppsService) {
    super();
  }

  ngOnInit() {
    this.schema = this.process.process.jsonSchema;
  }

}
