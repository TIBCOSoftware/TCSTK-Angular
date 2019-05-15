
![Status][auto] ![Component Type][top] <!--Component Meta {"created_by":"JS", "reviewed_by":"JG", "last_modified_by":"JS", "comment":"init"} Component Meta -->


<p>Displays data for a case in a widget (high level)</p>

<p><img src="../Case-Data.png" alt="alt-text" class="img-responsive" title="Image"></p>



#### Usage


This Component can be used by using the following HTML Tag:

```html
<tcla-live-apps-case-data></tcla-live-apps-case-data>
```

#### Inputs

Attribute | Type | Comments
--- | --- | ---
appId | string | The LA Application Id
caseRef | string | The case reference
customDataId |  | not used
customFormDefs | CustomFormDefs | Custom Form configuration file
layout | any[] | Layout object that can be passed to override default layout of the form renderer
sandboxId | number | sandboxId - this comes from claims resolver
showHeader | boolean | Whether to show the header bar in the widget - eg. favorites on home page (contains icon etc) - if off icons still appear without bar
typeId | string | The LA Application Type Id (generally 1)
uiAppId | string | The Application ID of the UI (should ideally be unique as it is shared state key)


[auto]: https://img.shields.io/badge/Status-auto%20generated-lightgrey.svg?style=flat "auto generated"

[manually]: https://img.shields.io/badge/Status-manually%20created-yellow.svg?style=flat "manually created"

[draft]: https://img.shields.io/badge/Status-draft-red.svg?style=flat "draft"

[review]: https://img.shields.io/badge/Status-need%20review-yellowgreen.svg?style=flat "need review"

[review done]: https://img.shields.io/badge/Status-review%20done-green.svg?style=flat "review done"

[finalized]: https://img.shields.io/badge/Status-finalized-brightgreen.svg?style=flat "finalized"

[top]: https://img.shields.io/badge/Component%20Type-Top-blue.svg?style=flat "top Component"

[major]: https://img.shields.io/badge/Component%20Type-major%20Component-blue.svg?style=flat "major Component"

[minor]: https://img.shields.io/badge/Component%20Type-minor%20Component-blue.svg?style=flat "minor Component"


