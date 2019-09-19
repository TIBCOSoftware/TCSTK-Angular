import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'tc-tibco-cloud-new-element',
    templateUrl: './tibco-cloud-new-element.component.html',
    styleUrls: ['./tibco-cloud-new-element.component.css']
})
export class TibcoCloudNewElementComponent {

    public id: string;
    public name: string;
    public elementType: string;
    public idReadOnly = false;

    constructor(
        public dialogRef: MatDialogRef<TibcoCloudNewElementComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.elementType = data.resourceType;
        this.idReadOnly = data.idReadOnly;
        this.id = data.id;
    }

    onCreate() {
        this.dialogRef.close({ event: 'submit', id: this.id, name: this.name });
    }

    onCancel() {
      this.dialogRef.close();
    }


}
