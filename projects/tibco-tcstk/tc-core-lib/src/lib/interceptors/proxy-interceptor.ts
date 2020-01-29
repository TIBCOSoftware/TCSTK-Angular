/**
 * @ngdoc component
 * @name ProxyInterceptor
 *
 * @description
 *
 * This interceptor will intercept http calls and add a mashery URL + api_key
 *
 */

import {Inject, Injectable} from '@angular/core';
import { HttpRequest, HttpInterceptor, HttpHandler } from '@angular/common/http';
import {TcCoreConfigService} from '../services/tc-core-config-service';


@Injectable()
export class ProxyInterceptor implements HttpInterceptor {

  constructor(@Inject(TcCoreConfigService) private tcCoreConfig: TcCoreConfigService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let request: HttpRequest<any>;
    // only add the proxy if first character of URL is /
    const tcCoreConfig = this.tcCoreConfig.getConfig();
    if (tcCoreConfig.proxy_url && tcCoreConfig.proxy_url !== '') {
      let url;
      if (req.url.startsWith('/')) {
        url = tcCoreConfig.proxy_url + req.url;
      } else {
        url = req.url;
      }
      request = req.clone(
        { setParams: { [tcCoreConfig.api_key_param] : tcCoreConfig.api_key }, url, withCredentials: true }
      );
    } else {
      console.warn('Proxy interceptor enabled but proxy URL provided: ', tcCoreConfig.proxy_url);
      request = req.clone();
    }

    return next.handle(request);

  }
}
