import {InjectionToken} from '@angular/core';

export interface TcLiveappsConfiguration {
  defer: Boolean;
}

export class TcLiveappsConfig implements TcLiveappsConfiguration {
  defer: Boolean;
  constructor(
    defer: Boolean) {
    this.defer = defer;
  }
}

export const TcLiveappsConfigurationService = new InjectionToken<TcLiveappsConfiguration>('TcLiveappsConfiguration');
