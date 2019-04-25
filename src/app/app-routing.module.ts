import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import { CORE_ROUTES } from './route-config/core-route';
import { PROVIDERS } from './route-config/providers';

@NgModule({
  imports: [RouterModule.forRoot(CORE_ROUTES, { useHash: true })],
  // imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: PROVIDERS
})

export class AppRoutingModule {
}

