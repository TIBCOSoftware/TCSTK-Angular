import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Subject} from 'rxjs';
import {map, take, takeUntil} from 'rxjs/operators';
import {LiveAppsService} from '../../services/live-apps.service';
import {LiveAppsComponent} from '../live-apps-component/live-apps-component.component';
import {CaseRoute} from '../../models/liveappsdata';


/**
 * Favorite cases
 *
 *@example <tcla-live-apps-favorite-cases></tcla-live-apps-favorite-cases>
 */
@Component({
  selector: 'tcla-live-apps-favorite-cases',
  templateUrl: './live-apps-favorite-cases.component.html',
  styleUrls: ['./live-apps-favorite-cases.component.css']
})
export class LiveAppsFavoriteCasesComponent extends LiveAppsComponent implements OnInit {
  /**
   * sandboxId - this comes from claims resolver
   */
  @Input() sandboxId: number;

  /**
   * The Application ID of the UI (should ideally be unique as it is shared state key)
   */
  @Input() uiAppId: string;

  /**
   * case card format - list, card, miniCard, staticList (no click event)
   */
  @Input() displayType: string = this.displayType ? this.displayType : 'miniCard'; // miniCard, card, list

  /**
   * Whether to show the header bar in the widget - eg. favorites on home page (contains icon etc) - if off icons still appear without bar
   */
  @Input() showHeader: boolean = this.showHeader ? this.showHeader : true;


  /**
   *##OUTPUT-clickCase##
   * CaseRoute object output when case is clicked so calling component can route accordingly - ie. route to case
   */
  @Output() clickCase: EventEmitter<CaseRoute> = new EventEmitter<CaseRoute>();

  public favoriteCases: string[];
  public errorMessage: string;

  public clickCaseAction = (caseRoute: CaseRoute) => {
    this.clickCase.emit(caseRoute);
  }

  public refresh = () => {
    this.favoriteCases = [];
    this.liveapps.getFavoriteCases(this.uiAppId, this.sandboxId)
      .pipe(
        take(1),
        takeUntil(this._destroyed$),
        map(favoriteCases => {
          this.favoriteCases = favoriteCases.caseRefs || [];
        })
      ).subscribe(
      null, error => { this.errorMessage = 'Error retrieving favorite cases: ' + error.error.errorMsg; });
  }

  public clearFavoriteCases = () => {
    this.liveapps.setFavoriteCase('-1', this.uiAppId, this.sandboxId);
    this.favoriteCases = [];
  }

  public handleDeleted = (caseRef: string) => {
    this.favoriteCases.splice(this.favoriteCases.indexOf(caseRef), 1);
    this.liveapps.setFavoriteCase(caseRef, this.uiAppId, this.sandboxId);
  }


  constructor(private liveapps: LiveAppsService) {
    super();
  }

  ngOnInit() {
    this.refresh();
  }

}
