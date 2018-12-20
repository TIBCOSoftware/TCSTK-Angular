/**
 * @ngdoc component
 * @name tibcoCloudLoginComponent
 *
 * @description
 * `<app-tibco-cloud-login-component>` is a component providing the ability to log into tibco cloud.
 *
 * @param {function callback} loggedIn Notify parent that user is logged in ok.
 * @param {function callback} subscriptionRequired Notify parent that user is in multiple subscriptions.
 *
 * @usage
 *
 * <app-tibco-cloud-login *ngIf="!loggedIn && !subRequired" (loggedIn)="handleLoggedIn($event)"
 *    (subscriptionRequired)="handleSubscription($event)"></app-tibco-cloud-login>
 *
 * This component will attempt to log the user in. If the user has multiple subscriptions then the
 * component will emit a list of available subscriptions. The user must select a subscription and
 * login to that subscription via the tibcoCloudSubscriptionComponent
 *
 */

import { Component, EventEmitter, Output } from '@angular/core';
import { AccountsInfo, Subscription } from '../../../models/tscdata';
import {Observable, ObservableInput} from 'rxjs';
import {map, mergeMap} from 'rxjs/operators';
import {AccessToken, AuthInfo} from '../../../models/liveappsdata';
import {Token} from '@angular/compiler';
import {LiveAppsService} from '../../../services/live-apps.service';

@Component({
    selector: 'app-tibco-cloud-login',
    templateUrl: './tibco-cloud-login.component.html',
    styleUrls: ['./tibco-cloud-login.component.css']
})

export class TibcoCloudLoginComponent {

  @Output() loggedIn = new EventEmitter();
  @Output() subscriptionRequired = new EventEmitter();

    name: string;
    password: string;
    loading = false;
    accountsInfo: AccountsInfo;
    loginError;
    token: AccessToken;
    auth: Observable<AuthInfo>

  constructor(
    private liveapps: LiveAppsService
  ) { }

    doLogin() {
        this.loading = true;
        this.loginError = undefined;

        // We need to pass the token from getToken into the authorize call. Hence, using mergeMap below.
        this.auth = this.liveapps.login(this.name, this.password)
          .pipe(
            mergeMap(token => {
                this.token = token;
                return this.liveapps.authorize(token, '');
              }
            )
          );

        this.auth.subscribe(authorize => {
            this.loading = false;
            // ok logged in
            console.log('User logged in...');
            this.loggedIn.emit(authorize);
          },
          error => {
            if (error.status === 300) {
              console.log('User is in multiple subscriptions...');
              this.accountsInfo = new AccountsInfo().deserialize(error.error.accountsInfo);
              const subscriptions: Subscription[] = [];
              this.accountsInfo.accountInfos.forEach(accountInfo => {
                const subscriptionInfo = new Subscription(
                  accountInfo.accountId,
                  accountInfo.accountDisplayName,
                  accountInfo.ownerInfo.firstName + ' ' + accountInfo.ownerInfo.lastName,
                  accountInfo.loggedInUserRole,
                  accountInfo.regions
                );
                subscriptions.push(subscriptionInfo);
                // send subscription list back to the parent
                this.subscriptionRequired.emit({ subscriptions: subscriptions, token: this.token } );
              });
            } else {
              this.loading = false;
              this.loginError = error.error.error_description;
              console.error('Login Failed: ');
              console.error(error);
            }
          });
    }
}
