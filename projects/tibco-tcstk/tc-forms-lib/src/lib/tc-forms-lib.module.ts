import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MaterialDesignFrameworkModule } from '@ajsf/material';
import { Bootstrap4FrameworkModule } from '@ajsf/bootstrap4';
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
import {AceEditorDirective} from './directives/ace-editor.directive';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    RenderedFormComponent,
    AceEditorDirective
  ],
  imports: [
    CommonModule,
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
    Bootstrap4FrameworkModule,
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
  schemas: [ CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    RenderedFormComponent,
    AceEditorDirective
  ],
  entryComponents: [
  ]
})
export class TcFormsLibModule { }
