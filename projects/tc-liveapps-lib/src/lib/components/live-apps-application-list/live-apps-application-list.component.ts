import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CaseType} from '../../models/liveappsdata';
import {LiveAppsApplicationsComponent} from '../live-apps-applications/live-apps-applications.component';

@Component({
  selector: 'tcla-live-apps-application-list',
  templateUrl: './live-apps-application-list.component.html',
  styleUrls: ['./live-apps-application-list.component.css']
})
export class LiveAppsApplicationListComponent extends LiveAppsApplicationsComponent implements OnInit {

  @Output() appsSelected: EventEmitter<CaseType[]> = new EventEmitter<CaseType[]>();

  selectedApps: CaseType[] = [];

  selectApplications = (selectionEvent) => {
    this.selectedApps = selectionEvent.source.value;
    this.selection.emit(selectionEvent.source.value);
  }
}
