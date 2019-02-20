# Documentation 
### How to avoid CORS Issues
to run Apps locally from the Developer Station an Proxy Configuration is needed to avoid all kinds of Same-origin policy CORS or XXS Issues.
API Sample 'proxy.conf.json' for Angular developments, just use this 'serve' command within your 'scripts' section of 'package.json'

```
"serve": "ng serve --proxy-config proxy.conf.json --ssl true --source-map"
```

here the full 'proxy.conf.json':

> Note: for none EU Locations, just do a quick search&replace for 'eu.liveapps' to 'au.liveapps' or just 'liveapps' for US location.

```json
{
  "/as/token.oauth2": {
    "target": {
      "host": "sso-ext.tibco.com",
      "protocol": "https:",
      "port": 443
    },
    "secure": true,
    "changeOrigin": true,
    "logLevel": "info",
    "cookieDomainRewrite": {
      "*": "cloud.tibco.com"
    },
    "cookiePathRewrite": {
      "*": "/"
    }
  },
  "/idm/v1/login-oauth": {
    "target": {
      "host": "eu.liveapps.cloud.tibco.com",
      "protocol": "https:",
      "port": 443
    },
    "secure": true,
    "changeOrigin": true,
    "logLevel": "info",
    "cookieDomainRewrite": { "*": "localhost" }
  },
  "/tsc-ws/v1/tsc-domain": {
    "target": {
      "host": "eu.liveapps.cloud.tibco.com",
      "protocol": "https:",
      "port": 443
    },
    "secure": true,
    "changeOrigin": true,
    "logLevel": "info",
    "cookieDomainRewrite": { "*": "localhost" }
  },
  "/idm/v1/reauthorize": {
    "target": {
      "host": "eu.liveapps.cloud.tibco.com",
      "protocol": "https:",
      "port": 443
    },
    "secure": true,
    "changeOrigin": true,
    "logLevel": "info",
    "cookieDomainRewrite": { "*": "localhost" }
  },
  "/tsc-ws": {
    "target": {
      "host": "eu.liveapps.cloud.tibco.com",
      "protocol": "https:",
      "port": 443
    },
    "secure": true,
    "changeOrigin": true,
    "logLevel": "info",
    "cookieDomainRewrite": { "*": "localhost" }
  },
  "/griddetails": {
    "target": {
      "host": "eu.liveapps.cloud.tibco.com",
      "protocol": "https:",
      "port": 443
    },
    "secure": true,
    "changeOrigin": true,
    "logLevel": "info",
    "cookieDomainRewrite": { "*": "localhost" }
  },
  "/tsc-ws-content": {
    "target": {
      "host": "eu.liveapps.cloud.tibco.com",
      "protocol": "https:",
      "port": 443
    },
    "secure": true,
    "changeOrigin": true,
    "logLevel": "info",
    "cookieDomainRewrite": { "*": "localhost" }
  },
  "/organisation": {
    "target": {
      "host": "eu.liveapps.cloud.tibco.com",
      "protocol": "https:",
      "port": 443
    },
    "secure": true,
    "changeOrigin": true,
    "logLevel": "info",
    "headers": { "Origin": "https://eu.liveapps.cloud.tibco.com" }
  },
  "/case/cases": {
    "target": {
      "host": "eu.liveapps.cloud.tibco.com",
      "protocol": "https:",
      "port": 443
    },
    "secure": true,
    "changeOrigin": true,
    "logLevel": "info",
    "headers": { "Origin": "https://eu.liveapps.cloud.tibco.com" }
  },
  "/case/types": {
    "target": {
      "host": "eu.liveapps.cloud.tibco.com",
      "protocol": "https:",
      "port": 443
    },
    "secure": true,
    "changeOrigin": true,
    "logLevel": "info",
    "headers": { "Origin": "https://eu.liveapps.cloud.tibco.com" }
  },
  "/case/reports": {
    "target": {
      "host": "eu.liveapps.cloud.tibco.com",
      "protocol": "https:",
      "port": 443
    },
    "secure": true,
    "changeOrigin": true,
    "logLevel": "info",
    "headers": { "Origin": "https://eu.liveapps.cloud.tibco.com" }
  },
  "/process/": {
    "target": {
      "host": "eu.liveapps.cloud.tibco.com",
      "protocol": "https:",
      "port": 443
    },
    "secure": true,
    "changeOrigin": true,
    "logLevel": "info",
    "headers": { "Origin": "https://eu.liveapps.cloud.tibco.com" }
  },
  "/pageflow/": {
    "target": {
      "host": "eu.liveapps.cloud.tibco.com",
      "protocol": "https:",
      "port": 443
    },
    "secure": true,
    "changeOrigin": true,
    "logLevel": "info",
    "headers": { "Origin": "https://eu.liveapps.cloud.tibco.com" }
  },
  "/event": {
    "target": {
      "host": "eu.liveapps.cloud.tibco.com",
      "protocol": "https:",
      "port": 443
    },
    "secure": true,
    "changeOrigin": true,
    "logLevel": "info",
    "headers": { "Origin": "https://eu.liveapps.cloud.tibco.com" }
  },
  "/clientstate/states": {
    "target": {
      "host": "eu.liveapps.cloud.tibco.com",
      "protocol": "https:",
      "port": 443
    },
    "secure": true,
    "changeOrigin": true,
    "logLevel": "info",
    "headers": { "Origin": "https://eu.liveapps.cloud.tibco.com" }
  },
  "/webresource": {
    "target": {
      "host": "eu.liveapps.cloud.tibco.com",
      "protocol": "https:",
      "port": 443
    },
    "secure": true,
    "changeOrigin": true,
    "logLevel": "info",
    "headers": { "Origin": "https://eu.liveapps.cloud.tibco.com" }
  },
  "/collaboration": {
    "target": {
      "host": "eu.liveapps.cloud.tibco.com",
      "protocol": "https:",
      "port": 443
    },
    "secure": true,
    "changeOrigin": true,
    "logLevel": "info",
    "headers": { "Origin": "https://eu.liveapps.cloud.tibco.com" }
  }
}
```
