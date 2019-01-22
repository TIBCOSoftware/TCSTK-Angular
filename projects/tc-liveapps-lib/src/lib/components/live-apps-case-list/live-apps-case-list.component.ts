import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Subject} from 'rxjs';
import {map, take, takeUntil} from 'rxjs/operators';
import {LiveAppsService} from '../../services/live-apps.service';
import { LiveAppsComponent } from '../live-apps-component/live-apps-component.component';

@Component({
  selector: 'tcla-live-apps-case-list',
  templateUrl: './live-apps-case-list.component.html',
  styleUrls: ['./live-apps-case-list.component.css']
})

export class LiveAppsCaseListComponent extends LiveAppsComponent implements OnInit {
  @Input() headerText: string;
  @Input() displayType: string;
  @Input() sandboxId: number;
  @Input() uiAppId: string;
  @Input() caseRefs: string[];
  @Input() highlight: string;
  @Output() clickCase = new EventEmitter;

  public errorMessage: string;

  public clickCaseAction = (caseReference) => {
    this.clickCase.emit(caseReference);
  }

  constructor(private liveapps: LiveAppsService) {
    super();
  }

  ngOnInit() {
  }

}
