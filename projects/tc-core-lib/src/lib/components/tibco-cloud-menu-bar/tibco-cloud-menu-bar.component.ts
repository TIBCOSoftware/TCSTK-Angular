import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TibcoCloudWidgetHeaderComponent} from '../tibco-cloud-widget-header/tibco-cloud-widget-header.component';
import {ToolbarButton} from '../../models/tc-widget-header';

@Component({
  selector: 'tc-tibco-cloud-menu-bar',
  templateUrl: './tibco-cloud-menu-bar.component.html',
  styleUrls: ['./tibco-cloud-menu-bar.component.css']
})
export class TibcoCloudMenuBarComponent extends TibcoCloudWidgetHeaderComponent implements OnInit {


  constructor() {
    super();
  }

  ngOnInit() {
  }

}
