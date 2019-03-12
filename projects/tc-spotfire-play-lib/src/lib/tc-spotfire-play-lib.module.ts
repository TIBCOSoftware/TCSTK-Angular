import { NgModule } from '@angular/core';
import {TcCoreLibModule} from 'tc-core-lib';
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
  MatTooltipModule, MatPaginatorModule
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
import { DataTableExampleComponent } from './components/data-table-example/data-table-example.component';
import {TcLiveappsLibModule} from 'tc-liveapps-lib';



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
    MatPaginatorModule,
    TcCoreLibModule,
    TcLiveappsLibModule
  ],
  exports: [SpotfirePlayComponent,
            TableComponent,
            MatSortModule,
            SpotfireTabsComponent,
            DataTableExampleComponent
            ]
})
export class TcSpotfirePlayLibModule { }
