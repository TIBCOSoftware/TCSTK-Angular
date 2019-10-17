import {Component, EventEmitter, Inject, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {CaseRoute, CaseType} from '../../models/liveappsdata';
import {ToolbarButton, TcButtonsHelperService, RouteAction} from '@tibco-tcstk/tc-core-lib';
import {LiveAppsFavoriteCasesComponent} from '../live-apps-favorite-cases/live-apps-favorite-cases.component';
import {LiveAppsRecentCasesComponent} from '../live-apps-recent-cases/live-apps-recent-cases.component';
import {LiveAppsSearchWidgetComponent} from '../live-apps-search-widget/live-apps-search-widget.component';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {LiveAppsCreatorDialogComponent} from '../live-apps-creator-dialog/live-apps-creator-dialog.component';
import {CaseCreatorSelectionContext} from '../../models/tc-case-creator';
import {LiveAppsNotesComponent} from '../live-apps-notes/live-apps-notes.component';
import {LiveAppsDocumentsComponent} from '../live-apps-documents/live-apps-documents.component';
import {TcRolesService} from '../../services/tc-roles-service.ts.service';
import {Roles, RouteAccessControlConfig, RouteAccessControlConfigurationElement} from '../../models/tc-groups-data';
import {LiveAppsActiveCasesWidgetComponent} from '../live-apps-active-cases-widget/live-apps-active-cases-widget.component';
import {CaseTypeReportRecord, CaseTypeStateReportStateInfo} from '../../models/tc-live-apps-reporting';
import {CustomFormDefs} from '@tibco-tcstk/tc-forms-lib';
import {LiveAppsWorkitemsComponent} from '../live-apps-workitems/live-apps-workitems.component';


/**
 * High level component to allow home page view of system
 *
 * ![alt-text](../live-apps-home-cockpit.png "Documents Component Image")
 *
 *@example <tcla-live-apps-home-cockpit></tcla-live-apps-home-cockpit>
 */
@Component({
  selector: 'tcla-live-apps-home-cockpit',
  templateUrl: './live-apps-home-cockpit.component.html',
  styleUrls: ['./live-apps-home-cockpit.component.css']
})
export class LiveAppsHomeCockpitComponent implements OnChanges {
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
   * ~event routeAction : Component requests route to another page
   * ~payload RouteAction : RouteAction object to tell caller to navigate somewhere
   */
  @Output() routeAction: EventEmitter<RouteAction> = new EventEmitter<RouteAction>();

  @ViewChild(LiveAppsFavoriteCasesComponent, {static: false}) favoritesComponent: LiveAppsFavoriteCasesComponent;
  @ViewChild(LiveAppsRecentCasesComponent, {static: false}) recentsComponent: LiveAppsRecentCasesComponent;
  @ViewChild(LiveAppsSearchWidgetComponent, {static: false}) searchComponent: LiveAppsSearchWidgetComponent;
  @ViewChild(LiveAppsNotesComponent, {static: false}) collaborationComponent: LiveAppsNotesComponent;
  @ViewChild(LiveAppsDocumentsComponent, {static: false}) documentsComponent: LiveAppsDocumentsComponent;
  @ViewChild(LiveAppsActiveCasesWidgetComponent, {static: false}) activeCasesComponent: LiveAppsActiveCasesWidgetComponent;
  @ViewChild(LiveAppsWorkitemsComponent, {static: false}) workitemsComponent: LiveAppsWorkitemsComponent;

  public toolbarButtons: ToolbarButton[] = [];
  public caseStartButtonActive: boolean;
  public selectedCaseTypeReportRecord: CaseTypeReportRecord;

  incConfigButton = true;
  incRefreshButton = true;
  cockpitReady = false;

  public clickCaseAction = (caseRoute: CaseRoute) => {
    // case clicked - tell parent (will pass caseRef and appId)
    this.routeAction.emit(new RouteAction('caseClicked', caseRoute));
  }

  constructor(protected buttonsHelper: TcButtonsHelperService, public dialog: MatDialog, protected rolesService: TcRolesService) { }

  protected createToolbarButtons = (): ToolbarButton[] => {
    const buttons = [];

    // you can use the rolesService to either disable or hide the button as required - it returns true if the user has the roleId specified
    // const configButton = this.buttonsHelper.createButton('config', 'tcs-capabilities', true, 'Config', true, this.rolesService.checkRole('Partner Portal Configurator', this.roles));
    if (this.incConfigButton) {
      const configButton = this.buttonsHelper.createButton('config', 'tcs-capabilities', true, 'Config', (this.access ? this.rolesService.checkButton('configure', this.access) : true), true);
      buttons.push(configButton);
    }
    if (this.incRefreshButton) {
      const refreshButton = this.buttonsHelper.createButton('refresh', 'tcs-refresh-icon', true, 'Refresh', (this.access ? this.rolesService.checkButton('refresh', this.access) : true), true);
      buttons.push(refreshButton);
    }
    return buttons;
  }

  public handleToolbarButtonEvent = (buttonId: string) => {
    if (buttonId === 'config') {
      this.routeAction.emit(new RouteAction('configClicked', null));
    }
    if (buttonId === 'refresh') {
      this.refresh();
    }
  }

  public handleCreatorAppSelection = (application: CaseType) => {
    const EXAMPLE_INITIAL_DATA = {
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
    }
    // this.openCreatorDialog(application, EXAMPLE_INITIAL_DATA, this.sandboxId);
    this.openCreatorDialog(application, undefined, this.sandboxId, this.customFormDefs, this.legacyCreators);
  }

  public handleReportCaseTypeSelection = (caseTypeReportRecord: CaseTypeReportRecord) => {
    this.selectedCaseTypeReportRecord = caseTypeReportRecord;
  }

  public handleReportCaseTypeStateSelection = (state: CaseTypeStateReportStateInfo) => {
    if (this.selectedCaseTypeReportRecord) {
      this.searchComponent.searchCasesByState(Number(state.id), state.label, this.selectedCaseTypeReportRecord.applicationId, this.selectedCaseTypeReportRecord.caseTypeInfo.id, this.selectedCaseTypeReportRecord.caseTypeInfo.label + '|' + state.label );
    }
  }

  openCreatorDialog = (application: CaseType, initialData, sandboxId, customFormDefs, legacyCreators) => {
    const dialogRef = this.dialog.open(LiveAppsCreatorDialogComponent, {
      width: '60%',
      height: '80%',
      maxWidth: '100vw',
      maxHeight: '100vh',
      panelClass: 'tcs-style-dialog',
      data: new CaseCreatorSelectionContext(application, initialData, sandboxId, customFormDefs, legacyCreators)
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.routeAction.emit(new RouteAction('caseClicked', result));
      }
    });
  }

  public refresh = () => {
    if (this.favoritesComponent) {
      this.favoritesComponent.refresh();
    }
    if (this.recentsComponent) {
      this.recentsComponent.refresh();
    }
    if (this.searchComponent) {
      this.searchComponent.refresh();
    }
    if (this.collaborationComponent) {
      this.collaborationComponent.refresh();
    }
    if (this.documentsComponent) {
      this.documentsComponent.refresh();
    }
    if (this.activeCasesComponent) {
      this.activeCasesComponent.refresh();
    }
    if (this.workitemsComponent) {
      this.workitemsComponent.refresh();
    }
  }

  initialize() {
    this.toolbarButtons = this.toolbarButtons.concat(this.createToolbarButtons());
    this.caseStartButtonActive = this.access ? this.rolesService.checkButton('caseStart', this.access) : true;
    this.cockpitReady = true;
  }

  ngOnChanges(changes: SimpleChanges): void {

    // on first set call initialize
    if (changes.appIds.firstChange && changes.sandboxId.firstChange && changes.uiAppId.firstChange) {
      this.initialize();
    }
  }



}
