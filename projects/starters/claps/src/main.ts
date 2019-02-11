import './polyfills';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { registerAsCustomElements } from './@angular/elements';
import { AppModule, customElements } from './app/app.module';

import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';

registerAsCustomElements(customElements, () => {
  return platformBrowserDynamic().bootstrapModule(AppModule);
})
  .then(() => {
    // App is bootstrapped
  }, (error) => {
    // There's a bootstrapping error
  });

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
