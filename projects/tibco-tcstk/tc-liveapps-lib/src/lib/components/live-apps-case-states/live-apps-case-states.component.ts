import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {CaseTypeState, CaseTypeStatesList, Metadata} from '../../models/liveappsdata';
import {Subject} from 'rxjs';
import {LiveAppsService} from '../../services/live-apps.service';
import {map, take, takeUntil} from 'rxjs/operators';
import {LiveAppsComponent} from '../live-apps-component/live-apps-component.component';
import {StateTracker, TrackerState} from '../../models/tc-case-states';
import {TcCaseStatesService} from '../../services/tc-case-states.service';
import {DurationSincePipe} from '@tibcosoftware/tc-core-lib';


/**
 * Case States/Milestone view
 *
 * ![alt-text](../live-apps-case-states.png "Image")
 *
 *@example <tcla-live-apps-case-states></tcla-live-apps-case-states>
 */
@Component({
  selector: 'tcla-live-apps-case-states',
  templateUrl: './live-apps-case-states.component.html',
  styleUrls: ['./live-apps-case-states.component.css']
})
export class LiveAppsCaseStatesComponent extends LiveAppsComponent implements OnInit {
  /**
   * The LA Application Id
   */
  @Input() appId: string;

  /**
   * sandboxId - this comes from claims resolver
   */
  @Input() sandboxId: number;

  /**
   * The case reference
   */
  @Input() caseRef: string;

  /**
   * Small rendering vs normal - defaults to normal
   */
  @Input() small: boolean;

  /**
   * Hide milestone title - default false
   */
  @Input() hideTitle: boolean;


  public states: CaseTypeState[];
  public tracker: StateTracker;
  public errorMessage: string;

  public getToolTipText = (trackerState: TrackerState): string => {
    let toolTipText = '';
    if (trackerState.status !== 'pending') {
      toolTipText = toolTipText + trackerState.user + ' ' + this.durationSince.transform(trackerState.changed);
    }
    return toolTipText;
  }

  public refresh = () => {
    this.caseStatesService.getTracker(this.caseRef, this.sandboxId, this.appId).pipe(
      take(1),
      takeUntil(this._destroyed$)
    ).subscribe(
      tracker => {
        this.tracker = tracker;
        if (!tracker.valid) {
          console.error('Unable to create milestone trailer. Case Audit likely removed due to subscription retention period.');
        }
        return tracker;
      }, error => { this.errorMessage = 'Error constructing state tracker: ' + error.error.errorMsg; });
  }

  constructor(protected caseStatesService: TcCaseStatesService, protected durationSince: DurationSincePipe) {
    super();
  }

  ngOnInit() {
    this.refresh();
  }

}
