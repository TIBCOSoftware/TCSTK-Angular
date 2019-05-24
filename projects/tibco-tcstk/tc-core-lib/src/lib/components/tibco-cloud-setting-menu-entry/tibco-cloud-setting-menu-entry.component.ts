import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


/**
 * Renders the menu options for each config menu
 *
 * ![alt-text](../tibco-cloud-setting-menu-entry.png "Image")
 *
 *@example <tc-tibco-cloud-setting-menu-entry></tc-tibco-cloud-setting-menu-entry>
 */

@Component({
    selector: 'tc-tibco-cloud-setting-menu-entry',
    templateUrl: './tibco-cloud-setting-menu-entry.component.html',
    styleUrls: ['./tibco-cloud-setting-menu-entry.component.css']
})
export class TibcoCloudSettingMenuEntryComponent implements OnInit {

  /**
   * icon name (svg key - needs to be registered)
   */
  @Input() icon: string;

  /**
   * page title comes from config resolver
   */
  @Input() title: string;

  /**
   * RenderedFormComponent: (options from third party API). TibcoCloudSettingMenuEntryComponent -Check with MC - not sure we need to document this.
   */
  @Input() options: string[];


  /**
   * ~event configureOption : Option Clicked
   * ~payload string : emits Id of option selected in config main page (options)
   */
  @Output() configureOption: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

    viewButtonClick(id) {
      this.configureOption.emit(id);
    }

    ngOnInit() {
    }

}
