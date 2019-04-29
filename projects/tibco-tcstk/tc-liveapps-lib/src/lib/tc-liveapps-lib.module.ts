import { ModuleWithProviders, NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {
  MatAccordion,
  MatButtonModule,
  MatCardModule, MatCheckboxModule, MatDialogModule, MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule, MatMenuModule, MatOptionModule,
  MatSelectModule, MatTabsModule, MatToolbarModule, MatTooltipModule, MatSnackBarModule, MatSlideToggleModule, MatIconRegistry
} from '@angular/material';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {BrowserModule, DomSanitizer} from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ColorPickerModule } from 'ngx-color-picker';
import {CachingInterceptor, DurationSincePipe, TcCoreCommonFunctions} from '@tibco-tcstk/tc-core-lib';
import { RequestCacheService } from '@tibco-tcstk/tc-core-lib';
import { LiveAppsCaseSearchComponent } from './components/live-apps-case-search/live-apps-case-search.component';
import { LiveAppsCaseListComponent } from './components/live-apps-case-list/live-apps-case-list.component';
import { LiveAppsCaseSummaryComponent } from './components/live-apps-case-summary/live-apps-case-summary.component';
import { LiveAppsStateIconComponent } from './components/live-apps-state-icon/live-apps-state-icon.component';
import { LiveAppsSandboxComponent } from './components/live-apps-sandbox/live-apps-sandbox.component';
import { LiveAppsApplicationsComponent } from './components/live-apps-applications/live-apps-applications.component';
import { LiveAppsNotesComponent } from './components/live-apps-notes/live-apps-notes.component';
import {
  LiveAppsDocumentsComponent,
  LiveAppsDocumentUploadDialogComponent, LiveAppsDocumentViewerDialogComponent
} from './components/live-apps-documents/live-apps-documents.component';
import { LiveAppsCaseStatesComponent } from './components/live-apps-case-states/live-apps-case-states.component';
import {
    LiveAppsApplicationConfigurationComponent,
    LiveAppsStateIconUploadDialogComponent
} from './components/live-apps-application-configuration/live-apps-application-configuration.component';
import { LiveAppsCaseSchemaListComponent } from './components/live-apps-case-schema-list/live-apps-case-schema-list.component';
import { LiveAppsFavoriteCasesComponent } from './components/live-apps-favorite-cases/live-apps-favorite-cases.component';
import { LiveAppsCaseAuditComponent } from './components/live-apps-case-audit/live-apps-case-audit.component';
import { LiveAppsCaseDataComponent } from './components/live-apps-case-data/live-apps-case-data.component';
import { LiveAppsCaseActionsComponent } from './components/live-apps-case-actions/live-apps-case-actions.component';
import { LiveAppsRecentCasesComponent } from './components/live-apps-recent-cases/live-apps-recent-cases.component';
import { LiveAppsCaseStateAuditComponent } from './components/live-apps-case-state-audit/live-apps-case-state-audit.component';
import { LiveAppsNotesEditorComponent } from './components/live-apps-notes-editor/live-apps-notes-editor.component';
import { LiveAppsService } from './services/live-apps.service';
import { LiveAppsLoginComponent } from './components/live-apps-login/live-apps-login.component';
import { LiveAppsSearchWidgetComponent } from './components/live-apps-search-widget/live-apps-search-widget.component';
import { LiveAppsComponent } from './components/live-apps-component/live-apps-component.component';
import { MockingInterceptor } from '@tibco-tcstk/tc-core-lib';
import { LiveAppsCaseCreatorComponent } from './components/live-apps-case-creator/live-apps-case-creator.component';
import { LiveAppsCreatorSelectorComponent } from './components/live-apps-creator-selector/live-apps-creator-selector.component';
import { LiveAppsCreatorsComponent } from './components/live-apps-creators/live-apps-creators.component';
import { LiveAppsCaseActionComponent } from './components/live-apps-case-action/live-apps-case-action.component';
import { LiveAppsActionsComponent } from './components/live-apps-actions/live-apps-actions.component';
import { TcCoreLibModule } from '@tibco-tcstk/tc-core-lib';
import { TcFormsLibModule } from '@tibco-tcstk/tc-forms-lib';
import { CaseGuard } from './guards/case.guard';
import { TcCaseDataService } from './services/tc-case-data.service';
import { LiveAppsCaseDataDisplayComponent } from './components/live-apps-case-data-display/live-apps-case-data-display.component';
import { LiveAppsCaseCockpitComponent } from './components/live-apps-case-cockpit/live-apps-case-cockpit.component';
import { TcCaseProcessesService } from './services/tc-case-processes.service';
import { LiveAppsMilestoneComponent } from './components/live-apps-milestone/live-apps-milestone.component';
import { TcDocumentService } from './services/tc-document.service';
import { LiveAppsAppConfigurationWidgetComponent } from './components/live-apps-app-configuration-widget/live-apps-app-configuration-widget.component';
import { LiveAppsCaseCreatorWidgetComponent } from './components/live-apps-case-creator-widget/live-apps-case-creator-widget.component';
import { LiveAppsHomeCockpitComponent } from './components/live-apps-home-cockpit/live-apps-home-cockpit.component';
import { TcLiveAppsConfigService } from './services/tc-live-apps-config.service';
import { LiveAppsApplicationListComponent } from './components/live-apps-application-list/live-apps-application-list.component';
import { LiveAppsApplicationCreateButtonComponent } from './components/live-apps-application-create-button/live-apps-application-create-button.component';
import { LiveAppsCreatorDialogComponent } from './components/live-apps-creator-dialog/live-apps-creator-dialog.component';
import { LiveAppsSettingsComponent } from './components/live-apps-settings/live-apps-settings.component';
import { LiveAppsSettingsSummaryCardsComponent } from './components/live-apps-settings-summary-cards/live-apps-settings-summary-cards.component';
import { LiveAppsSettingsRecentCasesComponent } from './components/live-apps-settings-recent-cases/live-apps-settings-recent-cases.component';
import { LiveAppsSettingsRolesComponent } from './components/live-apps-settings-roles/live-apps-settings-roles.component';
import { TcRolesService } from './services/tc-roles-service.ts.service';
import { LiveAppsRoleSwitcherComponent } from './components/live-apps-role-switcher/live-apps-role-switcher.component';
import {LiveAppsCaseCreatorsComponent} from './components/live-apps-case-creators/live-apps-case-creators.component';
import {ParseAuditMessagePipe} from './pipes/audit.pipe';
import {LiveAppsCaseActionsListComponent} from './components/live-apps-case-actions-list/live-apps-case-actions-list.component';
import { LiveAppsDocumentViewerComponent } from './components/live-apps-document-viewer/live-apps-document-viewer.component';
import { LiveAppsLandingPageComponent } from './components/live-apps-landing-page/live-apps-landing-page.component';
import {ChartsModule} from 'ng2-charts';
import { LiveAppsPieComponent } from './components/live-apps-pie/live-apps-pie.component';
import { LiveAppsReportingCockpitComponent } from './components/live-apps-reporting-cockpit/live-apps-reporting-cockpit.component';
import { LiveAppsCaseOverviewReportComponent } from './components/live-apps-case-overview-report/live-apps-case-overview-report.component';
import {TcLiveAppsReportingService} from './services/tc-live-apps-reporting.service';
import {LiveAppsCaseTypeOverviewReportComponent} from './components/live-apps-case-type-overview-report/live-apps-case-type-overview-report.component';
import {Location} from '@angular/common';
import {RoleGuard} from '@tibco-tcstk/tc-liveapps-lib';

@NgModule({
    declarations: [
        LiveAppsLoginComponent,
        LiveAppsSandboxComponent,
        LiveAppsApplicationsComponent,
        LiveAppsCaseSchemaListComponent,
        LiveAppsCaseDataComponent,
        LiveAppsCaseStatesComponent,
        LiveAppsCaseActionsComponent,
        LiveAppsCaseAuditComponent,
        LiveAppsCaseStateAuditComponent,
        LiveAppsRecentCasesComponent,
        LiveAppsFavoriteCasesComponent,
        LiveAppsDocumentsComponent,
        LiveAppsNotesComponent,
        LiveAppsNotesEditorComponent,
        LiveAppsDocumentUploadDialogComponent,
        LiveAppsDocumentViewerDialogComponent,
        LiveAppsCaseSummaryComponent,
        LiveAppsStateIconComponent,
        LiveAppsApplicationConfigurationComponent,
        LiveAppsStateIconUploadDialogComponent,
        LiveAppsCaseListComponent,
        LiveAppsCaseSearchComponent,
        LiveAppsSearchWidgetComponent,
        LiveAppsComponent,
        LiveAppsCaseCreatorComponent,
        LiveAppsCreatorSelectorComponent,
        LiveAppsCreatorsComponent,
        LiveAppsCaseActionComponent,
        LiveAppsActionsComponent,
        LiveAppsCaseDataDisplayComponent,
        LiveAppsCaseCockpitComponent,
        LiveAppsMilestoneComponent,
        LiveAppsAppConfigurationWidgetComponent,
        LiveAppsCaseCreatorWidgetComponent,
        LiveAppsHomeCockpitComponent,
        LiveAppsApplicationListComponent,
        LiveAppsApplicationCreateButtonComponent,
        LiveAppsCreatorDialogComponent,
        LiveAppsSettingsComponent,
        LiveAppsSettingsSummaryCardsComponent,
        LiveAppsSettingsRecentCasesComponent,
        LiveAppsSettingsRolesComponent,
        LiveAppsRoleSwitcherComponent,
        LiveAppsCaseCreatorsComponent,
        ParseAuditMessagePipe,
        LiveAppsCaseActionsListComponent,
        LiveAppsDocumentViewerComponent,
        LiveAppsLandingPageComponent,
        LiveAppsPieComponent,
        LiveAppsReportingCockpitComponent,
        LiveAppsCaseOverviewReportComponent,
        LiveAppsCaseTypeOverviewReportComponent
    ],
    imports: [
        TcCoreLibModule,
        TcFormsLibModule,
        HttpClientModule,
        BrowserModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatListModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatSelectModule,
        MatOptionModule,
        MatDialogModule,
        MatMenuModule,
        MatCardModule,
        MatTooltipModule,
        MatTabsModule,
        MatToolbarModule,
        MatExpansionModule,
        MatSnackBarModule,
        ScrollDispatchModule,
        MatSlideToggleModule,
        FormsModule,
        FlexLayoutModule,
        ColorPickerModule,
        ScrollingModule,
        ReactiveFormsModule,
        ChartsModule
    ],
  exports: [
    LiveAppsLoginComponent,
    LiveAppsSandboxComponent,
    LiveAppsApplicationsComponent,
    LiveAppsCaseSchemaListComponent,
    LiveAppsCaseDataComponent,
    LiveAppsCaseStatesComponent,
    LiveAppsCaseActionsComponent,
    LiveAppsCaseAuditComponent,
    LiveAppsCaseStateAuditComponent,
    LiveAppsRecentCasesComponent,
    LiveAppsFavoriteCasesComponent,
    LiveAppsDocumentsComponent,
    LiveAppsNotesComponent,
    LiveAppsNotesEditorComponent,
    LiveAppsDocumentUploadDialogComponent,
    LiveAppsDocumentViewerDialogComponent,
    LiveAppsCaseSummaryComponent,
    LiveAppsStateIconComponent,
    LiveAppsApplicationConfigurationComponent,
    LiveAppsStateIconUploadDialogComponent,
    LiveAppsCaseListComponent,
    LiveAppsCaseSearchComponent,
    LiveAppsSearchWidgetComponent,
    LiveAppsComponent,
    LiveAppsCreatorSelectorComponent,
    LiveAppsCaseCreatorComponent,
    LiveAppsCreatorsComponent,
    LiveAppsCaseActionComponent,
    LiveAppsActionsComponent,
    LiveAppsCaseDataDisplayComponent,
    LiveAppsCaseCockpitComponent,
    LiveAppsAppConfigurationWidgetComponent,
    LiveAppsCaseCreatorWidgetComponent,
    LiveAppsHomeCockpitComponent,
    LiveAppsApplicationListComponent,
    LiveAppsApplicationCreateButtonComponent,
    LiveAppsCreatorDialogComponent,
    LiveAppsSettingsComponent,
    LiveAppsSettingsSummaryCardsComponent,
    LiveAppsSettingsRolesComponent,
    LiveAppsRoleSwitcherComponent,
    LiveAppsCaseCreatorsComponent,
    ParseAuditMessagePipe,
    LiveAppsCaseActionsListComponent,
    LiveAppsDocumentViewerComponent,
    LiveAppsLandingPageComponent,
    LiveAppsReportingCockpitComponent,
    LiveAppsPieComponent,
    LiveAppsCaseOverviewReportComponent,
    LiveAppsCaseTypeOverviewReportComponent
  ],
    entryComponents: [LiveAppsStateIconUploadDialogComponent, LiveAppsDocumentUploadDialogComponent, LiveAppsDocumentViewerDialogComponent, LiveAppsCreatorDialogComponent],
    providers: [
        RequestCacheService,
        CaseGuard,
        RoleGuard,
        DurationSincePipe,
        { provide: HTTP_INTERCEPTORS, useClass: CachingInterceptor, multi: true }
        // { provide: HTTP_INTERCEPTORS, useClass: MockingInterceptor, multi: true }
    ]
})
export class TcLiveappsLibModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: TcLiveappsLibModule,
            providers: [LiveAppsService, TcCaseDataService, TcCaseProcessesService, TcDocumentService, TcLiveAppsConfigService, TcRolesService, TcLiveAppsReportingService]
        };
    }

  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer, private location: Location) {
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
    this.matIconRegistry.addSvgIcon(
      'tcpd-database-blue',
      this.domSanitizer.bypassSecurityTrustResourceUrl(TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, 'assets/icons/ic-database-blue.svg'))
    );
  }
}
