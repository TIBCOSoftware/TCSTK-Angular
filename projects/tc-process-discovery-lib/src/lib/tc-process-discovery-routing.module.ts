import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClaimsResolver } from 'tc-liveapps-lib';
import { LaConfigResolver } from 'tc-liveapps-lib';
import { PdProcessMiningComponent } from './components/pd-process-mining/pd-process-mining.component';

const routes: Routes = [
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    // ClaimsResolver,
    // ConfigResolver,
    // LaConfigResolver
    ]
})

export class TcProcessDiscoveryLibRoutingModule {
  }
