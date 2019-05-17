
![Status][auto] ![Component Type][major] <!--Component Meta {"created_by":"JS", "reviewed_by":"JG", "last_modified_by":"JS", "comment":"init"} Component Meta -->


<p>Document List and upload Component</p>

<p>This Component allows to list, upload, download, Documents attached to a Case-Instance or a whole Application.

In the Upload Dialog the User is able to select a local File and enter a short Description.</p>

<p>The Component stores also the following Data

- uploading User

- Timestamp

- File Size</p>

<p>Document List<br>

<img src="../Documents.png" alt="alt-text" class="img-responsive" title="Documents Component Image">

Document Upload Dialog <br>

<img src="../Docs-Upload.png" alt="alt-text" class="img-responsive" title="Documents Component Image"></p>



#### Usage


This Component can be used by using the following HTML Tag:

```html
<tcla-live-apps-documents></tcla-live-apps-documents>
```

#### Inputs

Attribute | Type | Comments
--- | --- | ---
filter | string | NOT used but would allow a search filter on documents
folderDescription | string | header text on component (defaults to documents)
folderId | string | The organisation folder to store/retrieve documents
folderType | string | orgFolders&#39; or &#39;caseFolders&#39; - different API calls made according to which one this is
sandboxId | number | sandboxId - this comes from claims resolver
showHeader | boolean | Whether to show the header bar in the widget - eg. favorites on home page (contains icon etc) - if off icons still appear without bar


<b>full development Documentation</b>

[Link to LiveAppsDocumentsComponent](https://tibcosoftware.github.io/TCSTK-Angular/libdocs/tc-liveapps-lib/components/LiveAppsDocumentsComponent.html)


[auto]: https://img.shields.io/badge/Status-auto%20generated-lightgrey.svg?style=flat "auto generated"

[manually]: https://img.shields.io/badge/Status-manually%20created-yellow.svg?style=flat "manually created"

[draft]: https://img.shields.io/badge/Status-draft-red.svg?style=flat "draft"

[review]: https://img.shields.io/badge/Status-need%20review-yellowgreen.svg?style=flat "need review"

[review done]: https://img.shields.io/badge/Status-review%20done-green.svg?style=flat "review done"

[finalized]: https://img.shields.io/badge/Status-finalized-brightgreen.svg?style=flat "finalized"

[top]: https://img.shields.io/badge/Component%20Type-Top-blue.svg?style=flat "top Component"

[major]: https://img.shields.io/badge/Component%20Type-major%20Component-blue.svg?style=flat "major Component"

[minor]: https://img.shields.io/badge/Component%20Type-minor%20Component-blue.svg?style=flat "minor Component"


