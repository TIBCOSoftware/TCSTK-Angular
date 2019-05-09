import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AccessToken} from '../../models/tc-login';
import {TcLoginService} from '../../services/tc-login.service';

/**
 * A user will use this component when they have multiple subscriptions. The component is passed a list of subscriptions.
 * The user must choose a subscription, then the user is logged in against that subscription.
 *
 * @example <tcla-tibco-cloud-multiple-subscription *ngIf="subRequired && !loggedIn" [subscriptions]="subscriptions" [token]="token" (subscriptionSelection)="handleLoggedIn($event)"></tcla-tibco-cloud-multiple-subscription>
 */
@Component({
    selector: 'tc-tibco-cloud-multiple-subscription',
    templateUrl: './tibco-cloud-multiple-subscription.component.html',
    styleUrls: ['./tibco-cloud-multiple-subscription.component.css']
})

export class TibcoCloudMultipleSubscriptionComponent {
  /**
  * a list of available subscriptions for this user now  */
  @Input() subscriptions: any;
  /**
  * the access token created from initial login  */
  @Input() token: AccessToken;
  /**
  * Notify parent that user is logged into a specific subscription the authorization object is returned for that login/subscription.  */
  @Output() subscriptionSelection = new EventEmitter();

    public selectedSubscriptionId;
    public loading = false;

    /**
     * `<tcla-tibco-cloud-subscription-component>` is a component providing the ability for a user to login to a specific subscription.
     */
    constructor(
        private tcLogin: TcLoginService
    ) { }

    /**
     * @ignore
     */
    authorize(subscriptionId) {
        this.loading = true;
        this.tcLogin.laAuthorize(this.token, subscriptionId)
            .subscribe(authorize => {
                this.loading = false;
                this.subscriptionSelection.emit(authorize);
            },
            error => {
                console.log(JSON.stringify(error, null, 2));
            }
        );
    }
}
