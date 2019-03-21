import {ModuleWithProviders, NgModule} from '@angular/core';
import {TcLiveappsLibModule} from 'tc-liveapps-lib';
import {
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatOptionModule,
  MatRadioModule,
  MatSelectModule,
  MatSnackBarModule,
  MatPaginatorModule,
  MatTableModule,
  MatTabsModule,
  MatTooltipModule
} from '@angular/material';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ColorPickerModule} from 'ngx-color-picker';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { FileToServiceComponent } from './components/file-to-service/file-to-service.component';
import { UploadPageComponent } from './components/upload-page/upload-page.component';
import { SelectServiceDisplayComponent } from './components/select-service-display/select-service-display.component';
import { PreviewDataDialogComponent } from './components/preview-data-dialog/preview-data-dialog.component';
import {CachingInterceptor, TcCoreLibModule} from 'tc-core-lib';
import { HomeCockpitComponent } from './components/home-cockpit/home-cockpit.component';
import {SettingsCwmServicesComponent} from './components/settings-cwm-services/settings-cwm-services.component';

import {CwmSettingsConfigServiceService} from './services/cwm-settings-config-service.service';
import { ServiceHandlerSnackbarComponent } from './components/service-handler-snackbar/service-handler-snackbar.component';
import {DecisionCockpitComponent} from './components/decision-cockpit/decision-cockpit.component';
import { CreateFileToDownloadComponent } from './components/create-file-to-download/create-file-to-download.component';
import { DoubleListForSelectionComponent } from './components/double-list-for-selection/double-list-for-selection.component';
import { CaseDetailsDialogComponent } from './components/case-details-dialog/case-details-dialog.component';
import { CwmCaseCockpitComponent } from './components/cwm-case-cockpit/cwm-case-cockpit.component';


@NgModule({
  declarations: [FileToServiceComponent, UploadPageComponent, SelectServiceDisplayComponent, PreviewDataDialogComponent, HomeCockpitComponent, SettingsCwmServicesComponent, ServiceHandlerSnackbarComponent, DecisionCockpitComponent, CreateFileToDownloadComponent, DoubleListForSelectionComponent, CaseDetailsDialogComponent, CwmCaseCockpitComponent],
  imports: [
    MatIconModule,
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
    MatTableModule,
    MatButtonToggleModule,
    MatSnackBarModule,
    MatRadioModule,
    FormsModule,
    FlexLayoutModule,
    ColorPickerModule,
    ScrollingModule,
    ReactiveFormsModule,
    TcLiveappsLibModule,
    TcCoreLibModule,
    MatPaginatorModule
  ],
  entryComponents : [PreviewDataDialogComponent, ServiceHandlerSnackbarComponent, CaseDetailsDialogComponent],
  exports: [ FileToServiceComponent, UploadPageComponent, SelectServiceDisplayComponent, PreviewDataDialogComponent, HomeCockpitComponent, SettingsCwmServicesComponent, ServiceHandlerSnackbarComponent, DecisionCockpitComponent, CreateFileToDownloadComponent, DoubleListForSelectionComponent, CaseDetailsDialogComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: CachingInterceptor, multi: true }
    // { provide: HTTP_INTERCEPTORS, useClass: MockingInterceptor, multi: true }
  ]
})
export class TcCheckWorkflowMonitorLibModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: TcCheckWorkflowMonitorLibModule,
      providers: [ CwmSettingsConfigServiceService ]
    };
  }
}




