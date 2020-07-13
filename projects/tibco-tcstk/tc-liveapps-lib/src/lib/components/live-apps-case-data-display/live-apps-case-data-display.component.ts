import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { JsonSchema} from '../../models/liveappsdata';
import {CustomFormDefs} from '@tibco-tcstk/tc-forms-lib';
import {TcCaseProcessesService} from '../../services/tc-case-processes.service';

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
   * SandboxId
   */
  @Input() sandboxId: number;

  /**
   * The case data
   */
  @Input() caseData: string;

  /**
   * The case reference
   */

  @Input() appId: string
  /**
   * The applicationId
   */

  @Input() typeId: string
  /**
   * The typeId
   */

  @Input() caseRef: string;

  /**
   * The 'name' of the main case type
   */

  @Input() name: string;

  /**
   * The schema of the case type
   */
  @Input() schema: JsonSchema;

  /**
   * Allow override of forms framework
   * Options: bootstrap-4 or material-design
   */
  public formsFramework: string = 'material-design';
  @Input('formsFramework') set FormsFramework(formsFramework: string) {
    if (formsFramework){
      this.formsFramework = formsFramework;
    }
  }

  /**
   * Layout object that can be passed to override default layout of the form renderer
   */
  public layout: any[] = this.DEFAULT_CASE_DATA_LAYOUT;;
  @Input('layout') set Layout(layout: any[]) {
    if (layout){
      this.layout = layout;
    }
  }

  /**
   * Custom Form configuration file
   */
  @Input() customFormDefs: CustomFormDefs;

  /**
   * Custom Form Reference
   */
  @Input() formRef: string;

  /**
   * Emit event to cause refresh of page
   * **/
  @Output() refreshEvent = new EventEmitter();

  options;

  constructor(protected caseProcessService: TcCaseProcessesService) { }

  public updateDataAction(data: any) {
    data = {
      [this.name]: data
    }

    this.caseProcessService.caseDataFormUpdate(this.caseRef, this.appId, this.typeId, this.sandboxId, '$Update', data).subscribe(
      next => {
        this.refreshEvent.emit();
      },
      error1 => {
        console.error('Unable to trigger update of case data');
      }
    );
  }

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
