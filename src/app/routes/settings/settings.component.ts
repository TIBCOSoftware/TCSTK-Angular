import { Component, OnInit } from '@angular/core';
import { Router, Route } from '@angular/router';
import { Location } from '@angular/common';
import { ToolbarButton, TcButtonsHelperService } from '@tibco-tcstk/tc-core-lib';

@Component({
    selector: 'tcpd-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

    showConfigName: string;
    configMenu = [];
    viewButtons: ToolbarButton[];
    toolbarButtons: ToolbarButton[];
    constructor(private router: Router, private buttonsHelper: TcButtonsHelperService, private location: Location) { }

    ngOnInit() {
        this.getSettingRoutes(location.pathname.split('/'));
        this.viewButtons = this.createViewButtons();
    }

    protected createViewButtons = (): ToolbarButton[] => {
        const landingview = this.buttonsHelper.createButton('landingview', 'tcs-config-icon', true, 'Landing View', true, true);
        const processmimingview = this.buttonsHelper.createButton('process-mining-view', 'tcs-refresh-icon', true, 'Process Mining View', true, true);
        const caseView = this.buttonsHelper.createButton('case-view', 'tcs-refresh-icon', true, 'Case View', true, true);
        const buttons = [ landingview, processmimingview, caseView ];
        return buttons;
    }

    public handleToolbarButtonEvent = (id) => {
        console.log('Selected option: ' + id);
    }

    public handleSelectionEvent = (id: string) => {

        this.showConfigName = id;
        const url = 'starterApp/settings/' + id.toLowerCase().split(' ').join('-');

        this.router.navigate([url]);
    }

    private getSettingRoutes = (path: string[]) => {
        //        let path: string[] = location.pathname.split('/');
        const routerConfig: Route[] = this.router.config;
        let configRoute: Route;

        const element = path[1];
        let parentRoute: Route;
        for (let index = 0; index < routerConfig.length; index++) {
            parentRoute = routerConfig[index];
            if (element === parentRoute.path) {
                // this is the parent route
                for (let j = 2; j < path.length - 1; j++) {
                    const newElement = path[j];
                    for (let k = 0; k < parentRoute.children.length; k++) {
                        if (newElement === parentRoute.children[k].path) {
                            configRoute = parentRoute.children[k];
                            break;
                        }
                    }

                }
            }
        }

        for (let index = 0; index < configRoute.children.length; index++) {
            const entry = this.camelize(configRoute.children[index].path);
            const lastIndex = entry.lastIndexOf(' ');
            const menuEntry = entry.slice(0, lastIndex);

            const option = entry.slice(lastIndex + 1);

            const menu = this.configMenu.find( x => x.entry === menuEntry );
            if (menuEntry !== '') {
              if (menu == null) {
                this.configMenu.push({entry: menuEntry, options: [option]});
              } else {
                menu.options.push(option);
              }
            }
        }
    }

    private camelize = (str: string): string => {
        let newStr = '';
        let newArr = [];

        if (str.indexOf('-') != -1) {
            newArr = str.split('-');
            for (let i = 0; i < newArr.length; i++) {
                newArr[i] = newArr[i].charAt(0).toUpperCase() + newArr[i].substr(1);
            }
            newStr = newArr.join(' ');
        }
        return newStr;
    }

    showConfig = (option: string) => {
        this.showConfigName = option;
        console.log('Setting selected: ' + option);
    }


}
