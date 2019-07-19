import {
  AfterViewInit,
  Component, ElementRef,
  EventEmitter,
  Input, OnChanges,
  OnDestroy,
  OnInit,
  Output,
  QueryList, SimpleChanges,
  ViewChild,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import {LiveAppsService} from '../../services/live-apps.service';
import {CardConfig, CaseInfo, CaseRoute, Metadata} from '../../models/liveappsdata';
import {map, take, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {DomSanitizer, Meta, SafeHtml} from '@angular/platform-browser';
import {LiveAppsStateIconComponent} from '../live-apps-state-icon/live-apps-state-icon.component';
import {LiveAppsComponent} from '../live-apps-component/live-apps-component.component';
import {TcCaseCardConfigService} from '../../services/tc-case-card-config.service';
import {TcComponent, TcCoreCommonFunctions} from '@tibco-tcstk/tc-core-lib';
import {ActivatedRoute, Router} from '@angular/router';

/**
 * Renders case summary cards
 *
 * ![alt-text](../live-apps-case-summary.png "Image")
 *
 * ![alt-text](../live-apps-case-summary-2.png "Image")
 *
 *@example <tcla-live-apps-case-summary></tcla-live-apps-case-summary>
 */

@Component({
  selector: 'tcla-live-apps-case-summary',
  templateUrl: './live-apps-case-summary.component.html',
  styleUrls: ['./live-apps-case-summary.component.css']
})

export class LiveAppsCaseSummaryComponent extends LiveAppsComponent implements OnInit, OnChanges, AfterViewInit {
  // The ViewChild declarations give access to components marked on the template so that I can call public functions like refresh
  @ViewChild('caseStateIcon', {static: false}) stateIconComponent: LiveAppsStateIconComponent;
  @ViewChild('caseTypeIcon', {static: false}) caseTypeIconComponent: LiveAppsStateIconComponent;
  @ViewChild('componentDiv', {static: false}) componentDiv: ElementRef;

  /**
   * Whether to use static data (ie. when in app config box)
   */
  @Input() configMode: boolean;

  /**
   * static data for app config box
   */
  @Input() configModeColor: string;

  /**
   * static data for app config box
   */
  @Input() configModeIcon: string;

  /**
   * static data for app config box
   */
  @Input() configModeCaseTypeColor: string;

  /**
   * static data for app config box
   */
  @Input() configModeCaseTypeIcon: string;

  /**
   * static data for app config box
   */
  @Input() configModeAppTypeLabel: string;

  /**
   * The case reference
   */
  @Input() caseRef: string;

  /**
   * sandboxId - this comes from claims resolver
   */
  @Input() sandboxId: number;

  /**
   * case card format - list, card, miniCard, staticList (no click event)
   */
  @Input() displayType: string; // miniCard, card, list

  /**
   * Whether to display a border around the card
   */
  @Input() borderCard: boolean;

  /**
   * Whether to display the colored "bar" on a summary card (on left or top)
   */
  @Input() typeBar: boolean;

  /**
   * The Application ID of the UI (should ideally be unique as it is shared state key)
   */
  @Input() uiAppId: string;

  /**
   * Text to highlight in the list of cases (normall text that was searched)
   */
  @Input() highlight: string;


  /**
   * ~event clickCase : Case clicked
   * ~payload CaseRoute : CaseRoute object output when case is clicked so calling component can route accordingly - ie. route to case
   */
  @Output() clickCase: EventEmitter<CaseRoute> = new EventEmitter<CaseRoute>();

  /**
   * ~event deleted : Case Displayed has been deleted
   * ~payload string : string emitted when summary tries to load data for a case that has been deleted (so it can be hidden.removed from - for example recent cases list)
   */
  @Output() deleted: EventEmitter<string> = new EventEmitter<string>();

  public casedata: any;
  public summary: any;
  public summaryKeys: string[];
  public summaryValues: string[];
  public metadata: Metadata;
  public appStateConfig: CardConfig;
  public errorMessage;
  public appId: string;
  public typeId: string;
  color: string;

  public clickCaseAction = () => {
    const caseRoute = new CaseRoute().deserialize({ caseRef: this.caseRef, appId: this.appId, typeId: this.typeId});
    this.clickCase.emit(caseRoute);
  }

  public restylePreview = (icon, fill) => {
    this.metadata.stateIcon = icon;
    this.metadata.stateColor = fill;
    this.stateIconComponent.refresh(icon, fill);
  }

  public restylePreviewCaseType = (icon, fill) => {
    this.metadata.caseTypeIcon = icon;
    this.metadata.caseTypeColor = fill;
    this.caseTypeIconComponent.refresh(icon, fill);
  }

  public refresh = () => {
    if (!this.configMode) {
      this.caseCardConfigService.getCaseWithSummary(this.caseRef, this.sandboxId, this.uiAppId)
        .pipe(
          take(1),
          takeUntil(this._destroyed$),
        ).subscribe(
        caseinfo => {
          if (!caseinfo.deleted) {
            this.appId = caseinfo.metadata.applicationId;
            this.typeId = caseinfo.metadata.typeId;
            this.casedata = caseinfo.untaggedCasedataObj;
            this.metadata = caseinfo.metadata;
            this.summary = caseinfo.summaryObj;
            this.summaryKeys = Object.keys(this.summary);
            this.summaryValues = Object.values(this.summary);
          } else {
            // notify parent case has been deleted
            this.deleted.emit(this.caseRef);
          }
        }, error => {
          this.errorMessage = 'Error retrieving case data: ' + error.error.errorMsg;
        });
    } else {
      const sampleCaseInfoJSON = '{\n' +
        '  "untaggedCasedata": "",\n' +
        '  "summary": "{\\"state\\":\\"Current State\\",\\"Summary1\\":\\"000001\\",\\"Summary2\\":\\"summary data\\",\\"Summary3\\":\\"summary data\\"}",\n' +
        '  "metadata": {\n' +
        '    "createdBy": "-1",\n' +
        '    "creationTimestamp": "2018-11-27T08:40:03.404Z",\n' +
        '    "createdByDetails": {\n' +
        '      "username": "creator@mycompany.com"\n' +
        '    },\n' +
        '    "modifiedBy": "-1",\n' +
        '    "modificationTimestamp": "2018-11-27T08:40:22.010Z",\n' +
        '    "lockType": "1",\n' +
        '    "msLockExpiry": "1543308022271",\n' +
        '    "msSystemTime": "1545127800839",\n' +
        '    "applicationId": "934",\n' +
        '    "typeId": "1"\n' +
        '  },\n' +
        '  "summaryObj": {\n' +
        '    "state": "Current State",\n' +
        '    "Summary 1": "000001",\n' +
        '    "Summary 2": "The case name",\n' +
        '    "Summary 3": "The case description"\n' +
        '  },\n' +
        '  "untaggedCasedataObj": {\n' +
        '  }\n' +
        '}'
      const caseinfo = new CaseInfo().deserialize(JSON.parse(sampleCaseInfoJSON));
      this.casedata = caseinfo.untaggedCasedataObj;
      this.metadata = caseinfo.metadata;
      this.summary = caseinfo.summaryObj;
      this.summaryKeys = Object.keys(this.summary);
      this.summaryValues = Object.values(this.summary);
      this.metadata.stateIcon = this.configModeIcon;
      this.metadata.stateColor = this.configModeColor;
      this.metadata.caseTypeColor = this.configModeCaseTypeColor;
      this.metadata.caseTypeIcon = this.configModeCaseTypeIcon;
      this.metadata.applicationLabel = this.configModeAppTypeLabel;
    }
  }

  constructor(protected liveapps: LiveAppsService, protected caseCardConfigService: TcCaseCardConfigService, protected sanitizer: DomSanitizer) {
    super();
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
    this.containerChanges$.subscribe();
  }

  ngOnInit() {
    super.ngOnInit();
    this.refresh();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.configModeAppTypeLabel && !changes.configModeAppTypeLabel.isFirstChange() && (changes.configModeAppTypeLabel.currentValue !== changes.configModeAppTypeLabel.previousValue)) {
      this.refresh();
    }
  }

}
