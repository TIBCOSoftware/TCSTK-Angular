import {Component} from '@angular/core';
import {LiveAppsService, LoginContext} from 'tc-liveapps-lib';
import {LogLevel, LogService} from 'tc-core-lib';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {Location} from '@angular/common';

@Component({
  selector: 'laapp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tc-liveapps';
  loggedIn = false;
  loginContext: LoginContext;

  /*

  // handle login context
  handleLoginContext = (loginContext: LoginContext) => {
    this.loginContext = loginContext;
    this.loggedIn = true;
  }

  // handle case creator response
  handleCaseCreation = (data: ProcessId) => {
    console.log('Case Created');
    console.log(data);
  }

  // handle case action response
  handleCaseActioned = (data: ProcessId) => {
    console.log('Case Actioned');
    console.log(data);
  }

  // set recent case
  handleCaseClick = (caseRef: string) => {
      this.liveapps.setRecentCase(caseRef, this.appConfig.uiAppId, Number(this.loginContext.claims.primaryProductionSandbox.id));
      this.liveapps.setFavoriteCase(caseRef, this.appConfig.uiAppId, Number(this.loginContext.claims.primaryProductionSandbox.id));
  }

  // case clicked
  private clickCaseAction = (caseReference) => {
    console.log('Case was clicked: ' + caseReference);
  }
  */

  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer, private location: Location, private liveapps: LiveAppsService, private logger: LogService ) {
    logger.level = LogLevel.Debug;
    logger.info('My Cloud Starter Online...')
    this.matIconRegistry.addSvgIcon(
      'tcs-collaboration-reply',
      this.domSanitizer.bypassSecurityTrustResourceUrl(this.location.prepareExternalUrl('assets/icons/ic-reply.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'tcs-collaboration-delete',
      this.domSanitizer.bypassSecurityTrustResourceUrl(this.location.prepareExternalUrl('assets/icons/ic-delete.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'tcs-collaboration-edit',
      this.domSanitizer.bypassSecurityTrustResourceUrl(this.location.prepareExternalUrl('assets/icons/ic-edit.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'tcs-collaboration-send',
      this.domSanitizer.bypassSecurityTrustResourceUrl(this.location.prepareExternalUrl('assets/icons/ic-send.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'tcs-collaboration-subscribed',
      this.domSanitizer.bypassSecurityTrustResourceUrl(this.location.prepareExternalUrl('assets/icons/ic-subscribed.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'tcs-collaboration-unsubscribed',
      this.domSanitizer.bypassSecurityTrustResourceUrl(this.location.prepareExternalUrl('assets/icons/ic-unsubscribed.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'tcs-collaboration-feed',
      this.domSanitizer.bypassSecurityTrustResourceUrl(this.location.prepareExternalUrl('assets/icons/ic-feed.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'tcs-document-library',
      this.domSanitizer.bypassSecurityTrustResourceUrl(this.location.prepareExternalUrl('assets/icons/ic-document-library.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'tcs-document-action',
      this.domSanitizer.bypassSecurityTrustResourceUrl(this.location.prepareExternalUrl('assets/icons/ic-document-action.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'tcs-document-upload',
      this.domSanitizer.bypassSecurityTrustResourceUrl(this.location.prepareExternalUrl('assets/icons/ic-document-upload.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'tcs-document-zip',
      this.domSanitizer.bypassSecurityTrustResourceUrl(this.location.prepareExternalUrl('assets/icons/ic-document-zip.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'tcs-document-image',
      this.domSanitizer.bypassSecurityTrustResourceUrl(this.location.prepareExternalUrl('assets/icons/ic-document-image.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'tcs-document-doc',
      this.domSanitizer.bypassSecurityTrustResourceUrl(this.location.prepareExternalUrl('assets/icons/ic-document-doc.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'tcs-summary-details-button',
      this.domSanitizer.bypassSecurityTrustResourceUrl(this.location.prepareExternalUrl('assets/icons/ic-details-button.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'tcs-favorites-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl(this.location.prepareExternalUrl('assets/icons/ic-favorite.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'tcs-config-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl(this.location.prepareExternalUrl('assets/icons/ic-settings.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'tcs-case-start-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl(this.location.prepareExternalUrl('assets/icons/ic-add.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'tcs-refresh-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl(this.location.prepareExternalUrl('assets/icons/ic-refresh.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'tcs-recent-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl(this.location.prepareExternalUrl('assets/icons/ic-recent.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'tcs-clear-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl(this.location.prepareExternalUrl('assets/icons/ic-clear.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'tcs-customization-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl(this.location.prepareExternalUrl('assets/icons/ic-settings.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'tcs-caselist-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl(this.location.prepareExternalUrl('assets/icons/ic-caselist.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'tcs-search-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl(this.location.prepareExternalUrl('assets/icons/ic-search.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'tcs-case-data-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl(this.location.prepareExternalUrl('assets/icons/ic-case-data.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'tcs-close-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl(this.location.prepareExternalUrl('assets/icons/ic-close.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'tcs-case-state-audit-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl(this.location.prepareExternalUrl('assets/icons/ic-case-state-audit.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'tcs-milestone-completed',
      this.domSanitizer.bypassSecurityTrustResourceUrl(this.location.prepareExternalUrl('assets/icons/milestones/ic-milestone-completed.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'tcs-milestone-completed-terminal',
      this.domSanitizer.bypassSecurityTrustResourceUrl(this.location.prepareExternalUrl('assets/icons/milestones/ic-milestone-completed-terminal.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'tcs-milestone-inprogress',
      this.domSanitizer.bypassSecurityTrustResourceUrl(this.location.prepareExternalUrl('assets/icons/milestones/ic-milestone-inprogress.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'tcs-milestone-inprogress-terminal',
      this.domSanitizer.bypassSecurityTrustResourceUrl(this.location.prepareExternalUrl('assets/icons/milestones/ic-milestone-inprogress-terminal.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'tcs-milestone-pending',
      this.domSanitizer.bypassSecurityTrustResourceUrl(this.location.prepareExternalUrl('assets/icons/milestones/ic-milestone-pending.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'tcs-milestone-pending-terminal',
      this.domSanitizer.bypassSecurityTrustResourceUrl(this.location.prepareExternalUrl('assets/icons/milestones/ic-milestone-pending-terminal.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'tcs-mini-state-completed',
      this.domSanitizer.bypassSecurityTrustResourceUrl(this.location.prepareExternalUrl('assets/icons/milestones/ic-mini-state-completed.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'tcs-mini-state-current',
      this.domSanitizer.bypassSecurityTrustResourceUrl(this.location.prepareExternalUrl('assets/icons/milestones/ic-mini-state-current.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'tcs-mini-state-terminal-completed',
      this.domSanitizer.bypassSecurityTrustResourceUrl(this.location.prepareExternalUrl('assets/icons/milestones/ic-mini-state-terminal-completed.svg'))
    );
    this.matIconRegistry.addSvgIcon(
        'tcs-capabilities',
        this.domSanitizer.bypassSecurityTrustResourceUrl(this.location.prepareExternalUrl('assets/icons/ic-capabilities.svg'))
      );
    this.matIconRegistry.addSvgIcon(
      'tcs-home',
      this.domSanitizer.bypassSecurityTrustResourceUrl(this.location.prepareExternalUrl('assets/icons/ic-home.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'tcs-starters-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl(this.location.prepareExternalUrl('assets/icons/ic-starters.svg'))
    );

  
}
}
