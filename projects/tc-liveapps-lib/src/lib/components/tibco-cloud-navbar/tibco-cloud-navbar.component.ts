import {Component, OnInit, ViewChild, ElementRef, Input} from '@angular/core';

declare var GlobalNavbar: any;

@Component({
  selector: 'tcla-tibco-cloud-navbar',
  templateUrl: './tibco-cloud-navbar.component.html',
  styleUrls: ['./tibco-cloud-navbar.component.css']
})
export class TibcoCloudNavbarComponent implements OnInit {
  @ViewChild('navbar') private navbarRef: ElementRef;
  @Input() appName: string;

  constructor() { }

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
    navbar.customizePanel('help', '<embed src="/assets/help.html" style="height: 100%; width: 100%">');  // set HTML string

    /*navbar.subscribeEvent('CLICK_ICON_MENU_NOTIFICATIONS', function(event) {
      console.log('Logout ', event);
      alert('Logout');
      this.logout();
      // call function
    }.bind(this));*/

  }
}
