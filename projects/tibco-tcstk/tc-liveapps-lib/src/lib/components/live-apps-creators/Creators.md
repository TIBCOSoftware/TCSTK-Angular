## Creators Component

![Status][draft] ![Component Type][top] <!--Component Meta {"created_by":"JS", "reviewed_by":"JG", "last_modified_by":"JS", "comment":"init"} Component Meta -->

This Component supports to create new Case Instances and shows a list of available Starters followed by the first Form defined in LiveApps Designer.

#### Screenshot
Screenshot Image of the Creators Component missing yet.

#### Usage
Sample usage HTML Tag

```html
<!-- just for testing -->
<tcla-live-apps-creators [sandboxId]="" [applicationId]=""></tcla-live-apps-creators>
```

#### Inputs
available Component Input Attributes

| Attribute         | Type                          | Default Value | Comments                                        |
| ----------------- |:----------------------------- |:------------- |:----------------------------------------------- |
| sandboxId         | number                        |               | current Sandbox ID                              |
| applicationId     | string                        |               | your App ID                                     |
| typeId            | string                        |               |                                                 |
| dataOverride      | any                           |               |                                                 |

#### Outputs
available Component Output Attributes

| Attribute         | Type                          | Default Value | Comments                                        |
| ----------------- |:----------------------------- |:------------- |:----------------------------------------------- |
| caseCreated       |                               |               |                                                 |

#### Demos
live Showcase

```html
<!-- as HTML within Markdown, just remove the ```html code-area ``` -->
<tcla-live-apps-creators [sandboxId]="" [applicationId]=""></tcla-live-apps-creators>
<script type="text/javascript" src="http://host/cust-component/tcla-live-apps-creators.js"></script>
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
