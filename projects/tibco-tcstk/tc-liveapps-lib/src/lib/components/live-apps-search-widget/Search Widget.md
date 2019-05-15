## Search Widget Component

![Status][auto] ![Component Type][top] <!--Component Meta {"created_by":"JS", "reviewed_by":"JG", "last_modified_by":"JS", "comment":"wrapper"} Component Meta -->

This Component allows to search for existing Cases and list Case Cards.

#### Screenshot
Screenshot Image of the Search Widget Component missing yet.

#### Usage
Sample usage HTML Tag

```html
<!-- just for testing -->
<tcla-live-apps-search-widget [sandboxId]="" [uiAppId]=""></tcla-live-apps-search-widget>
```

#### Inputs
available Component Input Attributes

| Attribute         | Type                          | Default Value | Comments                                        |
| ----------------- |:----------------------------- |:------------- |:----------------------------------------------- |
| sandboxId         | number                        |               | current Sandbox ID                              |
| uiAppId           | string                        |               | your unique App ID                              |
| appIds            | string                        |               | list of searchable Apps                         |

#### Outputs
available Component Output Attributes

| Attribute         | Type                          | Default Value | Comments                                        |
| ----------------- |:----------------------------- |:------------- |:----------------------------------------------- |
| caseSelected      |                               |               | selected Case                                   |

#### Demos
Showcase placeholder

```html
<!-- as HTML within Markdown, just remove the ```html code-area ``` -->
<tcla-live-apps-search-widget [sandboxId]="" [uiAppId]=""></tcla-live-apps-search-widget>
<script type="text/javascript" src="http://host/cust-component/tcla-live-apps-search-widget.js"></script>
```

> Showcase connected to Mock Service later

[auto]: https://img.shields.io/badge/Status-auto%20generated-lightgrey.svg?style=flat "auto generated"
[manually]: https://img.shields.io/badge/Status-manually%20created-yellow.svg?style=flat "manually created"
[draft]: https://img.shields.io/badge/Status-draft-red.svg?style=flat "draft"
[review]: https://img.shields.io/badge/Status-need%20review-yellowgreen.svg?style=flat "need review"
[review done]: https://img.shields.io/badge/Status-review%20done-green.svg?style=flat "review done"
[finalized]: https://img.shields.io/badge/Status-finalized-brightgreen.svg?style=flat "finalized"

[top]: https://img.shields.io/badge/Component%20Type-Top-blue.svg?style=flat "top Component"
[major]: https://img.shields.io/badge/Component%20Type-major%20Component-blue.svg?style=flat "major Component"
[minor]: https://img.shields.io/badge/Component%20Type-minor%20Component-blue.svg?style=flat "minor Component"
