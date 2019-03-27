## Application Configuration Component
This Component allows to reconfigure Case Cards because of Icons and Colors within your Application Configuration.

#### Screenshot
Screenshot Image of the Application Configuration Component.

![Screenshot missing yet](App-Configuration.png "Application Configuration Component Image")

#### Usage
Sample usage HTML Tag

```html
<!-- just for testing -->
<tcla-live-apps-application-configuration [sandboxId]="" [uiAppId]=""></tcla-live-apps-application-configuration>
```

#### Inputs
available Component Input Attributes

| Attribute         | Type                          | Default Value | Comments                                        |
| ----------------- |:----------------------------- |:------------- |:----------------------------------------------- |
| appId             | string                        |               | current App ID                                  |
| appTypeLabel      | string                        |               |                                                 |
| sandboxId         | number                        |               | current Sandbox ID                              |
| uiAppId           | string                        |               | your unique App ID                              |
| folderId          | string                        |               |                                                 |

#### Outputs
available Component Output Attributes

| Attribute         | Type                          | Default Value | Comments                                        |
| ----------------- |:----------------------------- |:------------- |:----------------------------------------------- |
| configChanged     |                               |               | indicate a changed configuration                |

#### Demos
live Showcase

```html
<!-- as HTML within Markdown, just remove the ```html code-area ``` -->
<tcla-live-apps-application-configuration [sandboxId]="" [uiAppId]=""></tcla-live-apps-application-configuration>
<script type="text/javascript" src="http://host/cust-component/tcla-live-apps-tcla-live-apps-application-configuration.js"></script>
```

> Showcase connected to Mock Service later


