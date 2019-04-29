import {Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {LiveAppsService} from '../../services/live-apps.service';
import {CaseInfoList, CaseSearchResults, CaseType} from '../../models/liveappsdata';
import {LiveAppsComponent} from '../live-apps-component/live-apps-component.component';
import {LiveAppsApplicationsComponent} from '../live-apps-applications/live-apps-applications.component';
import {map, tap} from 'rxjs/operators';

@Component({
  selector: 'tcla-live-apps-case-search',
  templateUrl: './live-apps-case-search.component.html',
  styleUrls: ['./live-apps-case-search.component.css']
})

export class LiveAppsCaseSearchComponent extends LiveAppsComponent {
  @ViewChild('searchBox') searchBox: ElementRef;
  @Input() sandboxId: number;
  @Input() appIds: string[];
  @Output() foundRefs: EventEmitter<CaseSearchResults> = new EventEmitter<CaseSearchResults>();

  @ViewChild(LiveAppsApplicationsComponent) applicationsComponent: LiveAppsApplicationsComponent;

  searchTerm$: Subject<string>;
  searchValue: Observable<String>;
  searchString: string;
  forcedSearch = false;

  // case type selector
  public selectedApp: CaseType = new CaseType();

  constructor(private liveapps: LiveAppsService) {
    super();
  }

  public refresh = () => {
    if (this.applicationsComponent) {
      this.applicationsComponent.refresh(true);
    }
  }

  // handle search app selection
  public handleSearchAppSelection = (application: CaseType) => {
    this.selectedApp = application;
    this.doSearch();
  }

  // clear search results
  public clearResults = () => {
    this.forcedSearch = false;
    this.searchString = '';
    this.searchBox.nativeElement.value = '';
    const result = new CaseSearchResults().deserialize({ caserefs: [], searchString: '' });
    this.foundRefs.emit(result);
  }

  public forceSearch = () => {
    this.forcedSearch = true;
    this.liveapps.caseSearchEntries(this.searchBox.nativeElement.value, this.sandboxId, this.selectedApp.applicationId, this.selectedApp.id, true, 0, 1000).subscribe(
      results => {
        this.foundRefs.emit(results);
      }
    );
  }

  private doSearch = () => {
    this.forcedSearch = false;
    this.searchBox.nativeElement.value = '';
    const result = new CaseSearchResults().deserialize({ caserefs: [], searchString: '' });
    this.foundRefs.emit(result);
    this.searchTerm$ = new Subject<string>();
    this.searchTerm$.subscribe(next => {
      this.searchString = next;
      return next;
    })
    this.searchValue = this.searchTerm$.asObservable();
    if (this.selectedApp.applicationId && this.selectedApp.id && this.sandboxId) {
      const skip = 0;
      const top = 1000;
      // Note: The API limits searches to 1000 items
      // The service is configured to optimize performance by only returning case references at this stage
      // The case details will only be loaded when the item is rendered (for example in the case-list component)
      // Any case list component should use cdk virtual scroll to ensure 1000 case details are not loaded in one go
      // (from the API or to the DOM)
      this.liveapps.caseSearch(this.searchTerm$, this.sandboxId, this.selectedApp.applicationId, this.selectedApp.id, skip, top)
        .subscribe(results => {
          this.foundRefs.emit(results);
        });
    }
  }

}
