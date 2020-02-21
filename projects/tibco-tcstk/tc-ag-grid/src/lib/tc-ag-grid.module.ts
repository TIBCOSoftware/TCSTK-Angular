import { NgModule } from '@angular/core';
import { TcgridLiveappsCasesComponent } from './components/tcgrid-liveapps-cases/tcgrid-liveapps-cases.component';
import { AgGridModule } from 'ag-grid-angular';
import {TcLiveappsLibModule} from '@tibco-tcstk/tc-liveapps-lib';
import {CommonModule} from '@angular/common';


@NgModule({
  declarations: [TcgridLiveappsCasesComponent],
  imports: [
    AgGridModule.withComponents([]),
    TcLiveappsLibModule,
    CommonModule
  ],
  exports: [TcgridLiveappsCasesComponent]
})
export class TcAgGridModule { }
