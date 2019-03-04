## Documents Component
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
live Showcase

```html
<!-- as HTML within Markdown, just remove the ```html code-area ``` -->
<tcla-live-apps-documents [sandboxId]="sandboxId" [folderType]="'orgFolders'" [folderId]="501" folderDescription="Sample"></tcla-live-apps-documents>
<script type="text/javascript" src="http://host/cust-component/tcla-live-apps-documents.js"></script>
```

> Showcase connected to Mock Service


