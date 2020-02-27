import {Component, EventEmitter, Input, Output, OnInit} from '@angular/core';
import {RouteAction, TcButtonsHelperService, ToolbarButton} from '@tibco-tcstk/tc-core-lib';
import {Roles, RouteAccessControlConfigurationElement, TcRolesService} from '@tibco-tcstk/tc-liveapps-lib';

@Component({
    selector: 'app-home-cockpit',
    templateUrl: './home-cockpit.component.html',
    styleUrls: ['./home-cockpit-style.css']
})

export class HomeCockpitComponent implements OnInit {

      /**
      * The Application ID of the UI (should ideally be unique as it is shared state key)
      */
  @Input() uiAppId: string;

      /**
       * The name of the logged user
       */
  @Input() userName: string;

      /**
       * The ID of the logged user
       */
  @Input() userId: string;

      /**
       * * NOT USED but is the email address of the user (comes from resolver)
       */
  @Input() email: string;

      /**
       * page title comes from config resolver
       */
  @Input() title: string;

      /**
       * Roles - The users current roles
       */
  @Input() roles: Roles;
  /**
   * RouteAccessControlConfig - basically the config for access control
   */
  @Input() access: RouteAccessControlConfigurationElement;

      /**
       * RouteAccessControlConfig - basically the config for access control
       */
  // @Input() access: RouteAccessControlConfigurationElement;

      /**
       * ~event routeAction : Component requests route to another page
       * ~payload RouteAction : RouteAction object to tell caller to navigate somewhere
       */
  @Output() routeAction: EventEmitter<RouteAction> = new EventEmitter<RouteAction>();

  constructor(protected buttonsHelper: TcButtonsHelperService, protected rolesService: TcRolesService) {
  }

  public toolbarButtons: ToolbarButton[] = [];

  incConfigButton = true;
  incRefreshButton = true;
  cockpitReady = false;

  protected createToolbarButtons = (): ToolbarButton[] => {
    const buttons = [];

    // you can use the rolesService to either disable or hide the button as required - it returns true if the user has the roleId specified
    // const configButton = this.buttonsHelper.createButton('config', 'tcs-capabilities', true, 'Config', true, this.rolesService.checkRole('Partner Portal Configurator', this.roles));
    if (this.incConfigButton) {
      const configButton = this.buttonsHelper.createButton('config', 'tcs-capabilities', true, 'Config', (this.access ? this.rolesService.checkButton('configure', this.access) : true), true);
      buttons.push(configButton);
    }
    if (this.incRefreshButton) {
      const refreshButton = this.buttonsHelper.createButton('refresh', 'tcs-refresh-icon', true, 'Refresh', (this.access ? this.rolesService.checkButton('refresh', this.access) : true), true);
      buttons.push(refreshButton);
    }
    return buttons;
  }

  public refresh = () => {
    console.log('refresh clicked');
  }

  public handleToolbarButtonEvent = (buttonId: string) => {
    if (buttonId === 'config') {
      this.routeAction.emit(new RouteAction('configClicked', null));
    }
    if (buttonId === 'refresh') {
      this.refresh();
    }
  }

  ngOnInit(): void {
    this.toolbarButtons = this.toolbarButtons.concat(this.createToolbarButtons());
  }

}
