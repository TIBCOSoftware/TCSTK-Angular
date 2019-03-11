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
import {LiveAppsService} from '../../services/live-apps.service';
import {CardConfig, CaseInfo, CaseRoute, Metadata} from '../../models/liveappsdata';
import {map, take, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {DomSanitizer, Meta, SafeHtml} from '@angular/platform-browser';
import {LiveAppsStateIconComponent} from '../live-apps-state-icon/live-apps-state-icon.component';
import {LiveAppsComponent} from '../live-apps-component/live-apps-component.component';
import {TcCaseCardConfigService} from '../../services/tc-case-card-config.service';

@Component({
  selector: 'tcla-live-apps-case-summary',
  templateUrl: './live-apps-case-summary.component.html',
  styleUrls: ['./live-apps-case-summary.component.css']
})

export class LiveAppsCaseSummaryComponent extends LiveAppsComponent implements OnInit {
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
  @Input() displayType: string; // miniCard, card, list
  @Input() borderCard: boolean;
  @Input() typeBar: boolean;
  @Input() uiAppId: string;
  @Input() highlight: string;
  @Output() clickCase: EventEmitter<CaseRoute> = new EventEmitter<CaseRoute>();

  public casedata: any;
  public summary: any;
  public summaryKeys: string[];
  public summaryValues: string[];
  public metadata: Metadata;
  public appStateConfig: CardConfig;
  public errorMessage;
  public appId: string;
  color: string;

  public clickCaseAction = () => {
    const caseRoute = new CaseRoute().deserialize({ caseRef: this.caseReference, appId: this.appId});
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
      this.caseCardConfigService.getCaseWithSummary(this.caseReference, this.sandboxId, this.uiAppId)
        .pipe(
          take(1),
          takeUntil(this._destroyed$),
          map(caseinfo => {
            this.appId = caseinfo.metadata.applicationId;
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

  constructor(private liveapps: LiveAppsService, private caseCardConfigService: TcCaseCardConfigService, private sanitizer: DomSanitizer) {
    super();
  }

  ngOnInit() {
    this.refresh();
  }

}
