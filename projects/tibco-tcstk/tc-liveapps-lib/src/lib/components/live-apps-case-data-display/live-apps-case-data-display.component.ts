import {Component, Input, OnInit} from '@angular/core';
import {CaseType, CaseTypesList, JsonSchema} from '../../models/liveappsdata';
import {LaProcessSelection} from '../../models/tc-case-processes';
import {CustomFormDefs} from '@tibco-tcstk/tc-forms-lib';

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

  @Input() caseData: string;
  @Input() schema: JsonSchema;
  @Input() layout: any[] = this.layout ? this.layout : this.DEFAULT_CASE_DATA_LAYOUT;
  @Input() customFormDefs: CustomFormDefs;
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
