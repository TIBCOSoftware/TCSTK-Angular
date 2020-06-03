import { NgModule } from '@angular/core';
import { TcPrimengLibComponent } from './tc-primeng-lib.component';
import { TcprimengLiveappsCasesComponent } from './components/tcprimeng-liveapps-cases/tcprimeng-liveapps-cases.component';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';




@NgModule({
  declarations: [
    TcPrimengLibComponent,
    TcprimengLiveappsCasesComponent
  ],
  imports: [
    CommonModule,
    TableModule
  ],
  exports: [
    TcPrimengLibComponent,
    TcprimengLiveappsCasesComponent
  ]
})
export class TcPrimengLibModule { }
