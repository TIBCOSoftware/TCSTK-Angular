import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UiAppConfig} from 'tc-core-lib';
import {CaseRoute, CaseType, Claim, RouteAction} from 'tc-liveapps-lib';

@Component({
  selector: 'laapp-home',
  templateUrl: './templates/home.component.casemanager.html',
  // templateUrl: './templates/home.component.liveapps.html',
  // templateUrl: './templates/home.component.processdiscovery.html',
  // templateUrl: './templates/home.component.spotfireplay.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public appConfig: UiAppConfig;
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
      this.router.navigate(['/starterApp/case/' + caseRoute.appId + '/' + caseRoute.caseRef], {queryParams: {} });
    }
    if (routeAction.action === 'configClicked') {
      console.log('Config button clicked');
      // route to config page
    }

  }

  ngOnInit() {
    this.appConfig = this.route.snapshot.data.appConfig;
    this.claims = this.route.snapshot.data.claims;
    this.sandboxId = this.route.snapshot.data.claims.primaryProductionSandbox.id;
    this.userName = this.claims.firstName + ' ' + this.claims.lastName;
    this.email = this.claims.email;
    this.userId = this.claims.id;
  }

}
