import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {LiveAppsService} from '../../services/live-apps.service';
import {CaseInfo, Metadata} from '../../models/liveappsdata';
import {map, take, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {LiveAppsComponent} from '../live-apps-component/live-apps-component.component';

@Component({
  selector: 'tcla-live-apps-case-data',
  templateUrl: './live-apps-case-data.component.html',
  styleUrls: ['./live-apps-case-data.component.css']
})
export class LiveAppsCaseDataComponent extends LiveAppsComponent implements OnInit {
  @Input() caseReference: string;
  @Input() appId: string;
  @Input() typeId: string;
  @Input() sandboxId: number;
  @Input() uiAppId: string;

  public casedata: any;
  public summary: any;
  public metadata: Metadata
  public errorMessage: string;

  constructor(private liveapps: LiveAppsService) {
    super();
  }

  public refresh = () => {
    this.liveapps.getCaseWithSummary(this.caseReference, this.sandboxId, this.uiAppId)
      .pipe(
        take(1),
        takeUntil(this._destroyed$),
        map(caseinfo => {
          this.casedata = caseinfo.untaggedCasedataObj;
          this.metadata = caseinfo.metadata;
          this.summary = caseinfo.summaryObj;
        })
      ).subscribe(
      null, error => { this.errorMessage = 'Error retrieving case data: ' + error.error.errorMsg; });
  }

  ngOnInit() {
    this.refresh();
  }

}
