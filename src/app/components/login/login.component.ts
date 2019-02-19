import {
  Component,
  OnInit,
} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LoginContext} from 'tc-liveapps-lib';

@Component({
  selector: 'laapp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  loginContext: LoginContext;

  constructor(private router: Router, private route: ActivatedRoute) { }

  // handle login context
  handleLoginContext = (loginContext: LoginContext) => {
    sessionStorage.setItem('loggedIn', Date.now().toString());
    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    // redirect
    this.router.navigate([returnUrl], {queryParams: {}});
  }

  ngOnInit() {
  }

}
