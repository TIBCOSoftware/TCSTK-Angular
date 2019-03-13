import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {CaseCreatorSelectionContext} from '../../models/tc-case-creator';
import {CaseType} from '../../models/liveappsdata';

@Component({
  selector: 'tcla-live-apps-creator-dialog',
  templateUrl: 'live-apps-creator-dialog.component.html',
  styleUrls: ['live-apps-creator-dialog.component.css']
})
export class LiveAppsCreatorDialogComponent {

  public application: CaseType;
  public sandboxId: number;
  public initialData: any;

  constructor(
    public dialogRef: MatDialogRef<LiveAppsCreatorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CaseCreatorSelectionContext) {
    this.application = data.application;
    this.sandboxId = data.sandboxId;
    this.initialData = data.initialData;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

