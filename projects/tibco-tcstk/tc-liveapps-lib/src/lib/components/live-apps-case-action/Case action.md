
![Status][auto] ![Component Type][minor] <!--Component Meta {"created_by":"Auto", "reviewed_by":"Auto", "last_modified_by":"Auto", "comment":"none"} Component Meta -->


<p>Wraps rendering an execution of an action</p>



#### Usage


This Component can be used by using the following HTML Tag:

```html
<tcla-live-apps-case-action></tcla-live-apps-case-action>
```

#### Inputs

Attribute | Type | Comments
--- | --- | ---
caseRef | string | The case reference
formsFramework | string | 
legacyActions | boolean | 
showHeader | boolean | Whether to show the header bar in the widget - eg. favorites on home page (contains icon etc) - if off icons still appear without bar
applicationId | string | LA application ID
customFormDefs | CustomFormDefs | Custom Form configuration file
dataOverride | any | Data object that will be displayed on the form. Allows overriding over form data (eg. when selecting data in spotfire)
formConfig |  | 
formsFramework | string | 
legacyCreators | boolean | 
process | LaProcessSelection | The process definition of the action or creator to execute
sandboxId | number | sandboxId - this comes from claims resolver
typeId | string | The LA Application Type Id (generally 1)

#### Outputs

Attribute | Type |   | Comments
--- | --- | --- | ---
caseChanged | EventEmitter<ProcessId> |   |  
  | Event |  caseChanged  |  Case action started (process started)
  | Payload |  ProcessId  |  ProcessId object passed when a case has been updated or created by a process (action/creator)


<b>full development Documentation</b>

[Link to LiveAppsCaseActionComponent](https://tibcosoftware.github.io/TCSTK-Libdocs/libdocs/tc-liveapps-lib/components/LiveAppsCaseActionComponent.html)


[auto]: https://img.shields.io/badge/Status-auto%20generated-lightgrey.svg?style=flat "auto generated"

[manually]: https://img.shields.io/badge/Status-manually%20created-yellow.svg?style=flat "manually created"

[draft]: https://img.shields.io/badge/Status-draft-red.svg?style=flat "draft"

[review]: https://img.shields.io/badge/Status-need%20review-yellowgreen.svg?style=flat "need review"

[review done]: https://img.shields.io/badge/Status-review%20done-green.svg?style=flat "review done"

[finalized]: https://img.shields.io/badge/Status-finalized-brightgreen.svg?style=flat "finalized"

[top]: https://img.shields.io/badge/Component%20Type-Top-blue.svg?style=flat "top Component"

[major]: https://img.shields.io/badge/Component%20Type-major%20Component-blue.svg?style=flat "major Component"

[minor]: https://img.shields.io/badge/Component%20Type-minor%20Component-blue.svg?style=flat "minor Component"


