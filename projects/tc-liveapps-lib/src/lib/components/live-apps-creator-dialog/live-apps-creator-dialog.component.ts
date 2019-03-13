import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {CaseCreatorSelectionContext} from '../../models/tc-case-creator';

@Component({
  selector: 'tcla-live-apps-creator-dialog',
  templateUrl: 'live-apps-creator-dialog.component.html',
})
export class LiveAppsCreatorDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<LiveAppsCreatorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CaseCreatorSelectionContext) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

