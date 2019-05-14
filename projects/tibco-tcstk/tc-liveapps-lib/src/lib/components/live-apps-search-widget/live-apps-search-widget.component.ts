import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {CaseSearchResults, CaseType} from '../../models/liveappsdata';
import {LiveAppsComponent} from '../live-apps-component/live-apps-component.component';
import {LiveAppsCaseSearchComponent} from '../live-apps-case-search/live-apps-case-search.component';
import {LiveAppsService} from '../../services/live-apps.service';
import {Subject} from 'rxjs';

/**
 * High Level search widget component (wraps others)
 *
 *@example <tcla-live-apps-search-widget></tcla-live-apps-search-widget>
 */

@Component({
  selector: 'tcla-live-apps-search-widget',
  templateUrl: './live-apps-search-widget.component.html',
  styleUrls: ['./live-apps-search-widget.component.css']
})
export class LiveAppsSearchWidgetComponent extends LiveAppsComponent {
  /**
   * sandboxId - this comes from claims resolver
   */
  @Input() sandboxId: number;

  /**
   * The Application ID of the UI (should ideally be unique as it is shared state key)
   */
  @Input() uiAppId: string;

  /**
   * The list of LA Application IDs you want to handle
   */
  @Input() appIds: string[];

  /**
   *##OUTPUT-caseSelected##
   * emits case reference when a case is clicked (so parent can navigate to case)
   */
  @Output() caseSelected: EventEmitter<string> = new EventEmitter<string>();


  @ViewChild(LiveAppsCaseSearchComponent) caseSearchComponent: LiveAppsCaseSearchComponent;
  // case search
  matchedRefs: string[] = [];
  searchString: string;
  message: string;

  constructor(private liveapps: LiveAppsService) {
    super();
  }

  // handle case search results
  public handleSearchResults = (data: CaseSearchResults) => {
    this.message = undefined;
    this.matchedRefs = data.caserefs;
    this.searchString = data.searchString;
  }

  public handleClearMatches = () => {
    this.caseSearchComponent.clearResults();
    this.matchedRefs = [];
    this.message = undefined;
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

  public searchCasesByState = (stateId: number, stateLabel: string, appId: string, typeId: string, message: string) => {
    this.caseSearchComponent.setCaseType(new CaseType().deserialize( { applicationId : appId, id: typeId }));
    this.caseSearchComponent.setSelectedStateId(stateId, stateLabel);
    this.message = message;
    this.liveapps.caseSearchEntries('', this.sandboxId, appId, typeId, true, 0, 1000, stateId).subscribe(
      results => {
        this.matchedRefs = results.caserefs;
      }
    );
  }

}
