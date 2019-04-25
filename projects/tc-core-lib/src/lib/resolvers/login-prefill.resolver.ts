import { Injectable } from '@angular/core';
import {Resolve} from '@angular/router';
import { LoginPrefill } from '../models/tc-login';

export const EMAIL_ID_KEY = 'tcs-login-email-id';
export const CLIENT_ID_KEY = 'tcs-login-client-id';

@Injectable()
export class LoginPrefillResolver implements Resolve<LoginPrefill> {

  constructor() {}

  private getClientId = (): string => {
    return localStorage.getItem(CLIENT_ID_KEY);
  }

  private getEmail = (): string => {
    return localStorage.getItem(EMAIL_ID_KEY);
  }

  resolve(): LoginPrefill {
    return new LoginPrefill().deserialize({ emailId: this.getEmail(), clientId: this.getClientId() } );
  }

}
