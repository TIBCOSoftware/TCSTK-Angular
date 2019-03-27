import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {LiveAppsService} from '../../services/live-apps.service';
import {Subject} from 'rxjs';
import {map, take, takeUntil} from 'rxjs/operators';
import {CaseList, CaseRoute} from '../../models/liveappsdata';
import {LiveAppsComponent} from '../live-apps-component/live-apps-component.component';

@Component({
  selector: 'tcla-live-apps-recent-cases',
  templateUrl: './live-apps-recent-cases.component.html',
  styleUrls: ['./live-apps-recent-cases.component.css']
})
export class LiveAppsRecentCasesComponent extends LiveAppsComponent implements OnInit {
  @Input() sandboxId: number;
  @Input() uiAppId: string;
  @Input() displayType: string = this.displayType ? this.displayType : 'miniCard'; // miniCard, card, list
  @Output() clickCase: EventEmitter<CaseRoute> = new EventEmitter<CaseRoute>();

  public recentCases: string[];
  public errorMessage: string;

  public clickCaseAction = (caseRoute: CaseRoute) => {
    this.clickCase.emit(caseRoute);
  }

  public refresh = () => {
    this.recentCases = [];
    this.liveapps.getRecentCases(this.uiAppId, this.sandboxId)
      .pipe(
        take(1),
        takeUntil(this._destroyed$),
        map(recentCases => {
          this.recentCases = recentCases.caseRefs || [];
        })
      ).subscribe(
      null, error => { this.errorMessage = 'Error retrieving recent cases: ' + error.error.errorMsg; });
  }

  public clearRecentCases = () => {
    // -1 will clear recent cases
    this.liveapps.setRecentCase('-1', this.uiAppId, this.sandboxId);
    this.recentCases = [];
  }

  public handleDeleted = (caseRef: string) => {
    this.recentCases.splice(this.recentCases.indexOf(caseRef), 1);
    this.liveapps.unsetRecentCase(caseRef, this.uiAppId, this.sandboxId);
  }

  constructor(private liveapps: LiveAppsService) {
    super();
  }

  ngOnInit() {
    this.refresh();
  }

}
