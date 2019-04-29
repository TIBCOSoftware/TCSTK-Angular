import { Component, OnInit } from '@angular/core';
import {LiveAppsHomeCockpitComponent} from '@tibco-tcstk/tc-liveapps-lib';
import {ToolbarButton, RouteAction} from '@tibco-tcstk/tc-core-lib';

@Component({
  selector: 'tccwm-home-cockpit',
  templateUrl: './home-cockpit.component.html',
  styleUrls: ['./home-cockpit.component.css']
})
export class HomeCockpitComponent extends LiveAppsHomeCockpitComponent {



  protected createToolbarButtons = (): ToolbarButton[] => {


    const configButton = this.buttonsHelper.createButton('config', 'tcs-config-icon', true, 'Config', true, true);
    const refreshButton = this.buttonsHelper.createButton('refresh', 'tcs-refresh-icon', true, 'Refresh', true, true);
    const homeButton = this.buttonsHelper.createButton('home', 'tcs-home', true, 'Home', true, true);
    const buttons = [ homeButton, configButton, refreshButton ];
    return buttons;
  }


  public handleToolbarButtonEvent = (buttonId: string) => {
    if (buttonId === 'config') {
      this.routeAction.emit(new RouteAction('configClicked', null));
    }

    if (buttonId === 'upload') {
      this.routeAction.emit(new RouteAction('uploadClicked', null));
    }

    if (buttonId === 'casecockpit') {
      this.routeAction.emit(new RouteAction('casecockpitClicked', null));
    }

    if (buttonId === 'home') {
      this.routeAction.emit(new RouteAction('homeClicked', null));
    }



    if (buttonId === 'refresh') {
      this.refresh();
    }
  }



}
