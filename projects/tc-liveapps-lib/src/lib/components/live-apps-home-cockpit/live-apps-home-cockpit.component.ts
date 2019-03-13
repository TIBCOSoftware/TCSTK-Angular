import {Component, EventEmitter, Inject, Input, OnInit, Output, ViewChild} from '@angular/core';
import {CaseRoute, CaseType, RouteAction} from '../../models/liveappsdata';
import {ToolbarButton, TcButtonsHelperService} from 'tc-core-lib';
import {LiveAppsFavoriteCasesComponent} from '../live-apps-favorite-cases/live-apps-favorite-cases.component';
import {LiveAppsRecentCasesComponent} from '../live-apps-recent-cases/live-apps-recent-cases.component';
import {LiveAppsSearchWidgetComponent} from '../live-apps-search-widget/live-apps-search-widget.component';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {LiveAppsCreatorDialogComponent} from '../live-apps-creator-dialog/live-apps-creator-dialog.component';
import {CaseCreatorSelectionContext} from '../../models/tc-case-creator';

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
      console.log('The dialog was closed');
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
  }

  ngOnInit() {
    this.toolbarButtons = this.createToolbarButtons();
  }

}
