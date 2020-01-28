import {InjectionToken} from '@angular/core';

export interface TcCoreConfiguration {
  oAuthLocalStorageKey: string;
  proxy_url: string;
  api_key: string;
  api_key_param: string;
}

export class TcCoreConfig implements TcCoreConfiguration {
  oAuthLocalStorageKey: string;
  proxy_url: string;
  api_key: string;
  api_key_param: string;
  constructor(
    oAuthLocalStorageKey?: string,
    proxy_url?: string,
    api_key?: string,
    api_key_param?: string) {
    this.oAuthLocalStorageKey = oAuthLocalStorageKey;
    this.proxy_url = proxy_url;
    this.api_key = api_key;
    this.api_key_param = api_key_param;
  }
}

export const TcCoreConfigurationService = new InjectionToken<TcCoreConfiguration>('TcCoreConfiguration');
