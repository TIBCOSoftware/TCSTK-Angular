## Login Component
detailed description of the component and how to use it

#### Screenshot
Screenshot Image as PNG or animated GIF

![alt-text](Login.png "Image")

#### Usage
If the user is not logged in we just show the login components.
```html
<tcla-live-apps-login></tcla-live-apps-login>
```

This component is required if user is in multiple subscriptions - they must select a subscription to complete login.
```html
<tcla-tibco-cloud-multiple-subscription></tcla-tibco-cloud-multiple-subscription>
```

#### Outputs
available Attributes

| Attribute       | Type            | Default Value | Comments                  |
| --------------- |:--------------- |:------------- |:------------------------- |
| loginContext    | LoginContext    |               | valid Session after login |
| loggedIn        | boolean         | false         | indicate valid Session    |

#### Demos
live Showcase

<tcla-live-apps-login></tcla-live-apps-login>
<script type="text/javascript" src="http://host/cust-component/cust-element.js"></script>

> Showcase connected to Mock Service
