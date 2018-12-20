import {Component, OnInit, ViewChild} from '@angular/core';
import {LiveAppsCaseDataComponent} from '../../tibco-cloud-components/live-apps-case-data/live-apps-case-data.component';
import {LiveAppsCaseStatesComponent} from '../../tibco-cloud-components/live-apps-case-states/live-apps-case-states.component';
import {LiveAppsFavoriteCasesComponent} from '../../tibco-cloud-components/live-apps-favorite-cases/live-apps-favorite-cases.component';
import {LiveAppsRecentCasesComponent} from '../../tibco-cloud-components/live-apps-recent-cases/live-apps-recent-cases.component';

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
  constructor() { }

  private clickCaseAction = (caseReference) => {
    console.log('*HOME ROUTE*: Case Clicked: ' + caseReference);
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
