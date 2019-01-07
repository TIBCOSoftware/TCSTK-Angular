import {Component, OnInit, ViewChild} from '@angular/core';
import {LiveAppsCaseDataComponent} from '../../tibco-cloud-components/live-apps-case-data/live-apps-case-data.component';
import {LiveAppsCaseStatesComponent} from '../../tibco-cloud-components/live-apps-case-states/live-apps-case-states.component';
import {LiveAppsFavoriteCasesComponent} from '../../tibco-cloud-components/live-apps-favorite-cases/live-apps-favorite-cases.component';
import {LiveAppsRecentCasesComponent} from '../../tibco-cloud-components/live-apps-recent-cases/live-apps-recent-cases.component';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfigResolver} from '../../../resolvers/config.resolver';
import {CaseSearchResults, Claim, Sandbox} from '../../../models/liveappsdata';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // The ViewChild declarations give access to components marked on the template so that I can call public functions like refresh
  @ViewChild(LiveAppsFavoriteCasesComponent) caseFavoritesComponent: LiveAppsFavoriteCasesComponent;
  @ViewChild(LiveAppsRecentCasesComponent) caseRecentComponent: LiveAppsRecentCasesComponent;

  private appConfig;
  private claims: Claim;
  private sandbox: Sandbox;
  private matchedRefs: string[];
  private searchString: string;

  constructor(private router: Router, private route: ActivatedRoute) { }

  private clickCaseAction = (caseReference) => {
    this.router.navigate(['/starterApp/case', caseReference], {queryParams: {}});
  }

  private refresh = () => {
    if (this.caseFavoritesComponent) {
      this.caseFavoritesComponent.refresh();
    }
    if (this.caseRecentComponent) {
      this.caseRecentComponent.refresh();
    }
  }

  private handleSearchResults = (data: CaseSearchResults) => {
    this.matchedRefs = data.caserefs;
    this.searchString = data.searchString;
  }

  ngOnInit() {
    // read resolved config params
    this.appConfig = this.route.snapshot.data.appConfig;
    this.claims = this.route.snapshot.data.claims;
    this.sandbox = this.claims.primaryProductionSandbox;
  }

}
