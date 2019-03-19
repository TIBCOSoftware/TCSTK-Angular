import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {CachingInterceptor, TcCoreLibModule} from 'tc-core-lib';
import {ModuleWithProviders, NgModule} from '@angular/core';
import {TcSpotfireConfigService} from './services/tc-spotfire-config.service';
import { McSpotfireWrapperComponent } from './components/mc-spotfire-wrapper/mc-spotfire-wrapper.component';
import { SpotfireViewerModule } from 'spotfire-webplayer'

@NgModule({
  declarations: [
  McSpotfireWrapperComponent],
  imports: [
    TcCoreLibModule,
    SpotfireViewerModule
  ],
  exports: [ McSpotfireWrapperComponent ],
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
