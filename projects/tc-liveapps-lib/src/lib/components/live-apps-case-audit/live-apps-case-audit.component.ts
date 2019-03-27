import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {map, take, takeUntil} from 'rxjs/operators';
import {AuditEvent} from '../../models/tc-case-audit';
import {LiveAppsComponent} from '../live-apps-component/live-apps-component.component';
import {TcCaseAuditService} from '../../services/tc-case-audit.service';

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
    this.caseAuditService.getCaseAudit(this.caseRef, this.sandboxId, 0, 100)
      .pipe(
        take(1),
        takeUntil(this._destroyed$),
        map(auditeventlist => {
          this.auditEvents = auditeventlist.auditevents;
        })
      ).subscribe(
      null, error => { this.errorMessage = 'Error retrieving case audit: ' + error.error.errorMsg; });
  }

  constructor(private caseAuditService: TcCaseAuditService) {
    super();
  }

  ngOnInit() {
    this.refresh();
  }

}
