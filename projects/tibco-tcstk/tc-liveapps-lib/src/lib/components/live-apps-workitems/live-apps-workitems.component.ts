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
import {take, takeUntil} from 'rxjs/operators';
import {CaseRoute} from '../../models/liveappsdata';
import {LiveAppsComponent} from '../live-apps-component/live-apps-component.component';
import {TcComponent, TcCoreCommonFunctions} from '@tibco-tcstk/tc-core-lib';
import {TcWorkitemsService} from '../../services/tc-workitems.service';
import {Workitem} from '../../models/tc-workitems';

/**
 * Workitems widget, this Component lists workitems.
 *
 *
 * ![alt-text](../live-apps-workitems.png "")
 *
 *@example <tcla-live-apps-workitems></tcla-live-apps-workitems>
 */
@Component({
  selector: 'tcla-live-apps-workitems',
  templateUrl: './live-apps-workitems.component.html',
  styleUrls: ['./live-apps-workitems.component.css']
})
export class LiveAppsWorkitemsComponent extends LiveAppsComponent implements OnInit, AfterViewInit {
  /**
   * sandboxId - this comes from claims resolver
   */
  @Input() sandboxId: number;

  /**
   * The Application ID of the UI (should ideally be unique as it is shared state key)
   */
  @Input() uiAppId: string;

  /**
   * The list of LA Application IDs you want to handle
   */
  @Input() appIds: string[];

  /**
   * The caseRef for which to display workitems
   */
  @Input() caseRef: string;

  /**
   * case card format - list, card, miniCard, staticList (no click event)
   */
  public displayType: string = 'wiMiniCard';
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

  public workitems: Workitem[];
  public errorMessage: string;
  public widget: TcComponent;
  public cardWidthPct: Number;

  public clickWorkitemAction = (caseRoute: CaseRoute) => {
    this.clickCase.emit(caseRoute);
  }

  public refresh = () => {
    this.workitems = [];
    this.workitemsService.getWorkitems(this.sandboxId, this.appIds, this.caseRef, 0, 20)
      .pipe(
        take(1),
        takeUntil(this._destroyed$)
      ).subscribe(
      next => {
        this.workitems = next || [];
      }, error => { this.errorMessage = 'Error retrieving workitems: ' + error.error.errorMsg; });
  }

  public handleDeleted = (caseRef: string, workitemId: string) => {
    this.workitems.splice(this.workitems.findIndex((function(wi) {
        console.warn('Workitem: ', workitemId + ' for case: ' + caseRef + ' not shown as case deleted');
        return wi.header.itemContext.caseRef === caseRef;
      })), 1);
  }

  constructor(protected workitemsService: TcWorkitemsService) {
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
