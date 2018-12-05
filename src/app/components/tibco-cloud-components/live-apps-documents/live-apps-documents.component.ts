import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {LiveAppsService} from '../../../services/live-apps.service';
import {map, take, takeUntil} from 'rxjs/operators';
import { DocumentList, Document } from '../../../models/liveappsdata';

@Component({
  selector: 'app-live-apps-documents',
  templateUrl: './live-apps-documents.component.html',
  styleUrls: ['./live-apps-documents.component.css']
})
export class LiveAppsDocumentsComponent implements OnInit, OnDestroy {
  @Input() sandboxId: number;
  @Input() folderType: string; // 'orgFolders' or 'caseFolders'
  @Input() folderId: string;   // caseRef for caseFolder
  @Input() filter: string;

  private errorMessage: string;
  private documents: Document[];
  private fileToUpload: File = undefined;
  private fileDescription: string;
  inputdata: any = {};
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

  public removeDocument = (docname) => {
    this.liveapps.deleteDocument(this.folderType, this.folderId, docname, this.sandboxId)
      .pipe(
        take(1),
        takeUntil(this._destroyed$),
        map(val => {
          console.log(val);
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

  uploadFile() {
    if (this.fileToUpload) {
      this.liveapps.uploadDocument(this.folderType, this.folderId, this.sandboxId,
        this.fileToUpload, this.fileToUpload.name, this.inputdata.description)
        .pipe(
          map(val => {
            console.log(val);
          })
        )
        .subscribe(
          result => {
            this.fileToUpload = undefined;
            this.inputdata = {};
            this.uploadMessage = 'File uploaded';
          },
          error => { console.log('error'); this.errorMessage = 'Error uploading document: ' + error.errorMsg; });
    }
  }

  constructor(private liveapps: LiveAppsService) { }

  ngOnInit() {
    this.refresh();
  }

  ngOnDestroy(): void {
    this._destroyed$.next();
  }

}
