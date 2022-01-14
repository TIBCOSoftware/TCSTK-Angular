import {Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild, ViewChildren} from '@angular/core';
import {Claim, GeneralConfig} from '@tibcosoftware/tc-core-lib';
import {
  CaseInfo, CaseSearchResults,
  CaseType, FormConfig,
  LiveAppsComponent,
  LiveAppsConfig, LiveAppsFormConfig,
  LiveAppsService,
  Metadata, ProcessId
} from '@tibcosoftware/tc-liveapps-lib';
import {ActivatedRoute, Router} from '@angular/router';
import {MessagingConfig, MessagingConnection} from '@tibcosoftware/tc-messaging-lib';
import {RuleDeployment, TcEventsHelperService, TcEventsService} from '@tibcosoftware/tc-events-lib';
// import {error} from 'ng-packagr/lib/util/log';
import {LiveAppsFormWcComponent} from '@tibcosoftware/tc-liveapps-lib';
import {TcPrimeNGHelperService} from 'projects/tibco-tcstk/tc-primeng-lib/src/lib/services/tc-primeng-helper.service';

// import {TcgridLiveappsCasesComponent} from '@tibcosoftware/tc-ag-grid';

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
  public caseRefs: string[] = [];
  public columnDefs = [
    {
      headerName: 'Risk Case',
      field: 'untaggedCasedataObj.RiskCaseId_v1',
      sortable: true,
      filter: true,
      resizable: true,
      checkboxSelection: true
    },
    {headerName: 'State', field: 'untaggedCasedataObj.state', sortable: true, filter: true, resizable: true},
    {headerName: 'Channel', field: 'untaggedCasedataObj.Channel_v1', sortable: true, filter: true, resizable: true},
    {headerName: 'Assignee', field: 'untaggedCasedataObj.Assignee_v1.name', sortable: true, filter: true, resizable: true},
    {
      headerName: 'Created',
      field: 'metadata.creationTimestamp',
      valueFormatter: TcPrimeNGHelperService.dateFormatter,
      sortable: true,
      filter: true,
      resizable: true
    }
  ];
  public columnGenericDefs = [
    {headerName: 'First Name', field: 'name', sortable: true, filter: true, resizable: true},
    {headerName: 'Last Name', field: 'surname', sortable: true, filter: true, resizable: true},
    {headerName: 'Manger', field: 'fullname', sortable: true, filter: true, resizable: true},
    {headerName: 'Email', field: 'email', sortable: true, filter: true, resizable: true},
    {headerName: 'Driver Licence', field: 'bool', sortable: true, filter: true, resizable: true}
  ];

  public rowData = [
    {
      'name': 'Clyde',
      'surname': 'Creech',
      'fullname': 'Monica Underwood',
      'email': 'leroy@mcintosh.cm',
      'bool': true
    },
    {
      'name': 'Gwendolyn',
      'surname': 'Mack',
      'fullname': 'Kent Waller',
      'email': 'lester@garcia.pg',
      'bool': false
    },
    {
      'name': 'Lee',
      'surname': 'Harrell',
      'fullname': 'Sue Horn',
      'email': 'norman@wall.ni',
      'bool': false
    },
    {
      'name': 'Melinda',
      'surname': 'McKenna',
      'fullname': 'Geraldine O',
      'email': 'danny@branch.ax',
      'bool': false
    },
    {
      'name': 'Bonnie',
      'surname': 'McNamara',
      'fullname': 'Sarah Stanton',
      'email': 'patrick@harvey.ro',
      'bool': false
    },
    {
      'name': 'Dana',
      'surname': 'Caldwell',
      'fullname': 'Janet Tyson',
      'email': 'ben@dunn.do',
      'bool': true
    },
    {
      'name': 'Glenda',
      'surname': 'Fischer',
      'fullname': 'Jeff Berger',
      'email': 'vivian@mueller.gg',
      'bool': true
    },
    {
      'name': 'Marion',
      'surname': 'Wolf',
      'fullname': 'Patricia Horne',
      'email': 'judy@lang.eh',
      'bool': true
    },
    {
      'name': 'Bonnie',
      'surname': 'Cooke',
      'fullname': 'Bernard Teague',
      'email': 'jimmy@crews.gy',
      'bool': false
    },
    {
      'name': 'Brenda',
      'surname': 'Cowan',
      'fullname': 'Jennifer Haynes',
      'email': 'lloyd@solomon.gh',
      'bool': true
    }
  ];

  public creatorConfig = new LiveAppsFormConfig().deserialize({
    type: 'creator',
    useCustomForm: 'false',
    sandbox: '31',
    formDivId: 'formDivCreator',
    id: '14636',
    name: 'CreateTESTWI',
    label: 'Create TESTWI',
    version: '5',
    applicationId: '3226',
    applicationName: 'TESTWI',
    activityName: 'Task_4'
  });

  public actionConfig = new LiveAppsFormConfig().deserialize({
    type: 'action',
    caseRef: '534051',
    useCustomForm: 'false',
    sandbox: '31',
    formDivId: 'formDivAction',
    id: '14637',
    name: 'UpdateTESTWI',
    label: 'Update TESTWI',
    version: '2',
    applicationId: '3226',
    applicationName: 'TESTWI',
    activityName: 'Task'
  });

  public workitemConfig = new LiveAppsFormConfig().deserialize({
    type: 'workitem',
    useCustomForm: 'false',
    sandbox: '31',
    formDivId: 'formDivWorkitem',
    id: '27631'
  });

  @ViewChild('rowexpansion', {static: false}) rowExpansionTemplate: TemplateRef<any>;

  public columnDefs2: any[] = [
    {
      name: 'ID',
      field: 'summaryObj.ID_1',
      align: 'center'
    },
    {
      name: 'Proyecto',
      field: 'summaryObj.Proyecto'
    },
    {
      name: 'Descripción',
      field: 'summaryObj.Descripcin'
    },
    {
      name: 'Presupuesto',
      field: 'untaggedCasedataObj.PresupuestoAprobado',
      format: 'currency',
      currency: 'EUR',
      align: 'right'
    },
    {
      name: 'Date',
      field: 'metadata.creationTimestamp',
      format: 'date',
      date: 'dd-MM-yyyy',
      align: 'center'
    },
    {
      name: 'Usuario interno',
      field: 'untaggedCasedataObj.UsuarioInterno.name'
    }
  ];


  constructor(private router: Router, private route: ActivatedRoute, private liveAppsService: LiveAppsService, private tcEventsHelperService: TcEventsHelperService, private tcEventsService: TcEventsService) {
    this.messagingConfig = this.route.snapshot.data.messagingConfig;
    this.messagingConnection = (this.messagingConfig.connections && this.messagingConfig.connections.length > 0) ? this.messagingConfig.connections[0] : undefined;
  }

  @ViewChildren('componentDiv') componentDivs: LiveAppsComponent[];
  @ViewChild('formComponent', {static: false}) formComponent: LiveAppsFormWcComponent;
  // @ViewChild(TcgridLiveappsCasesComponent, {static: false}) gridComponent: TcgridLiveappsCasesComponent;

  data: any;

  handleData(data) {
    console.log('data available: ', data);
    this.data = data;
  }

  handleCompleted(data) {
    console.log('form complete: ', data);
    this.data = undefined;
  }

  handleEvent(event) {
    console.log(event);
  }

  handleSubmit() {
    // this.data.TESTWI.field1 = '12';
    // this.data.inouts[0].structured[0].field2 = '89898';
    // this.data.inouts[1].simple[0] = 'asdasdsa';
    this.formComponent.submit(this.data);
  }

  handleClose() {
    // this.data.inouts[0].structured[0].field2 = '222222';
    // this.data.inouts[1].simple[0] = 'changed';
    this.formComponent.close(this.data);
  }

  handleCancel() {
    this.formComponent.cancel();
  }

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
    if (typeof (event.data) && (event.data.action === 'wiCompleted')) {
      console.log('WI Complete: ', event);
    }
  }

  handleCaseClick = (event) => {
    console.log('Case click event: ', event);
  }

  handleSearchResults = (searchResults: CaseSearchResults) => {
    this.caseRefs = searchResults.caserefs;
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

  public setApp(selectedApp: CaseType) {
    this.selectedAppConfig = selectedApp;
  }

  public exportCases = () => {
    // this.gridComponent.exportToCsv({ onlySelected: true });
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
    this.liveAppsService.getCasesWithUserInfo(this.sandboxId, this.liveAppsConfig.applicationIds[0], '1', 0, 10)
      .subscribe(
        next => {
          if (next.caseinfos[0]) {
            this.caseRef = next.caseinfos[0].caseReference;
            this.casedata = next.caseinfos[0].untaggedCasedataObj;
            this.metadata = next.caseinfos[0].metadata;
            this.summary = next.caseinfos[0].summaryObj;
          } else {
            console.error('No cases for this appId: ', this.liveAppsConfig.applicationIds[0]);
          }
          console.log(next);
        },
        errorCase => {
          console.error('Error retrieving case data: ' + errorCase.error.errorMsg);
        });
  }

  handleErrorMessage = ($event): void => {
    console.log("*****", $event);
  }

  ngOnDestroy() {

  }

}
