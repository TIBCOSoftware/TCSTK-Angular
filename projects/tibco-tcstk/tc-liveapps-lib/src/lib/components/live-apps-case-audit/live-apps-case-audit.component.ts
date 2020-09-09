import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {map, take, takeUntil} from 'rxjs/operators';
import {AuditEvent} from '../../models/tc-case-audit';
import {LiveAppsComponent} from '../live-apps-component/live-apps-component.component';
import { TcCaseAuditService, OrderBy, CaseTypeAudit} from '../../services/tc-case-audit.service';

/**
 * Render audit trail for a case
 *
 *  ![alt-text](../live-apps-case-audit.png "Image")
 *
 *@example <tcla-live-apps-case-audit></tcla-live-apps-case-audit>
 */
@Component({
  selector: 'tcla-live-apps-case-audit',
  templateUrl: './live-apps-case-audit.component.html',
  styleUrls: ['./live-apps-case-audit.component.css']
})
export class LiveAppsCaseAuditComponent extends LiveAppsComponent implements OnDestroy {

  /**
   * The case reference
   */
  @Input() caseRef: string;

  /**
   * sandboxId - this comes from claims resolver
   */
  @Input() sandboxId: number;

  /**
   * creationTime - specify the date to include cases from using the format yyyy-mm-ddTHH:MM:SS.sssZ
   */
  @Input() creationTime: string;

  /**
   * caseType - speficy the type of the case
   */
  @Input() caseType: CaseTypeAudit;

  /**
   * orderBy - specify ascending or descending order
   */
  @Input() orderby: OrderBy;

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
    this.getAuditEvents(this.caseRef, this.sandboxId, this.startat, this.top, this.creationTime, this.caseType, this.orderby);
  }

  public getAuditEvents = (caseRef: string, sandboxId: number, startAt: number, top: number,
    creationTime: string, caseType: CaseTypeAudit, orderBy: OrderBy) => {
    this.caseAuditService.getCaseAudit(this.caseRef, this.sandboxId, this.startat, this.top, this.creationTime, this.caseType, this.orderby)
      .pipe(
        take(1),
        takeUntil(this._destroyed$)
      ).subscribe(
      auditeventlist => {
        // this will strip any duplicates that may have been retrieved due to fast scrolling
        const filteredEvents = auditeventlist.auditevents.filter(x => this.auditEvents.every(y => y.key.value !== x.key.value))
        this.auditEvents = this.auditEvents.concat(filteredEvents);
        if (auditeventlist.auditevents.length < this.top) {
          this.end = true;
        } else {
          this.startat = auditeventlist.auditevents[auditeventlist.auditevents.length - 1].key.value;
        }
      }, error => {
        this.errorMessage = 'Error retrieving case audit: ' + error.error.errorMsg;
      });
  }

  public getNextBatch = (event) => {
    if (!this.end) {
      this.getAuditEvents(this.caseRef, this.sandboxId, this.startat, this.top, this.creationTime, this.caseType, this.orderby);
    }
  }

  constructor(protected caseAuditService: TcCaseAuditService) {
    super();
  }

}