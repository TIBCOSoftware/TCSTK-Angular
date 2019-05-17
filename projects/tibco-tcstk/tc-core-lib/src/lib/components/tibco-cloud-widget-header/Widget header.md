
![Status][auto] ![Component Type][minor] <!--Component Meta {"created_by":"Auto", "reviewed_by":"Auto", "last_modified_by":"Auto", "comment":"none"} Component Meta -->


<p>Header bar for small widgets (like recent cases etc on home)</p>



#### Usage


This Component can be used by using the following HTML Tag:

```html
<tc-tibco-cloud-widget-header></tc-tibco-cloud-widget-header>
```

#### Inputs

Attribute | Type | Comments
--- | --- | ---
headerText | string | Text shown in menu bar
icon | string | icon name (svg key - needs to be registered)
showHeader | boolean | Whether to show the header bar in the widget - eg. favorites on home page (contains icon etc) - if off icons still appear without bar
toolbarButtons | ToolbarButton[] | buttons to display in the menu bar

#### Outputs

Attribute | Type |   | Comments
--- | --- | --- | ---
toolbarButtonEvent | EventEmitter<string> |   |  
  | Event |  toolbarButtonEvent  |  Button Clicked
  | Payload |  string  |  tells caller a button was clicked - outputs button Id


<b>full development Documenation</b>

[Link to TibcoCloudWidgetHeaderComponent](https://tibcosoftware.github.io/TCSTK-Angular/libdocs/tc-core-lib/components/TibcoCloudWidgetHeaderComponent.html)


[auto]: https://img.shields.io/badge/Status-auto%20generated-lightgrey.svg?style=flat "auto generated"

[manually]: https://img.shields.io/badge/Status-manually%20created-yellow.svg?style=flat "manually created"

[draft]: https://img.shields.io/badge/Status-draft-red.svg?style=flat "draft"

[review]: https://img.shields.io/badge/Status-need%20review-yellowgreen.svg?style=flat "need review"

[review done]: https://img.shields.io/badge/Status-review%20done-green.svg?style=flat "review done"

[finalized]: https://img.shields.io/badge/Status-finalized-brightgreen.svg?style=flat "finalized"

[top]: https://img.shields.io/badge/Component%20Type-Top-blue.svg?style=flat "top Component"

[major]: https://img.shields.io/badge/Component%20Type-major%20Component-blue.svg?style=flat "major Component"

[minor]: https://img.shields.io/badge/Component%20Type-minor%20Component-blue.svg?style=flat "minor Component"


