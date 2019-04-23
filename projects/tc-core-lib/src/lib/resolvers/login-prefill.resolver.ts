import { Injectable } from '@angular/core';
import {Resolve} from '@angular/router';
import { LoginPrefill } from '../models/tc-login';

@Injectable()
export class LoginPrefillResolver implements Resolve<LoginPrefill> {

  EMAIL_ID_KEY = 'tcs-login-email-id';
  CLIENT_ID_KEY = 'tcs-login-client-id';

  constructor() {}

  private getClientId = (): string => {
    return localStorage.getItem(this.CLIENT_ID_KEY);
  }

  private getEmail = (): string => {
    return localStorage.getItem(this.EMAIL_ID_KEY);
  }

  resolve(): LoginPrefill {
    return new LoginPrefill().deserialize({ emailId: this.getEmail(), clientId: this.getClientId() } );
  }

}
