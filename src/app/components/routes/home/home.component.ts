import {Component, OnInit, ViewChild} from '@angular/core';
import {LiveAppsCaseDataComponent} from '../../tibco-cloud-components/live-apps-case-data/live-apps-case-data.component';
import {LiveAppsCaseStatesComponent} from '../../tibco-cloud-components/live-apps-case-states/live-apps-case-states.component';
import {LiveAppsFavoriteCasesComponent} from '../../tibco-cloud-components/live-apps-favorite-cases/live-apps-favorite-cases.component';
import {LiveAppsRecentCasesComponent} from '../../tibco-cloud-components/live-apps-recent-cases/live-apps-recent-cases.component';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // The ViewChild declarations give access to components marked on the template so that I can call public functions like refresh
  @ViewChild(LiveAppsFavoriteCasesComponent) caseFavoritesComponent: LiveAppsFavoriteCasesComponent;
  @ViewChild(LiveAppsRecentCasesComponent) caseRecentComponent: LiveAppsRecentCasesComponent;

  uiAppId = 'testappjs';
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

  ngOnInit() {
  }

}
