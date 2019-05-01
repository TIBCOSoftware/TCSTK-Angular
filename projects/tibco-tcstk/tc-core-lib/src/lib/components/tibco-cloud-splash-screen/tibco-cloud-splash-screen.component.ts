import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { TcCoreCommonFunctions } from '../../common/tc-core-common-functions';
import { Location } from '@angular/common';
import { LandingPageItemConfig } from '../../models/tc-general-landing-page-config';

/**
 * @title Dialog Overview
 */
@Component({
    selector: 'tc-tibco-cloud-splash-screen',
    templateUrl: 'tibco-cloud-splash-screen.component.html',
    styleUrls: ['tibco-cloud-splash-screen.component.css'],
})
export class TibcoCloudSplashScreenComponent implements OnInit {

    @Input() title: string;
    @Input() subTitle: string;
    @Input() backGroundImage: string;
    @Input() highlights: LandingPageItemConfig[];
    @Output() getStartedEvent: EventEmitter<string> = new EventEmitter<string>();

    constructor() {
    }

    ngOnInit(): void {
      console.log(this);
    }

    getStartedClick = (): void => {
        this.getStartedEvent.emit('test');
    }


}
