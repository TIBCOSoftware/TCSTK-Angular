import { Component, Output, Inject, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'tibco-cloud-upload-dialog',
    templateUrl: './tibco-cloud-upload-dialog.component.html',
    styleUrls: ['./tibco-cloud-upload-dialog.component.css']
})
export class TibcoCloudUploadDialogComponent {

    @Output() fileevent = new EventEmitter<any>();
    public fileToUpload: File = undefined;
    public description: string = undefined;
    // public fileText: string;

    constructor(
        public dialogRef: MatDialogRef<TibcoCloudUploadDialogComponent>, 
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    public uploadFile = () => {
        if (this.fileToUpload) {
            this.fileevent.emit({ 
                file: this.fileToUpload,
                description: this.description,
                inputData: this.data 
            });
            this.dialogRef.close();
        }
    }

    setFileDescription(description: string) {
        this.description = description;
    }

    attachFile(files: FileList) {
        this.fileToUpload = files.item(0);
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

}
