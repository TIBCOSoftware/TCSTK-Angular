import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import {LiveAppsService} from '../../../services/live-apps.service';
import {AppConfig, CaseInfo, Metadata} from '../../../models/liveappsdata';
import {map, take, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {DomSanitizer, Meta, SafeHtml} from '@angular/platform-browser';
import {LiveAppsStateIconComponent} from '../live-apps-state-icon/live-apps-state-icon.component';

@Component({
  selector: 'app-live-apps-case-summary',
  templateUrl: './live-apps-case-summary.component.html',
  styleUrls: ['./live-apps-case-summary.component.css']
})
export class LiveAppsCaseSummaryComponent implements OnInit, OnDestroy {
  // The ViewChild declarations give access to components marked on the template so that I can call public functions like refresh
  @ViewChild('caseStateIcon') stateIconComponent: LiveAppsStateIconComponent;
  @ViewChild('caseTypeIcon') caseTypeIconComponent: LiveAppsStateIconComponent;

  @Input() configMode: boolean;
  @Input() configModeColor: string;
  @Input() configModeIcon: string;
  @Input() configModeCaseTypeColor: string;
  @Input() configModeCaseTypeIcon: string;
  @Input() configModeAppTypeLabel: string;
  @Input() caseReference: string;
  @Input() sandboxId: number;
  @Input() miniCard: boolean;
  @Input() borderCard: boolean;
  @Input() typeBar: boolean;
  @Input() uiAppId: string;
  @Output() clickCase = new EventEmitter;

  // use the _destroyed$/takeUntil pattern to avoid memory leaks if a response was never received
  private _destroyed$ = new Subject();

  private casedata: any;
  private summary: any;
  private summaryKeys: string[];
  private summaryValues: string[];
  private metadata: Metadata;
  private appStateConfig: AppConfig;
  private errorMessage;
  color: string;

  private clickCaseAction = () => {
    this.clickCase.emit(this.caseReference);
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

  constructor(private liveapps: LiveAppsService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    if (!this.configMode) {
      this.liveapps.getCaseWithSummary(this.caseReference, this.sandboxId, this.uiAppId)
        .pipe(
          take(1),
          takeUntil(this._destroyed$),
          map(caseinfo => {
            this.casedata = caseinfo.untaggedCasedataObj;
            this.metadata = caseinfo.metadata;
            this.summary = caseinfo.summaryObj;
            this.summaryKeys = Object.keys(this.summary);
            this.summaryValues = Object.values(this.summary);
          })
        ).subscribe(
        null, error => {
          this.errorMessage = 'Error retrieving case data: ' + error.error.errorMsg;
        });
    } else {
      const sampleCaseInfoJSON = '{\n' +
        '  "untaggedCasedata": "",\n' +
        '  "summary": "{\\"state\\":\\"Reported\\",\\"Summary1\\":\\"000001\\",\\"Summary2\\":\\"summary data\\",\\"Summary3\\":\\"summary data\\"}",\n' +
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
        '    "state": "Reported",\n' +
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

  ngOnDestroy(): void {
    this._destroyed$.next();
  }

}
