import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AccountsInfo, LoginPrefill, Subscription} from '../../models/tc-login';
import {Observable, ObservableInput} from 'rxjs';
import {map, mergeMap} from 'rxjs/operators';
import {AccessToken, AuthInfo } from '../../models/tc-login';
import {TcLoginService} from '../../services/tc-login.service';

/**
 * This component will attempt to log the user in.
 *
 * ![alt-text](../Cloud-Login.png "Image")
 *
 *  @example <tc-tibco-cloud-login *ngIf="!loggedIn (loggedIn)="handleLoggedIn($event)"></tc-tibco-cloud-login>
 */
@Component({
    selector: 'tc-tibco-cloud-login',
    templateUrl: './tibco-cloud-login.component.html',
    styleUrls: ['./tibco-cloud-login.component.css']
})

export class TibcoCloudLoginComponent  implements OnInit {

  /**
   * Notify parent that user is logged in ok.
   */
  @Output() loggedIn = new EventEmitter();
  /**
   * Login Data
   */
  @Input() loginPrefill: LoginPrefill;

    name: string;
    password: string;
    clientId: string;
    loading = false;
    accountsInfo: AccountsInfo;
    loginError: string;
    token: AccessToken;
    authInfo: AuthInfo;
    auth: Observable<AuthInfo>;

  /**
  * The Constructor creates the Login Dialog
  */
  constructor(
    private tcLogin: TcLoginService
  ) {

  }

  /**
  * @ignore
  */
  ngOnInit() {
    console.log('Login Init');

    if (this.loginPrefill) {
      this.name = this.loginPrefill.emailId;
      this.clientId = this.loginPrefill.clientId;
    }
  }

  doLogin() {
        this.loading = true;
        this.loginError = undefined;

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
              this.loginError = error.error.errorMsg;
              console.error('Login Failed: ');
              console.error(error);
          });
    }
}
