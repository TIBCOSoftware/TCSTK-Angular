/**
 * @ngdoc component
 * @name tibcoCloudSubscriptionComponent
 *
 * @description
 * `<tcla-tibco-cloud-subscription-component>` is a component providing the ability for a user to login to
 * a specific subscription.
 *
 * @param {any} subscriptions a list of available subscriptions for this user
 * @param {AccessToken} token the access token created from initial login
 * @param {function callback} loggedIn Notify parent that user is logged in ok.
 * @param {function callback} subscriptionSelection Notify parent that user is logged into a specific subscription
 *                            the authorization object is returned for that login/subscription.
 *
 * @usage
 *
 * <tcla-tibco-cloud-multiple-subscription *ngIf="subRequired && !loggedIn" [subscriptions]="subscriptions"
 *    [token]="token" (subscriptionSelection)="handleLoggedIn($event)"></tcla-tibco-cloud-multiple-subscription>
 *
 * A user will use this component when they have multiple subscriptions. The component is passed a list of subscriptions.
 * The user must choose a subscription, then the user is logged in against that subscription.
 *
 */

import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AccessToken} from '../../models/liveappsdata';
import {LiveAppsService} from '../../services/live-apps.service';

@Component({
    selector: 'tcla-tibco-cloud-multiple-subscription',
    templateUrl: './tibco-cloud-multiple-subscription.component.html',
    styleUrls: ['./tibco-cloud-multiple-subscription.component.css']
})
export class TibcoCloudMultipleSubscriptionComponent {
  @Input() subscriptions: any;
  @Input() token: AccessToken;
  @Output() subscriptionSelection = new EventEmitter();

    public selectedSubscriptionId;
    public loading = false;

    constructor(
        private liveapps: LiveAppsService
    ) { }

    authorize(subscriptionId) {
        this.loading = true;
        this.liveapps.authorize(this.token, subscriptionId)
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
