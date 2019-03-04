import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ToolbarButton} from '../../models/tc-widget-header';

@Component({
  selector: 'tc-tibco-cloud-widget-header',
  templateUrl: './tibco-cloud-widget-header.component.html',
  styleUrls: ['./tibco-cloud-widget-header.component.css']
})
export class TibcoCloudWidgetHeaderComponent {
  @Input() headerText: string;
  @Input() icon: string;
  @Input() toolbarButtons: ToolbarButton[];
  @Output() toolbarButtonEvent: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
  }

  toolbarButtonClick(id) {
    this.toolbarButtonEvent.emit(id);
  }

}
