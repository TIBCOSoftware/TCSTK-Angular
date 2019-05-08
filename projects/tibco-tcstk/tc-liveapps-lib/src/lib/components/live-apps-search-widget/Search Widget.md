## Search Widget Component
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
live Showcase

```html
<!-- as HTML within Markdown, just remove the ```html code-area ``` -->
<tcla-live-apps-search-widget [sandboxId]="" [uiAppId]=""></tcla-live-apps-search-widget>
<script type="text/javascript" src="http://host/cust-component/tcla-live-apps-search-widget.js"></script>
```

> Showcase connected to Mock Service later


