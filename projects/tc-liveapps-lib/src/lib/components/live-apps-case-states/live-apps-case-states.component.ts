import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {CaseTypeState, CaseTypeStatesList, Metadata} from '../../models/liveappsdata';
import {Subject} from 'rxjs';
import {LiveAppsService} from '../../services/live-apps.service';
import {map, take, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'tcla-live-apps-case-states',
  templateUrl: './live-apps-case-states.component.html',
  styleUrls: ['./live-apps-case-states.component.css']
})
export class LiveAppsCaseStatesComponent implements OnInit, OnDestroy {
  @Input() appId: string;
  @Input() sandboxId: number;

  public states: CaseTypeState[];
  public errorMessage: string;

  // use the _destroyed$/takeUntil pattern to avoid memory leaks if a response was never received
  private _destroyed$ = new Subject();

  public refresh = () => {
    this.liveapps.getCaseTypeStates(this.sandboxId, this.appId)
      .pipe(
        take(1),
        takeUntil(this._destroyed$),
        map(casestateslist => {
          this.states = casestateslist.states;
        })
      ).subscribe(
      null, error => { this.errorMessage = 'Error retrieving case states: ' + error.error.errorMsg; });
  }

  constructor(private liveapps: LiveAppsService) { }

  ngOnInit() {
    this.refresh();
  }

  ngOnDestroy(): void {
    this._destroyed$.next();
  }

}
