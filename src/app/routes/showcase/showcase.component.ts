import {Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewChildren} from '@angular/core';
import {Claim, GeneralConfig} from '@tibco-tcstk/tc-core-lib';
import {
  CaseInfo,
  CaseType,
  LiveAppsComponent,
  LiveAppsConfig,
  LiveAppsService,
  Metadata, ProcessId
} from '@tibco-tcstk/tc-liveapps-lib';
import {ActivatedRoute, Router} from '@angular/router';
import {map, take, takeUntil} from 'rxjs/operators';
import {MessagingConfig, MessagingConnection} from '@tibco-tcstk/tc-messaging-lib';

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
  public formSchema = JSON.parse('{\n' +
    '    "type": "object",\n' +
    '    "properties": {\n' +
    '      "first_name": { "type": "string" },\n' +
    '      "last_name": { "type": "string" },\n' +
    '      "address": {\n' +
    '        "type": "object",\n' +
    '        "properties": {\n' +
    '          "street_1": { "type": "string" },\n' +
    '          "street_2": { "type": "string" },\n' +
    '          "city": { "type": "string" },\n' +
    '          "state": {\n' +
    '            "type": "string",\n' +
    '            "enum": [ "AL", "AK", "AS", "AZ", "AR", "CA", "CO", "CT", "DE",\n' +
    '                "DC", "FM", "FL", "GA", "GU", "HI", "ID", "IL", "IN", "IA",\n' +
    '                "KS", "KY", "LA", "ME", "MH", "MD", "MA", "MI", "MN", "MS",\n' +
    '                "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND",\n' +
    '                "MP", "OH", "OK", "OR", "PW", "PA", "PR", "RI", "SC", "SD",\n' +
    '                "TN", "TX", "UT", "VT", "VI", "VA", "WA", "WV", "WI", "WY" ]\n' +
    '          },\n' +
    '          "zip_code": { "type": "string" }\n' +
    '        }\n' +
    '      },\n' +
    '      "birthday": { "type": "string" },\n' +
    '      "notes": { "type": "string" },\n' +
    '      "phone_numbers": {\n' +
    '        "type": "array",\n' +
    '        "items": {\n' +
    '          "type": "object",\n' +
    '          "properties": {\n' +
    '            "type": { "type": "string", "enum": [ "cell", "home", "work" ] },\n' +
    '            "number": { "type": "string" }\n' +
    '          },\n' +
    '          "required": [ "type", "number" ]\n' +
    '        }\n' +
    '      }\n' +
    '    },\n' +
    '    "required": [ "last_name" ]\n' +
    '  }');

  public formLayout = JSON.parse('[\n' +
    '    { "type": "flex", "flex-flow": "row wrap", "items": [ "first_name", "last_name" ] },\n' +
    '    { "key": "address.street_1", "title": "Address", "placeholder": "Street" },\n' +
    '    { "key": "address.street_2", "notitle": true },\n' +
    '    { "type": "div",\n' +
    '      "display": "flex",\n' +
    '      "flex-direction": "row",\n' +
    '      "items": [\n' +
    '        { "key": "address.city", "flex": "3 3 150px",\n' +
    '          "notitle": true, "placeholder": "City"\n' +
    '        },\n' +
    '        { "key": "address.state", "flex": "1 1 50px",\n' +
    '          "notitle": true, "placeholder": "State"\n' +
    '        },\n' +
    '        { "key": "address.zip_code", "flex": "2 2 100px",\n' +
    '          "notitle": true, "placeholder": "Zip Code"\n' +
    '        }\n' +
    '      ]\n' +
    '    },\n' +
    '    { "key": "birthday", "type": "date" },\n' +
    '    { "key": "phone_numbers",\n' +
    '      "type": "array",\n' +
    '      "listItems": 3,\n' +
    '      "items": [ {\n' +
    '        "type": "div",\n' +
    '        "displayFlex": true,\n' +
    '        "flex-direction": "row",\n' +
    '        "items": [\n' +
    '          { "key": "phone_numbers[].type", "flex": "1 1 50px",\n' +
    '            "notitle": true, "placeholder": "Type"\n' +
    '          },\n' +
    '          { "key": "phone_numbers[].number", "flex": "4 4 200px",\n' +
    '            "notitle": true, "placeholder": "Phone Number"\n' +
    '          }\n' +
    '        ]\n' +
    '      }\n' +
    '    ]\n' +
    '    }\n' +
    '    ]');

  public formData = JSON.parse('{\n' +
    '    "first_name": "Jane",\n' +
    '    "last_name": "Doe",\n' +
    '    "address": {\n' +
    '      "street_1": "123 Main St.",\n' +
    '      "city": "Las Vegas",\n' +
    '      "state": "NV",\n' +
    '      "zip_code": "89123"\n' +
    '    },\n' +
    '    "birthday": "1999-09-09",\n' +
    '    "phone_numbers": [\n' +
    '      { "type": "cell", "number": "702-123-4567" },\n' +
    '      { "type": "work", "number": "702-987-6543" }\n' +
    '    ],\n' +
    '    "notes": "(This is an example of an uninteresting note.)"\n' +
    '  }');

  constructor(private router: Router, private route: ActivatedRoute, private liveAppsService: LiveAppsService) {
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
