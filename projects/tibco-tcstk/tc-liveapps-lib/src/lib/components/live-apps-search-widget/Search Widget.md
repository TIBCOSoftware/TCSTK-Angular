
![Status][auto] ![Component Type][top] <!--Component Meta {"created_by":"JS", "reviewed_by":"JG", "last_modified_by":"JS", "comment":"wrapper"} Component Meta -->


<p>High Level search widget component (wraps others)

This Component allows to search for existing Cases and list Case Cards.</p>

<p><img src="../live-apps-search-widget.png" alt="alt-text" class="img-responsive"></p>



#### Usage


This Component can be used by using the following HTML Tag:

```html
<tcla-live-apps-search-widget></tcla-live-apps-search-widget>
```

#### Inputs

Attribute | Type | Comments
--- | --- | ---
appIds | string[] | The list of LA Application IDs you want to handle
sandboxId | number | sandboxId - this comes from claims resolver
uiAppId | string | The Application ID of the UI (should ideally be unique as it is shared state key)

#### Outputs

Attribute | Type |   | Comments
--- | --- | --- | ---
caseSelected | EventEmitter<string> |   |  
  | Event |  caseSelected  |  Case Clicked
  | Payload |  string  |  emits case reference when a case is clicked (so parent can navigate to case)


<b>full development Documentation</b>

[Link to LiveAppsSearchWidgetComponent](https://tibcosoftware.github.io/TCSTK-Libdocs/libdocs/tc-liveapps-lib/components/LiveAppsSearchWidgetComponent.html)


[auto]: https://img.shields.io/badge/Status-auto%20generated-lightgrey.svg?style=flat "auto generated"

[manually]: https://img.shields.io/badge/Status-manually%20created-yellow.svg?style=flat "manually created"

[draft]: https://img.shields.io/badge/Status-draft-red.svg?style=flat "draft"

[review]: https://img.shields.io/badge/Status-need%20review-yellowgreen.svg?style=flat "need review"

[review done]: https://img.shields.io/badge/Status-review%20done-green.svg?style=flat "review done"

[finalized]: https://img.shields.io/badge/Status-finalized-brightgreen.svg?style=flat "finalized"

[top]: https://img.shields.io/badge/Component%20Type-Top-blue.svg?style=flat "top Component"

[major]: https://img.shields.io/badge/Component%20Type-major%20Component-blue.svg?style=flat "major Component"

[minor]: https://img.shields.io/badge/Component%20Type-minor%20Component-blue.svg?style=flat "minor Component"


