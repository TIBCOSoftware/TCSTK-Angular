import { Component, Output, Input, EventEmitter } from '@angular/core';
import { LiveAppsHomeCockpitComponent } from 'tc-liveapps-lib';
import { RouteAction, ToolbarButton, TcButtonsHelperService } from 'tc-core-lib';
import { MatButtonToggleChange, MatDialog } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'tcpd-pd-home-cockpit',
  templateUrl: './pd-home-cockpit.component.html',
  styleUrls: ['./pd-home-cockpit.component.css']
})
export class PdHomeCockpitComponent extends LiveAppsHomeCockpitComponent {

    public viewButtons;
    // @Output() routeAction: EventEmitter<RouteAction> = new EventEmitter<RouteAction>();

    constructor(private router: Router, protected buttonsHelper: TcButtonsHelperService, public dialog: MatDialog) {
        super(buttonsHelper, dialog);
    }

    protected createToolbarButtons = (): ToolbarButton[] => {
        const changeDatasourceButton = this.buttonsHelper.createButton('changedatasource', 'tcs-config-icon', true, 'Change datasource', false, true);
        const configButton = this.buttonsHelper.createButton('config', 'tcs-capabilities', true, 'Config', true, true);
        const refreshButton = this.buttonsHelper.createButton('refresh', 'tcs-refresh-icon', true, 'Refresh', true, true);
        const buttons = [ changeDatasourceButton, configButton, refreshButton ];
        return buttons;
    }

    public handleToolbarButtonEvent = (buttonId: string) => {
        if (buttonId === 'changedatasource'){
            this.routeAction.emit(new RouteAction('changedatasourceClicked', null));
        }
        if (buttonId === 'config') {
          this.routeAction.emit(new RouteAction('configClicked', null));
        }
        if (buttonId === 'refresh') {
          this.refresh();
        }
      }

      protected createViewButtons = (): ToolbarButton[] => {
        const processMiningView = this.buttonsHelper.createButton('process-mining-view', '', true, 'Process Mining View', true, true);
        const caseView = this.buttonsHelper.createButton('case-view', '', true, 'Case View', true, true);
        const buttons = [ processMiningView, caseView ];
        return buttons;
    }

  
     public handleViewButtonEvent = (event: MatButtonToggleChange) => {
        let url = '/starterApp/pd/' + event.value;
        if (event.value === 'process-mining-view'){
            url += '/' + 'datasource';
        }
        console.log("******* URL: " + url);
        this.router.navigate([url], {});
    }
  

    ngOnInit() {
        super.ngOnInit();
        this.viewButtons = this.createViewButtons();
      }
}
