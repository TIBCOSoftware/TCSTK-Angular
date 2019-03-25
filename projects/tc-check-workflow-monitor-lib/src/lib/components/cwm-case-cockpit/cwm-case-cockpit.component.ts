import { Component, OnInit } from '@angular/core';
import {LiveAppsCaseCockpitComponent} from 'tc-liveapps-lib';
import {ToolbarButton} from 'tc-core-lib';

@Component({
  selector: 'tccwm-cwm-case-cockpit',
  templateUrl: './cwm-case-cockpit.component.html',
  styleUrls: ['./cwm-case-cockpit.component.css']
})
export class CwmCaseCockpitComponent extends LiveAppsCaseCockpitComponent {

  protected createToolbarButtons = (): ToolbarButton[] => {
    const configButton = this.buttonsHelper.createButton('config', 'tcs-capabilities', true, 'Config', true, true);
    const favButton = this.buttonsHelper.createButton('favorite', 'tcs-favorites-icon', this.isFavorite, 'Toggle Favorite', true, true);
    const refreshButton = this.buttonsHelper.createButton('refresh', 'tcs-refresh-icon', true, 'Refresh', true, true);
    const homeButton = this.buttonsHelper.createButton('close', 'tcs-close-icon', true, 'Close', true, true);
    const buttons = [  favButton, refreshButton, homeButton ];
    return buttons;
  }

}
