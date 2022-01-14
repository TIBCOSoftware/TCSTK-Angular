import {NgModule} from '@angular/core';
import {TcPrimengLibComponent} from './tc-primeng-lib.component';
import {TcprimengLiveappsCasesComponent} from './components/tcprimeng-liveapps-cases/tcprimeng-liveapps-cases.component';
import {CommonModule, DatePipe, CurrencyPipe} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {TableModule} from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';
import {FlexLayoutModule} from '@angular/flex-layout';
import {TcprimengRecentCasesComponent} from './components/tcprimeng-recent-cases/tcprimeng-recent-cases.component';
import {TcLiveappsLibModule} from '@tibcosoftware/tc-liveapps-lib';
import {TcprimengFavoriteCasesComponent} from './components/tcprimeng-favorite-cases/tcprimeng-favorite-cases.component';
import {TcprimengGenericTableComponent} from './components/tcprimeng-generic-table/tcprimeng-generic-table.component';

@NgModule({
  declarations: [
    TcPrimengLibComponent,
    TcprimengLiveappsCasesComponent,
    TcprimengRecentCasesComponent,
    TcprimengFavoriteCasesComponent,
    TcprimengGenericTableComponent
  ],
  imports: [
    TcLiveappsLibModule,
    CommonModule,
    TableModule,
    DropdownModule,
    FlexLayoutModule,
    MatIconModule
  ],
  exports: [
    TcPrimengLibComponent,
    TcprimengLiveappsCasesComponent,
    TcprimengRecentCasesComponent,
    TcprimengFavoriteCasesComponent,
    TcprimengGenericTableComponent
  ],
  providers: [
    DatePipe,
    CurrencyPipe
  ]
})
export class TcPrimengLibModule {
}
