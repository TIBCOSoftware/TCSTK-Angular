import {Component, OnInit, ViewChild, ElementRef, Input, SystemJsNgModuleLoader} from '@angular/core';
import {Location} from '@angular/common';
import { TcCoreCommonFunctions } from '../../common/tc-core-common-functions';
import {MessageTopicService} from '../../common/tc-core-topic-comm';

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
  @ViewChild('navbar', { static: true }) private navbarRef: ElementRef;
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


  private navbar;

  private ms: MessageTopicService;

  /**
   * single empty Constructor of TIBCO Cloud Navigation Bar
   */

  constructor(protected location: Location, protected messageService: MessageTopicService) {
    this.ms = messageService;
  }

  /**
   * @ignore
   */
  ngOnInit() {

    if (this.docUrl && (this.docUrl.slice(0, 4).toLowerCase() !== 'http')) {
//      this.docUrl = this.location.prepareExternalUrl(this.docUrl);        // This will work with non hash routing
      this.docUrl = TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, this.docUrl);        // This will work with hash routing
    }

    this.navbar = new GlobalNavbar({
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
        },
        region: {
            visible: false
        },
        accountswitcher: {
          visible: false
        }
      },
      customProfilePanel: {
        account: {
          visible: false,
          disabled: true
        },
        subscriptions: {
          visible: false,
          disabled: true
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
        if (this.rebrandConfig.backgroundColor) {
          style.backgroundColor = this.rebrandConfig.backgroundColor;
        }
        if (this.rebrandConfig.fontColor) {
          style.fontColor = this.rebrandConfig.fontColor;
        }
        if (this.rebrandConfig.fontFamily) {
          style.fontFamily = this.rebrandConfig.fontFamily;
        }
        if (this.rebrandConfig.iconColor) {
          style.iconColor = this.rebrandConfig.iconColor;
        }
      }
      this.navbar.refreshRebrandingStyle(style);
    }
    this.navbar.load();
    // console.log('DOC URL: ' + this.docUrl);
    const initialHelpURL = this.docUrl + '/help.html';

    this.urlExists(initialHelpURL, exists => {
      if (exists) {
        this.navbar.customizePanel('help', '<embed src="' + initialHelpURL + '" style="height: 100%; width: 100%">');  // set HTML string

      } else {
        this.navbar.customizePanel('help', '<b> No Help Page Found</b>');  // set HTML string

      }
    });

    this.ms.getMessage('help').subscribe(data => {
      // console.log('Got message: ' + data.text);
      this.findHelpFile('assets/help/' + data.text + '/help.html');
    });
  }

  findHelpFile(helpUrl) {
    this.urlExists(helpUrl, exists => {
      // console.log('RESULT: url=' + helpUrl + ', exists=' + exists);
      if (exists) {
        console.log('Setting help page: ' + helpUrl);
        this.navbar.customizePanel('help', '<embed src="' + helpUrl + '" style="height: 100%; width: 100%">');
      } else {
        if (helpUrl.includes('/')) {
          // Find one step lower
          // console.log('HelpURL before: |' + helpUrl + '|');
          helpUrl = helpUrl.substring(0, helpUrl.lastIndexOf('/help.html'));
          // console.log('HelpURL middle: |' + helpUrl + '|');
          helpUrl = helpUrl.substring(0, helpUrl.lastIndexOf('/') + 1);
          // console.log('HelpURL  after: |' + helpUrl + '|');
          this.findHelpFile(helpUrl + 'help.html');
        } else {
          console.log('No valid help file found...');
          this.navbar.customizePanel('help', '<b> No Help Page Found</b>');  // set HTML string

        }
      }
    });
  }

  // The "callback" argument is called with either true or false
// depending on whether the "url" exists or not.
  urlExists(url, callback) {
    const http = new XMLHttpRequest();
    http.open('GET', url, true);
    http.onload = function (e) {
      if (http.readyState === 4) {
        if (http.status === 200) {
          callback(true);
        } else {
          callback(false);
        }
      }
    };
    http.send();
  }
}
