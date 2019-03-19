import {Component, OnInit, ViewChild, ElementRef, Input} from '@angular/core';
import {Location} from '@angular/common';

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

  constructor(private location: Location) { }

  ngOnInit() {

    /*
    customRightButton: {
      label: "Start tour",
      event: "START_TOUR_BTN" //optional the default event name is "DEFAULT_CLICK_RIGHT_TEXT_BTN"
    },
    navbar.subscribeEvent("START_TOUR_BTN", function(event){
      console.log("Start tour event", event);
      alert("Now start tour");
      // call function
    });
    */

    if (this.docUrl && (this.docUrl.slice(0, 4).toLowerCase() !== 'http')) {
      this.docUrl = this.location.prepareExternalUrl(this.docUrl);
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
