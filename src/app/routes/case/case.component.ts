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
  Sandbox, RouteAction, CaseRoute
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
  public appId: string;

  constructor(private router: Router, private route: ActivatedRoute) { }

  handleRouteAction = (routeAction: RouteAction) => {
    if (routeAction.action === 'backClicked') {
      // back clicked - navigate to home
      this.router.navigate(['/starterApp/home/']);
    }
  }

  ngOnInit() {
    // read resolved config params
    this.appConfig = this.route.snapshot.data.appConfig;
    this.claims = this.route.snapshot.data.claims;
    this.sandbox = this.claims.primaryProductionSandbox;
    this.caseRef = this.route.snapshot.params['caseRef'];
    this.appId = this.route.snapshot.params['appId'];
  }

}
