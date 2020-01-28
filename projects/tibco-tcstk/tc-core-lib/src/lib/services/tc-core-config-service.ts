import {Inject, Injectable} from '@angular/core';
import {TcCoreConfig, TcCoreConfiguration, TcCoreConfigurationService} from '../interfaces/tc-core-configuration';

@Injectable()
export class TcCoreConfigService {
  private config: TcCoreConfiguration;
  constructor(@Inject(TcCoreConfigurationService) private conf: TcCoreConfiguration) {
    if (conf) {
      this.config = conf;
    } else {
      this.config = new TcCoreConfig();
    }
  }

  public getConfig = (): TcCoreConfiguration => {
    return this.config;
  }

  public setConfig = (conf: TcCoreConfiguration) => {
    this.config = conf;
  }
}
