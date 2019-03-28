## Case Summary Component
This Component shows a case overview summary.

#### Screenshot
Screenshot Image of the Case Summary Component.

![Screenshot missing yet](Case-Summary.png "Case Summary Component Image")

#### Usage
Sample usage HTML Tag

```html
<!-- just for testing -->
<tcla-live-apps-case-summary [caseReference]="" [sandboxId]="" [displayType]=""></tcla-live-apps-case-summary>
```

#### Inputs
available Component Input Attributes

| Attribute         | Type                          | Default Value | Comments                                        |
| ----------------- |:----------------------------- |:------------- |:----------------------------------------------- |
| configMode        | boolean                       |               |                                                 |
| configModeColor   | string                        |               | color to display                                |
| configModeIcon    | string                        |               | Icon to display                                 |
| configModeCaseTypeColor   | string                |               |                                                 |
| configModeCaseTypeIcon    | string                |               |                                                 |
| configModeAppTypeLabel    | string                |               |                                                 |
| caseReference     | string                        |               | case Reference to display                       |
| sandboxId         | number                        |               | current Sandbox ID                              |
| displayType       | string (miniCard, card, list) |               | how to display Cards                            |
| borderCard        | boolean                       |               |                                                 |
| typeBar           | boolean                       |               |                                                 |
| uiAppId           | number                        |               | current Sandbox ID                              |
| highlight         | string                        |               | your App ID                                     |

#### Outputs
available Component Output Attributes

| Attribute         | Type                          | Default Value | Comments                                        |
| ----------------- |:----------------------------- |:------------- |:----------------------------------------------- |
| clickCase         |                               |               |                                                 |
| deleted           |                               |               |                                                 |

#### Demos
live Showcase

```html
<!-- as HTML within Markdown, just remove the ```html code-area ``` -->
<tcla-live-apps-case-summary [caseReference]="" [sandboxId]="" [displayType]=""></tcla-live-apps-case-summary>
<script type="text/javascript" src="http://host/cust-component/tcla-live-apps-case-summary.js"></script>
```

> Showcase connected to Mock Service later


