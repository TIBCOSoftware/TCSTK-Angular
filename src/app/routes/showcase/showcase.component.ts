import {Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewChildren} from '@angular/core';
import {Claim, GeneralConfig} from '@tibco-tcstk/tc-core-lib';
import {
  CaseInfo,
  CaseType, FormConfig,
  LiveAppsComponent,
  LiveAppsConfig,
  LiveAppsService,
  Metadata, ProcessId
} from '@tibco-tcstk/tc-liveapps-lib';
import {ActivatedRoute, Router} from '@angular/router';
import {catchError, flatMap, map, switchMap, take, takeUntil, tap} from 'rxjs/operators';
import {MessagingConfig, MessagingConnection} from '@tibco-tcstk/tc-messaging-lib';
import {EventsResponse, RuleDeployment, TcEventsHelperService, TcEventsService} from '@tibco-tcstk/tc-events-lib';
import {Observable, concat, throwError, empty} from 'rxjs';
import {error} from 'ng-packagr/lib/util/log';

@Component({
  selector: 'laapp-showcase',
  templateUrl: './showcase.component.html',
  styleUrls: ['./showcase.component.css']
})
export class ShowcaseComponent implements OnInit, OnDestroy {
  public generalConfig: GeneralConfig;
  public liveAppsConfig: LiveAppsConfig;
  public sandboxId: number;
  private claims: Claim;
  public selectedAppConfig: CaseType;
  public userName: string;
  public userId: string;
  public email: string;
  public widgetSize = 100;
  public fixedHeight = true;
  public caseRef: string;
  public casedata: any;
  public metadata: Metadata;
  public summary: any;
  public messagingConfig: MessagingConfig;
  public messagingConnection: MessagingConnection;
  public selectedCreatorApp: CaseType;
  public initialData;
  public customFormDefs;
  public legacyCreators;
  public formConfig: FormConfig;

  constructor(private router: Router, private route: ActivatedRoute, private liveAppsService: LiveAppsService, private tcEventsHelperService: TcEventsHelperService, private tcEventsService: TcEventsService) {
    this.messagingConfig = this.route.snapshot.data.messagingConfig;
    this.messagingConnection = (this.messagingConfig.connections && this.messagingConfig.connections.length > 0) ? this.messagingConfig.connections[0] : undefined;
  }
  @ViewChildren ('componentDiv') componentDivs: LiveAppsComponent[];


  toggleWidgetSize = () => {
    if (this.widgetSize === 100) {
      this.widgetSize = 75;
    } else if (this.widgetSize === 75) {
      this.widgetSize = 50;
    } else if (this.widgetSize === 50) {
      this.widgetSize = 33;
    } else {
      this.widgetSize = 100;
    }
    this.componentDivs.forEach(component => {
      component.resize();
    });
  }

  toggleWidgetHeight = () => {
    this.fixedHeight = !this.fixedHeight;
  }

  receiveMessage = (event: MessageEvent) => {
    if (typeof(event.data) && (event.data.action === 'wiCompleted')) {
      console.log('WI Complete: ', event);
    }
  }

  handleCaseClick = (event) => {
    console.log('Case click event: ', event);
  }

  public handleCreatorAppSelection = (application: CaseType) => {
    /*const EXAMPLE_INITIAL_DATA = {
      PartnerRequest: {
        Customer_v1: {
          CustomerReference_v1: 'CST-1111',
          Name_v1: 'Roger Willis',
        },
        RequestDescription_v1: 'Where is my order?',
        RequestDetails_v1: {
          OrderReference_v1: 'ORD-55333',
          PartReference_v1: 'PRT-102020',
        },
        RequestType_v1: 'Packaging Supplies'
      }
    }*/
    this.initialData = undefined;
    this.customFormDefs = {};
    this.legacyCreators = false;
    this.selectedCreatorApp = application;
  }

  public handleCaseCreated = (createdCase: ProcessId) => {
    alert('Case created: ' + createdCase.caseReference);
    this.selectedCreatorApp = undefined;
  }

  public getCeToken = () => {
    const artifactInput = {
      view: {
        bindingInfo:
          [
            {
              bindingId: 'minAttendance',
              value: '30'
            }
          ]
      }
    };
    const ruleDeploymentConfig: RuleDeployment = new RuleDeployment(
      artifactInput,
      'StudentChurn',
      '/IntervalRule',
      '/churnIntervalCheck',
      5,
      '',
      'Commited Rule Change',
      'Approve'
    );
    this.tcEventsHelperService.deployRule(ruleDeploymentConfig).subscribe(
    (next: any) => {
        console.log(next);
      },
      error1 => console.error('Failed to deploy: ', error1)
    );
  }

  ngOnInit() {
    this.generalConfig = this.route.snapshot.data.laConfigHolder.generalConfig;
    this.liveAppsConfig = this.route.snapshot.data.laConfigHolder.liveAppsConfig;
    this.formConfig = this.route.snapshot.data.formConfig;
    this.claims = this.route.snapshot.data.claims;
    this.sandboxId = this.route.snapshot.data.claims.primaryProductionSandbox.id;
    this.userName = this.claims.firstName + ' ' + this.claims.lastName;
    this.email = this.claims.email;
    this.userId = this.claims.id;
    // get sample case
    this.liveAppsService.getCases(this.sandboxId, this.liveAppsConfig.applicationIds[0], '1', 0, 1)
      .subscribe(
      next => {
        if (next.caseinfos[0]) {
          this.caseRef =  next.caseinfos[0].caseReference;
          this.casedata = next.caseinfos[0].untaggedCasedataObj;
          this.metadata = next.caseinfos[0].metadata;
          this.summary = next.caseinfos[0].summaryObj;
        } else {
          console.error('No cases for this appId: ', this.liveAppsConfig.applicationIds[0]);
        }
      },
      errorCase => {
        console.error('Error retrieving case data: ' + errorCase.error.errorMsg);
      });
  }

  ngOnDestroy() {

  }

}
