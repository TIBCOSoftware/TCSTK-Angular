## Documents Component

![Status][draft] ![Component Type][top] <!--Component Meta {"created_by":"JS", "reviewed_by":"JG", "last_modified_by":"JS", "comment":"init"} Component Meta -->

This Component allows to list, upload, download, Documents attached to a Case-Instance or a whole Application.
In the Upload Dialog the User is able to select a local File and enter a short Description.

The Component stores also the following Data
- uploading User
- Timestamp
- File Size

#### Screenshot
Screenshot Image of the Documents Component.

##### Document List

![alt-text](Documents.png "Documents Component Image")

##### Document Upload Dialog

![alt-text](Docs-Upload.png "Documents Component Image")

#### Usage
Sample usage HTML Tag

```html
<tcla-live-apps-documents [sandboxId]="sandboxId" [folderType]="'orgFolders'" [folderId]="501" folderDescription="Sample"></tcla-live-apps-documents>
``` 

#### Inputs
available Attributes

| Attribute         | Type                          | Default Value | Comments                    |
| ----------------- |:----------------------------- |:------------- |:--------------------------- |
| sandboxId         | number                        |               | current Sandbox ID          |
| folderType        | 'orgFolders' or 'caseFolders' |               | Docs Folder Type            |
| folderId          | caseRef for caseFolder        |               | Folder ID, case or Org.     |
| filter            | string                        | Optional      | optional Filter of Docs     |
| folderDescription | string                        | Optional      | Description displayed       |


#### Demos
Showcase placeholder

```html
<!-- as HTML within Markdown, just remove the ```html code-area ``` -->
<tcla-live-apps-documents [sandboxId]="sandboxId" [folderType]="'orgFolders'" [folderId]="501" folderDescription="Sample"></tcla-live-apps-documents>
<script type="text/javascript" src="http://host/cust-component/tcla-live-apps-documents.js"></script>
```

> Showcase connected to Mock Service


[auto]: https://img.shields.io/badge/Status-auto%20generated-lightgrey.svg?style=flat "auto generated"
[manually]: https://img.shields.io/badge/Status-manually%20created-yellow.svg?style=flat "manually created"
[draft]: https://img.shields.io/badge/Status-draft-red.svg?style=flat "draft"
[review]: https://img.shields.io/badge/Status-need%20review-yellowgreen.svg?style=flat "need review"
[review done]: https://img.shields.io/badge/Status-review%20done-green.svg?style=flat "review done"
[finalized]: https://img.shields.io/badge/Status-finalized-brightgreen.svg?style=flat "finalized"

[top]: https://img.shields.io/badge/Component%20Type-Top-blue.svg?style=flat "top Component"
[major]: https://img.shields.io/badge/Component%20Type-major%20Component-blue.svg?style=flat "major Component"
[minor]: https://img.shields.io/badge/Component%20Type-minor%20Component-blue.svg?style=flat "minor Component"
