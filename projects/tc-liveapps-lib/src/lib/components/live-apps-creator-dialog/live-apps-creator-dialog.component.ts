import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {CaseCreatorSelectionContext} from '../../models/tc-case-creator';
import {CaseRoute, CaseType, ProcessId} from '../../models/liveappsdata';

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

  constructor(
    public dialogRef: MatDialogRef<LiveAppsCreatorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CaseCreatorSelectionContext) {
    this.application = data.application;
    this.sandboxId = data.sandboxId;
    this.initialData = data.initialData;
  }

  public handleCaseCreated = (createdCase: ProcessId) => {
    this.createdCase = createdCase;
  }

  openCase = () => {
    const caseRoute = new CaseRoute().deserialize(
      { caseRef: this.createdCase.caseReference, appId: this.application.applicationId, typeId: this.application.id });
    this.dialogRef.close(caseRoute);
  }

}

