// Note: This may move to the core library

import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {LoginContext, UserInfo} from '../../models/liveappsdata';
import {AccessToken, AuthInfo, UiAppConfig} from 'tc-core-lib';
import {Log} from '@angular/core/testing/src/logger';
import {LiveAppsService} from '../../services/live-apps.service';
import {map, take, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import { LiveAppsComponent } from '../live-apps-component/live-apps-component.component';

@Component({
  selector: 'tcla-live-apps-login',
  templateUrl: './live-apps-login.component.html',
  styleUrls: ['./live-apps-login.component.css']
})
export class LiveAppsLoginComponent extends LiveAppsComponent {

  @Output() loginContext: EventEmitter<LoginContext> = new EventEmitter<LoginContext>();

  constructor(private liveapps: LiveAppsService) {
    super();
  }

  authinfo: AuthInfo;
  loggedIn = false;
  subRequired = false;
  subscriptions: any;
  accessToken: AccessToken;
  errorMessage: string;

  // run when logged in
  handleLoggedIn = (loginInfo) => {
    this.authinfo = loginInfo.authInfo;
    this.accessToken = loginInfo.accessToken;
    this.subRequired = false;
    this.loggedIn = true;
    sessionStorage.setItem('loggedIn', Date.now().toString());

    // need to get claims info (note this will be cached at http level for the session)
    const claims = this.liveapps.getClaims()
      .pipe(
        take(1),
        takeUntil(this._destroyed$),
        map(claim => {
          claim.sandboxes.forEach(sandbox => {
            if (sandbox.type === 'Production') {
              claim.primaryProductionSandbox = sandbox;
            }
          });
          return claim;
        })
      );
    claims.subscribe(claim => {
      const userInfo = new UserInfo().deserialize({
        externalId: this.authinfo.userId,
        firstName: claim.firstName,
        lastName: claim.lastName,
        username: claim.username,
        email: claim.email,
        id: claim.id
      });
        // emit useful details about the login and session/claims
      this.loginContext.emit(new LoginContext().deserialize(
        {
          claims: claim,
          userInfo: userInfo,
          authInfo: this.authinfo,
          accessToken: this.accessToken
        }));
      return claim;
    },
      error => { this.errorMessage = 'Error retrieving applications: ' + error.error.errorMsg; }
    );
  }

  // run when subscription selection required
  handleSubscription = (subscriptionSelection) => {
    this.accessToken = subscriptionSelection.token;
    this.subscriptions = subscriptionSelection.subscriptions;
    this.subRequired = true;
  }

}
