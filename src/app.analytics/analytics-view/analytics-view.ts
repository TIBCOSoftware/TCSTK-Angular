import {Component, EventEmitter, Input, Output, SimpleChanges, OnChanges, ViewChild, OnInit} from '@angular/core';
import {RouteAction, TcButtonsHelperService} from '@tibco-tcstk/tc-core-lib';
import {
  LiveAppsHomeCockpitComponent,
  Roles,
  RouteAccessControlConfigurationElement,
  FormConfig,
  TcRolesService, CaseType, LiveAppsCreatorDialogComponent, CaseCreatorSelectionContext, LiveAppsService
} from '@tibco-tcstk/tc-liveapps-lib';
import {CustomFormDefs} from '@tibco-tcstk/tc-forms-lib';
import {SpotfireConfig, SpotfireMarkingCreateCaseConfig, SpotfireWrapperComponent, TcSpotfireService} from '@tibco-tcstk/tc-spotfire-lib';
import {FormControl} from '@angular/forms';
import {MatDialog} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-risk-investigation-home',
  templateUrl: './analytics-view.html',
  styleUrls: ['./analytics-view.css']
})

export class AnalyticsViewComponent extends LiveAppsHomeCockpitComponent implements OnChanges, OnInit {


  /**
   * The Application ID of the UI (should ideally be unique as it is shared state key)
   */
  @Input() uiAppId: string;

  /**
   * The list of LA Application IDs you want to handle
   */
  @Input() appIds: string[];

  /**
   * sandboxId - this comes from claims resolver
   */
  @Input() sandboxId: number;

  /**
   * The name of the logged user
   */
  @Input() userName: string;

  /**
   * The ID of the logged user
   */
  @Input() userId: string;

  /**
   * * Email address of the user (comes from resolver)
   */
  @Input() email: string;

  /**
   * page title comes from config resolver
   */
  @Input() title: string;

  /**
   * Roles - The users current roles
   */
  @Input() roles: Roles;

  /**
   * RouteAccessControlConfig - basically the config for access control
   */
  @Input() access: RouteAccessControlConfigurationElement;

  /**
   * Custom Form Layout Configuration
   */
  @Input() formConfig: FormConfig;

  /**
   * Custom Form configuration file
   */
  @Input() customFormDefs: CustomFormDefs;

  /**
   * Enable legacy workitems
   */
  @Input() legacyWorkitems: boolean = this.legacyWorkitems ? this.legacyWorkitems : false;

  /**
   * Enable legacy creators
   */
  @Input() legacyCreators: boolean = this.legacyCreators ? this.legacyCreators : false;

  /**
   * Allow override of forms framework
   * Options: bootstrap-4 or material-design
   */
  @Input() formsFramework: string = this.formsFramework ? this.formsFramework : 'material-design';

  /**
   * ~event routeAction : Component requests route to another page
   * ~payload RouteAction : RouteAction object to tell caller to navigate somewhere
   */
  @Output() routeAction: EventEmitter<RouteAction> = new EventEmitter<RouteAction>();

  @ViewChild(SpotfireWrapperComponent, {static: false}) spotfireWrapperComponent: SpotfireWrapperComponent;

  activepage: string;

  selected = new FormControl(0);

  private laData = {};

  public selectedRecords = {};

  private markingValue = {};

  public sFConfig: SpotfireConfig;

  constructor(protected buttonsHelper: TcButtonsHelperService, public dialog: MatDialog, protected rolesService: TcRolesService, public router: Router, protected sFHelper: TcSpotfireService, private activeRoute: ActivatedRoute) {
    super(buttonsHelper, dialog, rolesService);
    this.sFConfig = activeRoute.snapshot.data.spotfireConfigHolder;
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
  }

  ngOnInit() {
    this.selected.setValue(2);
    this.title = 'Welcome - ' + this.userName;
    this.activepage = this.sFConfig.activePageForHome;
    const buttonHome = this.buttonsHelper.createButton('splash', 'tcs-home', true, 'Home', true, true, 'Home');
    const buttonAnalytics = this.buttonsHelper.createButton('home', 'tcs-pie-chart', true, 'Analyse Risky Transactions', true, true, 'Risk Analysis');
    const buttonOverview = this.buttonsHelper.createButton('overview', 'tcs-caselist-icon', true, 'An Overview of Risk Investigations', true, true, 'Investigation Overview');
    this.burgerMenuButtons = [buttonHome, buttonAnalytics, buttonOverview];
  }

  public handleBurgerMenuClick = (event) => {
    const target = '/starterApp/' + event;
    console.log('--> Navigating to: ' , target);
    this.router.navigate([target]);
  }

  marking(mark) {
    this.markingValue = mark;
  }

  public handleCreatorAppSelection = (application: CaseType): void => {
  const config = new SpotfireMarkingCreateCaseConfig().deserialize({
    markingName: 'Case Marking',
    tableName: 'newtransactionsscoredwstate',
    objectPath: 'RiskInvestigation201.Records_v1',
    attributes: [
      {
        sourceAttr: 'oddity',
        targetAttr: 'Oddity_v1'
      },
      {
        sourceAttr: 'fraud_probability',
        targetAttr: 'TargetProbability_v1'
      },
      {
        sourceAttr: 'id',
        targetAttr: 'id_v1'
      }
    ],
    initialValue: {
      RiskInvestigation201: {
        Channel_v1: 'Spotfire',
        Comment_v1: '',
        Decision_v1: 'undetermined',
        Followup_v1: 'None'
      }
    }
  });
  this.laData = this.sFHelper.createLiveAppsData(this.markingValue, config);
  this.openCreatorDialog(application, this.laData, this.sandboxId, this.customFormDefs, false, this.formsFramework, this.formConfig);
  }




  public tabChange($event) {
    console.log('tab change: ', $event);
    console.log($event.index);
    switch ($event.index) {
      case 0:
        this.activepage = 'View Score Distribution';
        break;
      case 1:
        this.activepage = 'Set Thresholds';
        break;
      case 2:
        this.activepage = 'Transaction Map';
        break;
      case 3:
        this.activepage = 'Create Cases';
        break;
      case 4:
        this.activepage = 'Track Cases';
        break;

      default:
      // code block
    }
    this.spotfireWrapperComponent.openPage(this.activepage);
  }
}
