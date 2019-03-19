import { NgModule } from '@angular/core';
import {TcLiveappsLibModule} from 'tc-liveapps-lib';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatOptionModule, MatProgressSpinnerModule,
  MatSelectModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ColorPickerModule} from 'ngx-color-picker';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { SpotfirePlayComponent } from './components/spotfire-play/spotfire-play.component';
import { TableComponent } from './components/table/table.component';
import { SpotfireTabsComponent } from './components/spotfire-tabs/spotfire-tabs.component';
import {TcCoreLibModule} from 'tc-core-lib';
import {DataTableExampleComponent} from './components/data-table-example/data-table-example.component';
import {TcSpotfireLibModule} from 'tc-spotfire-lib';


@NgModule({
  declarations: [SpotfirePlayComponent, TableComponent, SpotfireTabsComponent, DataTableExampleComponent],
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
    FormsModule,
    FlexLayoutModule,
    ColorPickerModule,
    ScrollingModule,
    ReactiveFormsModule,
    TcLiveappsLibModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
    TcCoreLibModule,
    TcSpotfireLibModule
  ],
  exports: [SpotfirePlayComponent,
            TableComponent,
            MatSortModule,
            SpotfireTabsComponent,
            DataTableExampleComponent]
})
export class TcSpotfirePlayLibModule { }
