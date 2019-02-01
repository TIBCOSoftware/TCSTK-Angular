import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {LaProcessSelection, ProcessId} from '../../models/liveappsdata';
import {LiveAppsCreatorSelectorComponent} from '../../components/live-apps-creator-selector/live-apps-creator-selector.component';


@Component({
  selector: 'tcla-live-apps-creators',
  templateUrl: './live-apps-creators.component.html',
  styleUrls: ['./live-apps-creators.component.css']
})
export class LiveAppsCreatorsComponent implements OnInit {
  @ViewChild('creatorSelector') creatorSelector: LiveAppsCreatorSelectorComponent;
  @Input() sandboxId: number;
  @Input() applicationId: string;
  @Input() typeId: string;
  @Input() dataOverride: any;
  @Output() caseCreated: EventEmitter<ProcessId> = new EventEmitter<ProcessId>();

  selectedProcess: LaProcessSelection;

  // handle form submit
  handleSubmit = (data: ProcessId) => {
    this.caseCreated.emit(data)
    this.creatorSelector.reset();
  }

  // handle case creator selection
  handleCreatorSelection = (process: LaProcessSelection) => {
    this.selectedProcess = process;
  }

  constructor() { }

  ngOnInit() {
  }

}
