import {Component, EventEmitter, Inject, Input, OnInit, Output, ViewChild} from '@angular/core';
import {CaseRoute, CaseType, RouteAction} from '../../models/liveappsdata';
import {ToolbarButton, TcButtonsHelperService} from 'tc-core-lib';
import {LiveAppsFavoriteCasesComponent} from '../live-apps-favorite-cases/live-apps-favorite-cases.component';
import {LiveAppsRecentCasesComponent} from '../live-apps-recent-cases/live-apps-recent-cases.component';
import {LiveAppsSearchWidgetComponent} from '../live-apps-search-widget/live-apps-search-widget.component';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {LiveAppsCreatorDialogComponent} from '../live-apps-creator-dialog/live-apps-creator-dialog.component';
import {CaseCreatorSelectionContext} from '../../models/tc-case-creator';
import {LiveAppsNotesComponent} from '../live-apps-notes/live-apps-notes.component';

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
  @Output() routeAction: EventEmitter<RouteAction> = new EventEmitter<RouteAction>();

  @ViewChild(LiveAppsFavoriteCasesComponent) favoritesComponent: LiveAppsFavoriteCasesComponent;
  @ViewChild(LiveAppsRecentCasesComponent) recentsComponent: LiveAppsRecentCasesComponent;
  @ViewChild(LiveAppsSearchWidgetComponent) searchComponent: LiveAppsSearchWidgetComponent;
  @ViewChild(LiveAppsNotesComponent) collaborationComponent: LiveAppsNotesComponent;

  public toolbarButtons: ToolbarButton[];

  public clickCaseAction = (caseRoute: CaseRoute) => {
    // case clicked - tell parent (will pass caseRef and appId)
    this.routeAction.emit(new RouteAction('caseClicked', caseRoute));
  }

  constructor(protected buttonsHelper: TcButtonsHelperService, public dialog: MatDialog) { }

  protected createToolbarButtons = (): ToolbarButton[] => {
    const configButton = this.buttonsHelper.createButton('config', 'tcs-config-icon', true, 'Config', true, true);
    const refreshButton = this.buttonsHelper.createButton('refresh', 'tcs-refresh-icon', true, 'Refresh', true, true);
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
  }

  ngOnInit() {
    this.toolbarButtons = this.createToolbarButtons();
  }

}
