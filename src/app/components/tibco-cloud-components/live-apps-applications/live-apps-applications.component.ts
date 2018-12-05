/**
 * @ngdoc component
 * @name liveAppsApplicationsComponent
 *
 * @description
 * `<app-live-apps-applications-component>` is a component providing the ability to list and select an application.
 *
 * @param {function callback} selection Notify parent that an application has been selected.
 *
 * @usage
 *
 *
 *
 */

import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {LiveAppsService} from '../../../services/live-apps.service';
import {CaseTypesList} from '../../../models/liveappsdata';
import {map, take, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-live-apps-applications',
  templateUrl: './live-apps-applications.component.html',
  styleUrls: ['./live-apps-applications.component.css']
})

export class LiveAppsApplicationsComponent implements OnInit, OnDestroy {
  @Input() sandboxId: number;
  @Output() selection = new EventEmitter();

  applications: CaseTypesList;
  errorMessage: string;

  // use the _destroyed$/takeUntil pattern to avoid memory leaks if a response was never received
  private _destroyed$ = new Subject();

  constructor(private liveapps: LiveAppsService) { }

  selectApplication = (application) => {
    this.selection.emit(application);
  }

  public refresh = () => {
    this.liveapps.getApplications(this.sandboxId)
      .pipe(
        take(1),
        takeUntil(this._destroyed$),
        map(applicationList => {
          this.applications = applicationList;
        })
      )
      .subscribe(null, error => { this.errorMessage = 'Error retrieving applications: ' + error.error.errorMsg; });
  }

  ngOnInit(): void {
    this.refresh();
  }

  ngOnDestroy() {
    this._destroyed$.next();
  }

}
