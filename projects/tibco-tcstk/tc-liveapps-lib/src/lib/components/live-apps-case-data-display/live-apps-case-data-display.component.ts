import {Component, Input, OnInit} from '@angular/core';
import {CaseType, CaseTypesList, JsonSchema} from '../../models/liveappsdata';
import {LaProcessSelection} from '../../models/tc-case-processes';
import {CustomFormDefs} from '@tibco-tcstk/tc-forms-lib';

/**
 * Renders case data in a form
 *
 * ![alt-text](../live-apps-case-data-display.png "Image")
 *
 *@example <tcla-live-apps-case-data-display></tcla-live-apps-case-data-display>
 */

@Component({
  selector: 'tcla-live-apps-case-data-display',
  templateUrl: './live-apps-case-data-display.component.html',
  styleUrls: ['./live-apps-case-data-display.component.css']
})
export class LiveAppsCaseDataDisplayComponent implements OnInit {

  DEFAULT_CASE_DATA_LAYOUT = [
    '*',
    { type: 'submit', title: 'Save', condition: '1===2' },
    { type: 'actions', title: 'hello', condition: '1===2' }

  ];

  /**
   * The case data
   */
  @Input() caseData: string;

  /**
   * The schema of the case type
   */
  @Input() schema: JsonSchema;

  /**
   * Layout object that can be passed to override default layout of the form renderer
   */
  @Input() layout: any[] = this.layout ? this.layout : this.DEFAULT_CASE_DATA_LAYOUT;

  /**
   * Custom Form configuration file
   */
  @Input() customFormDefs: CustomFormDefs;

  /**
   * Custom Form Reference
   */
  @Input() formRef: string;

  options;

  constructor() { }

  ngOnInit() {
    // since this is the 'display' of case data we set to readonly and no validation
    // legacy makes the labels appear above the data
    this.options = {
      defaultOptions: {
        'readonly': true,
        'appearance': 'legacy'
      },
      'validateOnRender': false
    };
    console.log(this.schema);
  }

}
