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
export class LiveAppsCaseAuditComponent extends LiveAppsComponent implements OnDestroy {

  @Input() caseRef: string;
  @Input() sandboxId: number;

  public auditEvents: AuditEvent[] = [];
  public errorMessage: string;
  public startat = undefined;
  public top = 20;
  public end = false;

  public refresh = () => {
    this.startat = undefined;
    this.top = 20;
    this.end = false;
    this.auditEvents = [];
    this.getAuditEvents(this.caseRef, this.sandboxId, this.startat, this.top);
  }

  public getAuditEvents = (caseRef: string, sandboxId: number, startAt: number, top: number) => {
    this.caseAuditService.getCaseAudit(this.caseRef, this.sandboxId, this.startat, this.top)
      .pipe(
        take(1),
        takeUntil(this._destroyed$),
        map(auditeventlist => {
          // this will strip any duplicates that may have been retrieved due to fast scrolling
          const filteredEvents = auditeventlist.auditevents.filter(x => this.auditEvents.every(y => y.key.value !== x.key.value))
          this.auditEvents = this.auditEvents.concat(filteredEvents);
          if (auditeventlist.auditevents.length < this.top) {
            this.end = true;
          } else {
            this.startat = auditeventlist.auditevents[auditeventlist.auditevents.length - 1].key.value;
          }
        })
      ).subscribe(
      null, error => {
        this.errorMessage = 'Error retrieving case audit: ' + error.error.errorMsg;
      });
  }

  public getNextBatch = (event) => {
    if (!this.end) {
      this.getAuditEvents(this.caseRef, this.sandboxId, this.startat, this.top);
    }
  }

  constructor(private caseAuditService: TcCaseAuditService) {
    super();
  }

}
