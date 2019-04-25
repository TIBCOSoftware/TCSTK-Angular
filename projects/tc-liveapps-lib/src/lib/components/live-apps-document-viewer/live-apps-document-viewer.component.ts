import {Component, Input, OnInit} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {Document} from '../../models/tc-document';
import {TcDocumentService} from '../../services/tc-document.service';

@Component({
  selector: 'tcla-live-apps-document-viewer',
  templateUrl: './live-apps-document-viewer.component.html',
  styleUrls: ['./live-apps-document-viewer.component.css']
})
export class LiveAppsDocumentViewerComponent implements OnInit {
  @Input() document: Document;
  @Input() folderType: string;
  @Input() folderId: string;
  @Input() sandboxId: number;

  public sanitizedResourceUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer, private documentsService: TcDocumentService) { }

  ngOnInit() {
    this.sanitizedResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.documentsService.getUrlForDocument(this.folderType, this.folderId, this.document.name, this.document.artifactVersion, this.sandboxId));
  }

}
