
![Status][auto] ![Component Type][top] <!--Component Meta {"created_by":"JS", "reviewed_by":"JG", "last_modified_by":"JS", "comment":"init"} Component Meta -->


<p>This Component allows to list your Favorite Cases.</p>

<p><img src="../live-apps-favorite-cases.png" alt="alt-text" class="img-responsive" title="Documents Component Image"></p>



#### Usage


This Component can be used by using the following HTML Tag:

```html
<tcla-live-apps-favorite-cases></tcla-live-apps-favorite-cases>
```

#### Inputs

Attribute | Type | Comments
--- | --- | ---
displayType | string | 
sandboxId | number | sandboxId - this comes from claims resolver
showHeader | boolean | 
uiAppId | string | The Application ID of the UI (should ideally be unique as it is shared state key)

#### Outputs

Attribute | Type |   | Comments
--- | --- | --- | ---
clickCase | EventEmitter<CaseRoute> |   |  
  | Event |  clickCase  |  Case clicked
  | Payload |  CaseRoute  |  CaseRoute object output when case is clicked so calling component can route accordingly - ie. route to case


<b>full development Documentation</b>

[Link to LiveAppsFavoriteCasesComponent](https://tibcosoftware.github.io/TCSTK-Libdocs/libdocs/tc-liveapps-lib/components/LiveAppsFavoriteCasesComponent.html)


[auto]: https://img.shields.io/badge/Status-auto%20generated-lightgrey.svg?style=flat "auto generated"

[manually]: https://img.shields.io/badge/Status-manually%20created-yellow.svg?style=flat "manually created"

[draft]: https://img.shields.io/badge/Status-draft-red.svg?style=flat "draft"

[review]: https://img.shields.io/badge/Status-need%20review-yellowgreen.svg?style=flat "need review"

[review done]: https://img.shields.io/badge/Status-review%20done-green.svg?style=flat "review done"

[finalized]: https://img.shields.io/badge/Status-finalized-brightgreen.svg?style=flat "finalized"

[top]: https://img.shields.io/badge/Component%20Type-Top-blue.svg?style=flat "top Component"

[major]: https://img.shields.io/badge/Component%20Type-major%20Component-blue.svg?style=flat "major Component"

[minor]: https://img.shields.io/badge/Component%20Type-minor%20Component-blue.svg?style=flat "minor Component"


