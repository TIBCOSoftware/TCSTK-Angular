import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'tccwm-case-details-dialog',
  templateUrl: './case-details-dialog.component.html',
  styleUrls: ['./case-details-dialog.component.css']
})
export class CaseDetailsDialogComponent implements OnInit {

  public description;

  public uiAppId;
  public appId;
  public sandboxId;
  public userName;
  public userId;
  public typeId;

  public caseRef;

  constructor(
    public dialogRef: MatDialogRef<CaseDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    this.uiAppId = data.uiAppId;
    this.appId = data.appId;
    this.sandboxId = data.sandboxId;
    this.userName = data.userName;
    this.userId = data.userId;

    this.typeId = '1';

    this.caseRef = data.caseRef.caseReference;
  }

  ngOnInit() {
  }


  save() {
    this.dialogRef.close('save');
  }

  close() {
    this.dialogRef.close();
  }
}
