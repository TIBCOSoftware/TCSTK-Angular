import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {CaseSearchResults, CaseType} from '../../models/liveappsdata';
import {LiveAppsComponent} from '../live-apps-component/live-apps-component.component';
import {LiveAppsCaseSearchComponent} from '../live-apps-case-search/live-apps-case-search.component';
import {LiveAppsService} from '../../services/live-apps.service';
import {Subject} from 'rxjs';
import {TcComponent, TcCoreCommonFunctions} from '@tibco-tcstk/tc-core-lib';

/**
 * High Level search widget component (wraps others)
 * This Component allows to search for existing Cases and list Case Cards.
 *
 * ![alt-text](../live-apps-search-widget.png "")
 *
 *@example <tcla-live-apps-search-widget></tcla-live-apps-search-widget>
 */

@Component({
  selector: 'tcla-live-apps-search-widget',
  templateUrl: './live-apps-search-widget.component.html',
  styleUrls: ['./live-apps-search-widget.component.css']
})
export class LiveAppsSearchWidgetComponent extends LiveAppsComponent implements OnInit, AfterViewInit {
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
   * The fixed height of the case list results pane
   */
  @Input() resultsHeight: string = this.resultsHeight ?  this.resultsHeight : '400px';

  /**
   * ~event caseSelected : Case Clicked
   * ~payload string : emits case reference when a case is clicked (so parent can navigate to case)
   */
  @Output() caseSelected: EventEmitter<string> = new EventEmitter<string>();


  @ViewChild(LiveAppsCaseSearchComponent) caseSearchComponent: LiveAppsCaseSearchComponent;
  @ViewChild('componentDiv') componentDiv: ElementRef;
  @ViewChildren ('componentDiv') componentDivs: LiveAppsComponent[];

  widget: TcComponent;
  // case search
  matchedRefs: string[] = [];
  searchString: string;
  message: string;

  constructor(protected liveapps: LiveAppsService) {
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

  public searchCasesByState = (stateId: number, stateLabel: string, appId: string, typeId: string, message: string, select?: string) => {
    this.caseSearchComponent.setCaseType(new CaseType().deserialize( { applicationId : appId, id: typeId }));
    this.caseSearchComponent.setSelectedStateId(stateId, stateLabel);
    this.message = message;
    this.liveapps.caseSearchEntries('', this.sandboxId, appId, typeId, true, 0, 1000, stateId, select).subscribe(
      results => {
        this.matchedRefs = results.caserefs;
      }
    );
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
    this.containerChanges$.subscribe();
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
