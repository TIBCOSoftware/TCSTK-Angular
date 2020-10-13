import {
  Component,
  OnInit,
} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LoginContext} from '@tibco-tcstk/tc-liveapps-lib';
import {LoginPrefill} from '@tibco-tcstk/tc-core-lib';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  loginContext: LoginContext;
  loginPrefill: LoginPrefill;

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  handleUseOauth() {
    const returnUrl = this.route.snapshot.queryParams.returnUrl || '/splash';
    this.router.navigate(['/login-oauth'], {queryParams: { returnUrl }});
  }

  handleSignUp() {
    // tslint:disable-next-line:no-unused-expression
    window.open('https://cloud.tibco.com/cloud-services') || window.open('https://cloud.tibco.com/cloud-services');
  }

  // handle login
  handleLogin = (loginContext: LoginContext) => {
    // these session variables aren't used anywhere by the libraries but might be useful in an application
    sessionStorage.setItem('csdkAppLoggedIn', Date.now().toString());
    sessionStorage.setItem('csdkAppLoginContext', JSON.stringify(loginContext));
    const returnUrl = this.route.snapshot.queryParams.returnUrl || '/splash';
    // redirect
    this.router.navigate([returnUrl], {queryParams: {}});
  }

  ngOnInit() {
    // read resolved login prefill data
    this.loginPrefill = this.route.snapshot.data.loginPrefill;
  }

}
