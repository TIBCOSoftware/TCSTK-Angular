import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LiveAppsCaseDataComponent} from '../../tibco-cloud-components/live-apps-case-data/live-apps-case-data.component';
import {LiveAppsCaseStatesComponent} from '../../tibco-cloud-components/live-apps-case-states/live-apps-case-states.component';
import {LiveAppsCaseActionsComponent} from '../../tibco-cloud-components/live-apps-case-actions/live-apps-case-actions.component';
import {LiveAppsCaseAuditComponent} from '../../tibco-cloud-components/live-apps-case-audit/live-apps-case-audit.component';
import {LiveAppsCaseStateAuditComponent} from '../../tibco-cloud-components/live-apps-case-state-audit/live-apps-case-state-audit.component';
import {LiveAppsService} from '../../../services/live-apps.service';
import {map, take, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {LiveAppsNotesComponent} from '../../tibco-cloud-components/live-apps-notes/live-apps-notes.component';
import {LiveAppsDocumentsComponent} from '../../tibco-cloud-components/live-apps-documents/live-apps-documents.component';
import {Claim, Sandbox} from '../../../models/liveappsdata';

@Component({
  selector: 'app-case',
  templateUrl: './case.component.html',
  styleUrls: ['./case.component.css']
})
export class CaseComponent implements OnInit, OnDestroy {
  // The ViewChild declarations give access to components marked on the template so that I can call public functions like refresh
  @ViewChild(LiveAppsCaseDataComponent) caseDataComponent: LiveAppsCaseDataComponent;
  @ViewChild(LiveAppsCaseStatesComponent) caseStatesComponent: LiveAppsCaseStatesComponent;
  @ViewChild(LiveAppsCaseActionsComponent) caseActionsComponent: LiveAppsCaseActionsComponent;
  @ViewChild(LiveAppsCaseAuditComponent) caseAuditComponent: LiveAppsCaseAuditComponent;
  @ViewChild(LiveAppsCaseStateAuditComponent) caseStateAuditComponent: LiveAppsCaseStateAuditComponent;
  @ViewChild(LiveAppsDocumentsComponent) caseDocumentsComponent: LiveAppsDocumentsComponent;
  @ViewChild(LiveAppsNotesComponent) caseNotesComponent: LiveAppsNotesComponent;

  private appConfig;
  private claims: Claim;
  private sandbox: Sandbox;
  caseRef: string;
  isFavorite: boolean;
  valid = false;

  // use the _destroyed$/takeUntil pattern to avoid memory leaks if a response was never received
  private _destroyed$ = new Subject();
  private errorMessage: string;

  constructor(private router: Router, private route: ActivatedRoute, private liveapps: LiveAppsService) { }

  public refresh = () => {
    if (this.caseDataComponent) {
      this.caseDataComponent.refresh();
    }
    if (this.caseStatesComponent) {
      this.caseStatesComponent.refresh();
    }
    if (this.caseActionsComponent) {
      this.caseActionsComponent.refresh();
    }
    if (this.caseAuditComponent) {
      this.caseAuditComponent.refresh();
    }
    if (this.caseStatesComponent) {
      this.caseStatesComponent.refresh();
    }
    if (this.caseDocumentsComponent) {
      this.caseDocumentsComponent.refresh();
    }
    if (this.caseNotesComponent) {
      this.caseNotesComponent.refresh();
    }
  }

  public toggleFavorite = () => {
    this.liveapps.setFavoriteCase(this.caseRef, this.appConfig.uiAppId, this.appConfig.sandboxId);
    this.isFavorite = !this.isFavorite;
  }

  ngOnInit() {
    // read resolved config params
    this.appConfig = this.route.snapshot.data.appConfig;
    this.claims = this.route.snapshot.data.claims;
    this.sandbox = this.claims.primaryProductionSandbox;
    this.caseRef = this.route.snapshot.params['caseRef'];
    if (!isNaN(Number(this.caseRef))) {
      this.liveapps.setRecentCase(this.caseRef, this.appConfig.uiAppId, this.appConfig.sandboxId);
      this.valid = true;
    }
    this.liveapps.isFavoriteCase(this.caseRef, this.appConfig.uiAppId, this.appConfig.sandboxId)
      .pipe(
        take(1),
        takeUntil(this._destroyed$),
        map(result => this.isFavorite = result))
      .subscribe(
        null, error => { this.errorMessage = 'Error retrieving isFavorite: ' + error.error.errorMsg; }
        );
  }

  ngOnDestroy(): void {
    this._destroyed$.next();
  }

}
