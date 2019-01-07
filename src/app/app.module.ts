import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/routes/login/login.component';
import {TibcoCloudLoginComponent} from './components/tibco-cloud-components/tibco-cloud-login/tibco-cloud-login.component';
import {TibcoCloudMultipleSubscriptionComponent} from './components/tibco-cloud-components/tibco-cloud-multiple-subscription/tibco-cloud-multiple-subscription.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule, MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule, MatMenuModule, MatOptionModule,
  MatSelectModule, MatTooltipModule
} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FlexLayoutModule} from '@angular/flex-layout';
import { StarterAppComponent } from './components/routes/starter-app/starter-app.component';
import {AuthGuard} from './guards/auth.guard';
import {LiveAppsSandboxComponent} from './components/tibco-cloud-components/live-apps-sandbox/live-apps-sandbox.component';
import {LiveAppsApplicationsComponent} from './components/tibco-cloud-components/live-apps-applications/live-apps-applications.component';
import {LiveAppsCaseSchemaListComponent} from './components/tibco-cloud-components/live-apps-case-schema-list/live-apps-case-schema-list.component';
import {TibcoCloudNavbarComponent} from './components/tibco-cloud-components/tibco-cloud-navbar/tibco-cloud-navbar.component';
import { HomeComponent } from './components/routes/home/home.component';
import { LiveAppsCaseDataComponent } from './components/tibco-cloud-components/live-apps-case-data/live-apps-case-data.component';
import { CaseComponent } from './components/routes/case/case.component';
import { LiveAppsCaseStatesComponent } from './components/tibco-cloud-components/live-apps-case-states/live-apps-case-states.component';
import { LiveAppsCaseActionsComponent } from './components/tibco-cloud-components/live-apps-case-actions/live-apps-case-actions.component';
import { LiveAppsCaseAuditComponent } from './components/tibco-cloud-components/live-apps-case-audit/live-apps-case-audit.component';
import {LiveAppsCaseStateAuditComponent} from './components/tibco-cloud-components/live-apps-case-state-audit/live-apps-case-state-audit.component';
import { LiveAppsRecentCasesComponent } from './components/tibco-cloud-components/live-apps-recent-cases/live-apps-recent-cases.component';
import { LiveAppsFavoriteCasesComponent } from './components/tibco-cloud-components/live-apps-favorite-cases/live-apps-favorite-cases.component';
import {
  LiveAppsDocumentsComponent,
  LiveAppsDocumentUploadDialogComponent
} from './components/tibco-cloud-components/live-apps-documents/live-apps-documents.component';
import { LiveAppsNotesComponent } from './components/tibco-cloud-components/live-apps-notes/live-apps-notes.component';
import { DurationSincePipe } from './pipes/duration-since.pipe';
import { ReversePipe } from './pipes/reverse.pipe';
import { LiveAppsNotesEditorComponent } from './components/tibco-cloud-components/live-apps-notes-editor/live-apps-notes-editor.component';
import { OrderByDatePipe } from './pipes/order-by-date.pipe';
import { LiveAppsCaseSummaryComponent } from './components/tibco-cloud-components/live-apps-case-summary/live-apps-case-summary.component';
import { EllipsisPipe } from './pipes/ellipsis.pipe';
import { LiveAppsStateIconComponent } from './components/tibco-cloud-components/live-apps-state-icon/live-apps-state-icon.component';
import {RequestCacheService} from './services/request-cache.service';
import {CachingInterceptor} from './interceptors/caching-interceptor';
import { LiveAppsCaseStateConfigComponent } from './components/tibco-cloud-components/live-apps-case-state-config/live-apps-case-state-config.component';

import { ColorPickerModule } from 'ngx-color-picker';
import {
  LiveAppsApplicationConfigurationComponent,
  LiveAppsStateIconUploadDialogComponent
} from './components/tibco-cloud-components/live-apps-application-configuration/live-apps-application-configuration.component';
import { LiveAppsCaseListComponent } from './components/tibco-cloud-components/live-apps-case-list/live-apps-case-list.component';
import { HighlightPipe } from './pipes/highlight.pipe';
import { LiveAppsCaseSearchComponent } from './components/tibco-cloud-components/live-apps-case-search/live-apps-case-search.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TibcoCloudLoginComponent,
    TibcoCloudNavbarComponent,
    TibcoCloudMultipleSubscriptionComponent,
    LiveAppsSandboxComponent,
    LiveAppsApplicationsComponent,
    LiveAppsCaseSchemaListComponent,
    StarterAppComponent,
    HomeComponent,
    LiveAppsCaseDataComponent,
    CaseComponent,
    LiveAppsCaseStatesComponent,
    LiveAppsCaseActionsComponent,
    LiveAppsCaseAuditComponent,
    LiveAppsCaseStateAuditComponent,
    LiveAppsRecentCasesComponent,
    LiveAppsFavoriteCasesComponent,
    LiveAppsDocumentsComponent,
    LiveAppsNotesComponent,
    DurationSincePipe,
    ReversePipe,
    LiveAppsNotesEditorComponent,
    LiveAppsDocumentUploadDialogComponent,
    OrderByDatePipe,
    LiveAppsCaseSummaryComponent,
    EllipsisPipe,
    LiveAppsStateIconComponent,
    LiveAppsCaseStateConfigComponent,
    LiveAppsApplicationConfigurationComponent,
    LiveAppsStateIconUploadDialogComponent,
    LiveAppsCaseListComponent,
    HighlightPipe,
    LiveAppsCaseSearchComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
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
    FormsModule,
    HttpClientModule,
    FlexLayoutModule,
    ColorPickerModule

  ],
  providers: [
    AuthGuard,
    RequestCacheService,
    { provide: HTTP_INTERCEPTORS, useClass: CachingInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
    entryComponents: [
      LiveAppsDocumentUploadDialogComponent,
      LiveAppsStateIconUploadDialogComponent
    ]
})
export class AppModule { }
