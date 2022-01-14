import {Inject, Injectable} from '@angular/core';
import {LiveAppsService} from '../services/live-apps.service';
import {TcCoreConfigService} from '@TIBCOSoftware/tc-core-lib';

@Injectable({
  providedIn: 'root'
})
export class CredentialsService {

  private TIBCO_CLOUD_DOMAIN = 'cloud.tibco.com';
  private TIBCO_TEST_DOMAIN = 'tenant-integration.tcie.pro';
  private TIBCO_DEV_DOMAIN = 'emea.tibco.com';

  private _AUTHKEY: string;
  private _MODE: string;

  constructor(private liveAppsService: LiveAppsService, @Inject(TcCoreConfigService) protected tcCoreConfig: TcCoreConfigService) {
    const host = window.location.hostname.split('.');
    const hostDomain = host[host.length - 3] + '.' + host[host.length - 2] + '.' + host[host.length - 1];
    if (hostDomain === this.TIBCO_CLOUD_DOMAIN || hostDomain === this.TIBCO_TEST_DOMAIN || hostDomain === this.TIBCO_DEV_DOMAIN) {
      // on Tibco Cloud - using cookies
      this._MODE = 'cloud';
    } else {
      if (this.tcCoreConfig.getConfig().oAuthLocalStorageKey) {
        // using oauth key within app
        this._MODE = 'oauth';
      } else {
        // Either using cookies or an external proxy with hardcoded oauth key
        this._MODE = 'cookies';
      }
    }
  }

  public setMode(mode) {
    this._MODE = mode;
  }

  public isCookies(): boolean {
    if (this._MODE) {
      if (this._MODE.toLowerCase() === 'cookies') {
        return true;
      }
    } else {
      return undefined;
    }
  }

  public isOauth(): boolean {
    if (this._MODE) {
      if (this._MODE.toLowerCase() === 'oauth') {
        return true;
      }
    } else {
      return undefined;
    }
  }

  public isCloud(): boolean {
    if (this._MODE) {
      if (this._MODE.toLowerCase() === 'cloud') {
        return true;
      } else {
        return false;
      }
    } else {
      return undefined;
    }
  }

  get authkey(): string {
      return this._AUTHKEY;
  }

  get mode(): string {
    return this._MODE;
  }

  getKey(): string {
    if (this._AUTHKEY) {
      return this._AUTHKEY;
    } else {
      const oauthKey = localStorage.getItem( this.tcCoreConfig.getConfig().oAuthLocalStorageKey );
      this._AUTHKEY = oauthKey;
      if (!this._AUTHKEY) {
        console.warn('No auth key in local storage');
      }
      return this._AUTHKEY;
    }
  }

  createCookie(key: string) {
    // create a secure cookie with oauth key so a proxy can convert this to oauth token when accessing static resources
    let expires = '';
    const date = new Date();
    date.setTime(date.getTime() + (180 * 24 * 60 * 60 * 1000));
    expires = ';expires=' + date.toUTCString();
    const cookie = 'TCSTKSESSION' + '=' + (key || '')  + expires + ';path=/;secure;';
    console.log(cookie);
    document.cookie = cookie;
  }

  removeCookie() {
    document.cookie = 'TCSTKSESSION' + '=' + '; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; secure;';
  }

  setKey(key: string) {
    this._AUTHKEY = key;
    if (key) {
      localStorage.setItem( this.tcCoreConfig.getConfig().oAuthLocalStorageKey, key);
      this.createCookie(key);
    } else {
      localStorage.removeItem(this.tcCoreConfig.getConfig().oAuthLocalStorageKey);
      this.removeCookie();
    }
  }
}
