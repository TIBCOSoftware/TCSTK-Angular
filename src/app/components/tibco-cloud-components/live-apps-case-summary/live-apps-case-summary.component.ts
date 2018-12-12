import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {LiveAppsService} from '../../../services/live-apps.service';
import {CaseInfo, Metadata} from '../../../models/liveappsdata';
import {map, take, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {Meta} from '@angular/platform-browser';

@Component({
  selector: 'app-live-apps-case-summary',
  templateUrl: './live-apps-case-summary.component.html',
  styleUrls: ['./live-apps-case-summary.component.css']
})
export class LiveAppsCaseSummaryComponent implements OnInit, OnDestroy {
  @Input() caseReference: string;
  @Input() sandboxId: number;
  @Input() appId: string;
  @Input() typeId: string;
  @Input() miniCard: boolean;
  @Output() openCase = new EventEmitter;

  // use the _destroyed$/takeUntil pattern to avoid memory leaks if a response was never received
  private _destroyed$ = new Subject();

  private casedata: any;
  private summary: any;
  private summaryKeys: string[];
  private summaryValues: string[];
  private metadata: Metadata;

  private clickCase = () => {
    this.openCase.emit(this.caseReference);
  }

  constructor(private liveapps: LiveAppsService) { }

  ngOnInit() {
    this.liveapps.getCaseWithSummary(this.caseReference, this.sandboxId, this.appId, this.typeId)
      .pipe(
        take(1),
        takeUntil(this._destroyed$),
        map(caseinfo => {
          this.casedata = caseinfo.untaggedCasedataObj;
          this.metadata = caseinfo.metadata;
          this.summary = caseinfo.summaryObj;
          this.summaryKeys = Object.keys(this.summary);
          this.summaryValues = Object.values(this.summary);
        })
      ).subscribe(
      null, error => { this.errorMessage = 'Error retrieving case data: ' + error.error.errorMsg; });
  }

  ngOnDestroy(): void {
    this._destroyed$.next();
  }

}
