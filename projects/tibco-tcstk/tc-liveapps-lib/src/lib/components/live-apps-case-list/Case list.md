
![Status][auto] ![Component Type][minor] <!--Component Meta {"created_by":"Auto", "reviewed_by":"Auto", "last_modified_by":"Auto", "comment":"none"} Component Meta -->


<p>Renders list of cases for caserefs</p>



#### Usage


This Component can be used by using the following HTML Tag:

```html
<tcla-live-apps-case-list></tcla-live-apps-case-list>
```

#### Inputs

Attribute | Type | Comments
--- | --- | ---
caseRefs | string[] | List of case references to display in the list
displayType | string | case card format - list, card, miniCard, staticList (no click event)
headerMessage | string | Filter text displayed when listing cases after selecting case type and state via report widget
headerText | string | Text shown in menu bar
highlight | string | Text to highlight in the list of cases (normall text that was searched)
sandboxId | number | sandboxId - this comes from claims resolver
uiAppId | string | The Application ID of the UI (should ideally be unique as it is shared state key)

#### Outputs

Attribute | Type |   | Comments
--- | --- | --- | ---
clearMatches | EventEmitter |   |  
  | Event |  clearMatches  |  Clear Matches button clicked
clickCase | EventEmitter<CaseRoute> |   |  
  | Event |  clickCase  |  Case clicked
  | Payload |  CaseRoute  |  CaseRoute object output when case is clicked so calling component can route accordingly - ie. route to case


<b>full development Documenation</b>

[Link to LiveAppsCaseListComponent](https://tibcosoftware.github.io/TCSTK-Angular/libdocs/tc-liveapps-lib/components/LiveAppsCaseListComponent.html)


[auto]: https://img.shields.io/badge/Status-auto%20generated-lightgrey.svg?style=flat "auto generated"

[manually]: https://img.shields.io/badge/Status-manually%20created-yellow.svg?style=flat "manually created"

[draft]: https://img.shields.io/badge/Status-draft-red.svg?style=flat "draft"

[review]: https://img.shields.io/badge/Status-need%20review-yellowgreen.svg?style=flat "need review"

[review done]: https://img.shields.io/badge/Status-review%20done-green.svg?style=flat "review done"

[finalized]: https://img.shields.io/badge/Status-finalized-brightgreen.svg?style=flat "finalized"

[top]: https://img.shields.io/badge/Component%20Type-Top-blue.svg?style=flat "top Component"

[major]: https://img.shields.io/badge/Component%20Type-major%20Component-blue.svg?style=flat "major Component"

[minor]: https://img.shields.io/badge/Component%20Type-minor%20Component-blue.svg?style=flat "minor Component"


