import { NgModule } from '@angular/core';
import { TcPrimengLibComponent } from './tc-primeng-lib.component';
import { TcprimengLiveappsCasesComponent } from './components/tcprimeng-liveapps-cases/tcprimeng-liveapps-cases.component';



@NgModule({
  declarations: [TcPrimengLibComponent, TcprimengLiveappsCasesComponent],
  imports: [
  ],
  exports: [TcPrimengLibComponent]
})
export class TcPrimengLibModule { }
