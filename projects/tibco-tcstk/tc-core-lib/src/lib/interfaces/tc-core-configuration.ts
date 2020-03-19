import {InjectionToken} from '@angular/core';

export interface TcCoreConfiguration {
  disableFormLibs?: boolean;
  oAuthLocalStorageKey: string;
  proxy_url: string;
  proxy_liveapps_path: string;
  proxy_tce_path: string;
  api_key: string;
  api_key_param: string;
  enable_tce: boolean;
}

export class TcCoreConfig implements TcCoreConfiguration {
  disableFormLibs?: boolean;
  oAuthLocalStorageKey: string;
  proxy_url: string;
  proxy_liveapps_path: string;
  proxy_tce_path: string;
  api_key: string;
  api_key_param: string;
  enable_tce: boolean;
  constructor(
    oAuthLocalStorageKey?: string,
    proxy_url?: string,
    proxy_liveapps_path?: string,
    proxy_tce_path?: string,
    api_key?: string,
    api_key_param?: string,
    enable_tce?: boolean,
    disableFormLibs?: boolean) {
    this.disableFormLibs = (disableFormLibs !== undefined) ? disableFormLibs : false;
    this.oAuthLocalStorageKey = oAuthLocalStorageKey;
    this.proxy_url = proxy_url;
    this.proxy_liveapps_path = proxy_liveapps_path;
    this.proxy_tce_path = proxy_tce_path;
    this.api_key = api_key;
    this.api_key_param = api_key_param;
    this.enable_tce = enable_tce;
  }
}

export const TcCoreConfigurationService = new InjectionToken<TcCoreConfiguration>('TcCoreConfiguration');
