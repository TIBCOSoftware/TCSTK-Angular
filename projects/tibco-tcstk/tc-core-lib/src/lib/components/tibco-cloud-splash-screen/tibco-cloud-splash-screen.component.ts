import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { TcCoreCommonFunctions } from '../../common/tc-core-common-functions';
import { Location } from '@angular/common';
import { LandingPageItemConfig } from '../../models/tc-general-landing-page-config';

/**
 * Splash Screen
 *
 *@example <tc-tibco-cloud-splash-screen></tc-tibco-cloud-splash-screen>
 */
@Component({
    selector: 'tc-tibco-cloud-splash-screen',
    templateUrl: 'tibco-cloud-splash-screen.component.html',
    styleUrls: ['tibco-cloud-splash-screen.component.css'],
})
export class TibcoCloudSplashScreenComponent implements OnInit {

  /**
   * Splash Screen main Title
   */
  @Input() title: string;
  /**
   * Splash Sub-Title
   */
  @Input() subTitle: string;
  /**
   * Splash Configured Background Image URL to a SVG, PNG or Jpeg
   */
  @Input() backGroundImage: string;
  /**
   * Bullet Point Item Configuration with Icon's and Text
   */
  @Input() highlights: LandingPageItemConfig[];

  /**
   *##OUTPUT-getStartedEvent##
   * emits that user clicked get started button on cloud splash screen
   */
  @Output() getStartedEvent: EventEmitter<string> = new EventEmitter<string>();

    /**
     * Shows Application Overview like Configured
     */
    constructor() {
    }

    /**
     * @ignore
     */
    ngOnInit(): void {
      console.log(this);
    }

    /**
     * Get Started Click to open the Application
     */
    getStartedClick = (): void => {
        this.getStartedEvent.emit('test');
    }


}
