import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {CaseType} from '../../models/liveappsdata';
import {LiveAppsApplicationsComponent} from '../live-apps-applications/live-apps-applications.component';
import {map, take, takeUntil} from 'rxjs/operators';
import {MatSelectionList} from '@angular/material';


/**
 * Special rendering of LiveAppsApplicationsComponent
 *
 *@example <tcla-live-apps-application-list></tcla-live-apps-application-list>
 */

@Component({
  selector: 'tcla-live-apps-application-list',
  templateUrl: './live-apps-application-list.component.html',
  styleUrls: ['./live-apps-application-list.component.css']
})
export class LiveAppsApplicationListComponent extends LiveAppsApplicationsComponent implements OnInit, OnChanges {
  @ViewChild (MatSelectionList, {static: false}) appSelectionList: MatSelectionList;

  /**
   * The app Ids selected (output)
   */
  @Input() selectedAppIds: string[] = [];

  /**
   * ~event appsSelected : Applications selected in component (CaseType objects)
   * ~payload CaseType[] : Array of CaseType objects of what was selected
   */
  @Output() appsSelected: EventEmitter<CaseType[]> = new EventEmitter<CaseType[]>();

  /**
   * ~event appIdsSelected : Applications selected in component (appIds)
   * ~payload string[] : selected App Ids from the application list (used on config)
   */
  @Output() appIdsSelected: EventEmitter<string[]> = new EventEmitter<string[]>();


  public mySelectedOptions: CaseType[];

  handleAppSelection = (selectionEvent: CaseType[]) => {
    this.appsSelected.emit(selectionEvent);
    const selIds = [];
    selectionEvent.forEach((selected) => {
      selIds.push(selected.applicationId);
    });
    this.appIdsSelected.emit(selIds);
  }

  handleSelectAll = () => {
    this.mySelectedOptions = this.applications.casetypes;
    this.appIdsSelected.emit(this.getAppIds(this.mySelectedOptions));
    this.appsSelected.emit(this.applications.casetypes);
  }

  handleDeselectAll = () => {
    this.mySelectedOptions = [];
    this.appIdsSelected.emit([]);
    this.appsSelected.emit([]);
  }

  private getAppIds = (casetypes: CaseType[]): string[] => {
    const selIds = [];
    casetypes.forEach((selected) => {
      selIds.push(selected.applicationId);
    });
    return selIds;
  }

  public refresh = (bypassCache: boolean) => {
    this.liveapps.getApplications(this.sandboxId, this.appIds, 100, bypassCache)
      .pipe(
        take(1),
        takeUntil(this._destroyed$),
        map(applicationList => {
          this.applications = applicationList;
          // handle single app selection input
          if (this.selectedApp && this.selectedApp.applicationId) {
            this.selectedApp = applicationList.casetypes.find((casetype) => {
              return casetype.applicationId === this.selectedApp.applicationId;
            });
            // this.selection.emit(this.selectedApp);
          } else if (this.selectedAppIds && this.selectedAppIds.length > 0) {
            // pre select any casetypes that were passed in the selectedAppIds input attribute
            this.mySelectedOptions = this.applications.casetypes.filter(casetype => {
              return (this.selectedAppIds.findIndex((ct) => {
                return ct === casetype.applicationId;
              }
              ) !== -1);
            });
          }
        })
      )
      .subscribe(null, error => { this.errorMessage = 'Error retrieving applications: ' + error.error.errorMsg; });
  }

  ngOnChanges(changes: SimpleChanges) {
    // only interested in initial selection - catching every change would create an infinite loop!
    if (changes.selectedAppIds && (changes.selectedAppIds.firstChange)) {
      this.refresh(false);
    }
  }


  ngOnInit(): void {
    // leave this blank so superclass ngOnInit not called
  }
}
