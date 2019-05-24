import {Component, OnInit, ViewChild, ElementRef, Input, SystemJsNgModuleLoader} from '@angular/core';
import {Location} from '@angular/common';
import { TcCoreCommonFunctions } from '../../common/tc-core-common-functions';

declare var GlobalNavbar: any;


/**
 * TIBCO Cloud Navigation Bar
 *
 * ![alt-text](../tibco-cloud-navbar.png "Image")
 *
 * @example <tc-tibco-cloud-navbar appName=""></tc-tibco-cloud-navbar>
 */
@Component({
  selector: 'tc-tibco-cloud-navbar',
  templateUrl: './tibco-cloud-navbar.component.html',
  styleUrls: ['./tibco-cloud-navbar.component.css']
})
export class TibcoCloudNavbarComponent implements OnInit {
  /**
   * Reference Element
   */
  @ViewChild('navbar') private navbarRef: ElementRef;
  /**
   * diaplayed Application Name
   */
  @Input() appName: string;
  /**
   * Documentation URL
   */
  @Input() docUrl: string;

  /**
   * Custom Logo URL
   */

  @Input() logoUrl: string;

  /**
   * rebrand config - example: { "backgroundColor": "#cfcfcf", "fontColor": "#682782", "fontFamily": "Oswald", "iconColor": "red" }
   */

  @Input() rebrandConfig: any;

  /**
   * Where to redirect on click of logo
   */

  @Input() logoClickTargetUrl: string;

  /**
   * single empty Constructor of TIBCO Cloud Navigation Bar
   */

  constructor(private location: Location) {
  }

  /**
  * @ignore
  */
  ngOnInit() {

    if (this.docUrl && (this.docUrl.slice(0, 4).toLowerCase() !== 'http')) {
//      this.docUrl = this.location.prepareExternalUrl(this.docUrl);        // This will work with non hash routing
        this.docUrl = TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, this.docUrl);        // This will work with hash routing
    }

    const navbar = new GlobalNavbar({
      container: '#navbar',
      textAfterLogo: this.appName ? this.appName : undefined,
      iconMenus: {
        search: {
          visible: false  // for versions 0.1.X the propertie is "disabled" instead of "visible".
        },
        download: {
          visible: false
        },
        help: {
          visible: true
        },
        notifications: {
          visible: false
        },
        products: {
          visible: false
        }
      },
      customProfilePanel: {
        account: {
          visible: false
        },
        subscriptions: {
          visible: false
        },
        organization: {
          visible: false
        },
        tenants: {
          visible: false
        }
      },
      customizedComponents: [
        {
          name: 'help',
          template: '#help-template'
        }
      ]
    });
    if (this.logoUrl || this.logoClickTargetUrl || this.rebrandConfig) {
      const style: any = {};
      if (this.logoUrl || this.logoClickTargetUrl) {
        style.logo = {
          'src': this.logoUrl,
          'url': this.logoClickTargetUrl // If the url is not set then the logo will redirect to TSC.
        };
      }
      if (this.rebrandConfig) {
        if (this.rebrandConfig.backgroundColor) { style.backgroundColor = this.rebrandConfig.backgroundColor; }
        if (this.rebrandConfig.fontColor) { style.fontColor = this.rebrandConfig.fontColor; }
        if (this.rebrandConfig.fontFamily) { style.fontFamily = this.rebrandConfig.fontFamily; }
        if (this.rebrandConfig.iconColor) { style.iconColor = this.rebrandConfig.iconColor; }
      }
      navbar.refreshRebrandingStyle(style);
    }
    navbar.load();
    navbar.customizePanel('help', '<embed src="' + this.docUrl + '" style="height: 100%; width: 100%">');  // set HTML string


    /*navbar.subscribeEvent('CLICK_ICON_MENU_NOTIFICATIONS', function(event) {
      console.log('Logout ', event);
      alert('Logout');
      this.logout();
      // call function
    }.bind(this));*/

  }
}
