/**
 * @ngdoc component
 * @name tcLoggingService
 *
 * @description
 *
 * The logging service provides logging capabilities.
 *
 * A log level can be set:
 *
 *  All = 0,
 *  Debug = 1,
 *  Info = 2,
 *  Warn = 3,
 *  Error = 4,
 *  Fatal = 5,
 *  Off = 6
 *
 *
 */

import { Injectable } from '@angular/core';

@Injectable()
export class LogService {

  level: LogLevel = LogLevel.All;
  logWithDate = true;

  private writeToLog(msg: string,
                     level: LogLevel,
                     params: any[]) {
    if (this.shouldLog(level)) {
      let value = '';

      // Build log string
      if (this.logWithDate) {
        value = new Date() + ' - ';
      }
      value += '[My Cloud Starter] [' + LogLevel[this.level] + '](' + this.getLevelString(level) + ')';
      value += ' - Message: ' + msg;
      if (params.length) {
        value += ' - Extra Info: '
          + this.formatParams(params);
      }

      // Log the value
      console.log(value);
    }
  }

  private shouldLog(level: LogLevel): boolean {
    let ret = false;
    if ((level >= this.level &&
      level !== LogLevel.Off) ||
      this.level === LogLevel.All) {
      ret = true;
    }
    return ret;
  }

  private formatParams(params: any[]): string {
    let ret: string = params.join(',');
    // Is there at least one object in the array?
    if (params.some(p => typeof p === 'object')) {
      ret = '';
      // Build comma-delimited string
      for (const item of params) {
        ret += JSON.stringify(item) + ',';
      }
    }
    return ret;
  }


  debug(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.Debug,
      optionalParams);
  }

  info(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.Info,
      optionalParams);
  }

  warn(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.Warn,
      optionalParams);
  }

  error(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.Error,
      optionalParams);
  }

  fatal(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.Fatal,
      optionalParams);
  }

  log(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.All,
      optionalParams);
  }
  private getLevelString(level) {
    let re = '';
    switch (level) {
      case LogLevel.All: {
        re = 'All';
        break;
      }
      case LogLevel.Debug: {
        re = 'Debug';
        break;
      }
      case LogLevel.Error: {
        re = 'Error';
        break;
      }
      case LogLevel.Fatal: {
        re = 'Fatal';
        break;
      }
      case LogLevel.Info: {
        re = 'Info';
        break;
      }
      case LogLevel.Off: {
        re = 'Off';
        break;
      }
      case LogLevel.Warn: {
        re = 'Warn';
        break;
      }
      default: {
        // statements;
        break;
      }
    }
    return re;

  }
}

export enum LogLevel {
  All = 0,
  Debug = 1,
  Info = 2,
  Warn = 3,
  Error = 4,
  Fatal = 5,
  Off = 6
}

