
![Status][auto] ![Component Type][minor] <!--Component Meta {"created_by":"Auto", "reviewed_by":"Auto", "last_modified_by":"Auto", "comment":"*REMOVE?*"} Component Meta -->


<p>A user will use this component when they have multiple subscriptions. The component is passed a list of subscriptions.

The user must choose a subscription, then the user is logged in against that subscription.</p>



#### Usage


This Component can be used by using the following HTML Tag:

```html
<tcla-tibco-cloud-multiple-subscription *ngIf="subRequired && !loggedIn" [subscriptions]="subscriptions" [token]="token" (subscriptionSelection)="handleLoggedIn($event)"></tcla-tibco-cloud-multiple-subscription>
```

#### Inputs

Attribute | Type | Comments
--- | --- | ---
subscriptions | any | a list of available subscriptions for this user
token | AccessToken | the access token created from initial login

#### Outputs

Attribute | Type |   | Comments
--- | --- | --- | ---
subscriptionSelection | EventEmitter |   |  


<b>Constructor</b>


<p><code>&lt;tcla-tibco-cloud-subscription-component&gt;</code> is a component providing the ability for a user to login to a specific subscription.</p>




<b>full development Documentation</b>

[Link to TibcoCloudMultipleSubscriptionComponent](https://tibcosoftware.github.io/TCSTK-Angular/libdocs/tc-core-lib/components/TibcoCloudMultipleSubscriptionComponent.html)


[auto]: https://img.shields.io/badge/Status-auto%20generated-lightgrey.svg?style=flat "auto generated"

[manually]: https://img.shields.io/badge/Status-manually%20created-yellow.svg?style=flat "manually created"

[draft]: https://img.shields.io/badge/Status-draft-red.svg?style=flat "draft"

[review]: https://img.shields.io/badge/Status-need%20review-yellowgreen.svg?style=flat "need review"

[review done]: https://img.shields.io/badge/Status-review%20done-green.svg?style=flat "review done"

[finalized]: https://img.shields.io/badge/Status-finalized-brightgreen.svg?style=flat "finalized"

[top]: https://img.shields.io/badge/Component%20Type-Top-blue.svg?style=flat "top Component"

[major]: https://img.shields.io/badge/Component%20Type-major%20Component-blue.svg?style=flat "major Component"

[minor]: https://img.shields.io/badge/Component%20Type-minor%20Component-blue.svg?style=flat "minor Component"


