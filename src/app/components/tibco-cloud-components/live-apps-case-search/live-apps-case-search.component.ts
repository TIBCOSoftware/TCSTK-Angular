import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Subject} from 'rxjs';
import {LiveAppsService} from '../../../services/live-apps.service';
import {CaseInfoList} from '../../../models/liveappsdata';

@Component({
  selector: 'app-live-apps-case-search',
  templateUrl: './live-apps-case-search.component.html',
  styleUrls: ['./live-apps-case-search.component.css']
})

export class LiveAppsCaseSearchComponent implements OnInit {
  @Input() sandboxId: number;
  @Input() appId: string;
  @Input() typeId: string;
  @Output() foundRefs = new EventEmitter;

  searchTerm$ = new Subject<string>();
  searchValue = this.searchTerm$.asObservable();

  constructor(private liveapps: LiveAppsService) {}

  ngOnInit() {
    const skip = 0;
    const top = 10000;
    // Note: The API limits searches to 10000 items
    // The service is configured to optimize performance by only returning case references at this stage
    // The case details will only be loaded when the item is rendered (for example in the case-list component)
    // Any case list component should use cdk virtual scroll to ensure 10000 case details are not loaded in one go
    // (from the API or to the DOM)
    this.liveapps.caseSearch(this.searchTerm$, this.sandboxId, this.appId, this.typeId, skip, top)
      .subscribe(results => {
        this.foundRefs.emit(results);
      });
  }

}
