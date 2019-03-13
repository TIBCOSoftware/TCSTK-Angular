import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'tcpd-preview-data-dialog',
  templateUrl: './preview-data-dialog.component.html',
  styleUrls: ['./preview-data-dialog.component.css']
})
export class PreviewDataDialogComponent implements OnInit {


  description: string;
  jsonData: Array<any>;

  constructor(
    private dialogRef: MatDialogRef<PreviewDataDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {

    this.description = data.description;
    this.jsonData = data.jsonData;

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
