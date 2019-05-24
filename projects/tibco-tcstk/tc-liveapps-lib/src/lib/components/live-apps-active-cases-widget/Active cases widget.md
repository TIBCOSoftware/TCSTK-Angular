
![Status][auto] ![Component Type][minor] <!--Component Meta {"created_by":"Auto", "reviewed_by":"Auto", "last_modified_by":"Auto", "comment":"none"} Component Meta -->


<p>Home page active cases widget main component</p>

<p><img src="../live-apps-active-cases-widget.png" alt="alt-text" class="img-responsive" title="Image"></p>



#### Usage


This Component can be used by using the following HTML Tag:

```html
<tcla-live-apps-active-cases-widget></tcla-live-apps-active-cases-widget>
```

#### Inputs

Attribute | Type | Comments
--- | --- | ---
appIds | string[] | The list of LA Application IDs you want to handle
maxLegendItems | number | Maximum rows to show in legend before it is hidden (otherwise would take whole widget)
sandboxId | number | sandboxId - this comes from claims resolver
showHeader | boolean | Whether to show the header bar in the widget - eg. favorites on home page (contains icon etc) - if off icons still appear without bar
showPercentages |  | Whether to show percentages or raw case numbers on the doughnut chart
uiAppId | string | The Application ID of the UI (should ideally be unique as it is shared state key)

#### Outputs

Attribute | Type |   | Comments
--- | --- | --- | ---
selectedCaseType | EventEmitter<CaseTypeReportRecord> |   |  
  | Event |  selectedCaseType  |  Case Type selected in vizualization
  | Payload |  CaseTypeReportRecord  |  CaseTypeReportRecord object selected from component
selectedCaseTypeState | EventEmitter<CaseTypeStateReportStateInfo> |   |  
  | Event |  selectedCaseTypeState  |  Case Type state selected in vizualization
  | Payload |  CaseTypeStateReportStateInfo  |  CaseTypeStateReportStateInfo object selected from component (to drive caller to display something different (drill down))


<b>full development Documentation</b>

[Link to LiveAppsActiveCasesWidgetComponent](https://tibcosoftware.github.io/TCSTK-Angular/libdocs/tc-liveapps-lib/components/LiveAppsActiveCasesWidgetComponent.html)


[auto]: https://img.shields.io/badge/Status-auto%20generated-lightgrey.svg?style=flat "auto generated"

[manually]: https://img.shields.io/badge/Status-manually%20created-yellow.svg?style=flat "manually created"

[draft]: https://img.shields.io/badge/Status-draft-red.svg?style=flat "draft"

[review]: https://img.shields.io/badge/Status-need%20review-yellowgreen.svg?style=flat "need review"

[review done]: https://img.shields.io/badge/Status-review%20done-green.svg?style=flat "review done"

[finalized]: https://img.shields.io/badge/Status-finalized-brightgreen.svg?style=flat "finalized"

[top]: https://img.shields.io/badge/Component%20Type-Top-blue.svg?style=flat "top Component"

[major]: https://img.shields.io/badge/Component%20Type-major%20Component-blue.svg?style=flat "major Component"

[minor]: https://img.shields.io/badge/Component%20Type-minor%20Component-blue.svg?style=flat "minor Component"


