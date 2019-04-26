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
    MatSelectModule, MatTabsModule, MatToolbarModule, MatTooltipModule, MatSnackBarModule, MatSlideToggleModule
} from '@angular/material';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ColorPickerModule } from 'ngx-color-picker';
import { CachingInterceptor, DurationSincePipe } from 'tc-core-lib';
import { RequestCacheService } from 'tc-core-lib';
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
import { MockingInterceptor } from 'tc-core-lib';
import { LiveAppsCaseCreatorComponent } from './components/live-apps-case-creator/live-apps-case-creator.component';
import { LiveAppsCreatorSelectorComponent } from './components/live-apps-creator-selector/live-apps-creator-selector.component';
import { LiveAppsCreatorsComponent } from './components/live-apps-creators/live-apps-creators.component';
import { LiveAppsCaseActionComponent } from './components/live-apps-case-action/live-apps-case-action.component';
import { LiveAppsActionsComponent } from './components/live-apps-actions/live-apps-actions.component';
import { TcCoreLibModule } from 'tc-core-lib';
import { TcFormsLibModule } from 'tc-forms-lib';
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
}
