import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {CaseRoute, CaseType, RouteAction} from '../../models/liveappsdata';
import {ToolbarButton, TcButtonsHelperService} from 'tc-core-lib';
import {LiveAppsFavoriteCasesComponent} from '../live-apps-favorite-cases/live-apps-favorite-cases.component';
import {LiveAppsRecentCasesComponent} from '../live-apps-recent-cases/live-apps-recent-cases.component';
import {LiveAppsSearchWidgetComponent} from '../live-apps-search-widget/live-apps-search-widget.component';

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

  constructor(protected buttonsHelper: TcButtonsHelperService) { }

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
    console.log(application.applicationName);
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
