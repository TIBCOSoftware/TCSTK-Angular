
![Status][auto] ![Component Type][minor] <!--Component Meta {"created_by":"HP", "reviewed_by":"Auto", "last_modified_by":"Auto", "comment":"?check hugo"} Component Meta -->


<p>Lists live apps applications in drop down list allowing selection of app</p>

<p><img src="../live-apps-applications.png" alt="alt-text" class="img-responsive" title="Image"></p>



#### Usage


This Component can be used by using the following HTML Tag:

```html
<tcla-live-apps-applications></tcla-live-apps-applications>
```

#### Inputs

Attribute | Type | Comments
--- | --- | ---
appIds | string[] | The list of LA Application IDs you want to handle
sandboxId | number | sandboxId - this comes from claims resolver
selectedApp | CaseType | Application selected from dropdown (output)
selectFirstApp | boolean | Whether to auto select the first app in dropdown selector (eg search)

#### Outputs

Attribute | Type |   | Comments
--- | --- | --- | ---
selection | EventEmitter<CaseType> |   |  
  | Event |  selection  |  Value selected in child component
  | Payload |  CaseType  |  type varies.  but is when something is selected in a drop down it is passed back to the caller


<b>full development Documentation</b>

[Link to LiveAppsApplicationsComponent](https://tibcosoftware.github.io/TCSTK-Libdocs/libdocs/tc-liveapps-lib/components/LiveAppsApplicationsComponent.html)


[auto]: https://img.shields.io/badge/Status-auto%20generated-lightgrey.svg?style=flat "auto generated"

[manually]: https://img.shields.io/badge/Status-manually%20created-yellow.svg?style=flat "manually created"

[draft]: https://img.shields.io/badge/Status-draft-red.svg?style=flat "draft"

[review]: https://img.shields.io/badge/Status-need%20review-yellowgreen.svg?style=flat "need review"

[review done]: https://img.shields.io/badge/Status-review%20done-green.svg?style=flat "review done"

[finalized]: https://img.shields.io/badge/Status-finalized-brightgreen.svg?style=flat "finalized"

[top]: https://img.shields.io/badge/Component%20Type-Top-blue.svg?style=flat "top Component"

[major]: https://img.shields.io/badge/Component%20Type-major%20Component-blue.svg?style=flat "major Component"

[minor]: https://img.shields.io/badge/Component%20Type-minor%20Component-blue.svg?style=flat "minor Component"


