import {Component, Input, OnInit} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {Document} from '../../models/tc-document';
import {TcDocumentService} from '../../services/tc-document.service';
import {TcCoreCommonFunctions} from '@tibco-tcstk/tc-core-lib';
import {Location} from '@angular/common';

/**
 * Display document
 *
 *@example <tcla-live-apps-document-viewer></tcla-live-apps-document-viewer>
 */

@Component({
  selector: 'tcla-live-apps-document-viewer',
  templateUrl: './live-apps-document-viewer.component.html',
  styleUrls: ['./live-apps-document-viewer.component.css']
})
export class LiveAppsDocumentViewerComponent implements OnInit {
  /**
   * Document metadata object from API - describes the document to display
   */
  @Input() document: Document;

  /**
   * orgFolders' or 'caseFolders' - different API calls made according to which one this is
   */
  @Input() folderType: string;

  /**
   * The organisation folder to store/retrieve documents
   */
  @Input() folderId: string;

  /**
   * sandboxId - this comes from claims resolver
   */
  @Input() sandboxId: number;

  public sanitizedResourceUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer, private documentsService: TcDocumentService, private location: Location) { }

  ngOnInit() {
    const preparedUrl = TcCoreCommonFunctions.prepareUrlForNonStaticResource(this.location, this.documentsService.getUrlForDocument(this.folderType, this.folderId, this.document.name, this.document.artifactVersion, this.sandboxId));
    this.sanitizedResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(preparedUrl);
  }

}
