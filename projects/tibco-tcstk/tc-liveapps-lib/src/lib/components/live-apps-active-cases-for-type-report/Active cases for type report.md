
![Status][auto] ![Component Type][minor] <!--Component Meta {"created_by":"Auto", "reviewed_by":"Auto", "last_modified_by":"Auto", "comment":"none"} Component Meta -->


<p>Home page active cases widget sub component</p>



#### Usage


This Component can be used by using the following HTML Tag:

```html
<tcla-live-apps-active-cases-for-type-report></tcla-live-apps-active-cases-for-type-report>
```

#### Inputs

Attribute | Type | Comments
--- | --- | ---
appId | string | The LA Application Id
maxLegendItems | number | Maximum rows to show in legend before it is hidden (otherwise would take whole widget)
sandboxId | number | sandboxId - this comes from claims resolver
showPercentages |  | Whether to show percentages or raw case numbers on the doughnut chart
typeId | string | The LA Application Type Id (generally 1)
uiAppId | string | The Application ID of the UI (should ideally be unique as it is shared state key)

#### Outputs

Attribute | Type |   | Comments
--- | --- | --- | ---
selectedCaseTypeState | EventEmitter<CaseTypeStateReportStateInfo> |   |  
  | Event |  selectedCaseTypeState  |  Case Type state selected in vizualization
  | Payload |  CaseTypeStateReportStateInfo  |  CaseTypeStateReportStateInfo object selected from component (to drive caller to display something different (drill down))


<b>full development Documentation</b>

[Link to LiveAppsActiveCasesForTypeReportComponent](https://tibcosoftware.github.io/TCSTK-Angular/libdocs/tc-liveapps-lib/components/LiveAppsActiveCasesForTypeReportComponent.html)


[auto]: https://img.shields.io/badge/Status-auto%20generated-lightgrey.svg?style=flat "auto generated"

[manually]: https://img.shields.io/badge/Status-manually%20created-yellow.svg?style=flat "manually created"

[draft]: https://img.shields.io/badge/Status-draft-red.svg?style=flat "draft"

[review]: https://img.shields.io/badge/Status-need%20review-yellowgreen.svg?style=flat "need review"

[review done]: https://img.shields.io/badge/Status-review%20done-green.svg?style=flat "review done"

[finalized]: https://img.shields.io/badge/Status-finalized-brightgreen.svg?style=flat "finalized"

[top]: https://img.shields.io/badge/Component%20Type-Top-blue.svg?style=flat "top Component"

[major]: https://img.shields.io/badge/Component%20Type-major%20Component-blue.svg?style=flat "major Component"

[minor]: https://img.shields.io/badge/Component%20Type-minor%20Component-blue.svg?style=flat "minor Component"


