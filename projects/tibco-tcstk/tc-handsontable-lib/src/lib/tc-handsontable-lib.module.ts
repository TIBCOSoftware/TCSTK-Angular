import { NgModule } from '@angular/core';
import { HotTableModule } from '@handsontable/angular';
import { TcHandsontableComponent } from './components/tc-handsontable/tc-handsontable.component';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  declarations: [
    TcHandsontableComponent
  ],
  imports: [
    HotTableModule,
    FlexLayoutModule
  ],
  exports: [
    TcHandsontableComponent
  ]
})
export class TcHandsontableLibModule { }
