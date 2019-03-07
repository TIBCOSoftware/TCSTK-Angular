## Cloud Subscription Selection
In case of the User has multiple Subscription on TIBCO Cloud, this Component allows to select one of them.

#### Screenshot
Screenshot Image of the Subscription Selection Dialog

![alt-text](Cloud-Subscription-Selection.png "Image")

#### Usage
This component is required if user is in multiple subscriptions - they must select a subscription to complete login.

```html
<tcla-tibco-cloud-multiple-subscription *ngIf="subRequired && !loggedIn" [subscriptions]="subscriptions"
     [token]="token" (subscriptionSelection)="handleLoggedIn($event)"></tcla-tibco-cloud-multiple-subscription>
```

A user will use this component when they have multiple subscriptions. The component is passed a list of subscriptions. The user must choose a subscription, then the user is logged in against that subscription.

#### Inputs
available Attributes

| Attribute       | Type            | Default Value | Comments              |
| --------------- |:--------------- |:------------- |:--------------------- |
| subscriptions   | any             |               | List of Subscriptions |
| token           | AccessToken     |               | Cloud AccessToken     |

#### Outputs
available Attributes

| Attribute              | Type            | Default Value | Comments              |
| ---------------------- |:--------------- |:------------- |:--------------------- |
| loggedIn               | boolean         |               | user is logged in ok  |
| subscriptionSelection  |                 |               | selected Subscription |

#### Demos
live Showcase

<tc-tibco-cloud-multiple-subscription></tc-tibco-cloud-multiple-subscription>
<script type="text/javascript" src="http://host/cust-component/cust-element.js"></script>

> Showcase connected to Mock Service 


