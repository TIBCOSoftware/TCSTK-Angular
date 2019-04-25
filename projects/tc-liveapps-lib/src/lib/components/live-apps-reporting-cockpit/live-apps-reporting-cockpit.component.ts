import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RouteAction, TcButtonsHelperService, ToolbarButton} from 'tc-core-lib';
import {LiveAppsService} from '../../services/live-apps.service';
import {Router} from '@angular/router';

@Component({
  selector: 'tcla-live-apps-reporting-cockpit',
  templateUrl: './live-apps-reporting-cockpit.component.html',
  styleUrls: ['./live-apps-reporting-cockpit.component.css']
})
export class LiveAppsReportingCockpitComponent implements OnInit {
  @Input() uiAppId;
  @Input() appIds;
  @Input() sandboxId;
  @Output() routeAction: EventEmitter<RouteAction> = new EventEmitter<RouteAction>();

  toolbarButtons: ToolbarButton[];

  constructor(protected liveapps: LiveAppsService, protected buttonsHelper: TcButtonsHelperService, private router: Router) { }

  protected createToolbarButtons = (): ToolbarButton[] => {
    const configButton = this.buttonsHelper.createButton('config', 'tcs-capabilities', true, 'Config', true, true);
    const refreshButton = this.buttonsHelper.createButton('refresh', 'tcs-refresh-icon', true, 'Refresh', true, true);
    const homeButton = this.buttonsHelper.createButton('close', 'tcs-close-icon', true, 'Close', true, true);
    const buttons = [ configButton, refreshButton, homeButton ];
    return buttons;
  }

  public handleToolbarButtonEvent = (buttonId: string) => {
    if (buttonId === 'config') {
      this.routeAction.emit(new RouteAction('configClicked', null));
    }
    if (buttonId === 'refresh') {
      this.refresh();
    }
    if (buttonId === 'close') {
      this.routeAction.emit(new RouteAction('backClicked', null));
    }
  }

  public refresh = () => {
  }

  ngOnInit() {
    this.toolbarButtons = this.createToolbarButtons();
  }

}
