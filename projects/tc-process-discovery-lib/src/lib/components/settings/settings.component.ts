import { Component, OnInit } from '@angular/core';
import { Router, Route } from '@angular/router';
import { Location } from '@angular/common';
import { ToolbarButton, TcButtonsHelperService } from 'tc-core-lib';

@Component({
    selector: 'tcpd-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

    showConfigName: string;
    configMenu = [];
    viewButtons: ToolbarButton[];
    constructor(private router: Router, private buttonsHelper: TcButtonsHelperService, private location: Location) { }

    ngOnInit() {
        this.getSettingRoutes(location.pathname.split('/'));
        this.viewButtons = this.createViewButtons();
    }

    protected createViewButtons = (): ToolbarButton[] => {
        const landingview = this.buttonsHelper.createButton('landingview', 'tcs-config-icon', true, 'Landing View', true, true);
        const processmimingview = this.buttonsHelper.createButton('refresh', 'tcs-refresh-icon', true, 'Process Miming View', true, true);
        const caseView = this.buttonsHelper.createButton('refresh', 'tcs-refresh-icon', true, 'Case View', true, true);
        const buttons = [ landingview, processmimingview, caseView ];
        return buttons;
    }

    private getSettingRoutes = (path: string[]) => {
        //        let path: string[] = location.pathname.split('/');
        let routerConfig: Route[] = this.router.config;
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

            var menu = this.configMenu.find( x => x.entry === menuEntry );
            if ( menu == null ) {
                this.configMenu.push({ entry: menuEntry, options: [option]})
            } else {
                menu.options.push(option);
            }
        }
    }

    private camelize = (str: string): string => {
        var newStr = "";
        var newArr = [];

        if (str.indexOf("-") != -1) {
            newArr = str.split("-");
            for (var i = 0; i < newArr.length; i++) {
                newArr[i] = newArr[i].charAt(0).toUpperCase() + newArr[i].substr(1);
            }
            newStr = newArr.join(" ");
        }
        return newStr;
    }

    showConfig = (option: string) => {
        this.showConfigName = option;
        console.log("Setting selected: " + option);
    }

    handleSelectionEvent = (id: string) => {

        this.showConfigName = id;
        let url = 'starterApp/settings/' + id.toLowerCase().split(' ').join('-');
        console.log("************* " + url);

        this.router.navigate([url]);
    }

}
