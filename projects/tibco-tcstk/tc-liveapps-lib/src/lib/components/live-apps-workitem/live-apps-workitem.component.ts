import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'tcla-live-apps-workitem',
  templateUrl: './live-apps-workitem.component.html',
  styleUrls: ['./live-apps-workitem.component.css']
})
export class LiveAppsWorkitemComponent {

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

  constructor() { }

  handleWorkitemComplete = (event) => {
    this.workitemComplete.emit(this.workitemId);
  }

  handleWorkitemCancelled = (event) => {
    this.workitemComplete.emit(this.workitemId);
  }

  handleWorkitemClosed = (event) => {
    this.workitemComplete.emit(this.workitemId);
  }

}
