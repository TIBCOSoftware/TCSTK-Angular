import { NgModule } from '@angular/core';
import {TcLiveappsLibModule} from 'tc-liveapps-lib';
import {
  MatButtonModule, MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule, MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule, MatMenuModule, MatOptionModule, MatSelectModule, MatSnackBarModule, MatTabsModule, MatTooltipModule
} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
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
import {TcCoreLibModule} from 'tc-core-lib';
import { HomeCockpitComponent } from './components/home-cockpit/home-cockpit.component';


@NgModule({
  declarations: [FileToServiceComponent, UploadPageComponent, SelectServiceDisplayComponent, PreviewDataDialogComponent, HomeCockpitComponent],
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
    MatButtonToggleModule,
    MatSnackBarModule,
    FormsModule,
    FlexLayoutModule,
    ColorPickerModule,
    ScrollingModule,
    ReactiveFormsModule,
    TcLiveappsLibModule,
    TcCoreLibModule
  ],
  entryComponents : [PreviewDataDialogComponent],
  exports: [ FileToServiceComponent, UploadPageComponent, SelectServiceDisplayComponent, PreviewDataDialogComponent, HomeCockpitComponent]
})
export class TcCheckWorkflowMonitorLibModule {}
