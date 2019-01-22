import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {LiveAppsService} from '../../services/live-apps.service';
import {map, take, takeUntil} from 'rxjs/operators';
import {CaseAction} from '../../models/liveappsdata';
import {LiveAppsComponent} from '../live-apps-component/live-apps-component.component';

@Component({
  selector: 'tcla-live-apps-case-actions',
  templateUrl: './live-apps-case-actions.component.html',
  styleUrls: ['./live-apps-case-actions.component.css']
})
export class LiveAppsCaseActionsComponent extends LiveAppsComponent implements OnInit {
  @Input() caseReference: string;
  @Input() appId: string;
  @Input() typeId: string;
  @Input() sandboxId: number;
  @Input() caseState: string;

  public caseactions: CaseAction[];
  public errorMessage: string;

  public refresh = () => {
    this.liveapps.getCaseActions(this.caseReference, this.sandboxId, this.appId, this.typeId, this.caseState)
      .pipe(
        take(1),
        takeUntil(this._destroyed$),
        map(caseactions => {
          this.caseactions = caseactions.actions;
        })
      ).subscribe(
      null, error => { this.errorMessage = 'Error retrieving case actions: ' + error.error.errorMsg; });
  }

  constructor(private liveapps: LiveAppsService) {
    super();
  }

  ngOnInit() {
    this.refresh();
  }

}
