import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {map, take, takeUntil} from 'rxjs/operators';
import {AuditEvent} from '../../models/tc-case-audit';
import {LiveAppsComponent} from '../live-apps-component/live-apps-component.component';
import {TcCaseStatesService} from '../../services/tc-case-states.service';
import {StateAuditEvent} from '../../models/tc-case-states';


/**
 * Provides case audit summary for states
 *
 * ![alt-text](../live-apps-case-state-audit.png "Image")
 *
 *@example <tcla-live-apps-case-state-audit></tcla-live-apps-case-state-audit>
 */
@Component({
  selector: 'tcla-live-apps-case-state-audit',
  templateUrl: './live-apps-case-state-audit.component.html',
  styleUrls: ['./live-apps-case-state-audit.component.css']
})
export class LiveAppsCaseStateAuditComponent extends LiveAppsComponent implements OnInit {

  /**
   * The case reference
   */
  @Input() caseRef: string;

  /**
   * sandboxId - this comes from claims resolver
   */
  @Input() sandboxId: number;

  /**
   * The LA Application Id
   */
  @Input() appId: string;

  public auditEvents: StateAuditEvent[];
  public errorMessage: string;


  constructor(protected caseStatesService: TcCaseStatesService) {
    super();
  }

  public refresh = () => {
    this.caseStatesService.getCaseStateAuditWithTerminal(this.caseRef, this.sandboxId, this.appId)
      .pipe(
        take(1),
        takeUntil(this._destroyed$)
      ).subscribe(
      auditeventlist => {
        this.auditEvents = auditeventlist.auditEvents;
        if (!this.auditEvents || this.auditEvents.length <= 0) {
          console.error('Unable to create states audit view. Case Audit likely removed due to subscription retention period.');
        }
      }, error => { this.errorMessage = 'Error retrieving case audit: ' + error.error.errorMsg; });
  }

  ngOnInit() {
    this.refresh();
  }
}
