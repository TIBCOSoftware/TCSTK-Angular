import {Component, Input, OnInit} from '@angular/core';
import {LiveAppsApplicationsComponent} from '../live-apps-applications/live-apps-applications.component';
import {CaseType} from '../../models/liveappsdata';


/**
 * Special rendering of LiveAppsApplicationsComponent
 *
 * ![alt-text](../live-apps-application-create-button.png "Image")
 *
 *@example <tcla-live-apps-application-create-button></tcla-live-apps-application-create-button>
 */
@Component({
  selector: 'tcla-live-apps-application-create-button',
  templateUrl: './live-apps-application-create-button.component.html',
  styleUrls: ['./live-apps-application-create-button.component.css']
})
export class LiveAppsApplicationCreateButtonComponent extends LiveAppsApplicationsComponent {

  public createLabel: string = 'Create Case';
  @Input('createLabel') set CreateLabel(createLabel: string) {
    if (createLabel){
      this.createLabel = createLabel;
    }
  }

  public handleCreatorAppSelection = (application: CaseType) => {
    this.selection.emit(application);
  }

  public handleCreateCaseClick = () => {
    // console.log('Select Case: ' + this.applications.casetypes.length);
    if (this.applications.casetypes.length === 1) {
      // Open Case Directly
      // console.log('Opening Case Directly...');
      this.handleCreatorAppSelection(this.applications.casetypes[0]);
    }
  }
}
