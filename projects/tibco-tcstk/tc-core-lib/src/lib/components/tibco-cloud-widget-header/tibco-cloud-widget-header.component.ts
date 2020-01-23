import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ToolbarButton} from '../../models/tc-widget-header';


/**
 * Header bar for small widgets (like recent cases etc on home)
 *
 * ![alt-text](../tibco-cloud-widget-header.png "Image")
 *
 *@example <tc-tibco-cloud-widget-header></tc-tibco-cloud-widget-header>
 */
@Component({
  selector: 'tc-tibco-cloud-widget-header',
  templateUrl: './tibco-cloud-widget-header.component.html',
  styleUrls: ['./tibco-cloud-widget-header.component.css']
})
export class TibcoCloudWidgetHeaderComponent {
  /**
   * Text shown in menu bar
   */
  @Input() headerText: string;

  /**
   * icon name (svg key - needs to be registered)
   */
  @Input() icon: string;

  /**
   * buttons to display in the menu bar
   */
  @Input() toolbarButtons: ToolbarButton[];

  /**
   * Whether to show the header bar in the widget - eg. favorites on home page (contains icon etc) - if off icons still appear without bar
   */
  @Input() showHeader: boolean = this.showHeader ? this.showHeader : true;

  /**
   * ~event toolbarButtonEvent : Button Clicked
   * ~payload string : tells caller a button was clicked - outputs button Id
   */
  @Output() toolbarButtonEvent: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
  }

  toolbarButtonClick(id) {
    this.toolbarButtonEvent.emit(id);
  }

}
