import {Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewChildren} from '@angular/core';
import {Claim, GeneralConfig} from '@tibco-tcstk/tc-core-lib';
import {
  CaseInfo,
  CaseType,
  LiveAppsComponent,
  LiveAppsConfig,
  LiveAppsService,
  Metadata
} from '@tibco-tcstk/tc-liveapps-lib';
import {ActivatedRoute, Router} from '@angular/router';
import {map, take, takeUntil} from 'rxjs/operators';

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

  constructor(private router: Router, private route: ActivatedRoute, private liveAppsService: LiveAppsService) { }
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

    ngOnInit() {
    this.generalConfig = this.route.snapshot.data.laConfigHolder.generalConfig;
    this.liveAppsConfig = this.route.snapshot.data.laConfigHolder.liveAppsConfig;
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
      error => {
        console.error('Error retrieving case data: ' + error.error.errorMsg);
      });
  }

  ngOnDestroy() {

  }

}
