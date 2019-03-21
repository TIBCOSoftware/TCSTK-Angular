import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'tccwm-case-details-dialog',
  templateUrl: './case-details-dialog.component.html',
  styleUrls: ['./case-details-dialog.component.css']
})
export class CaseDetailsDialogComponent implements OnInit {

  public description;

  constructor(
    public dialogRef: MatDialogRef<CaseDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) { }

  ngOnInit() {
  }



  save() {
    this.dialogRef.close('save');
  }

  close() {
    this.dialogRef.close();
  }
}
