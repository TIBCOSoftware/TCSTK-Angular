import {Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Subject} from 'rxjs';
import {LiveAppsService} from '../../services/live-apps.service';
import {map, take, takeUntil} from 'rxjs/operators';
import { DocumentList, Document } from '../../models/liveappsdata';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';

@Component({
  selector: 'tcla-live-apps-documents',
  templateUrl: './live-apps-documents.component.html',
  styleUrls: ['./live-apps-documents.component.css']
})
export class LiveAppsDocumentsComponent implements OnInit, OnDestroy {

  constructor(private liveapps: LiveAppsService, public dialog: MatDialog) { }
  @Input() sandboxId: number;
  @Input() folderType: string; // 'orgFolders' or 'caseFolders'
  @Input() folderId: string;   // caseRef for caseFolder
  @Input() filter: string;
  @Input() folderDescription: string;

  public errorMessage: string;
  public documents: Document[];
  public fileToUpload: File = undefined;
  public fileDescription: string;
  uploadMessage: string;

  // use the _destroyed$/takeUntil pattern to avoid memory leaks if a response was never received
  private _destroyed$ = new Subject();

  public refresh = () => {
    this.listDocuments();
  }

  public listDocuments = () => {
    this.liveapps.listDocuments(this.folderType, this.folderId, this.sandboxId, this.filter)
      .pipe(
        take(1),
        takeUntil(this._destroyed$),
        map(documentslist => {
          this.documents = documentslist.documents;
        })
      ).subscribe(null, error => { this.errorMessage = 'Error retrieving case states: ' + error.error.errorMsg; });
    }

  public uploadDocument = (doc) => {
  }

  public removeDocument = (doc) => {
    this.liveapps.deleteDocument(this.folderType, this.folderId, doc.name, this.sandboxId)
      .pipe(
        take(1),
        takeUntil(this._destroyed$),
        map(val => {
          console.log(val);
          this.refresh();
        })
      )
      .subscribe(
        null, error => { this.errorMessage = 'Error removing document: ' + error.errorMsg; });
  }

  public downloadDocument = (doc) => {
    this.liveapps.downloadDocument(this.folderType, this.folderId, doc.name, doc.artifactVersion, this.sandboxId)
      .pipe(
        take(1),
        takeUntil(this._destroyed$),
        map(data => {
          // todo: check if this works on all browsers
          const downloadURL = window.URL.createObjectURL(data);
          const link = document.createElement('a');
          link.href = downloadURL;
          link.download = doc.name;
          link.click();
        })
      )
      .subscribe(
        null, error => { this.errorMessage = 'Error downloading document: ' + error.errorMsg; });
  }

  attachFile(files: FileList) {
    this.uploadMessage = '';
    this.fileToUpload = files.item(0);
  }

  setFileDescription(description: string) {
    this.fileDescription = description;
  }

  uploadFile(fileToUpload, description) {
    this.fileToUpload = fileToUpload;
    this.fileDescription = description;
    if (this.fileToUpload) {
      this.liveapps.uploadDocument(this.folderType, this.folderId, this.sandboxId,
        this.fileToUpload, this.fileToUpload.name, this.fileDescription)
        .pipe(
          map(val => {
            console.log(val);
            this.refresh();
          })
        )
        .subscribe(
          result => {
            this.fileToUpload = undefined;
            this.uploadMessage = 'File uploaded';
          },
          error => { console.log('error'); this.errorMessage = 'Error uploading document: ' + error.errorMsg; });
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LiveAppsDocumentUploadDialogComponent, {
      width: '500px',
      data: {}
    });

    dialogRef.componentInstance.fileevent.subscribe(($e) => {
      this.uploadFile($e.file, $e.description);
    })

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  ngOnInit() {
    this.refresh();
  }

  ngOnDestroy(): void {
    this._destroyed$.next();
  }

}

@Component({
  selector: 'tcla-live-apps-document-upload-dialog',
  templateUrl: 'app-live-apps-document-upload-dialog.html',
  styleUrls: [ 'app-live-apps-document-upload-dialog.css']
})
export class LiveAppsDocumentUploadDialogComponent {
  @Output() fileevent = new EventEmitter<any>();
  public fileToUpload: File = undefined;
  public description: string = undefined;

  constructor(
    public dialogRef: MatDialogRef<LiveAppsDocumentUploadDialogComponent>) {}


  public uploadFile = () => {
    if (this.fileToUpload) {
      this.fileevent.emit({ file: this.fileToUpload, description: this.description });
      this.dialogRef.close();
    }
  }

  setFileDescription(description: string) {
    this.description = description;
  }

  attachFile(files: FileList) {
    // this.uploadMessage = '';
    this.fileToUpload = files.item(0);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
