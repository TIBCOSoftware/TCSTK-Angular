import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LoginContext} from '@tibco-tcstk/tc-liveapps-lib';

@Component({
  selector: 'laapp-login-oauth',
  templateUrl: './login-oauth.component.html',
  styleUrls: ['./login-oauth.component.css']
})
export class LoginOauthComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  handleCreate() {
    // tslint:disable-next-line:no-unused-expression
    window.open('https://account.cloud.tibco.com/manage/settings/oAuthTokens') || window.open('https://account.cloud.tibco.com/manage/settings/oAuthTokens');
  }

  handleSignUp() {
    // tslint:disable-next-line:no-unused-expression
    window.open('https://cloud.tibco.com/cloud-services') || window.open('https://cloud.tibco.com/cloud-services');
  }

  // handle login
  handleLogin = () => {
    const returnUrl = this.route.snapshot.queryParams.returnUrl || '/splash';
    // redirect
    this.router.navigate([returnUrl], {queryParams: {}});
  }

  handleChangeLogin() {
    const returnUrl = this.route.snapshot.queryParams.returnUrl || '/splash';
    this.router.navigate(['/login'], {queryParams: { returnUrl }});
  }

}
