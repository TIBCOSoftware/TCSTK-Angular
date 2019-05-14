import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {CaseCreatorSelectionContext} from '../../models/tc-case-creator';
import {CaseRoute, CaseType, ProcessId} from '../../models/liveappsdata';
import {CustomFormDefs} from '@tibco-tcstk/tc-forms-lib';

/**
 * Dialog used on home screen to allow case creation (wraps other components)
 *
 *@example <tcla-live-apps-creator-dialog></tcla-live-apps-creator-dialog>
 */
@Component({
  selector: 'tcla-live-apps-creator-dialog',
  templateUrl: 'live-apps-creator-dialog.component.html',
  styleUrls: ['live-apps-creator-dialog.component.css']
})
export class LiveAppsCreatorDialogComponent {

  public application: CaseType;
  public sandboxId: number;
  public initialData: any;
  public createdCase: ProcessId;
  public customFormDefs: CustomFormDefs;

  constructor(
    public dialogRef: MatDialogRef<LiveAppsCreatorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CaseCreatorSelectionContext) {
    this.application = data.application;
    this.sandboxId = data.sandboxId;
    this.initialData = data.initialData;
    this.customFormDefs = data.customFormDefs;
  }

  public handleCaseCreated = (createdCase: ProcessId) => {
    this.createdCase = createdCase;
  }

  openCase = () => {
    const caseRoute = new CaseRoute().deserialize(
      { caseRef: this.createdCase.caseReference, appId: this.application.applicationId, typeId: this.application.id });
    this.dialogRef.close(caseRoute);
  }

  closeDialog = () => {
    this.dialogRef.close();
  }

}

