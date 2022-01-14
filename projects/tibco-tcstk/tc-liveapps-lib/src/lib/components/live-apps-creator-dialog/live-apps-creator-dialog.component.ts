import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CaseCreatorSelectionContext} from '../../models/tc-case-creator';
import {CaseRoute, CaseType, ProcessId} from '../../models/liveappsdata';
import {CustomFormDefs} from '@tibcosoftware/tc-forms-lib';
import {FormConfig} from '../../models/tc-liveapps-config';

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
  public legacyCreators: boolean;
  public formsFramework: string;
  public formConfig: FormConfig;
  public autoClose: boolean;
  public headerText: string;

  constructor(
    public dialogRef: MatDialogRef<LiveAppsCreatorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CaseCreatorSelectionContext) {
    this.application = data.application;
    this.sandboxId = data.sandboxId;
    this.initialData = data.initialData;
    this.customFormDefs = data.customFormDefs;
    this.legacyCreators = data.legacyCreators;
    this.formsFramework = data.formsFramework;
    this.formConfig = data.formConfig;
    this.autoClose = data.autoClose;
    if (data.headerText) {
      this.headerText = data.headerText;
    } else {
      this.headerText = 'Create New ' + this.application.applicationName;
    }
  }

  public handleCaseCreated = (createdCase: ProcessId) => {
    this.createdCase = createdCase;
    if (!this.createdCase.caseIdentifier && !this.createdCase.caseReference) {
      // legacy process form (no case reference available)
    } else if (this.createdCase.caseReference === '-1') {
      // legacy process cancelled
      this.dialogRef.close();
    }
    if (this.autoClose) {
      this.dialogRef.close(true);
    }
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

