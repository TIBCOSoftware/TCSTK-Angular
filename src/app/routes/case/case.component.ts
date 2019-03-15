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
  Sandbox, RouteAction, CaseRoute, LiveAppsConfig
} from 'tc-liveapps-lib';

import {map, take, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {GeneralConfig} from 'tc-core-lib';

@Component({
  selector: 'laapp-case',
  templateUrl: './case.component.html',
  styleUrls: ['./case.component.css']
})
export class CaseComponent implements OnInit {

  public generalConfig: GeneralConfig;
  public liveAppsConfig: LiveAppsConfig;
  public claims: Claim;
  public sandbox: Sandbox;
  public caseRef: string;
  public appId: string;
  public typeId: string;

  constructor(private router: Router, private route: ActivatedRoute) { }

  handleRouteAction = (routeAction: RouteAction) => {
    if (routeAction.action === 'backClicked') {
      // back clicked - navigate to home
      this.router.navigate(['/starterApp/home/']);
    }
    if (routeAction.action === 'configClicked') {
      // config clicked - route to config
      this.router.navigate(['/starterApp/settings/']);
    }
  }

  ngOnInit() {
    // read resolved config params
    this.generalConfig = this.route.snapshot.data.laConfigHolder.generalConfig;
    this.liveAppsConfig = this.route.snapshot.data.laConfigHolder.liveAppsConfig;
    this.claims = this.route.snapshot.data.claims;
    this.sandbox = this.claims.primaryProductionSandbox;
    this.caseRef = this.route.snapshot.params['caseRef'];
    this.appId = this.route.snapshot.params['appId'];
    this.typeId = this.route.snapshot.params['typeId'];
  }

}
