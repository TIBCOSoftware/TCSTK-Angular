
![Status][auto] ![Component Type][top] <!--Component Meta {"created_by":"JS", "reviewed_by":"JG", "last_modified_by":"JS", "comment":"init"} Component Meta -->


<p>Selection of app + searching for cases</p>

<p><img src="../case-search.png" alt="alt-text" class="img-responsive" title="Image"></p>



#### Usage


This Component can be used by using the following HTML Tag:

```html
<tcla-live-apps-case-search></tcla-live-apps-case-search>
```

#### Inputs

Attribute | Type | Comments
--- | --- | ---
appIds | string[] | The list of LA Application IDs you want to handle
sandboxId | number | sandboxId - this comes from claims resolver

#### Outputs

Attribute | Type |   | Comments
--- | --- | --- | ---
foundRefs | EventEmitter<CaseSearchResults> |   |  
  | Event |  foundRefs  |  Search completed (caseRefs returned)
  | Payload |  CaseSearchResults  |  caseRefs matching the search (so parent can display them in case list component)


<b>full development Documenation</b>

[Link to LiveAppsCaseSearchComponent](https://tibcosoftware.github.io/TCSTK-Angular/libdocs/tc-liveapps-lib/components/LiveAppsCaseSearchComponent.html)


[auto]: https://img.shields.io/badge/Status-auto%20generated-lightgrey.svg?style=flat "auto generated"

[manually]: https://img.shields.io/badge/Status-manually%20created-yellow.svg?style=flat "manually created"

[draft]: https://img.shields.io/badge/Status-draft-red.svg?style=flat "draft"

[review]: https://img.shields.io/badge/Status-need%20review-yellowgreen.svg?style=flat "need review"

[review done]: https://img.shields.io/badge/Status-review%20done-green.svg?style=flat "review done"

[finalized]: https://img.shields.io/badge/Status-finalized-brightgreen.svg?style=flat "finalized"

[top]: https://img.shields.io/badge/Component%20Type-Top-blue.svg?style=flat "top Component"

[major]: https://img.shields.io/badge/Component%20Type-major%20Component-blue.svg?style=flat "major Component"

[minor]: https://img.shields.io/badge/Component%20Type-minor%20Component-blue.svg?style=flat "minor Component"


