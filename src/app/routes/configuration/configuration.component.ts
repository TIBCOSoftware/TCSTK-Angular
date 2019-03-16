import { Component, OnInit } from '@angular/core';
import {TcButtonsHelperService, ToolbarButton} from 'tc-core-lib';
import {RouteAction} from 'tc-core-lib';
import {Router} from '@angular/router';

@Component({
  selector: 'laapp-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {

  viewButtons: ToolbarButton[];
  configMenuPages: any[];

  constructor(private buttonsHelper: TcButtonsHelperService, private router: Router) { }

  handleRouteAction = (routeAction: RouteAction) => {
    if (routeAction.action === 'backClicked') {
      // back clicked - navigate to home
      this.router.navigate(['/starterApp/home/']);
    }
  }

  /* This is for PD usecase where you want navbar */
  /* un-comment if you want it */
/*
  protected createViewButtons = (): ToolbarButton[] => {
    const landingview = this.buttonsHelper.createButton('landingview', 'tcs-config-icon', true, 'Landing View', true, true);
    const processmimingview = this.buttonsHelper.createButton('process-mining-view', 'tcs-refresh-icon', true, 'Process Mining View', true, true);
    const caseView = this.buttonsHelper.createButton('case-view', 'tcs-refresh-icon', true, 'Case View', true, true);
    const buttons = [ landingview, processmimingview, caseView ];
    return buttons;
  }*/

  public handleToolbarButtonEvent = (id) => {
    console.log('Selected option: ' + id);
  }

  ngOnInit() {
     //  const uiAppId = this.route.snapshot.data.uiAppIdConfigHolder.uiAppId;
    this.configMenuPages = [
      {
        entry: 'General Application',
        icon: 'tcs-starters-icon',
        options: ['Settings']
      },
      {
        entry: 'Integration',
        icon: 'tcs-integration-icon',
        options: ['Settings']
      },
      {
        entry: 'Live Apps',
        icon: 'tcs-liveapps-sm-icon',
        options: ['Settings']
      },
      {
        entry: 'Spotfire',
        icon: 'tcs-spotfire-icon',
        options: ['Settings']
      },
      /* ,{
        entry: 'Upload Services',
        options: ['Settings']
      } */
      {
          entry: 'Process Discovery', 
          icon: 'tcs-starters-icon',
          options: ['Configuration', 'Administration']
      }
    ];

    /* This is for PD usecase where you want navbar */
    /* un-comment if you want it */
    /* this.viewButtons = this.createViewButtons(); */
  }

}
