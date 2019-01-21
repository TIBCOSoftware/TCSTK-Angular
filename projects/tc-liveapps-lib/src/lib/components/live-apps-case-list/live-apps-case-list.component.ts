import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Subject} from 'rxjs';
import {map, take, takeUntil} from 'rxjs/operators';
import {LiveAppsService} from '../../services/live-apps.service';

@Component({
  selector: 'tcla-live-apps-case-list',
  templateUrl: './live-apps-case-list.component.html',
  styleUrls: ['./live-apps-case-list.component.css']
})

export class LiveAppsCaseListComponent implements OnInit, OnDestroy {
  @Input() headerText: string;
  @Input() displayType: string;
  @Input() sandboxId: number;
  @Input() uiAppId: string;
  @Input() caseRefs: string[];
  @Input() highlight: string;
  @Output() clickCase = new EventEmitter;

  // use the _destroyed$/takeUntil pattern to avoid memory leaks if a response was never received
  private _destroyed$ = new Subject();

  public errorMessage: string;

  public clickCaseAction = (caseReference) => {
    this.clickCase.emit(caseReference);
  }

  constructor() { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this._destroyed$.next();
  }


}
