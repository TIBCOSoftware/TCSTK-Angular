import {ModuleWithProviders, NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {
  MatButtonModule,
  MatCardModule, MatCheckboxModule, MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule, MatMenuModule, MatOptionModule,
  MatSelectModule, MatTabsModule, MatTooltipModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {ColorPickerModule} from 'ngx-color-picker';
import {CachingInterceptor} from 'tc-core-lib';
import {RequestCacheService} from 'tc-core-lib';
import {LiveAppsCaseSearchComponent} from './components/live-apps-case-search/live-apps-case-search.component';
import {LiveAppsCaseListComponent} from './components/live-apps-case-list/live-apps-case-list.component';
import {LiveAppsCaseSummaryComponent} from './components/live-apps-case-summary/live-apps-case-summary.component';
import {LiveAppsStateIconComponent} from './components/live-apps-state-icon/live-apps-state-icon.component';
import {LiveAppsSandboxComponent} from './components/live-apps-sandbox/live-apps-sandbox.component';
import {LiveAppsApplicationsComponent} from './components/live-apps-applications/live-apps-applications.component';
import {LiveAppsNotesComponent} from './components/live-apps-notes/live-apps-notes.component';
import {
  LiveAppsDocumentsComponent,
  LiveAppsDocumentUploadDialogComponent
} from './components/live-apps-documents/live-apps-documents.component';
import {LiveAppsCaseStateConfigComponent} from './components/live-apps-case-state-config/live-apps-case-state-config.component';
import {LiveAppsCaseStatesComponent} from './components/live-apps-case-states/live-apps-case-states.component';
import {
  LiveAppsApplicationConfigurationComponent,
  LiveAppsStateIconUploadDialogComponent
} from './components/live-apps-application-configuration/live-apps-application-configuration.component';
import {LiveAppsCaseSchemaListComponent} from './components/live-apps-case-schema-list/live-apps-case-schema-list.component';
import {LiveAppsFavoriteCasesComponent} from './components/live-apps-favorite-cases/live-apps-favorite-cases.component';
import {LiveAppsCaseAuditComponent} from './components/live-apps-case-audit/live-apps-case-audit.component';
import {LiveAppsCaseDataComponent} from './components/live-apps-case-data/live-apps-case-data.component';
import {LiveAppsCaseActionsComponent} from './components/live-apps-case-actions/live-apps-case-actions.component';
import {LiveAppsRecentCasesComponent} from './components/live-apps-recent-cases/live-apps-recent-cases.component';
import {LiveAppsCaseStateAuditComponent} from './components/live-apps-case-state-audit/live-apps-case-state-audit.component';
import {LiveAppsNotesEditorComponent} from './components/live-apps-notes-editor/live-apps-notes-editor.component';
import {LiveAppsService} from './services/live-apps.service';
import { LiveAppsLoginComponent } from './components/live-apps-login/live-apps-login.component';
import { LiveAppsSearchWidgetComponent } from './components/live-apps-search-widget/live-apps-search-widget.component';
import { LiveAppsComponent } from './components/live-apps-component/live-apps-component.component';
import {SpotfireWrapperComponent} from './components/spotfire-wrapper/spotfire-wrapper.component';
import {MockingInterceptor} from 'tc-core-lib';
import { LiveAppsCaseCreatorComponent } from './components/live-apps-case-creator/live-apps-case-creator.component';
import { LiveAppsCreatorSelectorComponent } from './components/live-apps-creator-selector/live-apps-creator-selector.component';
import { LiveAppsCreatorsComponent } from './components/live-apps-creators/live-apps-creators.component';
import { LiveAppsCaseActionComponent } from './components/live-apps-case-action/live-apps-case-action.component';
import { LiveAppsActionsComponent } from './components/live-apps-actions/live-apps-actions.component';
import {TcCoreLibModule} from 'tc-core-lib';
import {TcFormsLibModule} from 'tc-forms-lib';
import {CaseGuard} from './guards/case.guard';
import {TcCaseDataService} from './services/tc-case-data.service';
import { LiveAppsCaseDataDisplayComponent } from './components/live-apps-case-data-display/live-apps-case-data-display.component';
import { LiveAppsCaseCockpitComponent } from './components/live-apps-case-cockpit/live-apps-case-cockpit.component';
import {TcCaseProcessesService} from './services/tc-case-processes.service';

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
    LiveAppsCaseSummaryComponent,
    LiveAppsStateIconComponent,
    LiveAppsCaseStateConfigComponent,
    LiveAppsApplicationConfigurationComponent,
    LiveAppsStateIconUploadDialogComponent,
    LiveAppsCaseListComponent,
    LiveAppsCaseSearchComponent,
    LiveAppsSearchWidgetComponent,
    LiveAppsComponent,
    SpotfireWrapperComponent,
    LiveAppsCaseCreatorComponent,
    LiveAppsCreatorSelectorComponent,
    LiveAppsCreatorsComponent,
    LiveAppsCaseActionComponent,
    LiveAppsActionsComponent,
    LiveAppsCaseDataDisplayComponent,
    LiveAppsCaseCockpitComponent
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
    FormsModule,
    FlexLayoutModule,
    ColorPickerModule,
    ScrollingModule,
    ReactiveFormsModule
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
    LiveAppsCaseSummaryComponent,
    LiveAppsStateIconComponent,
    LiveAppsCaseStateConfigComponent,
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
    SpotfireWrapperComponent,
    LiveAppsCaseDataDisplayComponent,
    LiveAppsCaseCockpitComponent
  ],
  entryComponents: [LiveAppsStateIconUploadDialogComponent, LiveAppsDocumentUploadDialogComponent],
  providers: [
    RequestCacheService,
    CaseGuard,
     { provide: HTTP_INTERCEPTORS, useClass: CachingInterceptor, multi: true }
    // { provide: HTTP_INTERCEPTORS, useClass: MockingInterceptor, multi: true }
  ]
})
export class TcLiveappsLibModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: TcLiveappsLibModule,
      providers: [ LiveAppsService, TcCaseDataService, TcCaseProcessesService ]
    };
  }
}
