import { Component, Output, Input, EventEmitter } from '@angular/core';
import { LiveAppsHomeCockpitComponent } from 'tc-liveapps-lib';
import { RouteAction, ToolbarButton } from 'tc-core-lib';

@Component({
  selector: 'tcpd-pd-home-cockpit',
  templateUrl: './pd-home-cockpit.component.html',
  styleUrls: ['./pd-home-cockpit.component.css']
})
export class PdHomeCockpitComponent extends LiveAppsHomeCockpitComponent {
   public viewButtons;

    protected createToolbarButtons = (): ToolbarButton[] => {
        const configButton = this.buttonsHelper.createButton('config', 'tcs-capabilities', true, 'Config', true, true);
        const refreshButton = this.buttonsHelper.createButton('refresh', 'tcs-refresh-icon', true, 'Refresh', true, true);
        const changeDatasourceButton = this.buttonsHelper.createButton('changedatasource', 'tcs-config-icon', true, 'Change datasource', true, true);
        const buttons = [ changeDatasourceButton, configButton, refreshButton ];
        return buttons;
    }

    public handleToolbarButtonEvent = (buttonId: string) => {
        if (buttonId === 'config') {
          this.routeAction.emit(new RouteAction('configClicked', null));
        }
        if (buttonId === 'refresh') {
          this.refresh();
        }
        if (buttonId === 'changedatasource'){
            this.routeAction.emit(new RouteAction('changedatasourceClicked', null));
        }
    }

    protected createViewButtons = (): ToolbarButton[] => {
        const processMiningView = this.buttonsHelper.createButton('config', 'tcs-config-icon', true, 'Process Mining View', true, true);
        const caseView = this.buttonsHelper.createButton('refresh', 'tcs-refresh-icon', true, 'Case View', true, true);
        const buttons = [ processMiningView, caseView ];
        return buttons;
    }

    

    ngOnInit() {
        super.ngOnInit();
        this.viewButtons = this.createViewButtons();
      }
}
