
![Status][auto] ![Component Type][top] <!--Component Meta {"created_by":"JS", "reviewed_by":"JG", "last_modified_by":"JS", "comment":"init"} Component Meta -->


<p>Renders case summary cards</p>

<p><img src="../live-apps-case-summary.png" alt="alt-text" class="img-responsive" title="Image"></p>

<p><img src="../live-apps-case-summary-2.png" alt="alt-text" class="img-responsive" title="Image"></p>



#### Usage


This Component can be used by using the following HTML Tag:

```html
<tcla-live-apps-case-summary></tcla-live-apps-case-summary>
```

#### Inputs

Attribute | Type | Comments
--- | --- | ---
borderCard | boolean | Whether to display a border around the card
caseRef | string | The case reference
configMode | boolean | Whether to use static data (ie. when in app config box)
configModeAppTypeLabel | string | static data for app config box
configModeCaseTypeColor | string | static data for app config box
configModeCaseTypeIcon | string | static data for app config box
configModeColor | string | static data for app config box
configModeIcon | string | static data for app config box
description | string | Card Description
displayType | string | case card format - list, card, miniCard, staticList (no click event)
highlight | string | Text to highlight in the list of cases (normall text that was searched)
sandboxId | number | sandboxId - this comes from claims resolver
typeBar | boolean | Whether to display the colored &quot;bar&quot; on a summary card (on left or top)
uiAppId | string | The Application ID of the UI (should ideally be unique as it is shared state key)
workitemId | string | Workitem Id

#### Outputs

Attribute | Type |   | Comments
--- | --- | --- | ---
clickCase | EventEmitter<CaseRoute> |   |  
  | Event |  clickCase  |  Case clicked
  | Payload |  CaseRoute  |  CaseRoute object output when case is clicked so calling component can route accordingly - ie. route to case
deleted | EventEmitter<string> |   |  
  | Event |  deleted  |  Case Displayed has been deleted
  | Payload |  string  |  string emitted when summary tries to load data for a case that has been deleted (so it can be hidden.removed from - for example recent cases list)


<b>full development Documentation</b>

[Link to LiveAppsCaseSummaryComponent](https://tibcosoftware.github.io/TCSTK-Libdocs/libdocs/tc-liveapps-lib/components/LiveAppsCaseSummaryComponent.html)


[auto]: https://img.shields.io/badge/Status-auto%20generated-lightgrey.svg?style=flat "auto generated"

[manually]: https://img.shields.io/badge/Status-manually%20created-yellow.svg?style=flat "manually created"

[draft]: https://img.shields.io/badge/Status-draft-red.svg?style=flat "draft"

[review]: https://img.shields.io/badge/Status-need%20review-yellowgreen.svg?style=flat "need review"

[review done]: https://img.shields.io/badge/Status-review%20done-green.svg?style=flat "review done"

[finalized]: https://img.shields.io/badge/Status-finalized-brightgreen.svg?style=flat "finalized"

[top]: https://img.shields.io/badge/Component%20Type-Top-blue.svg?style=flat "top Component"

[major]: https://img.shields.io/badge/Component%20Type-major%20Component-blue.svg?style=flat "major Component"

[minor]: https://img.shields.io/badge/Component%20Type-minor%20Component-blue.svg?style=flat "minor Component"


