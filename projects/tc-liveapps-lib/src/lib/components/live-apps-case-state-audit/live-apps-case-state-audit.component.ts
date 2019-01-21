import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {LiveAppsService} from '../../services/live-apps.service';
import {Subject} from 'rxjs';
import {map, take, takeUntil} from 'rxjs/operators';
import {AuditEvent} from '../../models/liveappsdata';

@Component({
  selector: 'tcla-live-apps-case-state-audit',
  templateUrl: './live-apps-case-state-audit.component.html',
  styleUrls: ['./live-apps-case-state-audit.component.css']
})
export class LiveAppsCaseStateAuditComponent implements OnInit, OnDestroy {

  @Input() caseRef: string;
  @Input() sandboxId: number;

  public auditEvents: AuditEvent[];
  public errorMessage: string;

  // use the _destroyed$/takeUntil pattern to avoid memory leaks if a response was never received
  private _destroyed$ = new Subject();

  public refresh = () => {
    this.liveapps.getCaseStateAudit(this.caseRef, this.sandboxId)
      .pipe(
        take(1),
        takeUntil(this._destroyed$),
        map(auditeventlist => {
          this.auditEvents = auditeventlist.auditevents;
        })
      ).subscribe(
      null, error => { this.errorMessage = 'Error retrieving case audit: ' + error.error.errorMsg; });
  }

  constructor(private liveapps: LiveAppsService) { }

  ngOnInit() {
    this.refresh();
  }

  ngOnDestroy(): void {
    this._destroyed$.next();
  }

}
