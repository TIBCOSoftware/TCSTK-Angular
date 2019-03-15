import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Router, Route } from '@angular/router';
import { Location } from '@angular/common';
import { ToolbarButton } from '../../models/tc-widget-header';
import { TcButtonsHelperService } from '../../services/tc-buttons-helper.service';
import {TcCoreCommonFunctions} from '../../common/tc-core-common-functions';
import {RouteAction} from '../../models/tc-routing-actions';

@Component({
  selector: 'tc-tibco-cloud-configuration',
  templateUrl: './tibco-cloud-configuration.component.html',
  styleUrls: ['./tibco-cloud-configuration.component.css']
})
export class TibcoCloudConfigurationComponent implements OnInit {
  @Input() baseRoute: string;
  @Input() configMenuPages: any[];
  @Output() routeAction: EventEmitter<RouteAction> = new EventEmitter<RouteAction>();
  showConfigName: string;
  toolbarButtons: ToolbarButton[];

  constructor(private router: Router, private buttonsHelper: TcButtonsHelperService, private location: Location) { }

  private createToolbarButtons = (): ToolbarButton[] => {
    const homeButton = this.buttonsHelper.createButton('close', 'tcs-close-icon', true, 'Close', true, true);
    const buttons = [ homeButton ];
    return buttons;
  }

  public handleSelectionEvent = (id: string) => {
    this.showConfigName = id;
    const url = this.baseRoute + id.toLowerCase().split(' ').join('-');
    this.router.navigate([url]);
  }

  public handleToolbarButtonEvent = (buttonId: string) => {
    if (buttonId === 'close') {
      this.routeAction.emit(new RouteAction('backClicked', null));
    }
  }

  /*
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
      const entry = TcCoreCommonFunctions.camelize(configRoute.children[index].path);
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
  }*/

  showConfig = (option: string) => {
    this.showConfigName = option;
    console.log('Setting selected: ' + option);
  }


  ngOnInit() {
    this.toolbarButtons = this.createToolbarButtons();
    // this.getSettingRoutes(location.pathname.split('/'));
  }

}

