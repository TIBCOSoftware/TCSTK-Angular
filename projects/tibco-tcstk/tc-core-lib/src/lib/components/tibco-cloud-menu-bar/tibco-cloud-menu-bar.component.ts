import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TibcoCloudWidgetHeaderComponent} from '../tibco-cloud-widget-header/tibco-cloud-widget-header.component';
import {ToolbarButton} from '../../models/tc-widget-header';

/**
 * TIBCO Cloud Menu Bar
 *
 *  ![alt-text](../tibco-cloud-menu-bar.png "")
 *
 * @example <tc-tibco-cloud-menu-bar></tc-tibco-cloud-menu-bar>
 */
@Component({
  selector: 'tc-tibco-cloud-menu-bar',
  templateUrl: './tibco-cloud-menu-bar.component.html',
  styleUrls: ['./tibco-cloud-menu-bar.component.css']
})
export class TibcoCloudMenuBarComponent extends TibcoCloudWidgetHeaderComponent implements OnInit {

    /**
    * `<tc-tibco-cloud-menu-bar>` render a general menu bar
    */
    constructor() {
        super();
    }

    /**
    * @ignore
    */
    ngOnInit() {
      // none
    }

}
