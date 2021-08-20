import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CORE_PROVIDERS, CORE_ROUTES} from './route-config/core-route-config';

@NgModule({
  imports: [RouterModule.forRoot(CORE_ROUTES, { useHash: false, relativeLinkResolution: 'legacy' })],
  // imports: [RouterModule.forRoot(CORE_ROUTES)],
  exports: [RouterModule],
  providers: CORE_PROVIDERS
})

export class AppRoutingModule {
}
