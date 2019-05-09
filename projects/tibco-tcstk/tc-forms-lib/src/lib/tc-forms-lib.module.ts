import { NgModule } from '@angular/core';
import { MaterialDesignFrameworkModule } from 'angular6-json-schema-form';
import {RenderedFormComponent} from './components/rendered-form/rendered-form.component';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule, MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule, MatMenuModule, MatOptionModule, MatSelectModule, MatToolbarModule, MatTooltipModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';

@NgModule({
  declarations: [
    RenderedFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatIconModule,
    MatMenuModule,
    MatSelectModule,
    MatToolbarModule,
    MaterialDesignFrameworkModule,
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
    FormsModule,
    FlexLayoutModule,
    ScrollingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    RenderedFormComponent
  ],
  entryComponents: [
  ]
})
export class TcFormsLibModule { }
