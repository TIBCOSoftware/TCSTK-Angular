import {Component} from '@angular/core';
import {LiveAppsService, LoginContext} from 'tc-liveapps-lib';
import {LogLevel, LogService} from 'tc-core-lib';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {Location} from '@angular/common';
import {TcCoreCommonFunctions} from 'tc-core-lib';

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
      this.domSanitizer.bypassSecurityTrustResourceUrl(TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, 'assets/icons/ic-reply.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'tcs-collaboration-delete',
      this.domSanitizer.bypassSecurityTrustResourceUrl(TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, 'assets/icons/ic-delete.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'tcs-application-edit',
      this.domSanitizer.bypassSecurityTrustResourceUrl(TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, 'assets/icons/ic-link.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'tcs-collaboration-edit',
      this.domSanitizer.bypassSecurityTrustResourceUrl(TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, 'assets/icons/ic-edit.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'tcs-collaboration-send',
      this.domSanitizer.bypassSecurityTrustResourceUrl(TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, 'assets/icons/ic-send.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'tcs-collaboration-subscribed',
      this.domSanitizer.bypassSecurityTrustResourceUrl(TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, 'assets/icons/ic-subscribed.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'tcs-collaboration-unsubscribed',
      this.domSanitizer.bypassSecurityTrustResourceUrl(TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, 'assets/icons/ic-unsubscribed.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'tcs-collaboration-feed',
      this.domSanitizer.bypassSecurityTrustResourceUrl(TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, 'assets/icons/ic-feed.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'tcs-document-library',
      this.domSanitizer.bypassSecurityTrustResourceUrl(TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, 'assets/icons/ic-document-library.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'tcs-document-action',
      this.domSanitizer.bypassSecurityTrustResourceUrl(TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, 'assets/icons/ic-document-action.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'tcs-document-upload',
      this.domSanitizer.bypassSecurityTrustResourceUrl(TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, 'assets/icons/ic-document-upload.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'tcs-document-zip',
      this.domSanitizer.bypassSecurityTrustResourceUrl(TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, 'assets/icons/ic-document-zip.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'tcs-document-image',
      this.domSanitizer.bypassSecurityTrustResourceUrl(TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, 'assets/icons/ic-document-image.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'tcs-document-doc',
      this.domSanitizer.bypassSecurityTrustResourceUrl(TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, 'assets/icons/ic-document-doc.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'tcs-summary-details-button',
      this.domSanitizer.bypassSecurityTrustResourceUrl(TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, 'assets/icons/ic-details-button.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'tcs-favorites-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl(TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, 'assets/icons/ic-favorite.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'tcs-config-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl(TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, 'assets/icons/ic-settings.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'tcs-case-start-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl(TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, 'assets/icons/ic-add.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'tcs-refresh-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl(TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, 'assets/icons/ic-refresh.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'tcs-recent-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl(TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, 'assets/icons/ic-recent.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'tcs-clear-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl(TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, 'assets/icons/ic-clear.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'tcs-customization-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl(TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, 'assets/icons/ic-settings.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'tcs-caselist-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl(TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, 'assets/icons/ic-caselist.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'tcs-search-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl(TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, 'assets/icons/ic-search.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'tcs-case-data-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl(TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, 'assets/icons/ic-case-data.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'tcs-close-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl(TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, 'assets/icons/ic-close.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'tcs-case-state-audit-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl(TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, 'assets/icons/ic-case-state-audit.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'tcs-milestone-completed',
      this.domSanitizer.bypassSecurityTrustResourceUrl(TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, 'assets/icons/milestones/ic-milestone-completed.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'tcs-milestone-completed-terminal',
      this.domSanitizer.bypassSecurityTrustResourceUrl(TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, 'assets/icons/milestones/ic-milestone-completed-terminal.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'tcs-milestone-inprogress',
      this.domSanitizer.bypassSecurityTrustResourceUrl(TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, 'assets/icons/milestones/ic-milestone-inprogress.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'tcs-milestone-inprogress-terminal',
      this.domSanitizer.bypassSecurityTrustResourceUrl(TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, 'assets/icons/milestones/ic-milestone-inprogress-terminal.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'tcs-milestone-pending',
      this.domSanitizer.bypassSecurityTrustResourceUrl(TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, 'assets/icons/milestones/ic-milestone-pending.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'tcs-milestone-pending-terminal',
      this.domSanitizer.bypassSecurityTrustResourceUrl(TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, 'assets/icons/milestones/ic-milestone-pending-terminal.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'tcs-mini-state-completed',
      this.domSanitizer.bypassSecurityTrustResourceUrl(TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, 'assets/icons/milestones/ic-mini-state-completed.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'tcs-mini-state-current',
      this.domSanitizer.bypassSecurityTrustResourceUrl(TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, 'assets/icons/milestones/ic-mini-state-current.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'tcs-mini-state-terminal-completed',
      this.domSanitizer.bypassSecurityTrustResourceUrl(TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, 'assets/icons/milestones/ic-mini-state-terminal-completed.svg'))
    );
    this.matIconRegistry.addSvgIcon(
        'tcs-capabilities',
        this.domSanitizer.bypassSecurityTrustResourceUrl(TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, 'assets/icons/ic-capabilities.svg'))
      );
    this.matIconRegistry.addSvgIcon(
      'tcs-home',
      this.domSanitizer.bypassSecurityTrustResourceUrl(TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, 'assets/icons/ic-home.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'tcs-starters-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl(TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, 'assets/icons/ic-starters.svg'))
    );
    this.matIconRegistry.addSvgIcon(
        'tcs-spotfire-icon',
        this.domSanitizer.bypassSecurityTrustResourceUrl(TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, 'assets/icons/ic-spotfire.svg'))
      );
      this.matIconRegistry.addSvgIcon(
        'tcs-liveapps-sm-icon',
        this.domSanitizer.bypassSecurityTrustResourceUrl(TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, 'assets/icons/ic-liveapps-sm.svg'))
      );
      this.matIconRegistry.addSvgIcon(
        'tcs-integration-icon',
        this.domSanitizer.bypassSecurityTrustResourceUrl(TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, 'assets/icons/ic-integration.svg'))
      );
      this.matIconRegistry.addSvgIcon(
      'tcs-info-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl(TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, 'assets/icons/ic-info.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'tcs-chevron-right',
      this.domSanitizer.bypassSecurityTrustResourceUrl(TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, 'assets/icons/ic-chevron-right.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'tcs-chevron-left',
      this.domSanitizer.bypassSecurityTrustResourceUrl(TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, 'assets/icons/ic-chevron-left.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'tcs-delete-sweep',
      this.domSanitizer.bypassSecurityTrustResourceUrl(TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, 'assets/icons/ic-delete-sweep.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'tcs-euro-symbol',
      this.domSanitizer.bypassSecurityTrustResourceUrl(TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, 'assets/icons/ic-euro-symbol.svg'))
    );

    this.matIconRegistry.addSvgIcon(
      'tcs-flash-on',
      this.domSanitizer.bypassSecurityTrustResourceUrl(TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, 'assets/icons/ic-flash-on.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'tcs-incandescent',
      this.domSanitizer.bypassSecurityTrustResourceUrl(TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, 'assets/icons/ic-incandescent.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'tcs-cloud-download',
      this.domSanitizer.bypassSecurityTrustResourceUrl(TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, 'assets/icons/ic-cloud-download.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'tcs-visibility',
      this.domSanitizer.bypassSecurityTrustResourceUrl(TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, 'assets/icons/ic-visibility.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'tcs-pie-chart',
      this.domSanitizer.bypassSecurityTrustResourceUrl(TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, 'assets/icons/ic-pie-chart.svg'))
    );

    /* audit icons */
    this.matIconRegistry.addSvgIcon(
      'BP_AUTO_STARTED_INSTANCE',
      this.domSanitizer.bypassSecurityTrustResourceUrl(TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, 'assets/icons/audit/BP_AUTO_STARTED_INSTANCE.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'BP_DELAYED_AUTO_START_TIMER_EXPIRED',
      this.domSanitizer.bypassSecurityTrustResourceUrl(TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, 'assets/icons/audit/BP_DELAYED_AUTO_START_TIMER_EXPIRED.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'BP_DELAYED_AUTO_STARTED_INSTANCE',
      this.domSanitizer.bypassSecurityTrustResourceUrl(TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, 'assets/icons/audit/BP_DELAYED_AUTO_STARTED_INSTANCE.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'BP_DELAYED_AUTO_STARTED_INSTANCE_CANCELLED',
      this.domSanitizer.bypassSecurityTrustResourceUrl(TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, 'assets/icons/audit/BP_DELAYED_AUTO_STARTED_INSTANCE_CANCELLED.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'BP_DELAYED_AUTO_STARTED_INSTANCE_CANCELLED_DUE_TO_STATE_CHANGE',
      this.domSanitizer.bypassSecurityTrustResourceUrl(TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, 'assets/icons/audit/BP_DELAYED_AUTO_STARTED_INSTANCE_CANCELLED_DUE_TO_STATE_CHANGE.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'BP_INSTANCE_COMPLETED',
      this.domSanitizer.bypassSecurityTrustResourceUrl(TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, 'assets/icons/audit/BP_INSTANCE_COMPLETED.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'BP_INSTANCE_CREATED',
      this.domSanitizer.bypassSecurityTrustResourceUrl(TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, 'assets/icons/audit/BP_INSTANCE_CREATED.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'BP_TASK_COMPLETED',
      this.domSanitizer.bypassSecurityTrustResourceUrl(TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, 'assets/icons/audit/BP_TASK_COMPLETED.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'BP_TASK_CREATED',
      this.domSanitizer.bypassSecurityTrustResourceUrl(TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, 'assets/icons/audit/BP_TASK_CREATED.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'Calculation Task',
      this.domSanitizer.bypassSecurityTrustResourceUrl(TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, 'assets/icons/audit/Calculation Task.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'CM_CASE_CREATED',
      this.domSanitizer.bypassSecurityTrustResourceUrl(TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, 'assets/icons/audit/CM_CASE_CREATED.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'CM_CASE_UPDATED',
      this.domSanitizer.bypassSecurityTrustResourceUrl(TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, 'assets/icons/audit/CM_CASE_UPDATED.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'CM_CASE_UPDATED_STATE_CHANGED',
      this.domSanitizer.bypassSecurityTrustResourceUrl(TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, 'assets/icons/audit/CM_CASE_UPDATED_STATE_CHANGED.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'Email Task',
      this.domSanitizer.bypassSecurityTrustResourceUrl(TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, 'assets/icons/audit/Email Task.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'ERROR',
      this.domSanitizer.bypassSecurityTrustResourceUrl(TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, 'assets/icons/audit/ERROR.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'TCI Task',
      this.domSanitizer.bypassSecurityTrustResourceUrl(TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, 'assets/icons/audit/TCI Task.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'User Task',
      this.domSanitizer.bypassSecurityTrustResourceUrl(TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, 'assets/icons/audit/User Task.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'WR_FOLDER_ARTIFACT_CREATED',
      this.domSanitizer.bypassSecurityTrustResourceUrl(TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, 'assets/icons/audit/WR_FOLDER_ARTIFACT_CREATED.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'WR_FOLDER_ARTIFACT_DELETED',
      this.domSanitizer.bypassSecurityTrustResourceUrl(TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, 'assets/icons/audit/WR_FOLDER_ARTIFACT_DELETED.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'WR_FOLDER_ARTIFACT_UPDATED',
      this.domSanitizer.bypassSecurityTrustResourceUrl(TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, 'assets/icons/audit/WR_FOLDER_ARTIFACT_UPDATED.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'AuditSafe Task',
      this.domSanitizer.bypassSecurityTrustResourceUrl(TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, 'assets/icons/audit/AuditSafe Task.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'round',
      this.domSanitizer.bypassSecurityTrustResourceUrl(TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, 'assets/icons/audit/round.svg'))
    );





  
}
}
