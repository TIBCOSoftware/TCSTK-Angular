import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {AccountsInfo, LoginPrefill, Subscription} from '../../models/tc-login';
import {Observable, ObservableInput} from 'rxjs';
import {map, mergeMap} from 'rxjs/operators';
import {AccessToken, AuthInfo} from '../../models/tc-login';
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

export class TibcoCloudLoginComponent implements OnChanges {

  /**
   * Notify parent that user is logged in ok.
   */
  @Output() loggedIn = new EventEmitter();
  /**
   * Output useOauth event
   */
  @Output() useOauth = new EventEmitter();
  /**
   * Output signUp event
   */
  @Output() signUp = new EventEmitter();
  /**
   * Login Data
   */
  @Input() loginPrefill: LoginPrefill;

  /**
   * App Name
   */
  public appName = 'Cloud Starters';

  @Input('appName') set AppName(appName: string) {
    if (appName) {
      this.appName = appName;
    }
  }

  name: string;
  password: string;
  clientId: string;
  loading = false;
  accountsInfo: AccountsInfo;
  error: string;
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

  doLogin() {
    this.loading = true;
    this.error = undefined;

    this.auth = this.tcLogin.login(this.name, this.password, this.clientId).pipe(
      map((authInfo: AuthInfo) => {
          this.authInfo = authInfo;
          return authInfo;
        }
      )
    );

    this.auth.subscribe(authorize => {
        this.loading = false;
        // ok logged in
        console.log('User logged in...');
        // update claims
        this.loggedIn.emit({authInfo: authorize, accessToken: this.token});
      },
      error => {
        this.loading = false;
        if (error.error && error.error.errorMsg) {
          this.error = error.error.errorMsg;
        }
        console.error('Login Failed: ');
        console.error(error);
      });
  }

  handleUseOauth() {
    this.useOauth.emit();
  }

  handleSignUp() {
    this.signUp.emit();
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (this.loginPrefill) {
      this.name = this.loginPrefill.emailId;
      this.clientId = this.loginPrefill.clientId;
    }
  }
}
