import {Inject, Injectable} from '@angular/core';
import { TcLiveappsConfiguration, TcLiveappsConfigurationService, TcLiveappsConfig } from '../models/tcLiveappsConfig';


@Injectable()
export class TcLiveappsConfigService {
  private config: TcLiveappsConfiguration;
  constructor(@Inject(TcLiveappsConfigurationService) private conf: TcLiveappsConfiguration) {
    if (conf) {
      this.config = conf;
    } else {
      if (conf) {
        this.config = new TcLiveappsConfig(conf.defer);
      } else {
        this.config = new TcLiveappsConfig(false);
      }
    }
  }

  public getConfig = (): TcLiveappsConfiguration => {
    return this.config;
  }

  public setConfig = (conf: TcLiveappsConfiguration) => {
    this.config = conf;
  }
}
