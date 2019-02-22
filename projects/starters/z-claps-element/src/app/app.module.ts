import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { ClapsComponent } from './claps/claps.component';

export const customElements = [
  ClapsComponent
];

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  declarations: [
    customElements
  ],
  entryComponents: [
    customElements
  ]
})
export class AppModule {
  ngDoBootstrap() { }
}
