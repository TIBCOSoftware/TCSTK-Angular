import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {GeneralConfig, UiAppConfig, RouteAction, Claim} from 'tc-core-lib';
import {CaseRoute, CaseType, LiveAppsConfig} from 'tc-liveapps-lib';

@Component({
  selector: 'laapp-casecockpit',
  templateUrl: './templates/casesearch.component.checkworkflowmonitor.html',
  styleUrls: ['./casesearch.component.css']
})
export class CasesearchComponent implements OnInit {
  public generalConfig: GeneralConfig;
  public liveAppsConfig: LiveAppsConfig;
  private claims: Claim;
  public sandboxId: number;
  public selectedAppConfig: CaseType;
  public userName: string;
  public userId: string;
  public email: string;

  public welcomeMessage: string;

  constructor(private router: Router, private route: ActivatedRoute) { }

  handleRouteAction = (routeAction: RouteAction) => {
    if (routeAction.action === 'caseClicked') {
      const caseRoute = new CaseRoute().deserialize(routeAction.context);
      // case clicked - navigate to case - note need to pass appId and caseId
      this.router.navigate(['/starterApp/case/' + caseRoute.appId + '/' + caseRoute.typeId + '/' + caseRoute.caseRef]);
    }
    if (routeAction.action === 'configClicked') {
      // route to config page
      this.router.navigate(['/starterApp/configuration/']);
    }
    if (routeAction.action === 'casecockpitClicked') {
      // route to config page
      this.router.navigate(['/starterApp/casesearch/']);
    }

    if (routeAction.action === 'homeClicked') {
      // route to config page
      this.router.navigate(['/starterApp/home/']);
    }



    if (routeAction.action === 'uploadClicked') {
      console.log('Upload button clicked');
      this.router.navigate(['/starterApp/upload']);
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
    this.welcomeMessage = this.generalConfig.welcomeMessage ? this.generalConfig.welcomeMessage : 'Welcome to Case Manager';
  }

}
