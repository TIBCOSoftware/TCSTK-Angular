import {Component} from '@angular/core';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon(
      'tcs-collaboration-reply',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/ic-reply.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'tcs-collaboration-delete',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/ic-delete.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'tcs-collaboration-edit',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/ic-edit.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'tcs-collaboration-send',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/send.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'tcs-collaboration-subscribed',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/ic-subscribed.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'tcs-collaboration-unsubscribed',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/ic-unsubscribed.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'tcs-collaboration-feed',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/ic-feed.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'tcs-document-library',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/ic-document-library.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'tcs-document-action',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/ic-document-action.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'tcs-document-upload',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/ic-document-upload.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'tcs-document-zip',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/ic-document-zip.svg')
    );
    this.matIconRegistry.addSvgIcon(
        'tcs-document-image',
        this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/ic-document-image.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'tcs-document-doc',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/ic-document-doc.svg')
    );
  }
  title = 'BaseApp';
}

