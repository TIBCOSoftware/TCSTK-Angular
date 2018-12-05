import {
  Component,
  OnInit,
} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AccessToken, AuthInfo} from '../../../models/liveappsdata';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  authinfo: AuthInfo;
  loggedIn = false;
  subRequired = false;
  subscriptions: any;
  token: AccessToken;

  constructor(private router: Router, private route: ActivatedRoute) { }

  // run when logged in
  handleLoggedIn = (authorization) => {
    this.authinfo = authorization;
    this.subRequired = false;
    this.loggedIn = true;
    sessionStorage.setItem('loggedIn', Date.now().toString());
    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.router.navigate([returnUrl], {queryParams: {}});
  }

  // run when subscription selection required
  handleSubscription = (subscriptionSelection) => {
    this.token = subscriptionSelection.token;
    this.subscriptions = subscriptionSelection.subscriptions;
    this.subRequired = true;
  }

  ngOnInit() {
  }

}
