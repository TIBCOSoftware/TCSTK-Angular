
![Status][auto] ![Component Type][top] <!--Component Meta {"created_by":"JS", "reviewed_by":"JG", "last_modified_by":"JS", "comment":""} Component Meta -->


<p>This component will attempt to log the user in. If the user has multiple subscriptions then the

component will emit a list of available subscriptions. The user must select a subscription and

login to that subscription via the tibcoCloudSubscriptionComponent</p>

<p><img src="../Cloud-Login.png" alt="alt-text" class="img-responsive" title="Image"></p>



#### Usage


This Component can be used by using the following HTML Tag:

```html
<tc-tibco-cloud-login *ngIf="!loggedIn && !subRequired" (loggedIn)="handleLoggedIn($event)" (subscriptionRequired)="handleSubscription($event)"></tc-tibco-cloud-login>
```

#### Inputs

Attribute | Type | Comments
--- | --- | ---
loginPrefill | LoginPrefill | Login Data

#### Outputs

Attribute | Type |   | Comments
--- | --- | --- | ---
loggedIn | EventEmitter |   |  


<b>Constructor</b>


<p>The Constructor creates the Login Dialog</p>




[auto]: https://img.shields.io/badge/Status-auto%20generated-lightgrey.svg?style=flat "auto generated"

[manually]: https://img.shields.io/badge/Status-manually%20created-yellow.svg?style=flat "manually created"

[draft]: https://img.shields.io/badge/Status-draft-red.svg?style=flat "draft"

[review]: https://img.shields.io/badge/Status-need%20review-yellowgreen.svg?style=flat "need review"

[review done]: https://img.shields.io/badge/Status-review%20done-green.svg?style=flat "review done"

[finalized]: https://img.shields.io/badge/Status-finalized-brightgreen.svg?style=flat "finalized"

[top]: https://img.shields.io/badge/Component%20Type-Top-blue.svg?style=flat "top Component"

[major]: https://img.shields.io/badge/Component%20Type-major%20Component-blue.svg?style=flat "major Component"

[minor]: https://img.shields.io/badge/Component%20Type-minor%20Component-blue.svg?style=flat "minor Component"


