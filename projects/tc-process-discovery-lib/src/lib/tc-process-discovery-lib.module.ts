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
import { RecentPdCasesComponent } from './components/recent-pd-cases/recent-pd-cases.component';
import { FileToServiceComponent } from './components/file-to-service/file-to-service.component';
import { PdHomePageComponent } from './components/pd-home-page/pd-home-page.component';
import { SelectServiceDisplayComponent } from './components/select-service-display/select-service-display.component';
import { PreviewDataDialogComponent } from './components/preview-data-dialog/preview-data-dialog.component';
import { NotificationSnackBarComponent } from './components/notification-snack-bar/notification-snack-bar.component';

@NgModule({
  declarations: [RecentPdCasesComponent, FileToServiceComponent, PdHomePageComponent, SelectServiceDisplayComponent, PreviewDataDialogComponent, NotificationSnackBarComponent],
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
    TcLiveappsLibModule
  ],
  entryComponents : [PreviewDataDialogComponent, NotificationSnackBarComponent],
  exports: [RecentPdCasesComponent, FileToServiceComponent, PdHomePageComponent, SelectServiceDisplayComponent, PreviewDataDialogComponent, NotificationSnackBarComponent]
})
export class TcProcessDiscoveryLibModule {

}
