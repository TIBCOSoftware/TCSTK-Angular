import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'tccwm-preview-data-dialog',
  templateUrl: './preview-data-dialog.component.html',
  styleUrls: ['./preview-data-dialog.component.css']
})
export class PreviewDataDialogComponent {


  description: string;
  jsonData: Array<any>;

  jsonDataString : string;

  constructor(
    public dialogRef: MatDialogRef<PreviewDataDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {

    this.description = data.description;
    this.jsonData = data.jsonData;

    this.jsonDataString =  JSON.stringify(data.jsonData);

  }



  save() {
    this.dialogRef.close('save');
  }

  close() {
    this.dialogRef.close();
  }

}
