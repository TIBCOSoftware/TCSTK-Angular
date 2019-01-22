import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {LiveAppsService} from '../../services/live-apps.service';
import {Subject} from 'rxjs';
import {map, take, takeUntil} from 'rxjs/operators';
import {AuditEvent} from '../../models/liveappsdata';
import {LiveAppsComponent} from '../live-apps-component/live-apps-component.component';

@Component({
  selector: 'tcla-live-apps-case-audit',
  templateUrl: './live-apps-case-audit.component.html',
  styleUrls: ['./live-apps-case-audit.component.css']
})
export class LiveAppsCaseAuditComponent extends LiveAppsComponent implements OnInit, OnDestroy {

  @Input() caseRef: string;
  @Input() sandboxId: number;

  public auditEvents: AuditEvent[];
  public errorMessage: string;

  public refresh = () => {
    this.liveapps.getCaseAudit(this.caseRef, this.sandboxId)
      .pipe(
        take(1),
        takeUntil(this._destroyed$),
        map(auditeventlist => {
          this.auditEvents = auditeventlist.auditevents;
        })
      ).subscribe(
      null, error => { this.errorMessage = 'Error retrieving case audit: ' + error.error.errorMsg; });
  }

  constructor(private liveapps: LiveAppsService) {
    super();
  }

  ngOnInit() {
    this.refresh();
  }

}
