
![Status][auto] ![Component Type][minor] <!--Component Meta {"created_by":"Auto", "reviewed_by":"Auto", "last_modified_by":"Auto", "comment":"none"} Component Meta -->


<p>Workitems widget, this Component lists workitems.</p>

<p><img src="../live-apps-workitems.png" alt="alt-text" class="img-responsive"></p>



#### Usage


This Component can be used by using the following HTML Tag:

```html
<tcla-live-apps-workitems></tcla-live-apps-workitems>
```

#### Inputs

Attribute | Type | Comments
--- | --- | ---
appIds | string[] | The list of LA Application IDs you want to handle
caseRef | string | The caseRef for which to display workitems
displayType | string | case card format - list, card, miniCard, staticList (no click event)
sandboxId | number | sandboxId - this comes from claims resolver
showHeader | boolean | Whether to show the header bar in the widget - eg. favorites on home page (contains icon etc) - if off icons still appear without bar
uiAppId | string | The Application ID of the UI (should ideally be unique as it is shared state key)

#### Outputs

Attribute | Type |   | Comments
--- | --- | --- | ---
clickCase | EventEmitter<CaseRoute> |   |  
  | Event |  clickCase  |  Case clicked
  | Payload |  CaseRoute  |  CaseRoute object output when case is clicked so calling component can route accordingly - ie. route to case


<b>full development Documentation</b>

[Link to LiveAppsWorkitemsComponent](https://tibcosoftware.github.io/TCSTK-Libdocs/libdocs/tc-liveapps-lib/components/LiveAppsWorkitemsComponent.html)


[auto]: https://img.shields.io/badge/Status-auto%20generated-lightgrey.svg?style=flat "auto generated"

[manually]: https://img.shields.io/badge/Status-manually%20created-yellow.svg?style=flat "manually created"

[draft]: https://img.shields.io/badge/Status-draft-red.svg?style=flat "draft"

[review]: https://img.shields.io/badge/Status-need%20review-yellowgreen.svg?style=flat "need review"

[review done]: https://img.shields.io/badge/Status-review%20done-green.svg?style=flat "review done"

[finalized]: https://img.shields.io/badge/Status-finalized-brightgreen.svg?style=flat "finalized"

[top]: https://img.shields.io/badge/Component%20Type-Top-blue.svg?style=flat "top Component"

[major]: https://img.shields.io/badge/Component%20Type-major%20Component-blue.svg?style=flat "major Component"

[minor]: https://img.shields.io/badge/Component%20Type-minor%20Component-blue.svg?style=flat "minor Component"


