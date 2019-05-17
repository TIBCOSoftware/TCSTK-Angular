
![Status][auto] ![Component Type][top] <!--Component Meta {"created_by":"JS", "reviewed_by":"JG", "last_modified_by":"JS", "comment":"init"} Component Meta -->


<p>Manages summary card configuration</p>



#### Usage


This Component can be used by using the following HTML Tag:

```html
<tcla-live-apps-application-configuration></tcla-live-apps-application-configuration>
```

#### Inputs

Attribute | Type | Comments
--- | --- | ---
appId | string | The LA Application Id
appTypeLabel | string | The label shown above the case type in the configuration widget
folderId | string | The organisation folder to store/retrieve documents
sandboxId | number | sandboxId - this comes from claims resolver
uiAppId | string | The Application ID of the UI (should ideally be unique as it is shared state key)

#### Outputs

Attribute | Type |   | Comments
--- | --- | --- | ---
configChanged | EventEmitter<CaseCardConfig> |   |  
  | Event |  configChanged  |  Configuration values changed
  | Payload |  CaseCardConfig  |  CaseCardConfig object when configuration is changed (so called can do a save with data)


<b>full development Documenation</b>

[Link to LiveAppsApplicationConfigurationComponent](https://tibcosoftware.github.io/TCSTK-Angular/libdocs/tc-liveapps-lib/components/LiveAppsApplicationConfigurationComponent.html)


[auto]: https://img.shields.io/badge/Status-auto%20generated-lightgrey.svg?style=flat "auto generated"

[manually]: https://img.shields.io/badge/Status-manually%20created-yellow.svg?style=flat "manually created"

[draft]: https://img.shields.io/badge/Status-draft-red.svg?style=flat "draft"

[review]: https://img.shields.io/badge/Status-need%20review-yellowgreen.svg?style=flat "need review"

[review done]: https://img.shields.io/badge/Status-review%20done-green.svg?style=flat "review done"

[finalized]: https://img.shields.io/badge/Status-finalized-brightgreen.svg?style=flat "finalized"

[top]: https://img.shields.io/badge/Component%20Type-Top-blue.svg?style=flat "top Component"

[major]: https://img.shields.io/badge/Component%20Type-major%20Component-blue.svg?style=flat "major Component"

[minor]: https://img.shields.io/badge/Component%20Type-minor%20Component-blue.svg?style=flat "minor Component"


