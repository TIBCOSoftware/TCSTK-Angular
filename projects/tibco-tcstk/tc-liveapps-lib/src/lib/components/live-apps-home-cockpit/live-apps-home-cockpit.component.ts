import {Component, EventEmitter, Inject, Input, OnInit, Output, ViewChild} from '@angular/core';
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
import {Roles, RouteAccessControlConfig} from '../../models/tc-groups-data';
import {LiveAppsActiveCasesWidgetComponent} from '@tibco-tcstk/tc-liveapps-lib';

@Component({
  selector: 'tcla-live-apps-home-cockpit',
  templateUrl: './live-apps-home-cockpit.component.html',
  styleUrls: ['./live-apps-home-cockpit.component.css']
})
export class LiveAppsHomeCockpitComponent implements OnInit {
  @Input() uiAppId;
  @Input() appIds;
  @Input() sandboxId;
  @Input() userName;
  @Input() userId;
  @Input() email;
  @Input() title;
  @Input() roles: Roles;
  @Input() access: RouteAccessControlConfig;
  @Output() routeAction: EventEmitter<RouteAction> = new EventEmitter<RouteAction>();

  @ViewChild(LiveAppsFavoriteCasesComponent) favoritesComponent: LiveAppsFavoriteCasesComponent;
  @ViewChild(LiveAppsRecentCasesComponent) recentsComponent: LiveAppsRecentCasesComponent;
  @ViewChild(LiveAppsSearchWidgetComponent) searchComponent: LiveAppsSearchWidgetComponent;
  @ViewChild(LiveAppsNotesComponent) collaborationComponent: LiveAppsNotesComponent;
  @ViewChild(LiveAppsDocumentsComponent) documentsComponent: LiveAppsDocumentsComponent;
  @ViewChild(LiveAppsActiveCasesWidgetComponent) activeCasesComponent: LiveAppsActiveCasesWidgetComponent;

  public toolbarButtons: ToolbarButton[];
  public caseStartButtonActive: boolean;

  public clickCaseAction = (caseRoute: CaseRoute) => {
    // case clicked - tell parent (will pass caseRef and appId)
    this.routeAction.emit(new RouteAction('caseClicked', caseRoute));
  }

  constructor(protected buttonsHelper: TcButtonsHelperService, public dialog: MatDialog, protected rolesService: TcRolesService) { }

  protected createToolbarButtons = (): ToolbarButton[] => {
    // you can use the rolesService to either disable or hide the button as required - it returns true if the user has the roleId specified
    // const configButton = this.buttonsHelper.createButton('config', 'tcs-capabilities', true, 'Config', true, this.rolesService.checkRole('Partner Portal Configurator', this.roles));
    const configButton = this.buttonsHelper.createButton('config', 'tcs-capabilities', true, 'Config', (this.access ? this.rolesService.checkButton('configure', this.roles, this.access) : true), true);
    const refreshButton = this.buttonsHelper.createButton('refresh', 'tcs-refresh-icon', true, 'Refresh', (this.access ? this.rolesService.checkButton('refresh', this.roles, this.access) : true), true);
    const buttons = [ configButton, refreshButton ];
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
    this.openCreatorDialog(application, undefined, this.sandboxId);
  }

  openCreatorDialog = (application: CaseType, initialData, sandboxId) => {
    const dialogRef = this.dialog.open(LiveAppsCreatorDialogComponent, {
      width: '60%',
      height: '80%',
      maxWidth: '100vw',
      maxHeight: '100vh',
      panelClass: 'tcs-style-dialog',
      data: new CaseCreatorSelectionContext(application, initialData, sandboxId)
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
  }

  ngOnInit() {
    this.toolbarButtons = this.createToolbarButtons();
    this.caseStartButtonActive = this.access ? this.rolesService.checkButton('caseStart', this.roles, this.access) : true;
  }

}
