import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {LiveAppsFormConfig} from '../../models/tc-liveapps-form';

/**
 * This Component provides access to the OOTB form web component.
 *
 * ![alt-text](../live-apps-form.png "Live Apps Form Image")
 *
 *@example <tcla-live-apps-form></tcla-live-apps-form>
 */

@Component({
  selector: 'tcla-live-apps-form-wc',
  templateUrl: './live-apps-form-wc.component.html',
  styleUrls: ['./live-apps-form-wc.component.css']
})
export class LiveAppsFormWcComponent {

  /**
   * config - configuration of the form web component
   */
  @Input() config: LiveAppsFormConfig;

  /**
   * data - emits data when form is loaded
   */
  @Output() data: EventEmitter<any> = new EventEmitter<any>();

  /**
   * completed - emitted when form is complete
   */
  @Output() completed: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('customFormComponent', { static: false }) customFormComponent: ElementRef<any>;

  private formApi: any;

  constructor() { }

  public submit = (data: any) => {
    this.formApi.submit(data);
  }

  public close = (data: any) => {
    this.formApi.close(data);
  }

  public cancel = () => {
    this.formApi.cancel();
  }

  public handleFormEvent (event) {
    if (event && event.detail && event.detail) {
      switch (event.type) {
        case 'formLoad':
          this.formApi = event.target;
          if (event.detail.data) {
            this.data.emit(event.detail.data);
          }
          if (this.config.useCustomForm && this.customFormComponent) {
            // @ts-ignore
            if (this.customFormComponent.notifyLoad) {
              // @ts-ignore
              this.customFormComponent.notifyLoad(event);
            }
          }
          break;
        case 'formSubmit':
          if (this.config.useCustomForm && this.customFormComponent) {
            // @ts-ignore
            if (this.customFormComponent.notifySubmit) {
              // @ts-ignore
              this.customFormComponent.notifySubmit(event);
            }
          }
          if (event.detail.completed) {
            this.completed.emit(event);
          }
          break;
        case 'formCancel':
          if (this.config.useCustomForm && this.customFormComponent) {
            // @ts-ignore
            if (this.customFormComponent.notifyCancel) {
              // @ts-ignore
              this.customFormComponent.notifyCancel(event);
            }
          }
          this.completed.emit(event);
          break;
        case 'formClose':
          if (this.config.useCustomForm && this.customFormComponent) {
            // @ts-ignore
            if (this.customFormComponent.notifyClose) {
              // @ts-ignore
              this.customFormComponent.notifyClose(event);
            }
          }
          this.completed.emit(event);
          break;
        default:
          console.warn('Unhandled form event (live-apps-form-wc)');
          console.warn(event);
          break;
      }
    }
  }
}
