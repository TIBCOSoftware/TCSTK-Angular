// Note: This may move to the core library

import {Component, EventEmitter, Input, Output} from '@angular/core';
import {LoginContext} from '../../models/liveappsdata';
import {LoginPrefill, TcCoreConfigService} from '@tibco-tcstk/tc-core-lib';
import {LiveAppsService} from '../../services/live-apps.service';
import { LiveAppsComponent } from '../live-apps-component/live-apps-component.component';
import {TcAppDefinitionService} from '../../services/tc-app-definition.service';
import {take} from 'rxjs/operators';
import {CredentialsService} from '../../services/credentials.service';

/**
 * Component perform a Login in case there is no valid Session yet.
 *
 * If the user is not logged in the login component will be displayed automatically.
 *
 * ![alt-text](../Login.png "Image")
 */
@Component({
  selector: 'tcla-live-apps-login',
  templateUrl: './live-apps-login.component.html',
  styleUrls: ['./live-apps-login.component.css']
})
export class LiveAppsLoginComponent extends LiveAppsComponent {

  @Output() loginContext: EventEmitter<LoginContext> = new EventEmitter<LoginContext>();
  @Input() loginPrefill: LoginPrefill;
  /**
   * Output useOauth event
   */
  @Output() useOauth = new EventEmitter();
  /**
   * Output signUp event
   */
  @Output() signUp = new EventEmitter();
  public appName = 'Cloud Starters';
  @Input('appName') set AppName(appName: string) {
    if (appName) {
      this.appName = appName;
    }
  }

  constructor(protected tcAppDefinitionService: TcAppDefinitionService, protected configService: TcCoreConfigService, protected credentialsService: CredentialsService) {
    super();
  }

  handleUseOauth() {
    this.useOauth.emit();
  }

  handleSignUp() {
    this.signUp.emit();
  }

  // run when logged in
  handleLoggedIn = (loginInfo) => {
    // remove any stored oauth token/cookie
    this.credentialsService.setKey(undefined);
    // update claims first
    this.tcAppDefinitionService.refresh().pipe(
      take(1)
    ).subscribe(
      next => {
        sessionStorage.setItem('loggedIn', Date.now().toString());
        // emit useful details about the login and session/claims

        // clear any oauth keys stored
        /*if (this.configService && this.configService.getConfig() && this.configService.getConfig().oAuthLocalStorageKey
        && this.configService.getConfig().oAuthLocalStorageKey !== '') {
          localStorage.removeItem(this.configService.getConfig().oAuthLocalStorageKey);
        }*/
        this.credentialsService.setMode('cookies');
        this.loginContext.emit(new LoginContext().deserialize(
          {
            authInfo: loginInfo.authInfo,
            accessToken: loginInfo.accessToken
          }));
    });
  }

}
