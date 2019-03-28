## Creators Component
This Component supports to create new Case Instances and shows a list of available Starters followed by the first Form defined in LiveApps Designer.

#### Screenshot
Screenshot Image of the Creators Component.

![Screenshot missing yet](Creators.png "Creators Component Image")

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


