import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {map, take, takeUntil} from 'rxjs/operators';
import {AuditEvent} from '../../models/liveappsdata';
import {LiveAppsComponent} from '../live-apps-component/live-apps-component.component';
import {TcCaseStatesService} from '../../services/tc-case-states.service';
import {StateAuditEvent} from '../../models/tc-case-states';

@Component({
  selector: 'tcla-live-apps-case-state-audit',
  templateUrl: './live-apps-case-state-audit.component.html',
  styleUrls: ['./live-apps-case-state-audit.component.css']
})
export class LiveAppsCaseStateAuditComponent extends LiveAppsComponent implements OnInit {

  @Input() caseRef: string;
  @Input() sandboxId: number;

  public auditEvents: StateAuditEvent[];
  public errorMessage: string;


  constructor(private caseStatesService: TcCaseStatesService) {
    super();
  }

  public refresh = () => {
    this.caseStatesService.getCaseStateAudit(this.caseRef, this.sandboxId)
      .pipe(
        take(1),
        takeUntil(this._destroyed$),
        map(auditeventlist => {
          this.auditEvents = auditeventlist.auditEvents;
        })
      ).subscribe(
      null, error => { this.errorMessage = 'Error retrieving case audit: ' + error.error.errorMsg; });
  }

  ngOnInit() {
    this.refresh();
  }

}
