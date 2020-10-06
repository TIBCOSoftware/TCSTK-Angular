import {Component, EventEmitter, Input, Output} from '@angular/core';
import {LiveAppsService} from '../../services/live-apps.service';
import {TcAppDefinitionService} from '../../services/tc-app-definition.service';
import {CredentialsService} from '../../services/credentials.service';

@Component({
  selector: 'tcla-live-apps-login-oauth',
  templateUrl: './live-apps-login-oauth.component.html',
  styleUrls: ['./live-apps-login-oauth.component.css']
})
export class LiveAppsLoginOauthComponent {

  @Input() appName: string;
  @Output() loggedIn: EventEmitter<undefined> = new EventEmitter<undefined>();
  /**
   * Output useOauth event
   */
  @Output() createOauthKey = new EventEmitter();
  /**
   * Output signUp event
   */
  @Output() signUp = new EventEmitter();

  /**
   * Output changeLogin event
   */
  @Output() changeLogin = new EventEmitter();

  constructor(private liveAppsService: LiveAppsService, protected appDefinitionService: TcAppDefinitionService, protected credentialsService: CredentialsService) { }

  accessKey: string;
  error: string;
  loading = false;

  handleChange(event) {
    this.accessKey = event.detail.value;
  }

  handleChangeLogin() {
    this.changeLogin.emit();
  }

  handleCreate() {
    this.createOauthKey.emit();
  }

  handleSignUp() {
    this.signUp.emit();
  }

  handleAuthorize() {
    this.loading = true;
    this.error = undefined;
    this.liveAppsService.checkAuth(this.accessKey)
      .then(
        response => {
          console.log(response);
          // save auth
          this.credentialsService.setKey(this.accessKey);
            console.log('Credentials Saved');
            this.appDefinitionService.refresh().toPromise().then(
                  ok => {
                    this.loggedIn.emit();
                  }
                );
              }
            )
      .catch(
        error => {
          console.error('Unable to check authorization: ', error);
          this.loading = false;
          this.error = 'Invalid activation key';
        }
      );
  }

  handleReturn() {
    this.changeLogin.emit();
  }

}
