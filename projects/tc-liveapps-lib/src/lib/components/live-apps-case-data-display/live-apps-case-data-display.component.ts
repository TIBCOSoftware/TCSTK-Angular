import {Component, Input, OnInit} from '@angular/core';
import {CaseType, CaseTypesList, JsonSchema, LaProcessSelection} from '../../models/liveappsdata';

@Component({
  selector: 'tcla-live-apps-case-data-display',
  templateUrl: './live-apps-case-data-display.component.html',
  styleUrls: ['./live-apps-case-data-display.component.css']
})
export class LiveAppsCaseDataDisplayComponent implements OnInit {
  @Input() caseData: string;
  @Input() schema: JsonSchema;

  layout: any[];
  options;

  constructor() { }

  ngOnInit() {
    this.options = {
      defaultOptions: {
        'readonly': true
      }
    };
    this.layout = [
      '*',
      { type: 'submit', title: 'Save', condition: '1===2' },
      { type: 'actions', title: 'hello', condition: '1===2' }

    ]
    console.log(this.schema);
  }

}
