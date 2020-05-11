import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {LiveAppsFormConfig} from '../../models/tc-liveapps-form';

@Component({
  selector: 'tcla-live-apps-workitem',
  templateUrl: './live-apps-workitem.component.html',
  styleUrls: ['./live-apps-workitem.component.css']
})
export class LiveAppsWorkitemComponent implements OnChanges {

  /**
   * The workitem id to display
   */
  @Input() workitemId: number;

  /**
   * The sandboxId
   */
  @Input() sandboxId: string;

  /**
   * ~event workitemResult : id of completed workitem
   * ~payload string : workitemId
   */
  @Output() workitemComplete: EventEmitter<number> = new EventEmitter<number>();

  wcFormConfig: LiveAppsFormConfig;

  constructor() {
  }

  handleWorkitemComplete = (event) => {
    this.workitemComplete.emit(this.workitemId);
  }

  handleWorkitemCancelled = (event) => {
    this.workitemComplete.emit(this.workitemId);
  }

  handleWorkitemClosed = (event) => {
    this.workitemComplete.emit(this.workitemId);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.workitemId && this.sandboxId) {
      this.wcFormConfig = new LiveAppsFormConfig().deserialize({
        type: 'workitem',
        id: this.workitemId,
        sandbox: this.sandboxId.toString(),
        formDivId: 'wiDialogDiv',
        useCustomForm: false
      });
    }
  }

}
