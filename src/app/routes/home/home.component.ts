import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {GeneralConfig, UiAppConfig} from 'tc-core-lib';
import {CaseRoute, CaseType, Claim, LiveAppsConfig, RouteAction} from 'tc-liveapps-lib';

@Component({
  selector: 'laapp-home',
  templateUrl: './templates/home.component.casemanager.html',
  // templateUrl: './templates/home.component.liveapps.html',
  // templateUrl: './templates/home.component.processdiscovery.html',
  // templateUrl: './templates/home.component.spotfireplay.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public generalConfig: GeneralConfig;
  public liveAppsConfig: LiveAppsConfig;
  private claims: Claim;
  public sandboxId: number;
  public selectedAppConfig: CaseType;
  public userName: string;
  public userId: string;
  public email: string;

  constructor(private router: Router, private route: ActivatedRoute) { }

  handleRouteAction = (routeAction: RouteAction) => {
    if (routeAction.action === 'caseClicked') {
      const caseRoute = new CaseRoute().deserialize(routeAction.context);
      // case clicked - navigate to case - note need to pass appId and caseId
      this.router.navigate(['/starterApp/case/' + caseRoute.appId + '/' + caseRoute.typeId + '/' + caseRoute.caseRef]);
    }
    if (routeAction.action === 'configClicked') {
      // route to config page
      this.router.navigate(['/starterApp/settings/']);

    }

  }

  ngOnInit() {
    this.generalConfig = this.route.snapshot.data.laConfigHolder.generalConfig;
    this.liveAppsConfig = this.route.snapshot.data.laConfigHolder.liveAppsConfig;
    this.claims = this.route.snapshot.data.claims;
    this.sandboxId = this.route.snapshot.data.claims.primaryProductionSandbox.id;
    this.userName = this.claims.firstName + ' ' + this.claims.lastName;
    this.email = this.claims.email;
    this.userId = this.claims.id;
  }

}
