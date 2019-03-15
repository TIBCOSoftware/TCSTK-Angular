import {ModuleWithProviders, NgModule} from '@angular/core';
import {TibcoCloudNavbarComponent} from './components/tibco-cloud-navbar/tibco-cloud-navbar.component';
import {
  TibcoCloudMultipleSubscriptionComponent
} from './components/tibco-cloud-multiple-subscription/tibco-cloud-multiple-subscription.component';
import {TibcoCloudLoginComponent} from './components/tibco-cloud-login/tibco-cloud-login.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatDialogModule, MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatOptionModule,
  MatPaginatorModule,
  MatSelectModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule, MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {TcSharedStateService} from './services/tc-shared-state.service';
import {RequestCacheService} from './services/request-cache.service';
import {CachingInterceptor} from './interceptors/caching-interceptor';
import {AuthGuard} from './guards/auth.guard';
import {TcCoreCommonFunctions} from './common/tc-core-common-functions';
import {AuthErrorInterceptor} from './interceptors/authentication-error-interceptor';
import {EllipsisPipe} from './pipes/ellipsis.pipe';
import {DurationSincePipe} from './pipes/duration-since.pipe';
import {HighlightPipe} from './pipes/highlight.pipe';
import {OrderByDatePipe} from './pipes/order-by-date.pipe';
import {ReversePipe} from './pipes/reverse.pipe';
import { TibcoCloudWidgetHeaderComponent } from './components/tibco-cloud-widget-header/tibco-cloud-widget-header.component';
import { TibcoCloudMenuBarComponent } from './components/tibco-cloud-menu-bar/tibco-cloud-menu-bar.component';
import {TcButtonsHelperService} from './services/tc-buttons-helper.service';
import {TibcoCloudErrorComponent} from './components/tibco-cloud-error/tibco-cloud-error.component';
import { OnCreateDirective } from './directives/on-create.directive';
import {TcGeneralConfigService} from './services/tc-general-config.service';
import {TibcoCloudTableComponent} from './components/tibco-cloud-table/tibco-cloud-table.component';
import { TibcoCloudSelectTableComponent } from './components/tibco-cloud-select-table/tibco-cloud-select-table.component';
import {TibcoCloudSettingMenuEntryComponent} from './components/tibco-cloud-setting-menu-entry/tibco-cloud-setting-menu-entry.component';
import {TibcoCloudSettingsGeneralComponent} from './components/tibco-cloud-settings-general/tibco-cloud-settings-general.component';
import { TibcoCloudConfigurationComponent } from './components/tibco-cloud-configuration/tibco-cloud-configuration.component';
import {RouterModule} from '@angular/router';


// import {DataSource} from '@angular/cdk/collections';

@NgModule({
  declarations: [
    TibcoCloudNavbarComponent,
    TibcoCloudLoginComponent,
    TibcoCloudMultipleSubscriptionComponent,
    EllipsisPipe,
    DurationSincePipe,
    HighlightPipe,
    OrderByDatePipe,
    ReversePipe,
    TibcoCloudWidgetHeaderComponent,
    TibcoCloudMenuBarComponent,
    TibcoCloudErrorComponent,
    OnCreateDirective,
    TibcoCloudTableComponent,
    TibcoCloudSelectTableComponent,
    TibcoCloudSettingMenuEntryComponent,
    TibcoCloudSettingsGeneralComponent,
    TibcoCloudConfigurationComponent
  ],
  imports: [
    RouterModule,
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
    MatExpansionModule,
    MatButtonModule,
    MatCheckboxModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatSelectModule,
    MatOptionModule,
    MatDialogModule,
    MatMenuModule,
    MatCardModule,
    MatTooltipModule,
    MatTabsModule,
    MatButtonToggleModule,
    FormsModule,
    FlexLayoutModule,
    ScrollingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule
  ],
  exports: [
    TibcoCloudNavbarComponent,
    TibcoCloudLoginComponent,
    TibcoCloudMultipleSubscriptionComponent,
    TibcoCloudMenuBarComponent,
    EllipsisPipe,
    DurationSincePipe,
    HighlightPipe,
    OrderByDatePipe,
    ReversePipe,
    TibcoCloudWidgetHeaderComponent,
    TibcoCloudErrorComponent,
    OnCreateDirective,
    TibcoCloudTableComponent,
    TibcoCloudSelectTableComponent,
    TibcoCloudSettingMenuEntryComponent,
    TibcoCloudSettingsGeneralComponent,
    TibcoCloudConfigurationComponent
  ],
  providers: [
    RequestCacheService,
    TcButtonsHelperService,
    AuthGuard,
    // comment this line to disable the CachingInterceptor
    { provide: HTTP_INTERCEPTORS, useClass: CachingInterceptor, multi: true },
    // error handling interceptor
    { provide: HTTP_INTERCEPTORS, useClass: AuthErrorInterceptor, multi: true }
    // uncomment this line to use the mock service interceptor
    // { provide: HTTP_INTERCEPTORS, useClass: MockingInterceptor, multi: true }
  ]
})

export class TcCoreLibModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: TcCoreLibModule,
      providers: [ TcSharedStateService, TcGeneralConfigService ]
    };
  }
}

