
![Status][auto] ![Component Type][top] <!--Component Meta {"created_by":"JS", "reviewed_by":"JG", "last_modified_by":"JS", "comment":"init"} Component Meta -->


<p>Not used by app but wraps action list and action execution.</p>



#### Usage


This Component can be used by using the following HTML Tag:

```html
<tcla-live-apps-actions></tcla-live-apps-actions>
```

#### Inputs

Attribute | Type | Comments
--- | --- | ---
applicationId | string | LA Application ID
caseRef | string | The case reference
caseState | string | The state of the case
customFormDefs | CustomFormDefs | Custom Form configuration file
sandboxId | number | sandboxId - this comes from claims resolver
typeId | string | The LA Application Type Id (generally 1)

#### Outputs

Attribute | Type |   | Comments
--- | --- | --- | ---
caseActioned | EventEmitter<ProcessId> |   |  
  | Event |  caseActioned  |  Case action starterd (process started)
  | Payload |  ProcessId  |  processId of started process in live apps (action)


<b>full development Documenation</b>

[Link to LiveAppsActionsComponent](https://tibcosoftware.github.io/TCSTK-Angular/libdocs/tc-core-lib/components/LiveAppsActionsComponent.html)


[auto]: https://img.shields.io/badge/Status-auto%20generated-lightgrey.svg?style=flat "auto generated"

[manually]: https://img.shields.io/badge/Status-manually%20created-yellow.svg?style=flat "manually created"

[draft]: https://img.shields.io/badge/Status-draft-red.svg?style=flat "draft"

[review]: https://img.shields.io/badge/Status-need%20review-yellowgreen.svg?style=flat "need review"

[review done]: https://img.shields.io/badge/Status-review%20done-green.svg?style=flat "review done"

[finalized]: https://img.shields.io/badge/Status-finalized-brightgreen.svg?style=flat "finalized"

[top]: https://img.shields.io/badge/Component%20Type-Top-blue.svg?style=flat "top Component"

[major]: https://img.shields.io/badge/Component%20Type-major%20Component-blue.svg?style=flat "major Component"

[minor]: https://img.shields.io/badge/Component%20Type-minor%20Component-blue.svg?style=flat "minor Component"


