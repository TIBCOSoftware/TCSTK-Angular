import { Component, OnInit } from '@angular/core';
import {LiveAppsHomeCockpitComponent} from 'tc-liveapps-lib';
import {ToolbarButton, RouteAction} from 'tc-core-lib';

@Component({
  selector: 'tccwm-decision-cockpit',
  templateUrl: './decision-cockpit.component.html',
  styleUrls: ['./decision-cockpit.component.css']
})
export class DecisionCockpitComponent extends LiveAppsHomeCockpitComponent {






  protected createToolbarButtons = (): ToolbarButton[] => {
    const configButton = this.buttonsHelper.createButton('config', 'tcs-config-icon', true, 'Config', true, true);
    const refreshButton = this.buttonsHelper.createButton('refresh', 'tcs-refresh-icon', true, 'Refresh', true, true);
    const uploadButton = this.buttonsHelper.createButton('upload', 'tcs-document-upload', true, 'Upload Page', true, true);
    const buttons = [ uploadButton, configButton, refreshButton ];
    return buttons;
  }


  public handleToolbarButtonEvent = (buttonId: string) => {
    if (buttonId === 'config') {
      this.routeAction.emit(new RouteAction('configClicked', null));
    }

    if (buttonId === 'upload') {
      this.routeAction.emit(new RouteAction('uploadClicked', null));
    }

    if (buttonId === 'refresh') {
      this.refresh();
    }
  }



}
