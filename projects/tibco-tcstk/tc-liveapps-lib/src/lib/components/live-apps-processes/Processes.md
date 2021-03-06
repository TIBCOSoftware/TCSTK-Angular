
![Status][auto] ![Component Type][minor] <!--Component Meta {"created_by":"Auto", "reviewed_by":"Auto", "last_modified_by":"Auto", "comment":"none"} Component Meta -->




#### Usage


This Component can be used by using the following HTML Tag:

```html
<tcla-live-apps-processes></tcla-live-apps-processes>
```

#### Inputs

Attribute | Type | Comments
--- | --- | ---
appId | string | The LA Application Id
includeCaseDataPage | boolean | 
sandboxId | number | sandboxId - this comes from claims resolver
typeId | string | The LA Application Type Id (generally 1)

#### Outputs

Attribute | Type |   | Comments
--- | --- | --- | ---
processClicked | EventEmitter<Process> |   |  
  | Event |  processClicked  |  Process selected
  | Payload |  LaProcessSelection  |  LaProcessSelection object output when a process is clicked


<b>full development Documentation</b>

[Link to LiveAppsProcessesComponent](https://tibcosoftware.github.io/TCSTK-Libdocs/libdocs/tc-liveapps-lib/components/LiveAppsProcessesComponent.html)


[auto]: https://img.shields.io/badge/Status-auto%20generated-lightgrey.svg?style=flat "auto generated"

[manually]: https://img.shields.io/badge/Status-manually%20created-yellow.svg?style=flat "manually created"

[draft]: https://img.shields.io/badge/Status-draft-red.svg?style=flat "draft"

[review]: https://img.shields.io/badge/Status-need%20review-yellowgreen.svg?style=flat "need review"

[review done]: https://img.shields.io/badge/Status-review%20done-green.svg?style=flat "review done"

[finalized]: https://img.shields.io/badge/Status-finalized-brightgreen.svg?style=flat "finalized"

[top]: https://img.shields.io/badge/Component%20Type-Top-blue.svg?style=flat "top Component"

[major]: https://img.shields.io/badge/Component%20Type-major%20Component-blue.svg?style=flat "major Component"

[minor]: https://img.shields.io/badge/Component%20Type-minor%20Component-blue.svg?style=flat "minor Component"


