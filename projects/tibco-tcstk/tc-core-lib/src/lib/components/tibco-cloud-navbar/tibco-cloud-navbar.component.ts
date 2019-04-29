import {Component, OnInit, ViewChild, ElementRef, Input, SystemJsNgModuleLoader} from '@angular/core';
import {Location} from '@angular/common';
import { TcCoreCommonFunctions } from '../../common/tc-core-common-functions';

declare var GlobalNavbar: any;

@Component({
  selector: 'tc-tibco-cloud-navbar',
  templateUrl: './tibco-cloud-navbar.component.html',
  styleUrls: ['./tibco-cloud-navbar.component.css']
})
export class TibcoCloudNavbarComponent implements OnInit {
  @ViewChild('navbar') private navbarRef: ElementRef;
  @Input() appName: string;
  @Input() docUrl: string;

  public ready = false;

  constructor(private location: Location) {
  }

  ngOnInit() {

    if (this.docUrl && (this.docUrl.slice(0, 4).toLowerCase() !== 'http')) {
//      this.docUrl = this.location.prepareExternalUrl(this.docUrl);        // This will work with non hash routing
        this.docUrl = TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, this.docUrl);        // This will work with hash routing
    }

    const navbar = new GlobalNavbar({
      container: '#navbar',
      textAfterLogo: this.appName,
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
        }
      },
      customizedComponents: [
        {
          name: 'help',
          template: '#help-template'
        }
      ]
    });

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
