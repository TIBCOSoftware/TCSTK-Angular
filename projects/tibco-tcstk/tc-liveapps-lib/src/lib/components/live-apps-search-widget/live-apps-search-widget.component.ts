import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {CaseSearchResults} from '../../models/liveappsdata';
import {LiveAppsComponent} from '../live-apps-component/live-apps-component.component';
import {LiveAppsCaseSearchComponent} from '../live-apps-case-search/live-apps-case-search.component';

@Component({
  selector: 'tcla-live-apps-search-widget',
  templateUrl: './live-apps-search-widget.component.html',
  styleUrls: ['./live-apps-search-widget.component.css']
})
export class LiveAppsSearchWidgetComponent extends LiveAppsComponent {
  @Input() sandboxId: number;
  @Input() uiAppId: string;
  @Input() appIds: string[];
  @Output() caseSelected: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild(LiveAppsCaseSearchComponent) caseSearchComponent: LiveAppsCaseSearchComponent;
  // case search
  matchedRefs: string[] = [];
  searchString: string;

  constructor() {
    super();
  }

  // handle case search results
  public handleSearchResults = (data: CaseSearchResults) => {
    this.matchedRefs = data.caserefs;
    this.searchString = data.searchString;
  }

  // case clicked
  public clickCaseAction = (caseReference) => {
    this.caseSelected.emit(caseReference);
  }

  public refresh = () => {
    if (this.caseSearchComponent) {
      this.caseSearchComponent.refresh();
    }
  }

}
