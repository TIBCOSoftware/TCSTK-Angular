import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {LiveAppsService} from '../../services/live-apps.service';
import { take, takeUntil} from 'rxjs/operators';
import { CaseRoute} from '../../models/liveappsdata';
import {LiveAppsComponent} from '../live-apps-component/live-apps-component.component';
import {TcComponent, TcCoreCommonFunctions} from '@tibcosoftware/tc-core-lib';

/**
 * Recent cases widget, this Component list recent visited Cases.
 *
 * ![alt-text](../live-apps-recent-cases.png "")
 *
 *@example <tcla-live-apps-recent-cases></tcla-live-apps-recent-cases>
 */
@Component({
  selector: 'tcla-live-apps-recent-cases',
  templateUrl: './live-apps-recent-cases.component.html',
  styleUrls: ['./live-apps-recent-cases.component.css']
})
export class LiveAppsRecentCasesComponent extends LiveAppsComponent implements OnInit, AfterViewInit {
  /**
   * sandboxId - this comes from claims resolver
   */
  @Input() sandboxId: number;

  /**
   * The Application ID of the UI (should ideally be unique as it is shared state key)
   */
  @Input() uiAppId: string;

  /**
   * case card format - list, card, miniCard, staticList (no click event):  miniCard, card, list
   */
  public displayType: string = 'miniCard';
  @Input('displayType') set DisplayType(displayType: string) {
    if (displayType){
      this.displayType = displayType;
    }
  }

  /**
   * Whether to show the header bar in the widget - eg. favorites on home page (contains icon etc) - if off icons still appear without bar
   */
  public showHeader: boolean = true;
  @Input('showHeader') set ShowHeader(showHeader: boolean) {
    if (showHeader){
      this.showHeader = showHeader;
    }
  }

  /**
   * ~event clickCase : Case clicked
   * ~payload CaseRoute : CaseRoute object output when case is clicked so calling component can route accordingly - ie. route to case
   */
  @Output() clickCase: EventEmitter<CaseRoute> = new EventEmitter<CaseRoute>();

  @ViewChild('componentDiv', {static: false}) componentDiv: ElementRef;

  public recentCases: string[];
  public errorMessage: string;
  public widget: TcComponent;
  public cardWidthPct: Number;

  public clickCaseAction = (caseRoute: CaseRoute) => {
    this.clickCase.emit(caseRoute);
  }

  public refresh = () => {
    this.recentCases = [];
    this.liveapps.getRecentCases(this.uiAppId, this.sandboxId)
      .pipe(
        take(1),
        takeUntil(this._destroyed$)
      ).subscribe(
      next => {
        this.recentCases = next.caseRefs || [];
      }, error => { this.errorMessage = 'Error retrieving recent cases: ' + error.error.errorMsg; });
  }

  public clearRecentCases = () => {
    // -1 will clear recent cases
    this.liveapps.setRecentCase('-1', this.uiAppId, this.sandboxId);
    this.recentCases = [];
  }

  public handleDeleted = (caseRef: string) => {
    this.recentCases.splice(this.recentCases.indexOf(caseRef), 1);
    this.liveapps.unsetRecentCase(caseRef, this.uiAppId, this.sandboxId);
  }

  constructor(protected liveapps: LiveAppsService) {
    super();
  }


  ngAfterViewInit() {
    super.ngAfterViewInit();
    this.cardWidthPct = TcCoreCommonFunctions.calcSummaryCardPct(this.widget);
    this.containerChanges$.subscribe(widget => {
      this.cardWidthPct = TcCoreCommonFunctions.calcSummaryCardPct(widget);
    });
  }

  ngOnInit() {
    super.ngOnInit();
    this.refresh();
  }

}
