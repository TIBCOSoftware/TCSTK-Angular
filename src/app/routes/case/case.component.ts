import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {
  LiveAppsCaseDataComponent,
  LiveAppsCaseStatesComponent,
  LiveAppsCaseActionsComponent,
  LiveAppsCaseAuditComponent,
  LiveAppsCaseStateAuditComponent,
  LiveAppsService,
  LiveAppsNotesComponent,
  LiveAppsDocumentsComponent,
  Claim,
  Sandbox
} from 'tc-liveapps-lib';

import {map, take, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {UiAppConfig} from 'tc-core-lib';

@Component({
  selector: 'laapp-case',
  templateUrl: './case.component.html',
  styleUrls: ['./case.component.css']
})
export class CaseComponent implements OnInit {

  public appConfig: UiAppConfig;
  public claims: Claim;
  public sandbox: Sandbox;
  public caseRef: string;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    // read resolved config params
    this.appConfig = this.route.snapshot.data.appConfig;
    this.claims = this.route.snapshot.data.claims;
    this.sandbox = this.claims.primaryProductionSandbox;
    this.caseRef = this.route.snapshot.params['caseRef'];
  }

}
