// Note: This may move to the core library

import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {LoginContext, UserInfo} from '../../models/liveappsdata';
import {AccessToken, AuthInfo, LoginPrefill, UiAppConfig} from 'tc-core-lib';
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
  @Input() loginPrefill: LoginPrefill;

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

    // emit useful details about the login and session/claims
    this.loginContext.emit(new LoginContext().deserialize(
        {
          authInfo: this.authinfo,
          accessToken: this.accessToken
        }));
  }

}
