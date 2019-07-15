
![Status][auto] ![Component Type][major] <!--Component Meta {"created_by":"Auto", "reviewed_by":"Auto", "last_modified_by":"Auto", "comment":"wrapper for case creator"} Component Meta -->


<p>Wraps case creators component (high level component)</p>



#### Usage


This Component can be used by using the following HTML Tag:

```html
<tcla-live-apps-case-creator-widget></tcla-live-apps-case-creator-widget>
```

#### Inputs

Attribute | Type | Comments
--- | --- | ---
application | CaseType | CaseType model for the case type you want to run a case creator for (normally comes from an application selector component)
customFormDefs | CustomFormDefs | Custom Form configuration file
initialData | any | override the initial data for a case creator
sandboxId | number | sandboxId - this comes from claims resolver
uiAppId | string | The Application ID of the UI (should ideally be unique as it is shared state key)

#### Outputs

Attribute | Type |   | Comments
--- | --- | --- | ---
caseCreated | EventEmitter<ProcessId> |   |  
  | Event |  caseCreated  |  Case Creator started (process started)
  | Payload |  ProcessId  |  ProcessId object output on case creation (details of process started)


<b>full development Documentation</b>

[Link to LiveAppsCaseCreatorWidgetComponent](https://tibcosoftware.github.io/TCSTK-Libdocs/libdocs/tc-liveapps-lib/components/LiveAppsCaseCreatorWidgetComponent.html)


[auto]: https://img.shields.io/badge/Status-auto%20generated-lightgrey.svg?style=flat "auto generated"

[manually]: https://img.shields.io/badge/Status-manually%20created-yellow.svg?style=flat "manually created"

[draft]: https://img.shields.io/badge/Status-draft-red.svg?style=flat "draft"

[review]: https://img.shields.io/badge/Status-need%20review-yellowgreen.svg?style=flat "need review"

[review done]: https://img.shields.io/badge/Status-review%20done-green.svg?style=flat "review done"

[finalized]: https://img.shields.io/badge/Status-finalized-brightgreen.svg?style=flat "finalized"

[top]: https://img.shields.io/badge/Component%20Type-Top-blue.svg?style=flat "top Component"

[major]: https://img.shields.io/badge/Component%20Type-major%20Component-blue.svg?style=flat "major Component"

[minor]: https://img.shields.io/badge/Component%20Type-minor%20Component-blue.svg?style=flat "minor Component"


