import {Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Subject} from 'rxjs';
import {LiveAppsService} from '../../services/live-apps.service';
import {map, take, takeUntil} from 'rxjs/operators';
import { DocumentList, Document } from '../../models/tc-document';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {LiveAppsComponent} from '../live-apps-component/live-apps-component.component';
import {TcDocumentService} from '../../services/tc-document.service';


/**
 * Document component
 *
 *@example <tcla-live-apps-documents></tcla-live-apps-documents>
 */

@Component({
  selector: 'tcla-live-apps-documents',
  templateUrl: './live-apps-documents.component.html',
  styleUrls: ['./live-apps-documents.component.css']
})
export class LiveAppsDocumentsComponent extends LiveAppsComponent implements OnInit {

  constructor(private liveapps: LiveAppsService, private documentsService: TcDocumentService, public dialog: MatDialog) {
    super();
  }
  /**
   * sandboxId - this comes from claims resolver
   */
  @Input() sandboxId: number;

  /**
   * orgFolders' or 'caseFolders' - different API calls made according to which one this is
   */
  @Input() folderType: string; // 'orgFolders' or 'caseFolders'

  /**
   * The organisation folder to store/retrieve documents
   */
  @Input() folderId: string;   // caseRef for caseFolder

  /**
   * NOT used but would allow a search filter on documents
   */
  @Input() filter: string;

  /**
   * header text on component (defaults to documents)
   */
  @Input() folderDescription: string;

  /**
   * Whether to show the header bar in the widget - eg. favorites on home page (contains icon etc) - if off icons still appear without bar
   */
  @Input() showHeader: boolean = this.showHeader ? this.showHeader : true;

  public errorMessage: string;
  public documents: Document[];
  public fileToUpload: File = undefined;
  public fileDescription: string;
  uploadMessage: string;

  public refresh = () => {
    this.listDocuments();
  }

  public listDocuments = () => {
    this.documentsService.listDocuments(this.folderType, this.folderId, this.sandboxId, this.filter)
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
    this.documentsService.deleteDocument(this.folderType, this.folderId, doc.name, this.sandboxId)
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

  public viewDocument = (doc) => {
    const viewDocDialogRef = this.dialog.open(LiveAppsDocumentViewerDialogComponent, {
      width: '75%',
      height: '75%',
      data: {
        doc: doc,
        folderType: this.folderType,
        folderId: this.folderId,
        sandboxId: this.sandboxId
      }
    });

    viewDocDialogRef.afterClosed().subscribe(result => {
    });
  }

  public downloadDocument = (doc) => {
    this.documentsService.downloadDocument(this.folderType, this.folderId, doc.name, doc.artifactVersion, this.sandboxId)
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
      this.documentsService.uploadDocument(this.folderType, this.folderId, this.sandboxId,
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

@Component({
  selector: 'tcla-live-apps-document-viewer-dialog',
  templateUrl: 'app-live-apps-document-viewer-dialog.html',
  styleUrls: [ 'app-live-apps-document-viewer-dialog.css']
})
export class LiveAppsDocumentViewerDialogComponent {
  public doc: Document;
  public folderType: string;
  public folderId: string;
  public sandboxId: number;

  constructor(
    public dialogRef: MatDialogRef<LiveAppsDocumentUploadDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.doc = this.data.doc;
    this.folderType = this.data.folderType;
    this.folderId = this.data.folderId;
    this.sandboxId = this.data.sandboxId;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

