import {APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, Inject, ModuleWithProviders, NgModule} from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule, MatIconRegistry} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {CdkScrollableModule} from '@angular/cdk/scrolling';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ColorPickerModule } from 'ngx-color-picker';
import { CachingInterceptor, DurationSincePipe } from '@tibco-tcstk/tc-core-lib';
import { RequestCacheService } from '@tibco-tcstk/tc-core-lib';
import { LiveAppsCaseSearchComponent } from './components/live-apps-case-search/live-apps-case-search.component';
import { LiveAppsCaseListComponent } from './components/live-apps-case-list/live-apps-case-list.component';
import { LiveAppsCaseSummaryComponent } from './components/live-apps-case-summary/live-apps-case-summary.component';
import { LiveAppsStateIconComponent } from './components/live-apps-state-icon/live-apps-state-icon.component';
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
import {NgChartsModule} from 'ng2-charts';
import {TcLiveAppsReportingService} from './services/tc-live-apps-reporting.service';
import {CommonModule, Location} from '@angular/common';
import {RoleGuard} from './guards/role.guard';
import { LiveAppsActiveCasesWidgetComponent } from './components/live-apps-active-cases-widget/live-apps-active-cases-widget.component';
import { LiveAppsActiveCasesReportComponent } from './components/live-apps-active-cases-report/live-apps-active-cases-report.component';
import { LiveAppsActiveCasesForTypeReportComponent } from './components/live-apps-active-cases-for-type-report/live-apps-active-cases-for-type-report.component';
import { LiveAppsSettingsAccessControlComponent } from './components/live-apps-settings-access-control/live-apps-settings-access-control.component';
import {LiveAppsLegacyFormComponent} from './components/live-apps-legacy-form/live-apps-legacy-form.component';
import {LiveAppsWorkitemsComponent} from './components/live-apps-workitems/live-apps-workitems.component';
import {LiveAppsLegacyProcessComponent} from './components/live-apps-legacy-process/live-apps-legacy-process.component';
import {LiveAppsSettingsFormsComponent} from './components/live-apps-settings-forms/live-apps-settings-forms.component';
import { LiveAppsSettingsLandingComponent } from './components/live-apps-settings-landing/live-apps-settings-landing.component';
import { LiveAppsHomeCockpitStandaloneComponent } from './components/live-apps-home-cockpit-standalone/live-apps-home-cockpit-standalone.component';
import { LiveAppsCaseCockpitStandaloneComponent } from './components/live-apps-case-cockpit-standalone/live-apps-case-cockpit-standalone.component';
import { LiveAppsCreatorStandaloneComponent } from './components/live-apps-creator-standalone/live-apps-creator-standalone.component';
import {LiveAppsActionStandaloneComponent} from './components/live-apps-action-standalone/live-apps-action-standalone.component';
import {SessionRefreshService} from '@tibco-tcstk/tc-core-lib';
import { LiveAppsProcessesComponent } from './components/live-apps-processes/live-apps-processes.component';
import { LiveAppsFormPreviewComponent } from './components/live-apps-form-preview/live-apps-form-preview.component';
import {LiveAppsSettingsFormLayoutComponent} from './components/live-apps-settings-form-layout/live-apps-settings-form-layout.component';
import {TcAppDefinitionService} from './services/tc-app-definition.service';
import { LiveAppsFormComponent } from './components/live-apps-form/live-apps-form.component';
import { LiveAppsWorkitemComponent } from './components/live-apps-workitem/live-apps-workitem.component';
import { LiveAppsFormWcComponent } from './components/live-apps-form-wc/live-apps-form-wc.component';
import {LiveAppsSettingsCustomFormsComponent} from './components/live-apps-settings-custom-forms/live-apps-settings-custom-forms.component';
import { LiveAppsLoginOauthComponent } from './components/live-apps-login-oauth/live-apps-login-oauth.component';
import {AuthGuard} from './guards/auth.guard';
import { TcLiveappsConfiguration, TcLiveappsConfigurationService } from './models/tcLiveappsConfig';
import { TcLiveappsConfigService } from './services/tc-liveapps-config-service';

export const TIBCO_CLOUD_DOMAIN = 'cloud.tibco.com';
export const TIBCO_TEST_DOMAIN = 'tenant-integration.tcie.pro';
export const TIBCO_DEV_DOMAIN = 'emea.tibco.com';

// @dynamic
export function initAppDefinitionService(appDefinitionService: TcAppDefinitionService, tcLiveappsConfig: TcLiveappsConfigService) {
  const loader = () => {
      if (tcLiveappsConfig?.getConfig().defer) {
        return true;
      } else {
        return appDefinitionService.refresh().toPromise();
      }

  }
  return loader;
}

@NgModule({
    declarations: [
        LiveAppsLoginComponent,
        LiveAppsApplicationsComponent,
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
        LiveAppsActiveCasesWidgetComponent,
        LiveAppsActiveCasesReportComponent,
        LiveAppsActiveCasesForTypeReportComponent,
        LiveAppsSettingsAccessControlComponent,
        LiveAppsLegacyFormComponent,
        LiveAppsLegacyProcessComponent,
        LiveAppsSettingsFormsComponent,
        LiveAppsWorkitemsComponent,
        LiveAppsSettingsLandingComponent,
        LiveAppsHomeCockpitStandaloneComponent,
        LiveAppsCaseCockpitStandaloneComponent,
        LiveAppsCreatorStandaloneComponent,
        LiveAppsActionStandaloneComponent,
        LiveAppsProcessesComponent,
        LiveAppsFormPreviewComponent,
        LiveAppsSettingsFormLayoutComponent,
        LiveAppsFormComponent,
        LiveAppsWorkitemComponent,
        LiveAppsFormWcComponent,
        LiveAppsSettingsCustomFormsComponent,
        LiveAppsLoginOauthComponent
    ],
  imports: [
    TcCoreLibModule,
    TcFormsLibModule,
    HttpClientModule,
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatDialogModule,
    MatMenuModule,
    MatCardModule,
    MatTooltipModule,
    MatTabsModule,
    MatToolbarModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    CdkScrollableModule,
    MatSlideToggleModule,
    MatProgressBarModule,
    MatTableModule,
    MatRadioModule,
    FormsModule,
    FlexLayoutModule,
    ColorPickerModule,
    ScrollingModule,
    ReactiveFormsModule,
    NgChartsModule
  ],
  exports: [
    LiveAppsLoginComponent,
    LiveAppsApplicationsComponent,
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
    LiveAppsSettingsLandingComponent,
    LiveAppsRoleSwitcherComponent,
    LiveAppsCaseCreatorsComponent,
    ParseAuditMessagePipe,
    LiveAppsCaseActionsListComponent,
    LiveAppsDocumentViewerComponent,
    LiveAppsLandingPageComponent,
    LiveAppsActiveCasesWidgetComponent,
    LiveAppsActiveCasesReportComponent,
    LiveAppsActiveCasesForTypeReportComponent,
    LiveAppsLegacyFormComponent,
    LiveAppsLegacyProcessComponent,
    LiveAppsSettingsFormsComponent,
    LiveAppsWorkitemsComponent,
    LiveAppsHomeCockpitStandaloneComponent,
    LiveAppsCaseCockpitStandaloneComponent,
    LiveAppsCreatorStandaloneComponent,
    LiveAppsActionStandaloneComponent,
    LiveAppsProcessesComponent,
    LiveAppsFormPreviewComponent,
    LiveAppsSettingsFormLayoutComponent,
    LiveAppsWorkitemComponent,
    LiveAppsFormComponent,
    LiveAppsFormWcComponent,
    LiveAppsSettingsCustomFormsComponent,
    LiveAppsLoginOauthComponent
  ],
    entryComponents: [LiveAppsStateIconUploadDialogComponent, LiveAppsDocumentUploadDialogComponent, LiveAppsDocumentViewerDialogComponent, LiveAppsCreatorDialogComponent],
    providers: [
        RequestCacheService,
        TcAppDefinitionService,
        { provide: APP_INITIALIZER, useFactory: initAppDefinitionService, deps: [TcAppDefinitionService, TcLiveappsConfigService], multi: true },
        CaseGuard,
        RoleGuard,
        AuthGuard,
        DurationSincePipe,
        { provide: HTTP_INTERCEPTORS, useClass: CachingInterceptor, multi: true }
        // { provide: HTTP_INTERCEPTORS, useClass: MockingInterceptor, multi: true }
    ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TcLiveappsLibModule {
    static forRoot(config?: TcLiveappsConfiguration): ModuleWithProviders<TcLiveappsLibModule> {
        return {
            ngModule: TcLiveappsLibModule,
            providers: [TcLiveappsConfigService, { provide: TcLiveappsConfigurationService, useValue: config ? config : undefined }, LiveAppsService, TcCaseDataService, TcCaseProcessesService, TcDocumentService, TcLiveAppsConfigService, TcRolesService, TcLiveAppsReportingService]
        };
    }
  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer, private location: Location, private sessionRefreshService: SessionRefreshService) {
      this.matIconRegistry.addSvgIconLiteral(
      'ic-cloud-logo',
      this.domSanitizer.bypassSecurityTrustHtml('<?xml version="1.0" encoding="UTF-8"?>\n' +
        '<svg width="219px" height="40px" viewBox="0 0 219 40" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n' +
        '    <title>A093F186-5C42-423C-9AA6-2792EB365783</title>\n' +
        '    <g id="Tablet-UI" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n' +
        '        <g id="CR-login" transform="translate(-35.000000, -11.000000)" fill="#FFFFFF">\n' +
        '            <g id="Group" transform="translate(35.000000, 11.000000)">\n' +
        '                <path d="M29.8769822,9.47420378 L29.0204136,11.7783982 L28.6369768,11.7783982 L27.7754054,9.46955823 L27.7439585,11.8209229 L27.3701702,11.8209229 L27.4641533,9 L27.9733774,9 L28.8395944,11.3188458 L29.7008085,9 L30.2014562,9 L30.2918658,11.8209229 L29.9059275,11.8209229 L29.8769822,9.47420378 Z M26.0115245,9.36092375 L26.0115245,11.8209229 L25.6352347,11.8209229 L25.6352347,9.36092375 L24.6482333,9.36092375 L24.6482333,9 L26.9985259,9 L26.9985259,9.36092375 L26.0115245,9.36092375 Z M8.68039487,26.605932 L17.6870505,26.605932 L22.1864475,18.809979 L17.6870505,11.0065216 L8.68039487,11.0065216 L4.18064055,18.809979 L8.68039487,26.605932 Z M23.225622,30.0143387 L28.8127931,30.0143387 L31.6044133,25.1779604 L28.8127931,20.3369366 L23.225622,20.3369366 L20.4343592,25.1779604 L23.225622,30.0143387 Z M1.32898557,27.7819717 L3.98981552,27.7819717 L5.31915844,25.4788493 L3.98981552,23.1735829 L1.32898557,23.1735829 L1.77635684e-14,25.4788493 L1.32898557,27.7819717 Z M199.601197,14.8337428 L199.601197,26.393666 L202.952785,26.393666 C206.523071,26.393666 208.854782,23.9897708 208.854782,20.6621253 L208.854782,20.6138831 C208.854782,17.2865949 206.523071,14.8337428 202.952785,14.8337428 L199.601197,14.8337428 Z M196.614106,12.1132354 L202.952785,12.1132354 C208.295886,12.1132354 211.987314,15.780721 211.987314,20.5652834 L211.987314,20.6138831 C211.987314,25.3980882 208.295886,29.1141734 202.952785,29.1141734 L196.614106,29.1141734 L196.614106,12.1132354 Z M177.961853,21.9010587 L177.961853,12.1132354 L180.948944,12.1132354 L180.948944,21.7795596 C180.948944,24.936749 182.576317,26.6127217 185.24751,26.6127217 C187.89476,26.6127217 189.522133,25.0339483 189.522133,21.9010587 L189.522133,12.1132354 L192.509581,12.1132354 L192.509581,21.7552597 C192.509581,26.8310627 189.643632,29.3814714 185.199267,29.3814714 C180.778845,29.3814714 177.961853,26.8310627 177.961853,21.9010587 L177.961853,21.9010587 Z M171.476661,20.6621253 L171.476661,20.6138831 C171.476661,17.3105374 169.072408,14.5664448 165.69652,14.5664448 C162.320633,14.5664448 159.96498,17.2622951 159.96498,20.5652834 L159.96498,20.6138831 C159.96498,23.9168714 162.369232,26.6366641 165.74512,26.6366641 C169.12065,26.6366641 171.476661,23.965471 171.476661,20.6621253 L171.476661,20.6621253 Z M156.83209,20.6621253 L156.83209,20.6138831 C156.83209,15.8293206 160.523518,11.8219949 165.74512,11.8219949 C170.966722,11.8219949 174.609908,15.780721 174.609908,20.5652834 L174.609908,20.6138831 C174.609908,25.3980882 170.918122,29.4054139 165.69652,29.4054139 C160.474918,29.4054139 156.83209,25.4466878 156.83209,20.6621253 L156.83209,20.6621253 Z M143.522937,12.1132354 L146.510028,12.1132354 L146.510028,26.393666 L155.447715,26.393666 L155.447715,29.1141734 L143.522937,29.1141734 L143.522937,12.1132354 Z M124.846384,20.6621253 L124.846384,20.6138831 C124.846384,15.780721 128.464913,11.8219949 133.613615,11.8219949 C136.746862,11.8219949 138.640818,12.9151293 140.268191,14.4692455 L138.349578,16.6794568 C136.989503,15.4165811 135.532229,14.5664448 133.589673,14.5664448 C130.359584,14.5664448 127.979274,17.2379953 127.979274,20.5652834 L127.979274,20.6138831 C127.979274,23.9411712 130.334927,26.6366641 133.589673,26.6366641 C135.678027,26.6366641 137.01416,25.8111851 138.471077,24.45111 L140.38969,26.393666 C138.616876,28.2397373 136.673963,29.4054139 133.492116,29.4054139 C128.537812,29.4054139 124.846384,25.5438871 124.846384,20.6621253 L124.846384,20.6621253 Z M111.561174,20.6621253 L111.561174,20.6138831 C111.561174,17.3105374 109.156921,14.5664448 105.781034,14.5664448 C102.405146,14.5664448 100.049493,17.2622951 100.049493,20.5652834 L100.049493,20.6138831 C100.049493,23.9168714 102.453745,26.6366641 105.829633,26.6366641 C109.205164,26.6366641 111.561174,23.965471 111.561174,20.6621253 L111.561174,20.6621253 Z M96.9166034,20.6621253 L96.9166034,20.6138831 C96.9166034,15.8293206 100.608031,11.8219949 105.829633,11.8219949 C111.051235,11.8219949 114.694421,15.780721 114.694421,20.5652834 L114.694421,20.6138831 C114.694421,25.3980882 111.002635,29.4054139 105.781034,29.4054139 C100.559432,29.4054139 96.9166034,25.4466878 96.9166034,20.6621253 L96.9166034,20.6621253 Z M79.4782686,20.6621253 L79.4782686,20.6138831 C79.4782686,15.780721 83.0967972,11.8219949 88.2454996,11.8219949 C91.3787466,11.8219949 93.2727029,12.9151293 94.9000759,14.4692455 L92.9814625,16.6794568 C91.6213874,15.4165811 90.1641131,14.5664448 88.2215572,14.5664448 C84.9914683,14.5664448 82.6111583,17.2379953 82.6111583,20.5652834 L82.6111583,20.6138831 C82.6111583,23.9411712 84.9668111,26.6366641 88.2215572,26.6366641 C90.309912,26.6366641 91.6460446,25.8111851 93.1029615,24.45111 L95.021575,26.393666 C93.2487604,28.2397373 91.3058471,29.4054139 88.1240005,29.4054139 C83.1696967,29.4054139 79.4782686,25.5438871 79.4782686,20.6621253 L79.4782686,20.6621253 Z M70.3708402,21.8038594 L65.6348774,21.8038594 L65.6348774,26.4669228 L70.5891812,26.4669228 C72.6292938,26.4669228 73.8682271,25.6653862 73.8682271,24.1352124 L73.8682271,24.0866128 C73.8682271,22.6539956 72.7264931,21.8038594 70.3708402,21.8038594 L70.3708402,21.8038594 Z M72.9205342,16.922455 C72.9205342,15.5863224 71.852057,14.7608433 69.9334435,14.7608433 L65.6348774,14.7608433 L65.6348774,19.2781078 L69.7151025,19.2781078 C71.633716,19.2781078 72.9205342,18.5251709 72.9205342,16.9706973 L72.9205342,16.922455 Z M62.6960289,12.1132354 L70.3222406,12.1132354 C72.2647965,12.1132354 73.7953276,12.6478313 74.7666056,13.6191093 C75.5195426,14.3724036 75.9079823,15.295082 75.9079823,16.4364587 L75.9079823,16.4850583 C75.9079823,18.5251709 74.7423058,19.6179479 73.47943,20.2736856 C75.470943,20.9540805 76.8553178,22.0950998 76.8553178,24.4025104 L76.8553178,24.45111 C76.8553178,27.4868004 74.3535087,29.1141734 70.5648814,29.1141734 L62.6960289,29.1141734 L62.6960289,12.1132354 Z M55.1677313,29.1138161 L58.154822,29.1138161 L58.154822,12.1132354 L55.1677313,12.1132354 L55.1677313,29.1138161 Z M43.4366373,14.8823424 L38.0452941,14.8823424 L38.0452941,12.1132354 L51.8397284,12.1132354 L51.8397284,14.8823424 L46.4480279,14.8823424 L46.4480279,29.1141734 L43.4366373,29.1141734 L43.4366373,14.8823424 Z M217.830348,9.47420378 L216.973779,11.7783982 L216.590343,11.7783982 L215.728771,9.46955823 L215.697324,11.8209229 L215.323536,11.8209229 L215.417519,9 L215.926743,9 L216.79296,11.3188458 L217.654174,9 L218.154822,9 L218.245232,11.8209229 L217.859293,11.8209229 L217.830348,9.47420378 Z M213.96489,9.36092375 L213.96489,11.8209229 L213.588601,11.8209229 L213.588601,9.36092375 L212.601599,9.36092375 L212.601599,9 L214.951892,9 L214.951892,9.36092375 L213.96489,9.36092375 Z" id="Foundations/branding-asset/gnh-white/cloud"></path>\n' +
        '            </g>\n' +
        '        </g>\n' +
        '    </g>\n' +
        '</svg>')
      );
      this.matIconRegistry.addSvgIconLiteral(
      'ic-tibco-logo',
      this.domSanitizer.bypassSecurityTrustHtml('<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="122px" height="32px" viewBox="0 0 122 32" style="enable-background:new 0 0 122 32;" xml:space="preserve">\n' +
        '<style type="text/css">\n' +
        '\t.st0{fill:#1774E5;}\n' +
        '</style>\n' +
        '    <g>\n' +
        '\t<path class="st0" d="M13.6,7.1v24.5H9.8V7.1H0V3.5h23.4v3.6L13.6,7.1z"></path>\n' +
        '        <path class="st0" d="M27.9,31.5v-28h3.8v28H27.9z"></path>\n' +
        '        <path class="st0" d="M58.3,23.6c0,4.7-3.2,7.9-10.5,7.9h-9.5v-28h9.3c6.8,0,9.8,3.1,9.8,7.5c0,2.9-1.6,4.9-4.8,6.1\n' +
        '\t\tC56.3,18,58.3,20.4,58.3,23.6L58.3,23.6z M47.9,6.9h-5.7v8.7h5.2c4,0,6.2-1.8,6.2-4.5S51.6,6.9,47.9,6.9z M47.6,19.2h-5.5V28h6.1\n' +
        '\t\tc4.1,0,6.2-1.5,6.2-4.4C54.5,20.4,51.6,19.2,47.6,19.2L47.6,19.2z"></path>\n' +
        '        <path class="st0" d="M83.1,8.6C81,7,78.4,6.1,75.5,6.1c-0.1,0-0.1,0-0.1,0h0c-6.1,0-10.2,4.3-10.2,11.1s4.1,11.4,10.2,11.4\n' +
        '\t\tc3-0.1,5.8-1.1,8-2.8l0,0l0.6,3.8c-2.5,1.4-5.4,2.3-8.6,2.3h0c-8.2,0-14-5.7-14-14.6c0-9,5.9-14.7,14-14.7c0,0,0,0,0,0\n' +
        '\t\tc3.2,0,6.3,0.9,8.9,2.3l-0.1,0L83.1,8.6z"></path>\n' +
        '        <path class="st0" d="M107.5,4.8c-0.5-0.2-0.8-0.5-1.3-0.7c-3.7,7-10.3,15.4-19.1,20.1c0.5,1.2,1.2,2.2,2,3.1l0,0\n' +
        '\t\tc7.8-5.9,14-13.4,18.2-22.2C107.3,5.1,107.5,4.8,107.5,4.8z"></path>\n' +
        '        <path class="st0" d="M105.8,4c-1.7-0.8-3.8-1.3-5.9-1.3c-0.1,0-0.1,0-0.2,0h0c-8.3,0-14,6.3-14,14.7c0,0.1,0,0.2,0,0.3\n' +
        '\t\tc0,1.3,0.2,2.6,0.5,3.9l0-0.1C94.5,18,102,10.4,105.8,4L105.8,4z"></path>\n' +
        '        <path class="st0" d="M107.7,5c-3.7,9.7-9.3,17.9-16.3,24.6l0,0c2.2,1.5,4.9,2.4,7.9,2.4c0.1,0,0.3,0,0.4,0h0\n' +
        '\t\tc8.3,0.1,14.1-6.3,14.1-14.7C113.8,11.8,111.5,7.4,107.7,5L107.7,5z"></path>\n' +
        '        <path class="st0" d="M113.8,4.1L113.8,4.1c0-2,1.6-3.6,3.6-3.7h0c0,0,0,0,0.1,0c1.9,0,3.5,1.5,3.5,3.4v0V4c0,2-1.6,3.6-3.6,3.7h0\n' +
        '\t\tc0,0,0,0-0.1,0c-1.9,0-3.5-1.5-3.5-3.4v0L113.8,4.1z M120.6,4.1L120.6,4.1C120.6,4,120.6,4,120.6,4.1c0-1.8-1.4-3.2-3.1-3.2h0\n' +
        '\t\tc-0.1,0-0.1,0-0.2,0c0,0,0,0,0,0c-1.8,0-3.2,1.4-3.2,3.2v0c0,1.7,1.5,3.2,3.2,3.2S120.5,5.8,120.6,4.1L120.6,4.1L120.6,4.1z\n' +
        '\t\t M116,2.1h1.6c0.8,0,1.4,0.3,1.4,1.1c0,0,0,0,0,0.1c0,0.5-0.3,0.9-0.8,1.1l0,0l1,1.4h-0.8l-0.9-1.3h-0.8v1.3H116L116,2.1L116,2.1z\n' +
        '\t\t M117.6,4c0.5,0,0.8-0.2,0.8-0.6s-0.2-0.6-0.8-0.6h-0.9V4L117.6,4z"></path>\n' +
        '</g>\n' +
        '</svg>\n')
      );
      this.matIconRegistry.addSvgIconLiteral(
      'ic-no-cases-icon',
      this.domSanitizer.bypassSecurityTrustHtml('<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">\n' +
        '    <g fill="none" fill-rule="nonzero">\n' +
        '        <circle cx="24" cy="24" r="24" fill="#F4F4F4"/>\n' +
        '        <path fill="#B6B6B6" d="M30.936 13.835h7.553c.835 0 1.511.676 1.511 1.51V36.49A1.51 1.51 0 0 1 38.49 38H17.34a1.51 1.51 0 0 1-1.51-1.51V15.345c0-.834.676-1.51 1.51-1.51h7.553v-.023l-8.397-2.25a1.51 1.51 0 0 0-1.85 1.069L9.563 31.596a1.51 1.51 0 0 0 1.068 1.85l3.717.995a.755.755 0 1 1-.391 1.459l-3.717-.996a3.02 3.02 0 0 1-2.136-3.7l5.083-18.964a3.021 3.021 0 0 1 3.7-2.136l8.395 2.249a3.021 3.021 0 0 1 5.654 1.482zm-.404 1.51a3.02 3.02 0 0 1-5.234 0H18.85a1.51 1.51 0 0 0-1.51 1.51V34.98c0 .834.675 1.51 1.51 1.51h18.128a1.51 1.51 0 0 0 1.51-1.51V16.855a1.51 1.51 0 0 0-1.51-1.51h-6.447zm-2.617 0a1.51 1.51 0 1 0 0-3.02 1.51 1.51 0 0 0 0 3.02zm-7.554 4.531h13.596a.755.755 0 1 1 0 1.51H20.361a.755.755 0 1 1 0-1.51zm0 3.02h13.596a.755.755 0 1 1 0 1.511H20.361a.755.755 0 1 1 0-1.51zm0 2.962h6.043a.755.755 0 1 1 0 1.51h-6.043a.755.755 0 1 1 0-1.51z"/>\n' +
        '    </g>\n' +
        '</svg>\n')
    );
    this.matIconRegistry.addSvgIconLiteral(
      'ic-no-tasks-icon',
      this.domSanitizer.bypassSecurityTrustHtml('<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">\n' +
        '    <g fill="none" fill-rule="nonzero">\n' +
        '        <circle cx="24" cy="24" r="24" fill="#F4F4F4"/>\n' +
        '        <path fill="#B6B6B6" d="M40 16.652v16.023a2.662 2.662 0 0 1-2.667 2.658H10.667A2.667 2.667 0 0 1 8 32.654l.123-16.007c0-.04.004-.078.01-.115V15a3 3 0 0 1 3-3H37a3 3 0 0 1 3 3v1.652zm-1.333 0H9.457v.005l-.124 16.008a1.331 1.331 0 0 0 1.323 1.339h26.677c.737 0 1.334-.595 1.334-1.33V16.653zM36.3 29.81c.226.225.366.537.366.88 0 .689-.56 1.246-1.25 1.246-.345 0-.658-.139-.884-.364L30.87 27.92a4.982 4.982 0 0 1-2.536.694c-2.762 0-5-2.231-5-4.984s2.238-4.985 5-4.985c2.76 0 5 2.232 5 4.985 0 .924-.257 1.786-.696 2.528L36.3 29.81zm-7.967-9.918a3.744 3.744 0 0 0-3.75 3.738 3.744 3.744 0 0 0 3.75 3.738 3.744 3.744 0 0 0 3.75-3.738 3.744 3.744 0 0 0-3.75-3.738zm-16.336 2.076h9.338a.665.665 0 0 1 0 1.33h-9.338a.665.665 0 0 1 0-1.33zm0 2.658h6.671a.665.665 0 0 1 0 1.33H12a.665.665 0 0 1 0-1.33z"/>\n' +
        '    </g>\n' +
        '</svg>\n')
    );
    this.matIconRegistry.addSvgIconLiteral(
      'ic-no-docs-icon',
      this.domSanitizer.bypassSecurityTrustHtml('<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">\n' +
        '    <g fill="none" fill-rule="nonzero">\n' +
        '        <circle cx="24" cy="24" r="24" fill="#F4F4F4"/>\n' +
        '        <path fill="#B6B6B6" d="M36.315 12.568c.737-.01 1.342.555 1.352 1.261v.648c0 .354-.299.64-.667.64a.654.654 0 0 1-.667-.64v-.63l-14.335.185a.678.678 0 0 1-.527-.237l-1.722-2.041a1.356 1.356 0 0 0-1.036-.475H11v3.199c0 .353-.316.64-.685.64a.638.638 0 0 1-.648-.64v-3.199c0-.706.597-1.279 1.333-1.279h7.713c.804 0 1.566.349 2.072.949l1.519 1.8 14.011-.181zM10 15.61h28c1.105 0 2 .86 2 1.92v18.55c0 1.06-.895 1.919-2 1.919H10c-1.105 0-2-.86-2-1.919v-18.55c0-1.06.895-1.92 2-1.92zm0 1.28a.654.654 0 0 0-.667.64v18.55c0 .353.299.64.667.64h28a.654.654 0 0 0 .667-.64v-18.55a.654.654 0 0 0-.667-.64H10zm2.333 3.984a.654.654 0 0 1-.666-.64c0-.353.298-.64.666-.64h12c.369 0 .667.287.667.64 0 .353-.298.64-.667.64h-12zm0 2.718a.654.654 0 0 1-.666-.64c0-.353.298-.64.666-.64h10c.369 0 .667.287.667.64 0 .354-.298.64-.667.64h-10z"/>\n' +
        '    </g>\n' +
        '</svg>\n')
    );
    this.matIconRegistry.addSvgIconLiteral(
      'ic-no-notes-icon',
      this.domSanitizer.bypassSecurityTrustHtml('<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">\n' +
        '    <g fill="none" fill-rule="nonzero">\n' +
        '        <circle cx="24" cy="24" r="24" fill="#F4F4F4"/>\n' +
        '        <path fill="#B6B6B6" d="M10.517 31.347v-3.918H9.079c-.596 0-1.079-.439-1.079-.98 0-.541.483-.98 1.079-.98h1.438v-4.571H9.079c-.596 0-1.079-.439-1.079-.98 0-.54.483-.98 1.079-.98h1.438v-3.983H9.079c-.596 0-1.079-.438-1.079-.98 0-.54.483-.98 1.079-.98h1.438v-2.383C10.517 9.17 11.805 8 13.393 8h21.573c1.589 0 2.877 1.17 2.877 2.612V35.43c0 1.442-1.288 2.612-2.877 2.612H13.393c-1.588 0-2.876-1.17-2.876-2.612v-2.123H9.079c-.596 0-1.079-.438-1.079-.98 0-.54.483-.98 1.079-.98h1.438zm1.438 0h.72c.595 0 1.078.439 1.078.98 0 .54-.483.98-1.079.98h-.719v2.122c0 .72.644 1.306 1.438 1.306h21.573c.795 0 1.438-.585 1.438-1.306V10.612c0-.721-.643-1.306-1.438-1.306H13.393c-.794 0-1.438.585-1.438 1.306v2.384h.72c.595 0 1.078.438 1.078.98 0 .54-.483.98-1.079.98h-.719v3.983h.72c.595 0 1.078.438 1.078.98 0 .54-.483.979-1.079.979h-.719v4.571h.72c.595 0 1.078.439 1.078.98 0 .541-.483.98-1.079.98h-.719v3.918zM16.277 40c-.398 0-.72-.292-.72-.653 0-.36.322-.653.72-.653h19.408c1.589 0 2.877-1.17 2.877-2.612V11.467c0-.36.322-.653.719-.653.397 0 .719.292.719.653v24.615C40 38.246 38.068 40 35.685 40H16.277zm3.871-26.595h6.518c.45 0 .815.331.815.74 0 .408-.365.74-.815.74h-6.518c-.45 0-.815-.332-.815-.74 0-.409.365-.74.815-.74zm.48 3.333h10.355c.715 0 1.294.331 1.294.74 0 .408-.58.74-1.294.74H20.628c-.715 0-1.295-.332-1.295-.74 0-.409.58-.74 1.295-.74zm0 3.334h10.355c.715 0 1.294.33 1.294.74 0 .408-.58.739-1.294.739H20.628c-.715 0-1.295-.331-1.295-.74 0-.408.58-.74 1.295-.74z"/>\n' +
        '    </g>\n' +
        '</svg>\n')
    );

    this.matIconRegistry.addSvgIconLiteral(
      'ic-active-case-widget-icon',
      this.domSanitizer.bypassSecurityTrustHtml('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path  class="svg-content" fill="#727272" d="M11 2v20c-5.07-.5-9-4.79-9-10s3.93-9.5 9-10zm2.03 0v8.99H22c-.47-4.74-4.24-8.52-8.97-8.99zm0 11.01V22c4.74-.47 8.5-4.25 8.97-8.99h-8.97z"/></svg>')
    );
    this.matIconRegistry.addSvgIconLiteral(
      'tcs-collaboration-reply',
      this.domSanitizer.bypassSecurityTrustHtml('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24" height="24" viewBox="0 0 24 24"><g class="svg-content" fill="none" fill-rule="evenodd"><g mask="url(#b)"><mask id="b" fill="#fff">       <path d="M4 14.027C4 11.298 6.192 9.07 8.876 9.07h7.357l-2.141-2.159a1.15 1.15 0 0 1 0-1.588 1.105 1.105 0 0 1 1.563 0l4.026 4.092a1.15 1.15 0 0 1 0 1.589l-4.026 4.092a1.07 1.07 0 0 1-.782.329 1.07 1.07 0 0 1-.781-.329 1.15 1.15 0 0 1 0-1.588l2.14-2.176H8.877c-1.461 0-2.667 1.209-2.667 2.711 0 1.485 1.189 2.711 2.667 2.711.612 0 1.104.5 1.104 1.123 0 .621-.492 1.122-1.104 1.122C6.192 18.983 4 16.772 4 14.027z"/></mask><path d="M0 0h24v24H0z" fill="black"/></g></g></svg>')
    );
    this.matIconRegistry.addSvgIconLiteral(
      'tcs-collaboration-delete',
      this.domSanitizer.bypassSecurityTrustHtml('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24" height="24" viewBox="0 0 24 24">\n' +
        '  <path class="svg-content" d="M17.188 19.158c0 .54-.42.978-.938.978s-.938-.438-.938-.978v-8.8c0-.54.42-.977.938-.977.517 0 .938.438.938.978v8.799zm-3.75 0c0 .54-.42.978-.938.978s-.938-.438-.938-.978v-8.8c0-.54.42-.977.938-.977s.938.438.938.978v8.799zm-3.75 0c0 .54-.42.978-.938.978s-.938-.438-.938-.978v-8.8c0-.54.42-.977.938-.977s.938.438.938.978v8.799zM5.938 7.335v12.743c0 1.08.839 1.922 1.875 1.922h9.375c1.035 0 1.875-.842 1.875-1.922V7.335H5.938zm10.312-3.38h-7.5C8.75 2.875 9.59 2 10.625 2h3.75c1.036 0 1.875.875 1.875 1.955zm2.813 1.956H5.938C5.42 5.91 5 5.473 5 4.933s.42-.978.938-.978h13.125c.517 0 .937.438.937.978s-.42.978-.938.978"/>\n' +
        '  <path d="M0 0h24v24H0z" fill="none"/>\n' +
        '</svg>')
    );
    this.matIconRegistry.addSvgIconLiteral(
      'tcs-application-edit',
      this.domSanitizer.bypassSecurityTrustHtml('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>')
    );
    this.matIconRegistry.addSvgIconLiteral(
      'tcs-collaboration-edit',
      this.domSanitizer.bypassSecurityTrustHtml('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">\n' +
        '  <path class="svg-content"\n' +
        '    d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>\n' +
        '  <path d="M0 0h24v24H0z" fill="none"/>\n' +
        '</svg>\n')
    );
    this.matIconRegistry.addSvgIconLiteral(
      'tcs-collaboration-send',
      this.domSanitizer.bypassSecurityTrustHtml('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24" height="24" viewBox="0 0 24 24">\n' +
        '  <path class="svg-content" fill="#727272" d="M1 12C1 5.925 5.924 1 12 1c6.075 0 11 4.924 11 11 0 6.075-4.924 11-11 11-6.075 0-11-4.924-11-11zm17.33.03L7.77 7.98v3.15l7.542.9-7.543.9v3.15l10.56-4.05z"/>\n' +
        '  <path fill="none" d="M0 0h24v24H0z"/>\n' +
        '</svg>\n')
    );
    this.matIconRegistry.addSvgIconLiteral(
      'tcs-collaboration-subscribed',
      this.domSanitizer.bypassSecurityTrustHtml('<svg width="100%" height="100%" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid meet" focusable="false">\n' +
        '  <defs>\n' +
        '    <rect id="path-1" x="0" y="0" width="355" height="950"></rect>\n' +
        '    <filter x="-3.7%" y="-1.2%" width="107.3%" height="102.7%" filterUnits="objectBoundingBox" id="filter-2">\n' +
        '      <feOffset dx="0" dy="2" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>\n' +
        '      <feGaussianBlur stdDeviation="4" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>\n' +
        '      <feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.5 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>\n' +
        '    </filter>\n' +
        '    <path d="M7.02092272,9.64382773 L10.429694,12.9694583 C10.2893638,12.9895851 10.1458982,13 10,13 C8.34314575,13 7,11.6568542 7,10 C7,9.87948409 7.0071063,9.76062794 7.02092272,9.64382773 Z M12.9979012,9.88673222 C12.9388301,8.29534999 11.6402099,7.02078376 10.0392586,7.00025162 L12.9979019,9.88673289 Z M5.39239715,8.05502229 C5.13971651,8.65288074 5,9.3101241 5,10 C5,12.7614237 7.23857625,15 10,15 C10.7336604,15 11.4304146,14.8419859 12.0580864,14.5581338 L13.8229037,16.2799067 C12.6354037,16.7451582 11.3468341,17 10,17 C5.45454545,17 1.57272727,14.0973333 -7.10542736e-15,10 C0.642490676,8.32615705 1.67034243,6.85169041 2.97137252,5.69304704 L5.39239715,8.05502229 Z M8.2947756,5.29831698 L6.53943522,3.58578978 C7.62510828,3.20602952 8.78900189,3 10,3 C14.5454545,3 18.4272727,5.90266667 20,10 C19.4004851,11.5618806 18.4654382,12.9501651 17.2860026,14.0702457 L14.742345,11.5886286 C14.9094634,11.089535 15,10.5553405 15,10 C15,7.23857625 12.7614237,5 10,5 C9.40117224,5 8.82693188,5.10527121 8.2947756,5.29831698 Z M0.292893219,1.70710678 C-0.0976310729,1.31658249 -0.0976310729,0.683417511 0.292893219,0.292893219 C0.683417511,-0.0976310729 1.31658249,-0.0976310729 1.70710678,0.292893219 L19.7071068,18.2928932 C20.0976311,18.6834175 20.0976311,19.3165825 19.7071068,19.7071068 C19.3165825,20.0976311 18.6834175,20.0976311 18.2928932,19.7071068 L0.292893219,1.70710678 Z" id="path-3"></path>\n' +
        '  </defs>\n' +
        '  <g id="Pages/Desktop" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n' +
        '    <g id="Reporting-Dashboard/Page/Dashboard-comments/1440-01" transform="translate(-1360.000000, -154.000000)">\n' +
        '      <rect fill="#F4F4F4" x="0" y="0" width="1440" height="1072"></rect>\n' +
        '      <g id="Group-5">\n' +
        '        <rect id="Mask" fill="#D8D8D8" opacity="0" x="1" y="0" width="1438" height="1072"></rect>\n' +
        '        <g id="modal/header/tabs">\n' +
        '          <g transform="translate(25.000000, 163.000000)"></g>\n' +
        '        </g>\n' +
        '      </g>\n' +
        '      <rect id="Rectangle-2" stroke="#232323" x="0.5" y="0.5" width="1439" height="1071"></rect>\n' +
        '      <g id="cmpt/comments" transform="translate(1085.000000, 122.000000)">\n' +
        '        <g id="Rectangle">\n' +
        '          <use fill="black" fill-opacity="1" filter="url(#filter-2)" xlink:href="#path-1"></use>\n' +
        '          <use fill="#FFFFFF" fill-rule="evenodd" xlink:href="#path-1"></use>\n' +
        '        </g>\n' +
        '        <g id="cmpt/card/little-card-04" transform="translate(0.000000, 16.000000)">\n' +
        '          <g id="Group">\n' +
        '            <g id="comments-header" transform="translate(16.000000, 0.000000)">\n' +
        '              <g id="toggle/off" transform="translate(259.000000, 16.000000)">\n' +
        '                <g id="icon/eye/off" transform="translate(2.000000, 2.000000)">\n' +
        '                  <mask id="mask-4" fill="white">\n' +
        '                    <use xlink:href="#path-3"></use>\n' +
        '                  </mask>\n' +
        '                  <use id="Mask" fill="#000000" fill-rule="nonzero" xlink:href="#path-3"></use>\n' +
        '                  <g id="color/gray/dark" mask="url(#mask-4)" class="svg-content" fill="#727272">\n' +
        '                    <g transform="translate(-2.000000, -2.000000)" id="blue">\n' +
        '                      <rect x="0" y="0" width="24" height="24"></rect>\n' +
        '                    </g>\n' +
        '                  </g>\n' +
        '                </g>\n' +
        '              </g>\n' +
        '            </g>\n' +
        '          </g>\n' +
        '        </g>\n' +
        '      </g>\n' +
        '    </g>\n' +
        '  </g>\n' +
        '</svg>\n')
    );
    this.matIconRegistry.addSvgIconLiteral(
      'tcs-collaboration-unsubscribed',
      this.domSanitizer.bypassSecurityTrustHtml('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">\n' +
        '  <path d="M0 0h24v24H0z" fill="none"/>\n' +
        '  <path class="svg-content" fill="#727272"\n' +
        '        d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>\n' +
        '</svg>\n')
    );
    this.matIconRegistry.addSvgIconLiteral(
      'tcs-collaboration-feed',
      this.domSanitizer.bypassSecurityTrustHtml('<svg xmlns="http://www.w3.org/2000/svg" width="22" height="18" viewBox="0 0 22 18">\n' +
        '    <path class="svg-content" fill="#727272" fill-rule="evenodd" d="M13.377 15c-1.268 2-2.06 3-2.377 3-.316 0-1.109-1-2.377-3H2.5A2.5 2.5 0 0 1 0 12.5v-10A2.5 2.5 0 0 1 2.5 0h17A2.5 2.5 0 0 1 22 2.5v10a2.5 2.5 0 0 1-2.5 2.5h-6.123zM4.5 3a.5.5 0 0 0 0 1h13a.5.5 0 1 0 0-1h-13zm-2 4a.5.5 0 1 0 0 1h17a.5.5 0 1 0 0-1h-17zm2 4a.5.5 0 1 0 0 1h13a.5.5 0 1 0 0-1h-13z"/>\n' +
        '</svg>\n')
    );
    this.matIconRegistry.addSvgIconLiteral(
      'tcs-document-library',
      this.domSanitizer.bypassSecurityTrustHtml('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="16" height="16" viewBox="0 0 16 16">\n' +
        '    <path class="svg-content" fill="#727272" d="M7.683 2.481H14a2 2 0 0 1 2 2v7.852a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4.481c0-.247.045-.484.127-.703A1.996 1.996 0 0 1 0 3.074V3a2 2 0 0 1 2-2h3.43a2 2 0 0 1 1.44.612c.304.316.575.606.813.87zm-5.98 9.63a.37.37 0 1 0 0 .74h12.593a.37.37 0 1 0 0-.74H1.704z"/>\n' +
        '    <path d="M0 0h16v16H0z" fill="none"/>\n' +
        '</svg>\n')
    );
    this.matIconRegistry.addSvgIconLiteral(
      'tcs-document-action',
      this.domSanitizer.bypassSecurityTrustHtml('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">\n' +
        '  <path class="svg-content" fill="#727272" fill-rule="evenodd" d="M10 4.91a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm0 7a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm0 7a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"/>\n' +
        '</svg>\n')
    );
    this.matIconRegistry.addSvgIconLiteral(
      'tcs-document-upload',
      this.domSanitizer.bypassSecurityTrustHtml('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">\n' +
        '  <path class="svg-content" fill="#727272" d="M17.313 17.6a.932.932 0 0 1-.938-.927c0-.512.42-.927.938-.927 1.553 0 2.813-1.246 2.813-2.783a2.758 2.758 0 0 0-1.15-2.238 2.687 2.687 0 0 0-.453-.27 2.728 2.728 0 0 0-.175-.076l-.079-.029a2.834 2.834 0 0 0-.162-.054l-.11-.028c-.048-.012-.095-.024-.144-.034-.05-.009-.102-.016-.153-.023-.037-.005-.074-.012-.112-.015a2.937 2.937 0 0 0-.275-.014c-.03 0-.058.004-.087.005a5.234 5.234 0 0 0-.107-.468c-.01-.038-.025-.073-.036-.11a5.286 5.286 0 0 0-.113-.344c-.013-.034-.029-.066-.043-.1a4.76 4.76 0 0 0-.148-.337c-.012-.027-.028-.053-.04-.079A5.312 5.312 0 0 0 12 5.854 5.312 5.312 0 0 0 7.26 8.75c-.012.026-.027.052-.04.079-.054.11-.102.222-.148.337-.014.034-.03.066-.043.1a5.282 5.282 0 0 0-.113.344c-.011.037-.025.072-.036.11a5.404 5.404 0 0 0-.107.468c-.029-.001-.057-.005-.086-.005-.094 0-.185.005-.276.014-.038.003-.074.01-.111.015a3.802 3.802 0 0 0-.154.023c-.048.01-.096.022-.143.034-.037.01-.075.018-.11.028a2.947 2.947 0 0 0-.163.054l-.08.03a2.728 2.728 0 0 0-.44.22c-.065.04-.127.08-.188.125-.004.003-.009.006-.012.01a2.757 2.757 0 0 0-1.136 2.229c0 1.536 1.259 2.782 2.813 2.782.518 0 .937.415.937.927s-.42.927-.937.927C4.098 17.6 2 15.525 2 12.963 2 10.876 3.397 9.11 5.316 8.53A7.172 7.172 0 0 1 12 4a7.17 7.17 0 0 1 6.684 4.53c1.92.58 3.316 2.346 3.316 4.433 0 2.562-2.098 4.637-4.687 4.637m-8.822-2.166l2.812-3.09.003.002a.934.934 0 0 1 1.389 0l.002-.003 2.813 3.091-.003.003a.91.91 0 0 1 .243.617.936.936 0 1 1-1.632.618l-.002.003-1.178-1.294v4.692c0 .512-.42.927-.938.927a.933.933 0 0 1-.938-.927V15.38l-1.178 1.294-.002-.002a.937.937 0 0 1-1.632-.619c0-.238.094-.453.243-.617l-.002-.003"/>\n' +
        '</svg>\n')
    );
    this.matIconRegistry.addSvgIconLiteral(
      'tcs-document-zip',
      this.domSanitizer.bypassSecurityTrustHtml('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">\n' +
        '    <path class="svg-content" fill="#B6B6B6" fill-rule="evenodd" d="M15 0H3C1.343 0 0 1.264 0 2.824v18.352C0 22.736 1.343 24 3 24h18c1.657 0 3-1.264 3-2.824V8.471L15 0zm0 8.47V1.413l7.62 7.059H15zM9.6 1.2H12v1.2H9.6V1.2zm0 2.4H12v1.2H9.6V3.6zm0 2.4H12v1.2H9.6V6zm0 2.4H12v1.2H9.6V8.4zm0 2.4H12V12H9.6v-1.2zm0 2.4H12V18H9.6v-4.8z"/>\n' +
        '</svg>\n')
    );
    this.matIconRegistry.addSvgIconLiteral(
      'tcs-document-image',
      this.domSanitizer.bypassSecurityTrustHtml('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">\n' +
        '    <path class="svg-content" fill="#B6B6B6" fill-rule="evenodd" d="M24 20.273V21.5a2.5 2.5 0 0 1-2.5 2.5h-3.046a.751.751 0 0 0-.096-.163l-4.063-5.283 4.651-4.154L24 20.273zm0-2.3l-4.415-5.13a.75.75 0 0 0-1.068-.071l-5.14 4.59-6.642-8.636a.75.75 0 0 0-1.181-.01L0 15.696V2.5A2.5 2.5 0 0 1 2.5 0h19A2.5 2.5 0 0 1 24 2.5v15.473zM16.592 24H2.5A2.5 2.5 0 0 1 0 21.5v-3.394L6.13 10.4 16.593 24zm-2.59-14.25a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-1.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>\n' +
        '</svg>\n')
    );
    this.matIconRegistry.addSvgIconLiteral(
      'tcs-document-doc',
      this.domSanitizer.bypassSecurityTrustHtml('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">\n' +
        '    <path class="svg-content" fill="#B6B6B6" fill-rule="evenodd" d="M15 0H3C1.343 0 0 1.264 0 2.824v18.352C0 22.736 1.343 24 3 24h18c1.657 0 3-1.264 3-2.824V8.471L15 0zM3.6 9.882h6.212c.429 0 .776.316.776.706 0 .39-.347.706-.776.706H3.6c-.429 0-.776-.316-.776-.706 0-.39.347-.706.776-.706zm13.306 9.883H3.565c-.41 0-.741-.316-.741-.706 0-.39.331-.706.74-.706h13.342c.41 0 .741.316.741.706 0 .39-.332.706-.741.706zm0-4.236H3.565c-.41 0-.741-.316-.741-.705 0-.39.331-.706.74-.706h13.342c.41 0 .741.316.741.706 0 .39-.332.705-.741.705zm-2.082-7.058V1.41l7.764 7.06h-7.764z"/>\n' +
        '</svg>\n')
    );
    this.matIconRegistry.addSvgIconLiteral(
      'tcs-summary-details-button',
      this.domSanitizer.bypassSecurityTrustHtml('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24" height="24" viewBox="0 0 24 24">\n' +
        '  <path fill="none" d="M0 0h24v24H0z"/>\n' +
        '  <path class="svg-content" fill="#0081cb" d="M17.24 12.703l-9.449 9.005c-.41.39-1.074.39-1.484 0a.969.969 0 0 1 0-1.415l8.725-8.313-8.683-8.273a.969.969 0 0 1 0-1.414c.41-.39 1.075-.39 1.484 0l9.407 8.963a1 1 0 0 1 0 1.447z"/>\n' +
        '</svg>\n')
    );
    this.matIconRegistry.addSvgIconLiteral(
      'tcs-favorites-icon',
      this.domSanitizer.bypassSecurityTrustHtml('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="16" height="16" viewBox="0 0 16 16">\n' +
        '  <path class="svg-content" fill="#727272"\n' +
        '        d="M8 12.708l-4.225 2.221a.5.5 0 0 1-.726-.527l.807-4.705L.438 6.365a.5.5 0 0 1 .277-.853l4.724-.686L7.552.546a.5.5 0 0 1 .896 0l2.113 4.28 4.724.686a.5.5 0 0 1 .277.853l-3.418 3.332.807 4.705a.5.5 0 0 1-.726.527L8 12.708z"/>\n' +
        '  <path d="M0 0h16v16H0z" fill="none"/>\n' +
        '</svg>\n')
    );
    this.matIconRegistry.addSvgIconLiteral(
      'tcs-config-icon',
      this.domSanitizer.bypassSecurityTrustHtml('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24" height="24" viewBox="0 0 24 24">\n' +
        '  <path class="svg-content" fill="#727272" d="M21.91 13.12a9.346 9.346 0 0 0 0-1.1 9.508 9.508 0 0 0 0-1.12 32.759 32.759 0 0 0-2.213-.307 7.42 7.42 0 0 0-1.306-3.087c.454-.578.998-1.264 1.342-1.805a9.436 9.436 0 0 0-.743-.849 9.453 9.453 0 0 0-.852-.74c-.49.343-1.18.867-1.814 1.336a7.49 7.49 0 0 0-3.028-1.246c0-.74-.181-1.588-.308-2.202h-2.176a32.34 32.34 0 0 0-.309 2.202 7.488 7.488 0 0 0-3.1 1.354c-.58-.45-1.27-.992-1.814-1.336-.298.23-.583.477-.852.74-.254.253-.49.524-.762.85l1.36 1.804a7.4 7.4 0 0 0-1.106 2.961c-.743 0-1.596.18-2.212.307a9.274 9.274 0 0 0 0 1.12 9.094 9.094 0 0 0 0 1.1c.616.109 1.487.235 2.212.307a7.402 7.402 0 0 0 1.251 3.015L4.12 18.23c.272.324.508.595.762.848s.526.487.852.758l1.814-1.354a7.471 7.471 0 0 0 3.028 1.246c0 .74.181 1.589.308 2.202a9.107 9.107 0 0 0 2.249 0c.109-.613.235-1.48.308-2.202a7.47 7.47 0 0 0 3.028-1.3l1.814 1.354c.326-.27.598-.505.852-.758.265-.268.513-.551.743-.849-.344-.487-.87-1.173-1.341-1.805a7.42 7.42 0 0 0 1.25-3.015c.744 0 1.596-.18 2.213-.307m-10.064 3.304a4.35 4.35 0 0 1-1.705-.343 4.451 4.451 0 0 1-2.339-2.31 4.477 4.477 0 0 1 0-3.413 4.451 4.451 0 0 1 2.34-2.31 4.534 4.534 0 0 1 3.427 0 4.451 4.451 0 0 1 2.32 2.31 4.477 4.477 0 0 1 0 3.412 4.451 4.451 0 0 1-2.32 2.311 4.387 4.387 0 0 1-1.723.343"/>\n' +
        '  <path fill="none" d="M0 0h24v24H0z"/>\n' +
        '</svg>\n')
    );
    this.matIconRegistry.addSvgIconLiteral(
      'tcs-case-start-icon',
      this.domSanitizer.bypassSecurityTrustHtml('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24" height="24" viewBox="0 0 24 24">\n' +
        '    <path class="svg-content" fill="#0081CB" id="a" d="M12 4c-4.416 0-8 3.584-8 8s3.584 8 8 8 8-3.584 8-8-3.584-8-8-8m3.2 8.801h-2.4V15.2a.8.8 0 1 1-1.6 0v-2.399H8.8a.8.8 0 0 1 0-1.601h2.4V8.801a.8.8 0 1 1 1.6 0V11.2h2.4a.8.8 0 0 1 0 1.601"/>\n' +
        '    <path d="M0 0h24v24H0z" fill="none"/>\n' +
        '</svg>\n')
    );
    this.matIconRegistry.addSvgIconLiteral(
      'tcs-refresh-icon',
      this.domSanitizer.bypassSecurityTrustHtml('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24" height="24" viewBox="0 0 24 24">\n' +
        '    <path class="svg-content" fill="#727272" d="M20.157 9.468H16.5a.843.843 0 1 1 0-1.686h1.467A7.295 7.295 0 0 0 12 4.688 7.312 7.312 0 1 0 19.313 12 .843.843 0 1 1 21 12a9 9 0 0 1-9 9 9 9 0 0 1-9-9 9 9 0 0 1 9-9 8.98 8.98 0 0 1 7.313 3.766V5.25a.843.843 0 1 1 1.687 0v3.375a.843.843 0 0 1-.843.843"/>\n' +
        '    <path fill="none" d="M0 0h24v24H0z"/>\n' +
        '</svg>\n')
    );
    this.matIconRegistry.addSvgIconLiteral(
      'tcs-recent-icon',
      this.domSanitizer.bypassSecurityTrustHtml('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="16" height="16" viewBox="0 0 16 16">\n' +
        '  <path class="svg-content" fill="#727272" id="a" d="M8.727 8.727H5.818a.727.727 0 1 1 0-1.454H8V5.09a.727.727 0 1 1 1.455 0V8a.727.727 0 0 1-.728.727zm-.242 5.755a6.46 6.46 0 0 0 2.23-.575l.753 1.304c-.912.44-1.92.711-2.983.775v-1.504zm-1.455-.054v1.514A8.001 8.001 0 0 1 8 0a7.982 7.982 0 0 1 6.5 3.347V2A.75.75 0 1 1 16 2v3a.75.75 0 0 1-.75.75H12a.75.75 0 1 1 0-1.5h1.304A6.484 6.484 0 0 0 8 1.5a6.5 6.5 0 0 0-.97 12.928zm4.93-1.273a6.536 6.536 0 0 0 1.513-1.647l1.3.75a8.043 8.043 0 0 1-2.057 2.205l-.756-1.308zm2.158-2.954A6.488 6.488 0 0 0 14.5 8 .75.75 0 1 1 16 8c0 1.046-.2 2.045-.566 2.96l-1.316-.76z"/>\n' +
        '  <path fill="none" d="M0 0h16v16H0z"/>\n' +
        '</svg>\n')
    );
    this.matIconRegistry.addSvgIconLiteral(
      'tcs-clear-icon',
      this.domSanitizer.bypassSecurityTrustHtml('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">\n' +
        '  <path class="svg-content" fill="#727272"\n' +
        '    d="M19.81 14.99l1.19-.92-1.43-1.43-1.19.92 1.43 1.43zm-.45-4.72L21 9l-9-7-2.91 2.27 7.87 7.88 2.4-1.88zM3.27 1L2 2.27l4.22 4.22L3 9l1.63 1.27L12 16l2.1-1.63 1.43 1.43L12 18.54l-7.37-5.73L3 14.07l9 7 4.95-3.85L20.73 21 22 19.73 3.27 1z"/>\n' +
        '    <path d="M0 0h24v24H0z" fill="none"/>\n' +
        '</svg>')
    );
    this.matIconRegistry.addSvgIconLiteral(
      'tcs-customization-icon',
      this.domSanitizer.bypassSecurityTrustHtml('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24" height="24" viewBox="0 0 24 24">\n' +
        '  <path class="svg-content" fill="#727272" d="M21.91 13.12a9.346 9.346 0 0 0 0-1.1 9.508 9.508 0 0 0 0-1.12 32.759 32.759 0 0 0-2.213-.307 7.42 7.42 0 0 0-1.306-3.087c.454-.578.998-1.264 1.342-1.805a9.436 9.436 0 0 0-.743-.849 9.453 9.453 0 0 0-.852-.74c-.49.343-1.18.867-1.814 1.336a7.49 7.49 0 0 0-3.028-1.246c0-.74-.181-1.588-.308-2.202h-2.176a32.34 32.34 0 0 0-.309 2.202 7.488 7.488 0 0 0-3.1 1.354c-.58-.45-1.27-.992-1.814-1.336-.298.23-.583.477-.852.74-.254.253-.49.524-.762.85l1.36 1.804a7.4 7.4 0 0 0-1.106 2.961c-.743 0-1.596.18-2.212.307a9.274 9.274 0 0 0 0 1.12 9.094 9.094 0 0 0 0 1.1c.616.109 1.487.235 2.212.307a7.402 7.402 0 0 0 1.251 3.015L4.12 18.23c.272.324.508.595.762.848s.526.487.852.758l1.814-1.354a7.471 7.471 0 0 0 3.028 1.246c0 .74.181 1.589.308 2.202a9.107 9.107 0 0 0 2.249 0c.109-.613.235-1.48.308-2.202a7.47 7.47 0 0 0 3.028-1.3l1.814 1.354c.326-.27.598-.505.852-.758.265-.268.513-.551.743-.849-.344-.487-.87-1.173-1.341-1.805a7.42 7.42 0 0 0 1.25-3.015c.744 0 1.596-.18 2.213-.307m-10.064 3.304a4.35 4.35 0 0 1-1.705-.343 4.451 4.451 0 0 1-2.339-2.31 4.477 4.477 0 0 1 0-3.413 4.451 4.451 0 0 1 2.34-2.31 4.534 4.534 0 0 1 3.427 0 4.451 4.451 0 0 1 2.32 2.31 4.477 4.477 0 0 1 0 3.412 4.451 4.451 0 0 1-2.32 2.311 4.387 4.387 0 0 1-1.723.343"/>\n' +
        '  <path fill="none" d="M0 0h24v24H0z"/>\n' +
        '</svg>\n')
    );
    this.matIconRegistry.addSvgIconLiteral(
      'tcs-caselist-icon',
      this.domSanitizer.bypassSecurityTrustHtml('<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 48 48">\n' +
        '  <path class="svg-content" fill="#727272" fill-rule="evenodd" d="M42 42H6c-1.103 0-2-.898-2-2V26.61c4.43 2.623 10.208 3.96 15.729 4.422v1.504c0 1.326.948 2.4 2.118 2.4h4.764c1.17 0 2.118-1.074 2.118-2.4V31.04c6.16-.503 11.505-2.008 15.271-4.264v13.223c0 1.103-.897 2-2 2zM6 15.995h36c1.103 0 2 .898 2 2v3.583c-2.798 2.727-8.447 4.664-15.271 5.268v-1.511c0-1.326-.948-2.4-2.117-2.4h-4.765c-1.17 0-2.118 1.074-2.118 2.4v1.51c-6.651-.6-12.41-2.518-15.729-5.348v-3.501c0-1.103.897-2 2-2zm10.655-8.89c0-.063.023-.098.016-.106l14.944-.011s.04.033.04.117v4.89h-15v-4.89zM42 11.996h-6.345v-4.89C35.655 4.842 33.861 3 31.657 3H16.653c-2.204 0-3.998 1.842-3.998 4.106v4.89H6c-3.308 0-6 2.692-6 6V40c0 3.31 2.692 6 6 6h36c3.309 0 6-2.69 6-6V17.997c0-3.31-2.691-6.001-6-6.001z"/>\n' +
        '</svg>\n')
    );
    this.matIconRegistry.addSvgIconLiteral(
      'tcs-search-icon',
      this.domSanitizer.bypassSecurityTrustHtml('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24" height="24" viewBox="0 0 24 24">\n' +
        '  <path class="svg-content" fill="#727272" d="M21.451 18.8a1.874 1.874 0 1 1-2.652 2.651l-5.495-5.495A7.455 7.455 0 0 1 9.5 17 7.5 7.5 0 1 1 17 9.5c0 1.39-.385 2.688-1.044 3.804l5.495 5.496zM9.5 3.876a5.625 5.625 0 1 0 0 11.25 5.625 5.625 0 0 0 0-11.25z"/>\n' +
        '  <path fill="none" d="M0 0h24v24H0z"/>\n' +
        '</svg>\n')
    );
    this.matIconRegistry.addSvgIconLiteral(
      'tcs-case-data-icon',
      this.domSanitizer.bypassSecurityTrustHtml('<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">\n' +
        '    <path class="svg-content" fill="#727272" fill-rule="evenodd" d="M42 42H6c-1.103 0-2-.898-2-2V26.61c4.43 2.623 10.208 3.96 15.729 4.422v1.504c0 1.326.948 2.4 2.118 2.4h4.764c1.17 0 2.118-1.074 2.118-2.4V31.04c6.16-.503 11.505-2.008 15.271-4.264v13.223c0 1.103-.897 2-2 2zM6 15.995h36c1.103 0 2 .898 2 2v3.583c-2.798 2.727-8.447 4.664-15.271 5.268v-1.511c0-1.326-.948-2.4-2.117-2.4h-4.765c-1.17 0-2.118 1.074-2.118 2.4v1.51c-6.651-.6-12.41-2.518-15.729-5.348v-3.501c0-1.103.897-2 2-2zm10.655-8.89c0-.063.023-.098.016-.106l14.944-.011s.04.033.04.117v4.89h-15v-4.89zM42 11.996h-6.345v-4.89C35.655 4.842 33.861 3 31.657 3H16.653c-2.204 0-3.998 1.842-3.998 4.106v4.89H6c-3.308 0-6 2.692-6 6V40c0 3.31 2.692 6 6 6h36c3.309 0 6-2.69 6-6V17.997c0-3.31-2.691-6.001-6-6.001z"/>\n' +
        '</svg>\n')
    );
    this.matIconRegistry.addSvgIconLiteral(
      'tcs-close-icon',
      this.domSanitizer.bypassSecurityTrustHtml('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24" height="24" viewBox="0 0 24 24">\n' +
        '  <path class="svg-content" fill="#727272" d="M21.483 5.012L14.495 12l6.988 6.987a1.766 1.766 0 0 1-2.495 2.495L12 14.495l-6.987 6.987a1.766 1.766 0 0 1-2.495-2.495L9.504 12 2.517 5.012a1.765 1.765 0 0 1 2.495-2.495L12 9.504l6.987-6.987a1.765 1.765 0 0 1 2.495 2.495"/>\n' +
        '  <path fill="none" d="M0 0h24v24H0z"/>\n' +
        '</svg>\n')
    );
    this.matIconRegistry.addSvgIconLiteral(
      'tcs-case-state-audit-icon',
      this.domSanitizer.bypassSecurityTrustHtml('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">\n' +
        '  <path fill="none" d="M0 0h24v24H0V0zm0 0h24v24H0V0z"/>\n' +
        '  <path class="svg-content" fill="#727272" d="M16.59 7.58L10 14.17l-3.59-3.58L5 12l5 5 8-8zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>\n' +
        '</svg>\n')
    );
    this.matIconRegistry.addSvgIconLiteral(
      'tcs-milestone-completed',
      this.domSanitizer.bypassSecurityTrustHtml('<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36">\n' +
        '    <g fill="none" fill-rule="evenodd">\n' +
        '        <circle cx="18" cy="18" r="18" fill="#062E79"/>\n' +
        '        <path fill="#FFF" d="M22.716 16.63l-5.16 5.09a.97.97 0 0 1-.685.28.972.972 0 0 1-.685-.28l-2.903-2.863a.943.943 0 0 1-.283-.675c0-.527.434-.954.967-.954.268 0 .51.106.685.28l2.22 2.188 4.476-4.416a.973.973 0 0 1 .685-.28c.533 0 .967.428.967.954a.945.945 0 0 1-.284.676z"/>\n' +
        '    </g>\n' +
        '</svg>\n')
    );
    this.matIconRegistry.addSvgIconLiteral(
      'tcs-milestone-completed-terminal',
      this.domSanitizer.bypassSecurityTrustHtml('<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36">\n' +
        '    <g fill="none" fill-rule="evenodd">\n' +
        '        <circle cx="18" cy="18" r="16" fill="#04BE5B" stroke="#04BE5B" stroke-width="4"/>\n' +
        '        <path fill="#FFF" d="M17.11 24.441c-.35.346-.833.559-1.368.559a1.943 1.943 0 0 1-1.37-.559l-5.805-5.728A1.886 1.886 0 0 1 8 17.363c0-1.054.867-1.908 1.935-1.908.534 0 1.018.214 1.37.56l4.437 4.377 8.954-8.832c.35-.345.835-.56 1.369-.56 1.068 0 1.935.855 1.935 1.909a1.89 1.89 0 0 1-.568 1.35L17.111 24.441z"/>\n' +
        '    </g>\n' +
        '</svg>\n')
    );
    this.matIconRegistry.addSvgIconLiteral(
      'tcs-milestone-inprogress',
      this.domSanitizer.bypassSecurityTrustHtml('<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36">\n' +
        '    <circle cx="18" cy="18" r="17" fill="none" fill-rule="evenodd" stroke="#0081CB" stroke-width="2"/>\n' +
        '</svg>')
    );
    this.matIconRegistry.addSvgIconLiteral(
      'tcs-milestone-inprogress-terminal',
      this.domSanitizer.bypassSecurityTrustHtml('<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36">\n' +
        '    <circle cx="18" cy="18" r="17" fill="none" fill-rule="evenodd" stroke="#0081CB" stroke-width="2"/>\n' +
        '</svg>')
    );
    this.matIconRegistry.addSvgIconLiteral(
      'tcs-milestone-pending',
      this.domSanitizer.bypassSecurityTrustHtml('<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36">\n' +
        '    <circle cx="18" cy="18" r="17" fill="#FFF" fill-rule="evenodd" stroke="#DEDEDE" stroke-width="2"/>\n' +
        '</svg>\n')
    );
    this.matIconRegistry.addSvgIconLiteral(
      'tcs-milestone-pending-terminal',
      this.domSanitizer.bypassSecurityTrustHtml('<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36">\n' +
        '    <circle cx="18" cy="18" r="17" fill="#FFF" fill-rule="evenodd" stroke="#DEDEDE" stroke-width="2"/>\n' +
        '</svg>\n')
    );
    this.matIconRegistry.addSvgIconLiteral(
      'tcs-mini-state-completed',
      this.domSanitizer.bypassSecurityTrustHtml('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">\n' +
        '    <g fill="none" fill-rule="evenodd">\n' +
        '        <circle cx="12" cy="12" r="12" fill="#062E79"/>\n' +
        '        <path fill="#FFF" d="M15.144 11.086l-3.44 3.394a.648.648 0 0 1-.913 0l-1.935-1.909a.629.629 0 0 1-.19-.45.648.648 0 1 1 1.101-.45l1.48 1.46 2.985-2.944a.649.649 0 0 1 .456-.187c.356 0 .645.285.645.636a.63.63 0 0 1-.189.45z"/>\n' +
        '    </g>\n' +
        '</svg>\n')
    );
    this.matIconRegistry.addSvgIconLiteral(
      'tcs-mini-state-current',
      this.domSanitizer.bypassSecurityTrustHtml('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">\n' +
        '    <circle cx="12" cy="12" r="11" fill="white" fill-rule="evenodd" stroke="#0081CB" stroke-width="2"/>\n' +
        '</svg>\n')
    );
    this.matIconRegistry.addSvgIconLiteral(
      'tcs-mini-state-terminal-completed',
      this.domSanitizer.bypassSecurityTrustHtml('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">\n' +
        '    <g fill="none" fill-rule="evenodd">\n' +
        '        <circle cx="12" cy="12" r="10" fill="#04BE5B" stroke="#04BE5B" stroke-width="4"/>\n' +
        '        <path fill="#FFF" d="M11.407 16.294c-.233.23-.556.373-.912.373-.357 0-.68-.142-.913-.373l-3.87-3.818a1.257 1.257 0 0 1-.379-.9c0-.703.578-1.273 1.29-1.273.357 0 .68.143.913.374l2.959 2.918 5.969-5.888c.233-.23.556-.374.913-.374.712 0 1.29.57 1.29 1.273 0 .352-.145.67-.379.9l-6.881 6.788z"/>\n' +
        '    </g>\n' +
        '</svg>\n')
    );
    this.matIconRegistry.addSvgIconLiteral(
      'tcs-capabilities',
      this.domSanitizer.bypassSecurityTrustHtml('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">\n' +
        '  <path class="svg-content" fill="#727272" d="M20.063 19.5H19c-.815 0-1.5-.6-1.5-1.375V12.5h-2.566A7.501 7.501 0 0 1 0 11.5a7.5 7.5 0 0 1 15 0h2.5V5.875c0-.775.685-1.375 1.5-1.375h1.063a2 2 0 1 1 0 1H19c-.29 0-.5.184-.5.375V11.5h1.563a2 2 0 1 1 0 1H18.5v5.625c0 .191.21.375.5.375h1.063a2 2 0 1 1 0 1zm-8.67-10.717L9.5 10.685 7.65 10.35 7.319 8.5 9.214 6.6c-.426-.426-1.033-.62-1.483-.597-.452.023-1.418.278-2.166 1.073-.725.765-1.486 2.191-.812 3.775.08.19.171.442-.097.71-.133.132-.256.385-1.993 2.022-1.737 1.638.31 3.417 1.88 1.749 1.569-1.669 1.746-1.845 1.897-1.992.285-.279.54-.185.711-.098 1.194.618 2.894.081 3.776-.801.882-.883 1.043-1.735 1.07-2.17.027-.434-.124-1.007-.604-1.487z"/>\n' +
        '</svg>\n')
    );
    this.matIconRegistry.addSvgIconLiteral(
      'tcs-home',
      this.domSanitizer.bypassSecurityTrustHtml('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" fill="#727272"  class="svg-content"/><path d="M0 0h24v24H0z" fill="none"/></svg>\n')
    );
    this.matIconRegistry.addSvgIconLiteral(
      'tcs-starters-icon',
      this.domSanitizer.bypassSecurityTrustHtml('<svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 45 45">\n' +
        '    <g fill="#0081CB" fill-rule="evenodd">\n' +
        '        <path d="M22.5 0C10.074 0 0 10.074 0 22.5S10.074 45 22.5 45 45 34.926 45 22.5 34.926 0 22.5 0zm0 1.534c11.56 0 20.966 9.405 20.966 20.966 0 11.56-9.405 20.966-20.966 20.966-11.56 0-20.966-9.405-20.966-20.966 0-11.56 9.405-20.966 20.966-20.966z"></path>\n' +
        '        <path fill-rule="nonzero" d="M28.274 23.103l-3.013 5.18h-6.025l-3.013-5.18 3.013-5.179h6.025l3.013 5.18zm-8.265 3.851h4.48l2.239-3.85-2.24-3.85h-4.48l-2.24 3.85 2.24 3.85zm-4.654-2.652l2.998 5.155-.808 1.622h.572v1.328h-1.405v-1.024l-.653-.32.777-1.557-2.254-3.875h-4.48l-1.1 1.891.135.315-1.227.53-.556-1.291.477-.198 1.498-2.576h6.026zm12.295-9.081l-.24-1.306 1.352-.228.225 1.31-1.337.224zm-11.074-2.685l-.795 1.142-1.104-.753.8-1.148 1.099.76zm6.65-3.347l-.184 1.316-1.387-.189.18-1.316 1.39.189zm-7.845 5.37l-.329 1.354-1.301-.311.328-1.353 1.302.31zm5.296-4.195l-1.36.314-.31-1.293 1.373-.317.297 1.296zm-2.252.7l-1.156.787-.758-1.095 1.156-.788.758 1.095zm9.444 1.26l-1.033.845-.895-1.057 1.018-.863.91 1.074zm-2.026-1.995l-.658 1.159-1.218-.674.644-1.164 1.232.68zm-12.13 6.937l-.026-.213.016-.002-.001-.015.216-.01 1.098-.13.08.66-.663.078.664-.07.095.717-.759.052-.67.03-.05-1.097zm18.019-3.383l-.205 1.313-1.382-.204.189-1.315 1.398.206zm5.932 8.467l-.222-1.37 1.32-.218.225 1.385-1.323.203zm-.91-3.067l-.318-.585 1.178-.631.355.655.306.591-1.191.607-.33-.637zm-2.297-4.316l-.6 1.189-1.257-.629.605-1.185 1.252.625zm-21.746 3.657l-1.27.58-.567-1.203 1.283-.587.554 1.21zm24-1.778l-.946.94-.994-.97.93-.956 1.01.986zM30.26 30.953l1.387-.229.22 1.31-1.387.23-.22-1.31zm-8.08 1.455v-1.33h1.406v1.33h-1.406zm2.734 0v-1.33h1.405v1.33h-1.405zm8.443-2.369l.588-.316.637 1.17-.66.352-.596.304-.611-1.182.642-.328zm4.319-6.562l1.325.187-.209 1.388-1.322-.204.206-1.371zm-.758 2.87l.22-.433 1.194.6-.63 1.243-.894-.444-.661.374-1.486-2.588h-4.477l-2.26 3.885.844 1.816-.608.279h.893v1.328h-1.406v-1.094l-.095.044-1.134-2.441 2.993-5.145h6.028l1.48 2.577zm-2.054 2.71l.978-.988.962.925-.994 1.001-.946-.939zM8.339 24.12l.024 1.387-1.338.031L7 24.135l1.339-.015zm.46 5.55l.946-.939.994.978-.939.948-1.002-.986zm1.762-9.838l-.96 1.019-.977-.908.96-1.018.977.907zm8.884 12.576v-1.33h1.406v1.33h-1.406zM9.028 21.764l-.5 1.293-1.254-.467.508-1.311 1.246.485zm2.088 9.772l.522-1.224 1.29.534-.508 1.229-1.304-.54zm2.857.862l.015-1.328 1.405.016-.015 1.329-1.405-.017z"></path>\n' +
        '    </g>\n' +
        '</svg>')
    );
    this.matIconRegistry.addSvgIconLiteral(
      'tcs-spotfire-icon',
      this.domSanitizer.bypassSecurityTrustHtml('<?xml version="1.0" encoding="UTF-8"?>\n' +
        '<svg width="48px" height="48px" viewBox="0 0 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n' +
        '    <!-- Generator: sketchtool 51.1 (57501) - http://www.bohemiancoding.com/sketch -->\n' +
        '    <title>EBCCA156-217F-4BF2-B9AE-89A324E485CB</title>\n' +
        '    <desc>Created with sketchtool.</desc>\n' +
        '    <defs></defs>\n' +
        '    <g id="Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n' +
        '        <g id="UI-Icons" transform="translate(-1159.000000, -384.000000)" fill="#062E79" fill-rule="nonzero">\n' +
        '            <g id="ic-spotfire" transform="translate(1159.000000, 384.000000)">\n' +
        '                <path d="M31.655908,37.8577116 C31.6187835,37.9325874 31.5686986,38.0002953 31.5079727,38.0576995 C30.0186764,39.0509358 28.3403185,39.725664 26.5781297,40.0395797 C25.9600776,40.1670374 25.331823,40.2386547 24.700951,40.2535668 C24.4690525,40.2655661 24.2351548,40.2735656 23.9992581,40.2735656 C23.7633613,40.2735656 23.5294636,40.2735656 23.2975651,40.2535668 C22.6666932,40.2386547 22.0384385,40.1670374 21.4203864,40.0395797 C19.6581976,39.725664 17.9798398,39.0509358 16.4905434,38.0576995 C16.4298491,38.0002673 16.3797686,37.9325654 16.3426081,37.8577116 L16.3426081,37.8757105 C16.3426081,38.0756985 16.3705959,38.5056725 16.4025819,39.1576331 C16.4112843,40.1848682 16.771857,41.1780523 17.4241349,41.971463 C17.7213044,42.3282281 18.0978654,42.6104129 18.5236538,42.7954132 L18.9394719,42.9814019 C19.1273897,43.0493978 19.3159738,43.1160604 19.5052244,43.1813898 C20.7873656,43.5886091 22.1242824,43.797012 23.4694898,43.7993525 L24.5370228,43.7993525 C25.8822302,43.797012 27.2191471,43.5886091 28.5012883,43.1813898 C28.6905388,43.1213935 28.879123,43.0547308 29.0670407,42.9814019 L29.4828588,42.7954132 C29.9086472,42.6104129 30.2852082,42.3282281 30.5823777,41.971463 C31.2346556,41.1780523 31.5952283,40.1848682 31.6039308,39.1576331 C31.6359168,38.5036726 31.6599063,38.0656991 31.6619054,37.8757105 L31.6619054,37.8577116 L31.655908,37.8577116 Z M28.0135017,45.1232725 C26.8981784,45.4558873 25.7408294,45.6262885 24.5770053,45.6292419 L23.4215108,45.6292419 C22.2576867,45.6262885 21.1003377,45.4558873 19.9850144,45.1232725 C19.9196684,45.1020458 19.8582213,45.0702975 19.803094,45.0292781 L19.803094,45.047277 L19.8250844,45.0912744 C20.3479711,46.870118 22.0111732,48.0669219 23.8633175,47.9970987 L24.1851767,47.9970987 C26.0235414,48.0511974 27.6666746,46.857011 28.1834273,45.0912744 L28.2054177,45.047277 L28.2054177,45.0292781 C28.1472452,45.0712842 28.082345,45.1030703 28.0135017,45.1232725 Z M39.440502,11.5493019 C38.2118114,8.22698136 35.6152604,5.59303051 32.3116211,4.31773901 C31.6784657,4.02511059 31.0242466,3.78043801 30.3544774,3.58578325 C28.4207231,3.04109155 26.4238709,2.7526457 24.4150761,2.72783511 L23.5854391,2.72783511 C21.5766444,2.7526457 19.5797922,3.04109155 17.6460378,3.58578325 C16.9762662,3.78043086 16.3220467,4.02510364 15.6888941,4.31773901 C12.3843501,5.59233242 9.78692567,8.22643056 8.55801413,11.5493019 C8.09229392,12.9677014 7.87914956,14.45689 7.92828965,15.9490359 C8.05342939,19.1784343 9.17030681,22.2908091 11.1268902,24.8624971 C11.4287581,25.3064703 11.7706085,25.758443 12.1724327,26.2444136 C12.5322753,26.6783874 12.8881196,27.0803631 13.2659542,27.5043375 L13.4658668,27.7383233 C13.629795,27.9383112 13.9556525,28.3202881 14.2955038,28.7982592 C14.8648102,29.6467696 15.2940987,30.5812968 15.5669475,31.5660919 C15.6332301,31.8081577 15.6852964,32.0538963 15.7228793,32.3020475 L15.7228793,33.4399787 C15.7228793,33.4519779 15.7228793,33.4739766 15.7228793,33.5039748 L15.7228793,33.5979691 C15.8655353,35.4784435 17.2354149,37.0372691 19.0814098,37.4197381 C19.3144881,37.5003865 19.5521331,37.5671659 19.7930984,37.619726 L19.8710643,37.6377249 C20.2309068,37.7437185 20.760675,37.8537119 20.760675,37.8537119 L20.7366855,37.8317132 L20.7166943,37.8137143 L20.7166943,37.801715 L20.6947039,37.801715 C20.5988668,37.6190578 20.526972,37.4248013 20.4807975,37.22375 L20.4807975,37.1977515 C20.456808,37.1097568 20.4368167,37.0277618 20.4208237,36.9617658 C20.3722617,36.7305623 20.3362249,36.4969023 20.312871,36.2618081 C20.2688902,35.8618323 20.2429016,35.40386 20.232906,34.8318945 C20.232906,34.6099079 20.232906,34.3739222 20.232906,34.1179377 L20.232906,32.9060109 C20.2556365,32.6124684 20.2556365,32.3176068 20.232906,32.0240643 C20.1500645,30.2470055 19.5588879,28.5311141 18.5296512,27.0803631 C18.3937107,26.8803752 18.30375,26.7623823 18.2917553,26.7463833 L18.2777614,26.7283844 C17.8119652,26.1124216 17.3181813,25.560455 16.8403903,25.0264872 C16.1838726,24.3220373 15.5760655,23.5736849 15.0211863,22.7866226 C13.4884627,20.8088263 12.6019693,18.4067104 12.4822971,15.9070385 C12.4212405,14.5715773 12.6681723,13.2399693 13.2039814,12.0152737 C14.1476214,10.1238325 15.7673659,8.65623324 17.7419958,7.90352226 L17.8019696,7.87552395 C18.2197025,7.68419657 18.6514373,7.52507644 19.0934045,7.39955272 C22.3062638,6.53033188 25.6922524,6.53033188 28.9051116,7.39955272 C29.3472483,7.5270227 29.7789869,7.68814998 30.1965465,7.88152359 L30.2585194,7.9095219 C32.2313608,8.66119746 33.8501851,10.1264683 34.7945348,12.0152737 C35.3323297,13.2360794 35.5826578,14.5641401 35.5262146,15.8970391 C35.4065424,18.396711 34.520049,20.7988269 32.9873255,22.7766232 C32.4324462,23.5636855 31.8246391,24.3120379 31.1681214,25.0164878 C30.6903305,25.5524554 30.1985457,26.1024222 29.7307503,26.718385 L29.7167565,26.7363839 C29.7047617,26.7523829 29.6148011,26.8683759 29.4788605,27.0703637 C28.4496238,28.5211147 27.8584473,30.2370061 27.7756058,32.0140649 C27.7528753,32.3076074 27.7528753,32.602469 27.7756058,32.8960115 L27.7756058,34.1079383 C27.7756058,34.3639228 27.7756058,34.5999086 27.7756058,34.8218951 C27.7656102,35.3938606 27.7396215,35.8598324 27.6956408,36.2518087 C27.6723023,36.4869049 27.6362653,36.7205657 27.587688,36.9517664 C27.571695,37.0177624 27.5517037,37.0997574 27.5277142,37.1877521 L27.5277142,37.2137506 C27.4815398,37.4148019 27.4096449,37.6090584 27.3138078,37.7917156 L27.2918175,37.7917156 L27.2918175,37.8037149 L27.2718262,37.8217138 L27.2478367,37.8437125 C27.2478367,37.8437125 27.7776049,37.7337191 28.1374475,37.6277255 L28.2154133,37.6097266 C28.4563787,37.5571665 28.6940236,37.4903872 28.927102,37.4097387 C30.7595312,37.0182197 32.1158115,35.4669029 32.2596439,33.5979691 L32.2596439,33.5139742 C32.2596439,33.483976 32.2596439,33.4639772 32.2596439,33.4499781 L32.2596439,32.3120468 C32.2972268,32.0638957 32.349293,31.8181571 32.4155756,31.5760913 C32.6884244,30.5912962 33.1177129,29.6567689 33.6870193,28.8082586 C34.0248715,28.3302875 34.3527281,27.9383112 34.5166563,27.7483227 L34.7165689,27.5143369 C35.0944036,27.0903625 35.4502479,26.6883868 35.8100904,26.254413 C36.2099155,25.7684424 36.553765,25.3164697 36.855633,24.8724965 C38.8122163,22.3008085 39.9290937,19.1884337 40.0542335,15.9590353 C40.1096642,14.4644973 39.901923,12.971852 39.440502,11.5493019 Z M5.01956232,29.4342208 L4.81964979,29.5202156 C2.99649784,30.24534 1.85508545,32.0706689 2.00088309,34.0279431 C1.99079072,34.2320879 2.0220709,34.436166 2.09284286,34.6279069 C2.17769818,34.5000153 2.28465758,34.3882751 2.40870466,34.2979268 C3.71962504,33.6820391 5.08489381,33.1892859 6.4869203,32.8260158 L6.56288706,32.7940177 C8.63845686,31.774723 9.76597305,29.4835152 9.30768612,27.2163549 C8.01974086,28.202048 6.56814236,28.9528311 5.01956232,29.4342208 Z M2.92247986,5.61166079 C4.42182385,6.21162453 6.9687095,6.77759032 7.33255031,7.411552 C7.76708764,5.27599244 6.62333345,3.13284827 4.6077425,2.30586062 L4.40782997,2.21986582 C2.85268539,1.74008838 1.39479082,0.988522387 0.101714043,0 C-0.357566659,2.26781936 0.770104541,4.56016384 2.8465131,5.57966273 L2.92247986,5.61166079 Z M43.1908611,29.5202156 L42.9909486,29.4342208 C41.4397007,28.9543066 39.9853373,28.2041706 38.6948282,27.2183547 C38.2336029,29.4832433 39.3558916,31.7746595 41.4276326,32.7980175 L41.5035993,32.8300155 C42.9056258,33.1932856 44.2708946,33.6860389 45.581815,34.3019266 C45.7121319,34.3925677 45.8246299,34.506464 45.9136698,34.6379063 C45.9844417,34.4461654 46.0157219,34.2420873 46.0056295,34.0379425 C46.1565658,32.078134 45.0161733,30.2477944 43.1908611,29.5202156 Z M47.8968021,0 C46.6035778,0.987814389 45.1456919,1.73869885 43.5906861,2.21786594 L43.3907736,2.30386074 C41.3708198,3.13157773 40.2261321,5.28067168 40.6659658,7.41955151 C41.0298066,6.77559044 43.5766923,6.21962404 45.0760363,5.61966031 L45.152003,5.58766224 C47.2317709,4.56734959 48.3600632,2.27045415 47.8968021,1.97774277e-15 Z"></path>\n' +
        '            </g>\n' +
        '        </g>\n' +
        '    </g>\n' +
        '</svg>')
    );
    this.matIconRegistry.addSvgIconLiteral(
      'tcs-liveapps-sm-icon',
      this.domSanitizer.bypassSecurityTrustHtml('<svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44">\n' +
        '    <path fill="#0081CB" fill-rule="evenodd" d="M11 25a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm2 3V14h-2.556l-5.657 5.464c-.785.785-.785 1.948 0 2.733l11.314 11.265c.777.778 2.043.761 2.828-.024L22.343 30H15a2 2 0 0 1-2-2zm10-12v-5.5l5.5 5.5H23zm-4 5h9v-2h-9v2zm0 4h6v-2h-6v2zm-2-4a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm0 4a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm13-10l-6-6h-8c-1.11 0-2 .89-2 2v16a2 2 0 0 0 2 2h6.661L30 21.653V15zm4.831 11.494L26.333 35H23v-3.331l8.498-8.507 3.333 3.332zm4.694-.878c-.018.435-.471.889-.925 1.333l-3.671 3.68-1.262-1.262 3.778-3.769-.854-.853-1.262 1.253-3.333-3.334 3.413-3.404c.347-.347.925-.347 1.253 0l2.08 2.08c.347.329.347.907 0 1.253-.302.303-.595.596-.604.889-.027.285.276.578.56.854.427.444.844.844.827 1.28zM22 1.5c11.304 0 20.5 9.196 20.5 20.5S33.304 42.5 22 42.5 1.5 33.304 1.5 22 10.696 1.5 22 1.5zM22 0C9.869 0 0 9.869 0 22s9.869 22 22 22 22-9.869 22-22S34.131 0 22 0z"></path>\n' +
        '</svg>')
    );
    this.matIconRegistry.addSvgIconLiteral(
      'tcs-integration-icon',
      this.domSanitizer.bypassSecurityTrustHtml('<?xml version="1.0" encoding="UTF-8"?>\n' +
        '<svg width="48px" height="48px" viewBox="0 0 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n' +
        '    <!-- Generator: sketchtool 51.1 (57501) - http://www.bohemiancoding.com/sketch -->\n' +
        '    <title>327208F2-CA57-4974-A537-97E9D3200E7B</title>\n' +
        '    <desc>Created with sketchtool.</desc>\n' +
        '    <defs></defs>\n' +
        '    <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n' +
        '        <g id="ic-integration-md" fill="#062E79">\n' +
        '            <path d="M48.0993789,27.3367089 C48.0993789,24.9822785 47.4355072,22.7979747 46.1253002,20.8450633 C45.0896605,19.3012658 43.7769482,18.0582278 42.2107122,17.1362025 C42.1520911,13.5448101 40.7872712,10.4344304 38.1523271,7.88708861 C35.4833126,5.3078481 32.2240787,4 28.4648116,4 C25.6635238,4 23.0831925,4.76759494 20.7964679,6.28202532 C19.1580828,7.36556962 17.8238261,8.70582278 16.8097308,10.2810127 C15.8687867,9.88810127 14.8451718,9.68962025 13.7484058,9.68962025 C11.6059793,9.68962025 9.74663768,10.436962 8.22248861,11.9098734 C6.67278675,13.4081013 5.88666253,15.2481013 5.88666253,17.3792405 C5.88666253,18.0248101 5.96532505,18.6516456 6.121147,19.2562025 C4.69169358,19.92 3.44411594,20.8870886 2.39595031,22.1473418 C0.806165631,24.0592405 0,26.2835443 0,28.7589873 C0,31.6724051 1.0762236,34.1893671 3.19810766,36.24 C5.04141615,38.0217722 7.2429648,39.0298734 9.75315114,39.2475949 C10.1018716,41.9286076 12.3660497,44 15.1137267,44 L18.5307867,44 L18.5307867,30.5878481 L15.1137267,30.5878481 C12.4071346,30.5878481 10.1710145,32.598481 9.77118841,35.2207595 C8.29814493,35.0273418 7.03052588,34.4146835 5.92574327,33.3468354 C4.59649689,32.0622785 3.95016149,30.561519 3.95016149,28.7589873 C3.95016149,27.2313924 4.43015321,25.9113924 5.41719255,24.7240506 C6.4272795,23.5098734 7.67535818,22.7493671 9.23257557,22.3994937 C9.87189648,22.2551899 10.3994865,21.8 10.6404845,21.1827848 C10.8819834,20.5660759 10.8053251,19.8683544 10.4365631,19.32 C10.0327288,18.7210127 9.83682402,18.0860759 9.83682402,17.3792405 C9.83682402,16.3559494 10.1905549,15.5372152 10.9501242,14.8035443 C11.7362484,14.0435443 12.6250849,13.6896203 13.7484058,13.6896203 C14.7469689,13.6896203 15.5786874,13.9858228 16.2901573,14.5949367 C16.7671429,15.003038 17.4069648,15.1579747 18.0142195,15.0156962 C18.6219752,14.8718987 19.1275197,14.4455696 19.3765342,13.8663291 C20.1305921,12.1108861 21.3020124,10.7255696 22.9574327,9.62987342 C24.6143561,8.53316456 26.4155776,8 28.4648116,8 C31.2124886,8 33.4891925,8.90936709 35.4246915,10.7802532 C37.3341366,12.6263291 38.2625549,14.7848101 38.2625549,17.3792405 C38.2625549,17.4987342 38.2555404,17.7351899 38.221971,18.1848101 C38.1593416,19.0278481 38.6268075,19.8197468 39.3898841,20.163038 C40.8373747,20.8146835 41.9722195,21.7726582 42.8575487,23.0926582 C43.7268447,24.3883544 44.1492174,25.7762025 44.1492174,27.3367089 C44.1492174,29.5275949 43.360087,31.355443 41.7367329,32.924557 C40.7076066,33.9194937 39.5672505,34.5949367 38.2891097,34.9625316 C37.7870725,32.4663291 35.6035611,30.5878481 32.9856522,30.5878481 L29.5685921,30.5878481 L29.5685921,33.2202532 L25.153971,33.2202532 C24.5442112,33.2202532 24.0496894,33.7194937 24.0496894,34.3356962 L24.0496894,34.3397468 C24.0496894,34.955443 24.5442112,35.4551899 25.153971,35.4551899 L29.5685921,35.4551899 L29.5685921,38.8167089 L25.153971,38.8167089 C24.5442112,38.8167089 24.0496894,39.3164557 24.0496894,39.9321519 L24.0496894,39.9362025 C24.0496894,40.5524051 24.5442112,41.0516456 25.153971,41.0516456 L29.5685921,41.0516456 L29.5685921,44 L32.9856522,44 C35.802472,44 38.1147495,41.8248101 38.3722816,39.0460759 C40.6635155,38.5939241 42.706236,37.516962 44.4643685,35.8177215 C46.876352,33.4865823 48.0993789,30.6329114 48.0993789,27.3367089" id="ic-integration-large"></path>\n' +
        '        </g>\n' +
        '    </g>\n' +
        '</svg>')
    );
    this.matIconRegistry.addSvgIconLiteral(
      'tcs-info-icon',
      this.domSanitizer.bypassSecurityTrustHtml('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" fill="green"/></svg>\n')
    );
    this.matIconRegistry.addSvgIconLiteral(
      'tcs-chevron-right',
      this.domSanitizer.bypassSecurityTrustHtml('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path class="svg-content" fill="#727272" d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/><path d="M0 0h24v24H0z" fill="none"/></svg>\n')
    );
    this.matIconRegistry.addSvgIconLiteral(
      'tcs-chevron-left',
      this.domSanitizer.bypassSecurityTrustHtml('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path  class="svg-content" fill="#727272" d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/><path d="M0 0h24v24H0z" fill="none"/></svg>\n')
    );
    // *JS*?
    this.matIconRegistry.addSvgIconLiteral(
      'tcs-delete-sweep',
      this.domSanitizer.bypassSecurityTrustHtml('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path class="svg-content" fill="#727272" d="M15 16h4v2h-4zm0-8h7v2h-7zm0 4h6v2h-6zM3 18c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2V8H3v10zM14 5h-3l-1-1H6L5 5H2v2h12z"/><path fill="none" d="M0 0h24v24H0z"/></svg>\n')
    );
    // *JS*?
    this.matIconRegistry.addSvgIconLiteral(
      'tcs-euro-symbol',
      this.domSanitizer.bypassSecurityTrustHtml('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path class="svg-content" fill="#727272"  d="M15 18.5c-2.51 0-4.68-1.42-5.76-3.5H15v-2H8.58c-.05-.33-.08-.66-.08-1s.03-.67.08-1H15V9H9.24C10.32 6.92 12.5 5.5 15 5.5c1.61 0 3.09.59 4.23 1.57L21 5.3C19.41 3.87 17.3 3 15 3c-3.92 0-7.24 2.51-8.48 6H3v2h3.06c-.04.33-.06.66-.06 1 0 .34.02.67.06 1H3v2h3.52c1.24 3.49 4.56 6 8.48 6 2.31 0 4.41-.87 6-2.3l-1.78-1.77c-1.13.98-2.6 1.57-4.22 1.57z"/><path fill="none" d="M0 0h24v24H0z"/></svg>\n')
    );
// *JS*?
    this.matIconRegistry.addSvgIconLiteral(
      'tcs-flash-on',
      this.domSanitizer.bypassSecurityTrustHtml('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M7 2v11h3v9l7-12h-4l4-8z"/></svg>')
    );
// *JS*?
    this.matIconRegistry.addSvgIconLiteral(
      'tcs-incandescent',
      this.domSanitizer.bypassSecurityTrustHtml('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path fill="#727272"  class="svg-content" d="M3.55 18.54l1.41 1.41 1.79-1.8-1.41-1.41-1.79 1.8zM11 22.45h2V19.5h-2v2.95zM4 10.5H1v2h3v-2zm11-4.19V1.5H9v4.81C7.21 7.35 6 9.28 6 11.5c0 3.31 2.69 6 6 6s6-2.69 6-6c0-2.22-1.21-4.15-3-5.19zm5 4.19v2h3v-2h-3zm-2.76 7.66l1.79 1.8 1.41-1.41-1.8-1.79-1.4 1.4z"/></svg>\n')
    );
    this.matIconRegistry.addSvgIconLiteral(
      'tcs-cloud-download',
      this.domSanitizer.bypassSecurityTrustHtml('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path class="svg-content" fill="#727272" d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM17 13l-5 5-5-5h3V9h4v4h3z"/></svg>\n')
    );
    this.matIconRegistry.addSvgIconLiteral(
      'tcs-visibility',
      this.domSanitizer.bypassSecurityTrustHtml('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path class="svg-content" fill="#727272" d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>\n')
    );
    this.matIconRegistry.addSvgIconLiteral(
      'tcs-pie-chart',
      this.domSanitizer.bypassSecurityTrustHtml('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path  class="svg-content" fill="#727272" d="M11 2v20c-5.07-.5-9-4.79-9-10s3.93-9.5 9-10zm2.03 0v8.99H22c-.47-4.74-4.24-8.52-8.97-8.99zm0 11.01V22c4.74-.47 8.5-4.25 8.97-8.99h-8.97z"/></svg>\n')
    );

    /* audit icons */
    this.matIconRegistry.addSvgIconLiteral(
      'BP_AUTO_STARTED_INSTANCE',
      this.domSanitizer.bypassSecurityTrustHtml('<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">\n' +
        '  <g fill="none" fill-rule="evenodd" transform="translate(-4 -4)">\n' +
        '    <polygon points="0 0 48 0 48 48 0 48"/>\n' +
        '    <path fill="#0081CB" fill-rule="nonzero" d="M20,33 L32,24 L20,15 L20,33 Z M24,4 C12.96,4 4,12.96 4,24 C4,35.04 12.96,44 24,44 C35.04,44 44,35.04 44,24 C44,12.96 35.04,4 24,4 Z M24,40 C15.18,40 8,32.82 8,24 C8,15.18 15.18,8 24,8 C32.82,8 40,15.18 40,24 C40,32.82 32.82,40 24,40 Z"/>\n' +
        '  </g>\n' +
        '</svg>\n')
    );
    this.matIconRegistry.addSvgIconLiteral(
      'BP_DELAYED_AUTO_START_TIMER_EXPIRED',
      this.domSanitizer.bypassSecurityTrustHtml('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">\n' +
        ' <g>\n' +
        '  <ellipse stroke="null" ry="7.351296" rx="7.524559" id="svg_4" cy="13.658373" cx="12.074255" stroke-opacity="null" stroke-width="null" fill="#0081cb"/>\n' +
        '  <path id="svg_1" fill="none" d="m-12.870959,2.227668l24,0l0,24l-24,0l0,-24z"/>\n' +
        '  <path fill="#0081cb" id="svg_2" d="m15.247519,1.792059l-6,0l0,2l6,0l0,-2zm-4,13l2,0l0,-6l-2,0l0,6zm8.03,-6.61l1.42,-1.42c-0.43,-0.51 -0.9,-0.99 -1.41,-1.41l-1.42,1.42c-1.55,-1.24 -3.5,-1.98 -5.62,-1.98c-4.97,0 -9,4.03 -9,9s4.02,9 9,9s9,-4.03 9,-9c0,-2.12 -0.74,-4.07 -1.97,-5.61zm-7.03,12.61c-3.87,0 -7,-3.13 -7,-7s3.13,-7 7,-7s7,3.13 7,7s-3.13,7 -7,7z"/>\n' +
        '  <rect stroke-dasharray="2,2" stroke="#ffffff" id="svg_3" height="6.088952" width="2.079155" y="6.653602" x="11.18319" stroke-width="0" fill="#ffffff"/>\n' +
        ' </g>\n' +
        '</svg>')
    );
    this.matIconRegistry.addSvgIconLiteral(
      'BP_DELAYED_AUTO_STARTED_INSTANCE',
      this.domSanitizer.bypassSecurityTrustHtml('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">\n' +
        '    <path d="M0 0h24v24H0z" fill="none"/>\n' +
        '    <path d="M15 1H9v2h6V1zm-4 13h2V8h-2v6zm8.03-6.61l1.42-1.42c-.43-.51-.9-.99-1.41-1.41l-1.42 1.42C16.07 4.74 14.12 4 12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9 9-4.03 9-9c0-2.12-.74-4.07-1.97-5.61zM12 20c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z" fill="#0081cb" />\n' +
        '</svg>\n')
    );
    this.matIconRegistry.addSvgIconLiteral(
      'BP_DELAYED_AUTO_STARTED_INSTANCE_CANCELLED',
      this.domSanitizer.bypassSecurityTrustHtml('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">\n' +
        '    <path d="M0 0h24v24H0zm0 0h24v24H0zm0 0h24v24H0zm0 0h24v24H0zm0 0h24v24H0z" fill="none"/>\n' +
        '    <path d="M19.04 4.55l-1.42 1.42C16.07 4.74 14.12 4 12 4c-1.83 0-3.53.55-4.95 1.48l1.46 1.46C9.53 6.35 10.73 6 12 6c3.87 0 7 3.13 7 7 0 1.27-.35 2.47-.94 3.49l1.45 1.45C20.45 16.53 21 14.83 21 13c0-2.12-.74-4.07-1.97-5.61l1.42-1.42-1.41-1.42zM15 1H9v2h6V1zm-4 8.44l2 2V8h-2v1.44zM3.02 4L1.75 5.27 4.5 8.03C3.55 9.45 3 11.16 3 13c0 4.97 4.02 9 9 9 1.84 0 3.55-.55 4.98-1.5l2.5 2.5 1.27-1.27-7.71-7.71L3.02 4zM12 20c-3.87 0-7-3.13-7-7 0-1.28.35-2.48.95-3.52l9.56 9.56c-1.03.61-2.23.96-3.51.96z" fill="#0081cb"/>\n' +
        '</svg>\n')
    );
    this.matIconRegistry.addSvgIconLiteral(
      'BP_DELAYED_AUTO_STARTED_INSTANCE_CANCELLED_DUE_TO_STATE_CHANGE',
      this.domSanitizer.bypassSecurityTrustHtml('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">\n' +
        '    <path d="M0 0h24v24H0zm0 0h24v24H0zm0 0h24v24H0zm0 0h24v24H0zm0 0h24v24H0z" fill="none"/>\n' +
        '    <path d="M19.04 4.55l-1.42 1.42C16.07 4.74 14.12 4 12 4c-1.83 0-3.53.55-4.95 1.48l1.46 1.46C9.53 6.35 10.73 6 12 6c3.87 0 7 3.13 7 7 0 1.27-.35 2.47-.94 3.49l1.45 1.45C20.45 16.53 21 14.83 21 13c0-2.12-.74-4.07-1.97-5.61l1.42-1.42-1.41-1.42zM15 1H9v2h6V1zm-4 8.44l2 2V8h-2v1.44zM3.02 4L1.75 5.27 4.5 8.03C3.55 9.45 3 11.16 3 13c0 4.97 4.02 9 9 9 1.84 0 3.55-.55 4.98-1.5l2.5 2.5 1.27-1.27-7.71-7.71L3.02 4zM12 20c-3.87 0-7-3.13-7-7 0-1.28.35-2.48.95-3.52l9.56 9.56c-1.03.61-2.23.96-3.51.96z" fill="#0081cb"/>\n' +
        '</svg>\n')
    );
    this.matIconRegistry.addSvgIconLiteral(
      'BP_INSTANCE_COMPLETED',
      this.domSanitizer.bypassSecurityTrustHtml('<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n' +
        '<svg width="12px" height="9px" viewBox="0 0 12 9" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n' +
        '    <!-- Generator: sketchtool 39 (31667) - http://www.bohemiancoding.com/sketch -->\n' +
        '    <title>6FF6D773-32D5-44FF-9BA8-ED1ACBAF56A8</title>\n' +
        '    <desc>Created with sketchtool.</desc>\n' +
        '    <defs></defs>\n' +
        '    <g id="Case-Management-" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n' +
        '        <g id="8.-Tibco-Case-Management---Detail-Page--collapsed" transform="translate(-73.000000, -753.000000)" fill="#58A400">\n' +
        '            <g id="check" transform="translate(68.000000, 745.000000)">\n' +
        '                <path d="M16.8612947,9.80440476 L9.9853348,16.6789202 C9.80100552,16.8624718 9.50267875,16.8624718 9.31912723,16.6789202 L5.13766364,12.4706795 C4.95411212,12.2863502 4.95411212,11.9869123 5.13766364,11.8036941 L6.13675278,10.8053827 C6.32097095,10.6214979 6.61940883,10.6214979 6.80296035,10.8053827 L9.65578649,13.6770974 L15.1948869,8.13766364 C15.3784384,7.95411212 15.6767652,7.95411212 15.8617611,8.13766364 L16.8609614,9.13741943 C17.0462906,9.32141538 17.0462906,9.62085324 16.8612947,9.80440476" id="Fill-1"></path>\n' +
        '            </g>\n' +
        '        </g>\n' +
        '    </g>\n' +
        '</svg>')
    );
    this.matIconRegistry.addSvgIconLiteral(
      'BP_INSTANCE_CREATED',
      this.domSanitizer.bypassSecurityTrustHtml('<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n' +
        '<svg width="12px" height="16px" viewBox="0 0 12 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n' +
        '    <!-- Generator: sketchtool 39 (31667) - http://www.bohemiancoding.com/sketch -->\n' +
        '    <title>DA1993B0-7B6B-42BA-814D-097AD18D0114</title>\n' +
        '    <desc>Created with sketchtool.</desc>\n' +
        '    <defs></defs>\n' +
        '    <g id="Case-Management-" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n' +
        '        <g id="8.-Tibco-Case-Management---Detail-Page--collapsed" transform="translate(-75.000000, -366.000000)">\n' +
        '            <g id="location" transform="translate(69.000000, 362.000000)">\n' +
        '                <g id="Group-3" transform="translate(6.000000, 4.000000)">\n' +
        '                    <g id="Page-1">\n' +
        '                        <path d="M5.66894679,7.39006239 C4.65859817,7.39006239 3.83966239,6.57112661 3.83966239,5.56077798 C3.83966239,4.55057615 4.65859817,3.73164037 5.66894679,3.73164037 C6.67929541,3.73164037 7.49823119,4.55057615 7.49823119,5.56077798 C7.49823119,6.57112661 6.67929541,7.39006239 5.66894679,7.39006239 M9.53346055,1.69626422 L9.53346055,1.69626422 C7.36949725,-0.467699083 3.8608,-0.467699083 1.69654312,1.69626422 C-0.253401835,3.64620917 -0.472998165,7.3178422 1.18190092,9.52408073 L5.61492844,15.9264294 L10.0481028,9.52408073 C11.702855,7.3178422 11.4834055,3.64620917 9.53346055,1.69626422" id="Fill-1" fill="#0081CB"></path>\n' +
        '                        <path d="M5.66894679,7.39006239 C4.65859817,7.39006239 3.83966239,6.57112661 3.83966239,5.56077798 C3.83966239,4.55057615 4.65859817,3.73164037 5.66894679,3.73164037 C6.67929541,3.73164037 7.49823119,4.55057615 7.49823119,5.56077798 C7.49823119,6.57112661 6.67929541,7.39006239 5.66894679,7.39006239 L5.66894679,7.39006239 Z M9.53346055,1.69626422 L9.53346055,1.69626422 C7.36949725,-0.467699083 3.8608,-0.467699083 1.69654312,1.69626422 C-0.253401835,3.64620917 -0.472998165,7.3178422 1.18190092,9.52408073 L5.61492844,15.9264294 L10.0481028,9.52408073 C11.702855,7.3178422 11.4834055,3.64620917 9.53346055,1.69626422 L9.53346055,1.69626422 Z" id="Stroke-3"></path>\n' +
        '                    </g>\n' +
        '                </g>\n' +
        '            </g>\n' +
        '        </g>\n' +
        '    </g>\n' +
        '</svg>')
    );
    this.matIconRegistry.addSvgIconLiteral(
      'BP_TASK_COMPLETED',
      this.domSanitizer.bypassSecurityTrustHtml('<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n' +
        '<svg width="12px" height="9px" viewBox="0 0 12 9" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n' +
        '    <!-- Generator: sketchtool 39 (31667) - http://www.bohemiancoding.com/sketch -->\n' +
        '    <title>6FF6D773-32D5-44FF-9BA8-ED1ACBAF56A8</title>\n' +
        '    <desc>Created with sketchtool.</desc>\n' +
        '    <defs></defs>\n' +
        '    <g id="Case-Management-" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n' +
        '        <g id="8.-Tibco-Case-Management---Detail-Page--collapsed" transform="translate(-73.000000, -753.000000)" fill="#58A400">\n' +
        '            <g id="check" transform="translate(68.000000, 745.000000)">\n' +
        '                <path d="M16.8612947,9.80440476 L9.9853348,16.6789202 C9.80100552,16.8624718 9.50267875,16.8624718 9.31912723,16.6789202 L5.13766364,12.4706795 C4.95411212,12.2863502 4.95411212,11.9869123 5.13766364,11.8036941 L6.13675278,10.8053827 C6.32097095,10.6214979 6.61940883,10.6214979 6.80296035,10.8053827 L9.65578649,13.6770974 L15.1948869,8.13766364 C15.3784384,7.95411212 15.6767652,7.95411212 15.8617611,8.13766364 L16.8609614,9.13741943 C17.0462906,9.32141538 17.0462906,9.62085324 16.8612947,9.80440476" id="Fill-1"></path>\n' +
        '            </g>\n' +
        '        </g>\n' +
        '    </g>\n' +
        '</svg>')
    );
    this.matIconRegistry.addSvgIconLiteral(
      'BP_TASK_CREATED',
      this.domSanitizer.bypassSecurityTrustHtml('<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n' +
        '<svg width="12px" height="16px" viewBox="0 0 12 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n' +
        '    <!-- Generator: sketchtool 39 (31667) - http://www.bohemiancoding.com/sketch -->\n' +
        '    <title>DA1993B0-7B6B-42BA-814D-097AD18D0114</title>\n' +
        '    <desc>Created with sketchtool.</desc>\n' +
        '    <defs></defs>\n' +
        '    <g id="Case-Management-" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n' +
        '        <g id="8.-Tibco-Case-Management---Detail-Page--collapsed" transform="translate(-75.000000, -366.000000)">\n' +
        '            <g id="location" transform="translate(69.000000, 362.000000)">\n' +
        '                <g id="Group-3" transform="translate(6.000000, 4.000000)">\n' +
        '                    <g id="Page-1">\n' +
        '                        <path d="M5.66894679,7.39006239 C4.65859817,7.39006239 3.83966239,6.57112661 3.83966239,5.56077798 C3.83966239,4.55057615 4.65859817,3.73164037 5.66894679,3.73164037 C6.67929541,3.73164037 7.49823119,4.55057615 7.49823119,5.56077798 C7.49823119,6.57112661 6.67929541,7.39006239 5.66894679,7.39006239 M9.53346055,1.69626422 L9.53346055,1.69626422 C7.36949725,-0.467699083 3.8608,-0.467699083 1.69654312,1.69626422 C-0.253401835,3.64620917 -0.472998165,7.3178422 1.18190092,9.52408073 L5.61492844,15.9264294 L10.0481028,9.52408073 C11.702855,7.3178422 11.4834055,3.64620917 9.53346055,1.69626422" id="Fill-1" fill="#0081CB"></path>\n' +
        '                        <path d="M5.66894679,7.39006239 C4.65859817,7.39006239 3.83966239,6.57112661 3.83966239,5.56077798 C3.83966239,4.55057615 4.65859817,3.73164037 5.66894679,3.73164037 C6.67929541,3.73164037 7.49823119,4.55057615 7.49823119,5.56077798 C7.49823119,6.57112661 6.67929541,7.39006239 5.66894679,7.39006239 L5.66894679,7.39006239 Z M9.53346055,1.69626422 L9.53346055,1.69626422 C7.36949725,-0.467699083 3.8608,-0.467699083 1.69654312,1.69626422 C-0.253401835,3.64620917 -0.472998165,7.3178422 1.18190092,9.52408073 L5.61492844,15.9264294 L10.0481028,9.52408073 C11.702855,7.3178422 11.4834055,3.64620917 9.53346055,1.69626422 L9.53346055,1.69626422 Z" id="Stroke-3"></path>\n' +
        '                    </g>\n' +
        '                </g>\n' +
        '            </g>\n' +
        '        </g>\n' +
        '    </g>\n' +
        '</svg>')
    );
    this.matIconRegistry.addSvgIconLiteral(
      'Calculation Task',
      this.domSanitizer.bypassSecurityTrustHtml('<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n' +
        '<svg width="18px" height="18px" viewBox="0 0 16 22" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n' +
        '    <!-- Generator: sketchtool 39 (31667) - http://www.bohemiancoding.com/sketch -->\n' +
        '    <title>icon-ic_calc_task</title>\n' +
        '    <desc>icon-ic_calc_task</desc>\n' +
        '    <defs></defs>\n' +
        '\n' +
        '\t<g id="icon-ic_calc_task" fill="#0081CB">\n' +
        '\t\t<title>icon-ic_calc_task</title>\n' +
        '\t\t<path class="path1" d="M0,1.991155 C0,0.891470458 0.894513756,0 1.99406028,0 L14.0059397,0 C15.1072288,0 16,0.889673948 16,1.991155 L16,20.008845 C16,21.1085295 15.1054862,22 14.0059397,22 L1.99406028,22 C0.892771196,22 0,21.1103261 0,20.008845 L0,1.991155 Z M11.02,7.6 L11.02,10.8933333 L14.3133333,10.8933333 L14.3133333,7.6 L11.02,7.6 Z M6.46,7.6 L6.46,10.8933333 L9.75333333,10.8933333 L9.75333333,7.6 L6.46,7.6 Z M1.9,7.6 L1.9,10.8933333 L5.19333333,10.8933333 L5.19333333,7.6 L1.9,7.6 Z M11.02,12.16 L11.02,15.4533333 L14.3133333,15.4533333 L14.3133333,12.16 L11.02,12.16 Z M6.46,12.16 L6.46,15.4533333 L9.75333333,15.4533333 L9.75333333,12.16 L6.46,12.16 Z M1.9,12.16 L1.9,15.4533333 L5.19333333,15.4533333 L5.19333333,12.16 L1.9,12.16 Z M11.02,16.72 L11.02,20.0133333 L14.3133333,20.0133333 L14.3133333,16.72 L11.02,16.72 Z M6.46,16.72 L6.46,20.0133333 L9.75333333,20.0133333 L9.75333333,16.72 L6.46,16.72 Z M1.9,16.72 L1.9,20.0133333 L5.19333333,20.0133333 L5.19333333,16.72 L1.9,16.72 Z M1.90321615,1.92560547 L1.90321615,6.23227214 L14.4432161,6.23227214 L14.4432161,1.92560547 L1.90321615,1.92560547 Z" id="Combined-Shape"></path>\n' +
        '\t</g>\n' +
        '</svg>\n')
    );
    this.matIconRegistry.addSvgIconLiteral(
      'CM_CASE_CREATED',
      this.domSanitizer.bypassSecurityTrustHtml('<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n' +
        '<svg width="12px" height="16px" viewBox="0 0 12 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n' +
        '    <!-- Generator: sketchtool 39 (31667) - http://www.bohemiancoding.com/sketch -->\n' +
        '    <title>DA1993B0-7B6B-42BA-814D-097AD18D0114</title>\n' +
        '    <desc>Created with sketchtool.</desc>\n' +
        '    <defs></defs>\n' +
        '    <g id="Case-Management-" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n' +
        '        <g id="8.-Tibco-Case-Management---Detail-Page--collapsed" transform="translate(-75.000000, -366.000000)">\n' +
        '            <g id="location" transform="translate(69.000000, 362.000000)">\n' +
        '                <g id="Group-3" transform="translate(6.000000, 4.000000)">\n' +
        '                    <g id="Page-1">\n' +
        '                        <path d="M5.66894679,7.39006239 C4.65859817,7.39006239 3.83966239,6.57112661 3.83966239,5.56077798 C3.83966239,4.55057615 4.65859817,3.73164037 5.66894679,3.73164037 C6.67929541,3.73164037 7.49823119,4.55057615 7.49823119,5.56077798 C7.49823119,6.57112661 6.67929541,7.39006239 5.66894679,7.39006239 M9.53346055,1.69626422 L9.53346055,1.69626422 C7.36949725,-0.467699083 3.8608,-0.467699083 1.69654312,1.69626422 C-0.253401835,3.64620917 -0.472998165,7.3178422 1.18190092,9.52408073 L5.61492844,15.9264294 L10.0481028,9.52408073 C11.702855,7.3178422 11.4834055,3.64620917 9.53346055,1.69626422" id="Fill-1" fill="#0081CB"></path>\n' +
        '                        <path d="M5.66894679,7.39006239 C4.65859817,7.39006239 3.83966239,6.57112661 3.83966239,5.56077798 C3.83966239,4.55057615 4.65859817,3.73164037 5.66894679,3.73164037 C6.67929541,3.73164037 7.49823119,4.55057615 7.49823119,5.56077798 C7.49823119,6.57112661 6.67929541,7.39006239 5.66894679,7.39006239 L5.66894679,7.39006239 Z M9.53346055,1.69626422 L9.53346055,1.69626422 C7.36949725,-0.467699083 3.8608,-0.467699083 1.69654312,1.69626422 C-0.253401835,3.64620917 -0.472998165,7.3178422 1.18190092,9.52408073 L5.61492844,15.9264294 L10.0481028,9.52408073 C11.702855,7.3178422 11.4834055,3.64620917 9.53346055,1.69626422 L9.53346055,1.69626422 Z" id="Stroke-3"></path>\n' +
        '                    </g>\n' +
        '                </g>\n' +
        '            </g>\n' +
        '        </g>\n' +
        '    </g>\n' +
        '</svg>')
    );
    this.matIconRegistry.addSvgIconLiteral(
      'CM_CASE_UPDATED',
      this.domSanitizer.bypassSecurityTrustHtml('<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n' +
        '<svg width="13px" height="12px" viewBox="0 0 13 12" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n' +
        '    <!-- Generator: sketchtool 39 (31667) - http://www.bohemiancoding.com/sketch -->\n' +
        '    <title>FBF578C4-F30A-4646-A5DA-0753816A90AE</title>\n' +
        '    <desc>Created with sketchtool.</desc>\n' +
        '    <defs></defs>\n' +
        '    <g id="Case-Management-" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n' +
        '        <g id="8.-Tibco-Case-Management---Detail-Page--collapsed" transform="translate(-75.000000, -424.000000)" fill="#0081CB">\n' +
        '            <g id="Edit-icon" transform="translate(69.000000, 418.000000)">\n' +
        '                <path d="M6.00682619,17.6598257 C5.96218426,17.8607372 6.14357915,18.0407641 6.34451344,17.9919042 L9.07799944,17.329138 L6.62636407,14.8761346 L6.00682619,17.6598257 Z M17.8128382,7.41103724 L16.7188829,6.31708196 C16.296107,5.89430601 15.6096062,5.89430601 15.1853939,6.31708196 L14.1374941,7.36498172 L16.5905203,9.81800788 L17.8128382,8.59568996 C18.1407444,8.26776101 18.1407444,7.73894338 17.8128382,7.41103724 L17.8128382,7.41103724 Z M13.4984397,8.0026454 L15.9514658,10.4556488 L9.74217924,16.6649354 L7.29054387,14.211932 L13.4984397,8.0026454 Z" id="Fill-1"></path>\n' +
        '            </g>\n' +
        '        </g>\n' +
        '    </g>\n' +
        '</svg>')
    );
    this.matIconRegistry.addSvgIconLiteral(
      'CM_CASE_UPDATED_STATE_CHANGED',
      this.domSanitizer.bypassSecurityTrustHtml('<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n' +
        '<svg width="14px" height="12px" viewBox="0 0 14 12" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n' +
        '    <!-- Generator: sketchtool 39 (31667) - http://www.bohemiancoding.com/sketch -->\n' +
        '    <title>2E4A2B33-18E9-42A0-857D-D8F21B671B64</title>\n' +
        '    <desc>Created with sketchtool.</desc>\n' +
        '    <defs></defs>\n' +
        '    <g id="Case-Management-" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n' +
        '        <g id="8.-Tibco-Case-Management---Detail-Page--collapsed" transform="translate(-75.000000, -643.000000)" fill="#0081CB">\n' +
        '            <g id="change" transform="translate(69.000000, 636.000000)">\n' +
        '                <g id="task-complete" transform="translate(6.000000, 7.000000)">\n' +
        '                    <g id="Capa_1">\n' +
        '                        <g id="change-icon">\n' +
        '                            <path d="M6.0006733,6.2048608 C6.22449716,5.67444886 6.41423864,5.25835227 6.56997443,4.95662216 C6.68676989,4.7327983 6.79635511,4.54420739 6.89855114,4.39090057 C7.00064489,4.23759375 7.12482955,4.08794318 7.27077273,3.94197443 C7.41689489,3.79595455 7.58469886,3.68634375 7.77459375,3.6134233 C7.96428409,3.54042614 8.1759375,3.50391477 8.40965625,3.50391477 L10.2782812,3.50391477 L10.2782812,4.90551136 C10.2782812,4.96876705 10.3013693,5.02355966 10.347571,5.0697358 C10.3937727,5.11598864 10.4485398,5.1390767 10.5117187,5.1390767 C10.5799602,5.1390767 10.6359545,5.11724148 10.6795227,5.07341761 L13.0155597,2.73753409 C13.0594858,2.69368466 13.0813466,2.63779261 13.0813466,2.56962784 C13.0813466,2.50146307 13.0594858,2.44554545 13.0155597,2.40154261 L10.6868864,0.07284375 C10.6286165,0.0242130682 10.5699886,0 10.5116932,0 C10.4434517,0 10.3876108,0.0218607955 10.3437102,0.0657102273 C10.300142,0.109508523 10.2782557,0.165426136 10.2782557,0.233565341 L10.2782557,1.63505966 L8.40963068,1.63505966 C8.078625,1.63505966 7.76720455,1.67530398 7.4751392,1.75558807 C7.18307386,1.83587216 6.9238892,1.93801705 6.69763636,2.06217614 C6.47130682,2.18628409 6.25234091,2.3529375 6.0406108,2.56223864 C5.82890625,2.7714375 5.64880398,2.97347727 5.50045739,3.16812784 C5.35205966,3.36272727 5.19627273,3.60603409 5.03327557,3.89807386 C4.87030398,4.1900625 4.73888352,4.44559091 4.63911648,4.66455682 C4.53932386,4.88357386 4.41889773,5.15367614 4.27778693,5.4748892 C4.05388636,6.0053267 3.86409375,6.42147443 3.70838352,6.72317898 C3.59161364,6.94700284 3.48202841,7.13564489 3.37990909,7.28892614 C3.27773864,7.44223295 3.15355398,7.59185795 3.00758523,7.7378267 C2.86156534,7.88394886 2.69365909,7.99348295 2.50386648,8.06648011 C2.314125,8.1394517 2.10236932,8.1760142 1.86880398,8.1760142 L0.233667614,8.1760142 C0.165502841,8.1760142 0.109508523,8.19772159 0.0657613636,8.24162216 C0.0220653409,8.28536932 0.000102272727,8.34121023 0.000102272727,8.40942614 L0.000102272727,9.81115057 C0.000102272727,9.87923864 0.0221420455,9.93523295 0.0659403409,9.97913352 C0.109764205,10.0229063 0.165784091,10.044767 0.233846591,10.044767 L1.86903409,10.044767 C2.20003977,10.044767 2.51143466,10.0045227 2.80347443,9.9241875 C3.09546307,9.84385227 3.3546733,9.74165625 3.58090057,9.61759943 C3.80725568,9.49344034 4.02622159,9.3267358 4.23792614,9.11743466 C4.44957955,8.9083125 4.62973295,8.70619602 4.77813068,8.51162216 C4.92647727,8.31692045 5.08223864,8.07366477 5.24528693,7.7817017 C5.40825852,7.4896108 5.53973011,7.23413352 5.63944602,7.01519318 C5.73913636,6.79617614 5.85953693,6.52615057 6.0006733,6.2048608" id="Fill-1"></path>\n' +
        '                            <path d="M0.233565341,3.50383807 L1.86875284,3.50383807 C2.08288636,3.50383807 2.28116761,3.53914773 2.46369886,3.60976705 C2.64623011,3.68038636 2.79951136,3.76550284 2.92359375,3.86532102 C3.0477017,3.9651392 3.17178409,4.10256818 3.29589205,4.2777358 C3.41997443,4.45300568 3.51853977,4.60756534 3.59153693,4.7413125 C3.66448295,4.8751875 3.75450852,5.05163352 3.86158807,5.27059943 C4.23639205,4.38975 4.5696733,3.72546307 4.8616875,3.27773864 C4.08303409,2.18278125 3.0853892,1.63521307 1.86872727,1.63521307 L0.233565341,1.63521307 C0.165400568,1.63521307 0.10940625,1.65707386 0.0656590909,1.7009233 C0.0219630682,1.74467045 0,1.80058807 0,1.86875284 L0,3.27034943 C0,3.33853977 0.0218607955,3.39438068 0.0656590909,3.43815341 C0.109508523,3.48200284 0.165502841,3.50383807 0.233565341,3.50383807" id="Fill-3"></path>\n' +
        '                            <path d="M10.6870653,6.61382386 C10.6286165,6.56519318 10.5701676,6.54103125 10.5117188,6.54103125 C10.4436563,6.54103125 10.3876364,6.56281534 10.3439148,6.6066392 C10.3001676,6.65038636 10.2783068,6.70638068 10.2783068,6.77444318 L10.2783068,8.17616761 L8.40950284,8.17616761 C8.19529261,8.17616761 7.99703693,8.14080682 7.81450568,8.07013636 C7.63197443,7.99959375 7.47866761,7.91447727 7.3546108,7.81463352 C7.23063068,7.71489205 7.10647159,7.5773608 6.9823892,7.40209091 C6.85823011,7.22689773 6.75961364,7.0723125 6.68664205,6.93841193 C6.61372159,6.80479261 6.52369602,6.62814205 6.41661648,6.40932955 C6.04191477,7.28526989 5.71103693,7.94955682 5.42385511,8.40219034 C5.55519886,8.59195739 5.69147727,8.76109091 5.83261364,8.90941193 C5.97369886,9.05780966 6.10757386,9.18800284 6.23408523,9.29999148 C6.36062216,9.4118267 6.5041875,9.50929261 6.66475568,9.59187784 C6.82540057,9.67464205 6.96646023,9.74395739 7.08824148,9.79997727 C7.21022727,9.85594602 7.36335511,9.90094602 7.54821307,9.93505398 C7.73309659,9.96900852 7.88883239,9.99473011 8.01536932,10.0115284 C8.14188068,10.0285057 8.31469602,10.0407528 8.5336875,10.0481165 C8.75260227,10.0554545 8.93025,10.0577301 9.066375,10.0554545 C9.20278125,10.053 9.39991193,10.050392 9.65786932,10.0481165 C9.9158267,10.0457386 10.1226733,10.0444347 10.2784347,10.0444347 L10.2784347,11.4460568 C10.2784347,11.5093125 10.3015227,11.5640795 10.3477244,11.6102812 C10.3939261,11.6565085 10.4486932,11.6795966 10.5118722,11.6795966 C10.5801136,11.6795966 10.636108,11.6577358 10.6796761,11.6139886 L13.0157131,9.27813068 C13.0594602,9.23420455 13.081321,9.1783892 13.081321,9.11014773 C13.081321,9.04198295 13.0594602,8.98606534 13.0155341,8.94234375 L10.6870653,6.61382386 Z" id="Fill-5"></path>\n' +
        '                        </g>\n' +
        '                    </g>\n' +
        '                </g>\n' +
        '            </g>\n' +
        '        </g>\n' +
        '    </g>\n' +
        '</svg>')
    );
    this.matIconRegistry.addSvgIconLiteral(
      'Email Task',
      this.domSanitizer.bypassSecurityTrustHtml('<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n' +
        '<svg width="10px" height="12px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n' +
        '    <!-- Generator: sketchtool 39 (31667) - http://www.bohemiancoding.com/sketch -->\n' +
        '    <title>icon-ic_email_task</title>\n' +
        '    <desc>icon-ic_email_task</desc>\n' +
        '    <defs></defs>\n' +
        '\n' +
        '\t<g id="icon-ic_email_task" fill="#0081CB">\n' +
        '\t\t<title>icon-ic_email_task</title>\n' +
        '\t\t<path class="path1" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" ></path>\n' +
        '\t</g>\n' +
        '</svg>\n')
    );
    this.matIconRegistry.addSvgIconLiteral(
      'ERROR',
      this.domSanitizer.bypassSecurityTrustHtml('<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n' +
        '<svg width="4px" height="13px" viewBox="0 0 4 13" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n' +
        '    <!-- Generator: sketchtool 39 (31667) - http://www.bohemiancoding.com/sketch -->\n' +
        '    <title>D5AA7459-8549-4B01-9408-40A6047FEBD2</title>\n' +
        '    <desc>Created with sketchtool.</desc>\n' +
        '    <defs></defs>\n' +
        '    <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" font-size="16" font-family="SourceSansPro-Black, Source Sans Pro" font-weight="700">\n' +
        '        <g id="horizontal-stepper" transform="translate(-1017.000000, -46.000000)">\n' +
        '            <g id="Group-2">\n' +
        '                <g transform="translate(180.000000, 0.000000)">\n' +
        '                    <g id="error" transform="translate(820.000000, 10.000000)">\n' +
        '                        <text id="!">\n' +
        '                            <tspan x="16" y="48" fill="#E60000">!</tspan>\n' +
        '                            <tspan x="21.76" y="48" fill="#FEFCFC"> </tspan>\n' +
        '                        </text>\n' +
        '                    </g>\n' +
        '                </g>\n' +
        '            </g>\n' +
        '        </g>\n' +
        '    </g>\n' +
        '</svg>')
    );
    this.matIconRegistry.addSvgIconLiteral(
      'TCI Task',
      this.domSanitizer.bypassSecurityTrustHtml('<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n' +
        '<svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n' +
        '    <!-- Generator: sketchtool 39 (31667) - http://www.bohemiancoding.com/sketch -->\n' +
        '    <title>icon-ic_tci_service_task</title>\n' +
        '    <desc>icon-ic_tci_service_task</desc>\n' +
        '    <defs></defs>\n' +
        '\n' +
        '\t<g id="icon-ic_tci_service_task" fill="#0081CB">\n' +
        '\t\t<title>icon-ic_tci_service_task</title>\n' +
        '\t\t<path class="path1"\n' +
        '\t\t\t  d="M19.6,2.4H2.4c-1,0-1.9,0.9-1.9,1.9v13.4c0,1,0.9,1.9,1.9,1.9h17.2c1,0,1.9-0.9,1.9-1.9V4.3C21.5,3.3,20.6,2.4,19.6,2.4z M7.2,15.8v3.8H5.3v-3.8H2.4L6.2,12l3.8,3.8H7.2z M11,10H2.4V8.1H11V10z M11,6.2H2.4V4.3H11V6.2zM15.9,18.6L12,14.8h2.9V11h1.9v3.8h2.9L15.9,18.6z"></path>\n' +
        '\t</g>\n' +
        '</svg>')
    );
    this.matIconRegistry.addSvgIconLiteral(
      'User Task',
      this.domSanitizer.bypassSecurityTrustHtml('<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n' +
        '<svg width="32px" height="32px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n' +
        '    <!-- Generator: sketchtool 39 (31667) - http://www.bohemiancoding.com/sketch -->\n' +
        '    <title>icon-ic_person</title>\n' +
        '    <desc>icon-ic_person</desc>\n' +
        '    <defs></defs>\n' +
        '\n' +
        '\t<g id="icon-ic_person" fill="#0081CB">\n' +
        '\t\t<title>ic_person</title>\n' +
        '\t\t<path class="path1"\n' +
        '\t\t\t  d="M16 16c2.947 0 5.333-2.387 5.333-5.333s-2.387-5.333-5.333-5.333-5.333 2.387-5.333 5.333 2.387 5.333 5.333 5.333zM16 18.667c-3.56 0-10.667 1.787-10.667 5.333v2.667h21.333v-2.667c0-3.547-7.107-5.333-10.667-5.333z"></path>\n' +
        '\t</g>\n' +
        '</svg>\n')
    );
    this.matIconRegistry.addSvgIconLiteral(
      'WR_FOLDER_ARTIFACT_CREATED',
      this.domSanitizer.bypassSecurityTrustHtml('<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n' +
        '<svg width="12px" height="16px" viewBox="0 0 12 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n' +
        '    <!-- Generator: sketchtool 39 (31667) - http://www.bohemiancoding.com/sketch -->\n' +
        '    <title>DA1993B0-7B6B-42BA-814D-097AD18D0114</title>\n' +
        '    <desc>Created with sketchtool.</desc>\n' +
        '    <defs></defs>\n' +
        '    <g id="Case-Management-" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n' +
        '        <g id="8.-Tibco-Case-Management---Detail-Page--collapsed" transform="translate(-75.000000, -366.000000)">\n' +
        '            <g id="location" transform="translate(69.000000, 362.000000)">\n' +
        '                <g id="Group-3" transform="translate(6.000000, 4.000000)">\n' +
        '                    <g id="Page-1">\n' +
        '                        <path d="M5.66894679,7.39006239 C4.65859817,7.39006239 3.83966239,6.57112661 3.83966239,5.56077798 C3.83966239,4.55057615 4.65859817,3.73164037 5.66894679,3.73164037 C6.67929541,3.73164037 7.49823119,4.55057615 7.49823119,5.56077798 C7.49823119,6.57112661 6.67929541,7.39006239 5.66894679,7.39006239 M9.53346055,1.69626422 L9.53346055,1.69626422 C7.36949725,-0.467699083 3.8608,-0.467699083 1.69654312,1.69626422 C-0.253401835,3.64620917 -0.472998165,7.3178422 1.18190092,9.52408073 L5.61492844,15.9264294 L10.0481028,9.52408073 C11.702855,7.3178422 11.4834055,3.64620917 9.53346055,1.69626422" id="Fill-1" fill="#0081CB"></path>\n' +
        '                        <path d="M5.66894679,7.39006239 C4.65859817,7.39006239 3.83966239,6.57112661 3.83966239,5.56077798 C3.83966239,4.55057615 4.65859817,3.73164037 5.66894679,3.73164037 C6.67929541,3.73164037 7.49823119,4.55057615 7.49823119,5.56077798 C7.49823119,6.57112661 6.67929541,7.39006239 5.66894679,7.39006239 L5.66894679,7.39006239 Z M9.53346055,1.69626422 L9.53346055,1.69626422 C7.36949725,-0.467699083 3.8608,-0.467699083 1.69654312,1.69626422 C-0.253401835,3.64620917 -0.472998165,7.3178422 1.18190092,9.52408073 L5.61492844,15.9264294 L10.0481028,9.52408073 C11.702855,7.3178422 11.4834055,3.64620917 9.53346055,1.69626422 L9.53346055,1.69626422 Z" id="Stroke-3"></path>\n' +
        '                    </g>\n' +
        '                </g>\n' +
        '            </g>\n' +
        '        </g>\n' +
        '    </g>\n' +
        '</svg>')
    );
    this.matIconRegistry.addSvgIconLiteral(
      'WR_FOLDER_ARTIFACT_DELETED',
      this.domSanitizer.bypassSecurityTrustHtml('<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n' +
        '<svg width="4px" height="13px" viewBox="0 0 4 13" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n' +
        '    <!-- Generator: sketchtool 39 (31667) - http://www.bohemiancoding.com/sketch -->\n' +
        '    <title>D5AA7459-8549-4B01-9408-40A6047FEBD2</title>\n' +
        '    <desc>Created with sketchtool.</desc>\n' +
        '    <defs></defs>\n' +
        '    <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" font-size="16" font-family="SourceSansPro-Black, Source Sans Pro" font-weight="700">\n' +
        '        <g id="horizontal-stepper" transform="translate(-1017.000000, -46.000000)">\n' +
        '            <g id="Group-2">\n' +
        '                <g transform="translate(180.000000, 0.000000)">\n' +
        '                    <g id="error" transform="translate(820.000000, 10.000000)">\n' +
        '                        <text id="!">\n' +
        '                            <tspan x="16" y="48" fill="#E60000">!</tspan>\n' +
        '                            <tspan x="21.76" y="48" fill="#FEFCFC"> </tspan>\n' +
        '                        </text>\n' +
        '                    </g>\n' +
        '                </g>\n' +
        '            </g>\n' +
        '        </g>\n' +
        '    </g>\n' +
        '</svg>')
    );
    this.matIconRegistry.addSvgIconLiteral(
      'WR_FOLDER_ARTIFACT_UPDATED',
      this.domSanitizer.bypassSecurityTrustHtml('<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n' +
        '<svg width="13px" height="12px" viewBox="0 0 13 12" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n' +
        '    <!-- Generator: sketchtool 39 (31667) - http://www.bohemiancoding.com/sketch -->\n' +
        '    <title>FBF578C4-F30A-4646-A5DA-0753816A90AE</title>\n' +
        '    <desc>Created with sketchtool.</desc>\n' +
        '    <defs></defs>\n' +
        '    <g id="Case-Management-" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n' +
        '        <g id="8.-Tibco-Case-Management---Detail-Page--collapsed" transform="translate(-75.000000, -424.000000)" fill="#0081CB">\n' +
        '            <g id="Edit-icon" transform="translate(69.000000, 418.000000)">\n' +
        '                <path d="M6.00682619,17.6598257 C5.96218426,17.8607372 6.14357915,18.0407641 6.34451344,17.9919042 L9.07799944,17.329138 L6.62636407,14.8761346 L6.00682619,17.6598257 Z M17.8128382,7.41103724 L16.7188829,6.31708196 C16.296107,5.89430601 15.6096062,5.89430601 15.1853939,6.31708196 L14.1374941,7.36498172 L16.5905203,9.81800788 L17.8128382,8.59568996 C18.1407444,8.26776101 18.1407444,7.73894338 17.8128382,7.41103724 L17.8128382,7.41103724 Z M13.4984397,8.0026454 L15.9514658,10.4556488 L9.74217924,16.6649354 L7.29054387,14.211932 L13.4984397,8.0026454 Z" id="Fill-1"></path>\n' +
        '            </g>\n' +
        '        </g>\n' +
        '    </g>\n' +
        '</svg>')
    );
    this.matIconRegistry.addSvgIconLiteral(
      'AuditSafe Task',
      this.domSanitizer.bypassSecurityTrustHtml('<svg xmlns="http://www.w3.org/2000/svg" width="17" height="20" viewBox="0 0 17 20">\n' +
        '  <path fill="#0081CB" d="M8.18181818,20 C3.49090909,18.8545455 0,14.1363636 0,9.09090909 L0,0 C1.85406953,0.606060606 3.38118361,0.909090909 4.58134225,0.909090909 C5.7815009,0.909090909 6.98165954,0.606060606 8.18181818,3.67564428e-16 C9.12173722,0.606060606 10.3441345,0.909090909 11.8490099,0.909090909 C13.3538854,0.909090909 14.8587609,0.606060606 16.3636364,0 L16.3636364,9.09090909 C16.3636364,14.1363636 12.8727273,18.8545455 8.18181818,20 Z M8.18181818,18.1818182 C11.5909091,17.2727273 14.5454545,13.2181818 14.5454545,9.29090909 L14.5454545,2.09090909 L3.48421678,14.5663657 C3.9802662,15.2961162 4.61784565,15.9703577 5.39695512,16.5890903 C6.17606458,17.2078229 7.10435227,17.7387322 8.18181818,18.1818182 Z"/>\n' +
        '</svg>\n')
    );
    this.matIconRegistry.addSvgIconLiteral(
      'round',
      this.domSanitizer.bypassSecurityTrustHtml('<svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">\n' +
        '    <path d="M0 0h24v24H0z" fill="none"/>\n' +
        '    <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>\n' +
        '</svg>')
    );
    // *JS*?
    this.matIconRegistry.addSvgIconLiteral(
      'tcpd-database-blue',
      this.domSanitizer.bypassSecurityTrustHtml('<svg id="ic-database" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24">\n' +
        '  <defs>\n' +
        '    <style>\n' +
        '      .cls-1 {\n' +
        '        fill: none;\n' +
        '        clip-rule: evenodd;\n' +
        '      }\n' +
        '\n' +
        '      .cls-2 {\n' +
        '        clip-path: url(#clip-path);\n' +
        '      }\n' +
        '\n' +
        '      .cls-3 {\n' +
        '        clip-path: url(#clip-path-2);\n' +
        '      }\n' +
        '\n' +
        '      .cls-4 {\n' +
        '        fill: #0081cb;\n' +
        '      }\n' +
        '    </style>\n' +
        '    <clipPath id="clip-path">\n' +
        '      <path class="cls-1" d="M-284,390.5h-12a2.49,2.49,0,0,1-1.76-.73,2.49,2.49,0,0,1-.73-1.76V376a2.49,2.49,0,0,1,.73-1.76,2.49,2.49,0,0,1,1.76-.73h12a2.49,2.49,0,0,1,1.76.73,2.49,2.49,0,0,1,.73,1.76v12a2.49,2.49,0,0,1-.73,1.76A2.49,2.49,0,0,1-284,390.5Z"/>\n' +
        '    </clipPath>\n' +
        '    <clipPath id="clip-path-2">\n' +
        '      <path class="cls-1" d="M-298,376a2,2,0,0,1,2-2h12a2,2,0,0,1,2,2v12a2,2,0,0,1-2,2h-12a2,2,0,0,1-2-2Zm-10-12h36v36h-36Z"/>\n' +
        '    </clipPath>\n' +
        '  </defs>\n' +
        '  <title>ic-database-blue</title>\n' +
        '  <g>\n' +
        '    <ellipse class="cls-4" cx="12" cy="5" rx="9" ry="3"/>\n' +
        '    <path class="cls-4" d="M12,10C7,10,3,8.66,3,7v5c0,1.66,4,3,9,3s9-1.34,9-3V7C21,8.66,17,10,12,10Z"/>\n' +
        '    <path class="cls-4" d="M12,17c-5,0-9-1.34-9-3v5c0,1.66,4,3,9,3s9-1.34,9-3V14C21,15.66,17,17,12,17Z"/>\n' +
        '  </g>\n' +
        '</svg>\n')
    );
  }
}
