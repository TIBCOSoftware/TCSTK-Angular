/**
 * @ngdoc component
 * @name OAuthInterceptor
 *
 * @description
 *
 * This interceptor will intercept http calls and add the TSC oauth header
 * Token comes from the oauth config service
 *
 */

import {Inject, Injectable} from '@angular/core';
import {HttpRequest, HttpInterceptor, HttpHandler} from '@angular/common/http';
import {TcCoreConfigService} from '../services/tc-core-config-service';


@Injectable()
export class OAuthInterceptor implements HttpInterceptor {

  constructor(@Inject(TcCoreConfigService) private tcCoreConfig: TcCoreConfigService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let request: HttpRequest<any>;

    // auth header only attached to calls for tibco cloud (start with /)
    if (req.url.startsWith('/')) {
      const oAuthLocalStorageKey = this.tcCoreConfig.getConfig().oAuthLocalStorageKey;
      if (!oAuthLocalStorageKey || oAuthLocalStorageKey === '') {
        console.warn('oAuth interceptor enabled but oAuthLocalStorageKey config not supplied: ', this.tcCoreConfig.getConfig());
      } else {
        let token;
        // for test mode allow access_key to be set in config
        if (oAuthLocalStorageKey.startsWith('CIC~')) {
          console.warn('Using OAUTH key set in config. This should NOT be used for production!');
          token = oAuthLocalStorageKey;
        } else {
          token = localStorage.getItem(oAuthLocalStorageKey);
        }
        if (!token) {
          console.warn('oAuth interceptor enabled but no access_token in local storage key: ', oAuthLocalStorageKey);
        } else {
          // add auth header with bearer token
          const header = { Authorization: 'Bearer ' + token };
          request = req.clone(
            { setHeaders: header }
          );
        }
      }
    }

    if (!request) {
      // don't add header
      request = req.clone();
    }
    return next.handle(request);
  }
}
