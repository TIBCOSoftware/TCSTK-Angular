import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { TcCoreCommonFunctions } from '../../common/tc-core-common-functions';
import { Location } from '@angular/common';

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
    @Input() pagePointsJSON: string;
    @Output() getStartedEvent: EventEmitter<string> = new EventEmitter<string>();

    public pagePoints = new Array();
    constructor() {
    }

    ngOnInit(): void {
        this.pagePoints = JSON.parse(this.pagePointsJSON);
    }

    getStartedClick = (): void => {
        this.getStartedEvent.emit('test');
    }


}
