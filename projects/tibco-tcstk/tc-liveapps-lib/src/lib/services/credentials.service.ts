import {Inject, Injectable} from '@angular/core';
import {LiveAppsService} from '../services/live-apps.service';
import {TcCoreConfigService} from '@tibco-tcstk/tc-core-lib';

@Injectable({
  providedIn: 'root'
})
export class CredentialsService {

  private _AUTHKEY: string;
  private _AUTHORIZED: boolean;

  constructor(private liveAppsService: LiveAppsService, @Inject(TcCoreConfigService) protected tcCoreConfig: TcCoreConfigService) {
  }

  private isAuth(): Promise<boolean> {
      const key = this.getKey();
      if (key) {
        return this.liveAppsService.checkAuth(key).then(
          ok => {
            this._AUTHORIZED = true;
            return true;
          }
        )
          .catch(
            notOk => {
              throw notOk;
            }
          );
      }
  }

  get authorized(): boolean {
      return this._AUTHORIZED;
  }

  get authkey(): string {
      return this._AUTHKEY;
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

  setKey(key: string) {
    this._AUTHKEY = key;
    localStorage.setItem( this.tcCoreConfig.getConfig().oAuthLocalStorageKey, key);
    this._AUTHKEY = key;
  }
}
