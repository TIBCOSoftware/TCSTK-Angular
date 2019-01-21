import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CaseSearchResults} from '../../models/liveappsdata';

@Component({
  selector: 'tcla-live-apps-search-widget',
  templateUrl: './live-apps-search-widget.component.html',
  styleUrls: ['./live-apps-search-widget.component.css']
})
export class LiveAppsSearchWidgetComponent implements OnInit {
  @Input() sandboxId: number;
  @Input() uiAppId: string;
  @Output() caseSelected: EventEmitter<string> = new EventEmitter<string>();

  // case search
  matchedRefs: string[];
  searchString: string;

  constructor() { }

  // handle case search results
  public handleSearchResults = (data: CaseSearchResults) => {
    this.matchedRefs = data.caserefs;
    this.searchString = data.searchString;
  }

  // case clicked
  public clickCaseAction = (caseReference) => {
    this.caseSelected.emit(caseReference);
  }

  ngOnInit() {
  }

}
