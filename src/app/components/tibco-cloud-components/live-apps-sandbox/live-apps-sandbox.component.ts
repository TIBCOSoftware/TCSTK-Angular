/**
 * @ngdoc component
 * @name liveAppsSandboxComponent
 *
 * @description
 * `<app-live-apps-sandbox-component>` is a component providing the ability to list and select a sandbox.
 *
 * @param {boolean} allSandboxes Whether to retrieve all sandboxes or just those user has access to.
 * @param {function callback} selection Notify parent that a sandbox has been selected.
 *
 * @usage
 *
 * <app-live-apps-sandbox [allSandboxes]="false" (selection)="selectSandbox($event)"></app-live-apps-sandbox>
 *
 * This component retrieves the sandbox details available for this subscription.
 *
 * If allSandboxes required this will use the sandboxes API call - this will include sandboxes
 *        in the subscription that the user does not have access to.
 *
 * If allSandboxes === false - this will use the claims API which will only return sandboxes the user has access to
 *  note: when using claims API less details are available about the sandbox
 *
 * The user must select a sandbox - then the details of that sandbox are emitted using selection
 *
 *
 */

import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {LiveAppsService} from '../../../services/live-apps.service';
import {SandboxList} from '../../../models/liveappsdata';
import {map, take, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-live-apps-sandbox',
  templateUrl: './live-apps-sandbox.component.html',
  styleUrls: ['./live-apps-sandbox.component.css']
})

export class LiveAppsSandboxComponent implements OnInit, OnDestroy {
  @Input() allSandboxes: boolean;
  @Output() selection = new EventEmitter();

  sandboxes: SandboxList;
  errorMessage: string;

  // use the _destroyed$/takeUntil pattern to avoid memory leaks if a response was never received
  private _destroyed$ = new Subject();

  public refresh = () => {
    if (this.allSandboxes) {
      this.liveapps.getSandboxes()
        .pipe(
          take(1),
          takeUntil(this._destroyed$),
          map(sandboxList => {
            this.sandboxes = sandboxList;
          })
        )
        .subscribe(null, error => { this.errorMessage = 'Error retrieving sandboxes: ' + error.error.errorMsg; });
    } else {
      this.liveapps.getClaims()
        .pipe(
          take(1),
          takeUntil(this._destroyed$),
          map(claims => {
            // this.sandboxes = new SandboxList().deserialize(claims.sandboxes);
            this.sandboxes = new SandboxList().deserialize(claims.sandboxes);
          })
        )
        .subscribe(null, error => { this.errorMessage = 'Error retrieving sandboxes: ' + error.error.errorMsg; });
    }
  }

  constructor(private liveapps: LiveAppsService) { }

  selectSandbox = (sandbox) => {
    this.selection.emit(sandbox);
  }

  ngOnInit(): void {
    this.refresh();
  }

  ngOnDestroy() {
    this._destroyed$.next();
  }

}
