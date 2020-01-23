import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {TibcoCloudWidgetHeaderComponent} from '../tibco-cloud-widget-header/tibco-cloud-widget-header.component';
import {ToolbarButton} from '../../models/tc-widget-header';
import {MatMenu} from '@angular/material';

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

  /**
   * buttons to display in the burger menu
   */
  @Input() burgerMenuButtons: ToolbarButton[];
  /**
   * ~event burgerMenuButtonEvent : Button Clicked
   * ~payload string : tells caller a button was clicked - outputs button Id
   */
  @Output() burgerMenuButtonEvent: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('burgerButtonMenu', {static: false}) burgerButtonMenu: MatMenu;

    constructor() {
        super();
    }

  burgerMenuButtonClick(id) {
    this.burgerMenuButtonEvent.emit(id);
  }

     /**
    * @ignore
    */
    ngOnInit() {
      // none
    }

}
