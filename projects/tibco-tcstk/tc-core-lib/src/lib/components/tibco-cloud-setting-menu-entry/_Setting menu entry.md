
![Status][auto] ![Component Type][minor] <!--Component Meta {"created_by":"Auto", "reviewed_by":"Auto", "last_modified_by":"Auto", "comment":"none"} Component Meta -->


<p>Renders the menu options for each config menu</p>

<p><img src="../tibco-cloud-setting-menu-entry.png" alt="alt-text" class="img-responsive" title="Image"></p>



#### Usage


This Component can be used by using the following HTML Tag:

```html
<tc-tibco-cloud-setting-menu-entry></tc-tibco-cloud-setting-menu-entry>
```

#### Inputs

Attribute | Type | Comments
--- | --- | ---
icon | string | icon name (svg key - needs to be registered)
options | string[] | RenderedFormComponent: (options from third party API). TibcoCloudSettingMenuEntryComponent -Check with MC - not sure we need to document this.
title | string | page title comes from config resolver

#### Outputs

Attribute | Type |   | Comments
--- | --- | --- | ---
configureOption | EventEmitter<string> |   |  
  | Event |  configureOption  |  Option Clicked
  | Payload |  string  |  emits Id of option selected in config main page (options)


<b>full development Documentation</b>

[Link to TibcoCloudSettingMenuEntryComponent](https://tibcosoftware.github.io/TCSTK-Angular/libdocs/tc-core-lib/components/TibcoCloudSettingMenuEntryComponent.html)


[auto]: https://img.shields.io/badge/Status-auto%20generated-lightgrey.svg?style=flat "auto generated"

[manually]: https://img.shields.io/badge/Status-manually%20created-yellow.svg?style=flat "manually created"

[draft]: https://img.shields.io/badge/Status-draft-red.svg?style=flat "draft"

[review]: https://img.shields.io/badge/Status-need%20review-yellowgreen.svg?style=flat "need review"

[review done]: https://img.shields.io/badge/Status-review%20done-green.svg?style=flat "review done"

[finalized]: https://img.shields.io/badge/Status-finalized-brightgreen.svg?style=flat "finalized"

[top]: https://img.shields.io/badge/Component%20Type-Top-blue.svg?style=flat "top Component"

[major]: https://img.shields.io/badge/Component%20Type-major%20Component-blue.svg?style=flat "major Component"

[minor]: https://img.shields.io/badge/Component%20Type-minor%20Component-blue.svg?style=flat "minor Component"


