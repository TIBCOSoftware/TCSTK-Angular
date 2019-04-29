/**
 * @ngdoc component
 * @name tibcoCloudLoginComponent
 *
 * @description
 * `<tc-tibco-cloud-login-component>` is a component providing the ability to log into tibco cloud.
 *
 * @param {function callback} loggedIn Notify parent that user is logged in ok.
 * @param {function callback} subscriptionRequired Notify parent that user is in multiple subscriptions.
 *
 * @usage
 *
 * <tc-tibco-cloud-login *ngIf="!loggedIn && !subRequired" (loggedIn)="handleLoggedIn($event)"
 *    (subscriptionRequired)="handleSubscription($event)"></tc-tibco-cloud-login>
 *
 * This component will attempt to log the user in. If the user has multiple subscriptions then the
 * component will emit a list of available subscriptions. The user must select a subscription and
 * login to that subscription via the tibcoCloudSubscriptionComponent
 *
 */

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AccountsInfo, LoginPrefill, Subscription} from '../../models/tc-login';
import {Observable, ObservableInput} from 'rxjs';
import {map, mergeMap} from 'rxjs/operators';
import {AccessToken, AuthInfo } from '../../models/tc-login';
import {TcLoginService} from '../../services/tc-login.service';

@Component({
    selector: 'tc-tibco-cloud-login',
    templateUrl: './tibco-cloud-login.component.html',
    styleUrls: ['./tibco-cloud-login.component.css']
})

export class TibcoCloudLoginComponent  implements OnInit {

  @Output() loggedIn = new EventEmitter();
  @Input() loginPrefill: LoginPrefill;

    name: string;
    password: string;
    clientId: string;
    loading = false;
    accountsInfo: AccountsInfo;
    loginError;
    token: AccessToken;
    authInfo: AuthInfo;
    auth: Observable<AuthInfo>;

  constructor(
    private tcLogin: TcLoginService
  ) {

  }

  ngOnInit() {
    console.log('Login Init');

    if(this.loginPrefill) {
      this.name = this.loginPrefill.emailId;
      this.clientId = this.loginPrefill.clientId;
    }
  }

    doLogin() {
        this.loading = true;
        this.loginError = undefined;

        // We need to pass the token from getToken into the authorize call. Hence, using mergeMap below.

      this.auth = this.tcLogin.login(this.name, this.password, this.clientId).pipe(
        map(authInfo => {
            this.authInfo = authInfo;
            return authInfo;
          }
        )
      );

        this.auth.subscribe(authorize => {
            this.loading = false;
            // ok logged in
            console.log('User logged in...');
            this.loggedIn.emit( { authInfo: authorize, accessToken: this.token } );
          },
          error => {
              this.loading = false;
              this.loginError = error.error.error_description;
              console.error('Login Failed: ');
              console.error(error);
          });
    }
}
