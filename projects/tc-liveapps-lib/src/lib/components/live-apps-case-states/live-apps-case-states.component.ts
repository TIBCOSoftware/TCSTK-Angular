import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {CaseTypeState, CaseTypeStatesList, Metadata} from '../../models/liveappsdata';
import {Subject} from 'rxjs';
import {LiveAppsService} from '../../services/live-apps.service';
import {map, take, takeUntil} from 'rxjs/operators';
import {LiveAppsComponent} from '../live-apps-component/live-apps-component.component';
import {StateTracker} from '../../models/tc-case-states';
import {TcCaseStatesService} from '../../services/tc-case-states.service';

@Component({
  selector: 'tcla-live-apps-case-states',
  templateUrl: './live-apps-case-states.component.html',
  styleUrls: ['./live-apps-case-states.component.css']
})
export class LiveAppsCaseStatesComponent extends LiveAppsComponent implements OnInit {
  @Input() appId: string;
  @Input() sandboxId: number;
  @Input() caseRef: string;

  public states: CaseTypeState[];
  public tracker: StateTracker;
  public errorMessage: string;

  public refresh = () => {
    this.caseStatesService.getTracker(this.caseRef, this.sandboxId, this.appId).pipe(
      take(1),
      takeUntil(this._destroyed$),
      map(tracker => {
        this.tracker = tracker;
        return tracker;
      }
        )
    ).subscribe(
      null, error => { this.errorMessage = 'Error constructing state tracker: ' + error.error.errorMsg; });
  }

  constructor(private caseStatesService: TcCaseStatesService) {
    super();
  }

  ngOnInit() {
    this.refresh();
  }

}
