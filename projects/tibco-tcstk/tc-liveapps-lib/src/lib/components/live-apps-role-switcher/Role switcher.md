
![Status][auto] ![Component Type][minor] <!--Component Meta {"created_by":"Auto", "reviewed_by":"Auto", "last_modified_by":"Auto", "comment":"?mc?"} Component Meta -->


<p>Switch roles</p>



#### Usage


This Component can be used by using the following HTML Tag:

```html
<tcla-live-apps-role-switcher></tcla-live-apps-role-switcher>
```

#### Inputs

Attribute | Type | Comments
--- | --- | ---
roles | RoleAttribute[] | Roles - The users current roles
selectedRole | RoleAttribute | RoleAttribute - selected Role - check with MC

#### Outputs

Attribute | Type |   | Comments
--- | --- | --- | ---
changeRoleEvent | EventEmitter<RoleAttribute> |   |  
  | Event |  changeRoleEvent  |  Role selected
  | Payload |  RoleAttribute  |  RoleAttribute object emitted when role is c hanged by switcher


[auto]: https://img.shields.io/badge/Status-auto%20generated-lightgrey.svg?style=flat "auto generated"

[manually]: https://img.shields.io/badge/Status-manually%20created-yellow.svg?style=flat "manually created"

[draft]: https://img.shields.io/badge/Status-draft-red.svg?style=flat "draft"

[review]: https://img.shields.io/badge/Status-need%20review-yellowgreen.svg?style=flat "need review"

[review done]: https://img.shields.io/badge/Status-review%20done-green.svg?style=flat "review done"

[finalized]: https://img.shields.io/badge/Status-finalized-brightgreen.svg?style=flat "finalized"

[top]: https://img.shields.io/badge/Component%20Type-Top-blue.svg?style=flat "top Component"

[major]: https://img.shields.io/badge/Component%20Type-major%20Component-blue.svg?style=flat "major Component"

[minor]: https://img.shields.io/badge/Component%20Type-minor%20Component-blue.svg?style=flat "minor Component"


