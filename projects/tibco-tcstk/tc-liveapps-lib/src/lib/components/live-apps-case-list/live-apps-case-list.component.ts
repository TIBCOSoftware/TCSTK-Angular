import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Subject} from 'rxjs';
import {map, take, takeUntil} from 'rxjs/operators';
import {LiveAppsService} from '../../services/live-apps.service';
import { LiveAppsComponent } from '../live-apps-component/live-apps-component.component';
import {CaseRoute} from '../../models/liveappsdata';

/**
 * Renders list of cases for caserefs
 *
 *@example <tcla-live-apps-case-list></tcla-live-apps-case-list>
 */
@Component({
  selector: 'tcla-live-apps-case-list',
  templateUrl: './live-apps-case-list.component.html',
  styleUrls: ['./live-apps-case-list.component.css']
})

export class LiveAppsCaseListComponent extends LiveAppsComponent implements OnInit {
  /**
   * Text shown in menu bar
   */
  @Input() headerText: string;

  /**
   * case card format - list, card, miniCard, staticList (no click event)
   */
  @Input() displayType: string;

  /**
   * sandboxId - this comes from claims resolver
   */
  @Input() sandboxId: number;

  /**
   * The Application ID of the UI (should ideally be unique as it is shared state key)
   */
  @Input() uiAppId: string;

  /**
   * List of case references to display in the list
   */
  @Input() caseRefs: string[];

  /**
   * Text to highlight in the list of cases (normall text that was searched)
   */
  @Input() highlight: string;

  /**
   * Filter text displayed when listing cases after selecting case type and state via report widget
   */
  @Input() headerMessage: string;


  /**
   * ~event clickCase : Case clicked
   * ~payload CaseRoute : CaseRoute object output when case is clicked so calling component can route accordingly - ie. route to case
   */
  @Output() clickCase: EventEmitter<CaseRoute> = new EventEmitter<CaseRoute>();

  /**
   * ~event clearMatches : Clear Matches button clicked
   *
   */
  @Output() clearMatches = new EventEmitter();

  public errorMessage: string;

  public clickCaseAction = (caseRoute: CaseRoute) => {
    this.clickCase.emit(caseRoute);
  }

  public clearMatchingCases = () => {
    this.clearMatches.emit();
  }

  constructor(private liveapps: LiveAppsService) {
    super();
  }

  ngOnInit() {
  }

}
