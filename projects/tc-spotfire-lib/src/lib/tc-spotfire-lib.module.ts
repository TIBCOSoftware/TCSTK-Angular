import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {CachingInterceptor, TcCoreLibModule} from 'tc-core-lib';
import {ModuleWithProviders, NgModule} from '@angular/core';
import {TcSpotfireConfigService} from './services/tc-spotfire-config.service';


@NgModule({
  declarations: [
  ],
  imports: [
    TcCoreLibModule
  ],
  exports: [],
  entryComponents: [],
  providers: [
     { provide: HTTP_INTERCEPTORS, useClass: CachingInterceptor, multi: true }
     // { provide: HTTP_INTERCEPTORS, useClass: MockingInterceptor, multi: true }
  ]
})
export class TcSpotfireLibModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: TcSpotfireLibModule,
      providers: [ TcSpotfireConfigService ]
    };
  }
}
