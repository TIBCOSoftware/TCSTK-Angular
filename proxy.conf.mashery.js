const PROXY_CONFIG = {
  "/idm/v3/login-oauth": {
    "target": {
      "host": "oocto.api.mashery.com",
      "protocol": "https:",
      "port": 443
    },
    "secure": true,
    "changeOrigin": true,
    "logLevel": "info",
    "cookieDomainRewrite": {
      "*": "localhost"
    },
    "cookie": {
      "*": "/"
    },
    "headers": {
      "Origin": "https://oocto.api.mashery.com",
      "Cookie": ""
    }
  },
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
    "cookie": {
      "*": "/"
    }
  },
  "/mashery-proxy-eu/liveapps": {
    "target": {
      "host": "oocto.api.mashery.com",
      "protocol": "https:",
      "port": 443
    },
    "secure": true,
    "changeOrigin": true,
    "logLevel": "info",
    "cookieDomainRewrite": {
      "*": "localhost"
    }

  },
  "/idm/v2/login-oauth": {
    "target": {
      "host": "oocto.api.mashery.com",
      "protocol": "https:",
      "port": 443
    },
    "secure": true,
    "changeOrigin": true,
    "logLevel": "info",
    "cookieDomainRewrite": {
      "*": "localhost"
    }
  },
  "/tsc-ws/v1/tsc-domain": {
    "target": {
      "host": "oocto.api.mashery.com",
      "protocol": "https:",
      "port": 443
    },
    "pathRewrite": {
      '^/': '/mashery-proxy-eu/liveapps', // add base path
    },
    "secure": true,
    "changeOrigin": true,
    "logLevel": "info",
    "cookieDomainRewrite": {
      "*": "localhost"
    }
  },
  "/idm/v1/reauthorize": {
    "target": {
      "host": "oocto.api.mashery.com",
      "protocol": "https:",
      "port": 443
    },
    "pathRewrite": {
      '^/': '/mashery-proxy-eu/liveapps', // add base path
    },
    "secure": true,
    "changeOrigin": true,
    "logLevel": "info",
    "cookieDomainRewrite": {
      "*": "localhost"
    }
  },
  "/tsc-ws": {
    "target": {
      "host": "oocto.api.mashery.com",
      "protocol": "https:",
      "port": 443
    },
    "pathRewrite": {
      '^/': '/mashery-proxy-eu/liveapps', // add base path
    },
    "secure": true,
    "changeOrigin": true,
    "logLevel": "info",
    "cookieDomainRewrite": {
      "*": "localhost"
    }
  },
  "/griddetails": {
    "target": {
      "host": "oocto.api.mashery.com",
      "protocol": "https:",
      "port": 443
    },
    "pathRewrite": {
      '^/': '/mashery-proxy-eu/liveapps', // add base path
    },
    "secure": true,
    "changeOrigin": true,
    "logLevel": "info",
    "cookieDomainRewrite": {
      "*": "localhost"
    }
  },
  "/tsc-ws-content": {
    "target": {
      "host": "oocto.api.mashery.com",
      "protocol": "https:",
      "port": 443
    },
    "pathRewrite": {
      '^/': '/mashery-proxy-eu/liveapps', // add base path
    },
    "secure": true,
    "changeOrigin": true,
    "logLevel": "info",
    "cookieDomainRewrite": {
      "*": "localhost"
    }
  },
  "/work/": {
    "target": {
      "host": "oocto.api.mashery.com",
      "protocol": "https:",
      "port": 443
    },
    "pathRewrite": {
      '^/': '/mashery-proxy-eu/liveapps', // add base path
    },
    "secure": true,
    "changeOrigin": true,
    "logLevel": "info",
    "headers": {
      "Origin": "https://oocto.api.mashery.com"
    }
  },
  "/organisation": {
    "target": {
      "host": "oocto.api.mashery.com",
      "protocol": "https:",
      "port": 443
    },
    "pathRewrite": {
      '^/': '/mashery-proxy-eu/liveapps', // add base path
    },
    "secure": true,
    "changeOrigin": true,
    "logLevel": "info",
    "headers": {
      "Origin": "https://oocto.api.mashery.com"
    }
  },
  "/organisation/v1/": {
    "target": {
      "host": "oocto.api.mashery.com",
      "protocol": "https:",
      "port": 443
    },
    "pathRewrite": {
      '^/': '/mashery-proxy-eu/liveapps', // add base path
    },
    "secure": true,
    "changeOrigin": true,
    "logLevel": "info",
    "headers": {
      "Origin": "https://oocto.api.mashery.com"
    }
  },
  "/apps": {
    "target": {
      "host": "oocto.api.mashery.com",
      "protocol": "https:",
      "port": 443
    },
    "pathRewrite": {
      '^/': '/mashery-proxy-eu/liveapps', // add base path
    },
    "secure": true,
    "changeOrigin": true,
    "logLevel": "info",
    "headers": {
      "Origin": "https://oocto.api.mashery.com"
    }
  },
  "/case": {
    "target": {
      "host": "oocto.api.mashery.com",
      "protocol": "https:",
      "port": 443
    },
    "pathRewrite": {
      '^/': '/mashery-proxy-eu/liveapps', // add base path
    },
    "secure": true,
    "changeOrigin": true,
    "logLevel": "info",
    "headers": {
      "Origin": "https://oocto.api.mashery.com"
    }
  },
  "/case/v1/cases": {
    "target": {
      "host": "oocto.api.mashery.com",
      "protocol": "https:",
      "port": 443
    },
    "pathRewrite": {
      '^/': '/mashery-proxy-eu/liveapps', // add base path
    },
    "secure": true,
    "changeOrigin": true,
    "logLevel": "info",
    "headers": {
      "Origin": "https://oocto.api.mashery.com"
    }
  },
  "/case/v1/types": {
    "target": {
      "host": "oocto.api.mashery.com",
      "protocol": "https:",
      "port": 443
    },
    "pathRewrite": {
      '^/': '/mashery-proxy-eu/liveapps', // add base path
    },
    "secure": true,
    "changeOrigin": true,
    "logLevel": "info",
    "headers": {
      "Origin": "https://oocto.api.mashery.com"
    }
  },
  "/case/reports": {
    "target": {
      "host": "oocto.api.mashery.com",
      "protocol": "https:",
      "port": 443
    },
    "pathRewrite": {
      '^/': '/mashery-proxy-eu/liveapps', // add base path
    },
    "secure": true,
    "changeOrigin": true,
    "logLevel": "info",
    "headers": {
      "Origin": "https://oocto.api.mashery.com"
    }
  },
  "/process/v1/": {
    "target": {
      "host": "oocto.api.mashery.com",
      "protocol": "https:",
      "port": 443
    },
    "pathRewrite": {
      '^/': '/mashery-proxy-eu/liveapps', // add base path
    },
    "secure": true,
    "changeOrigin": true,
    "logLevel": "info",
    "headers": {
      "Origin": "https://oocto.api.mashery.com"
    }
  },
  "/pageflow/": {
    "target": {
      "host": "oocto.api.mashery.com",
      "protocol": "https:",
      "port": 443
    },
    "pathRewrite": {
      '^/': '/mashery-proxy-eu/liveapps', // add base path
    },
    "secure": true,
    "changeOrigin": true,
    "logLevel": "info",
    "headers": {
      "Origin": "https://oocto.api.mashery.com"
    }
  },
  "/pageflow/v1/": {
    "target": {
      "host": "oocto.api.mashery.com",
      "protocol": "https:",
      "port": 443
    },
    "pathRewrite": {
      '^/': '/mashery-proxy-eu/liveapps', // add base path
    },
    "secure": true,
    "changeOrigin": true,
    "logLevel": "info",
    "headers": {
      "Origin": "https://oocto.api.mashery.com"
    }
  },
  "/event/v1/": {
    "target": {
      "host": "oocto.api.mashery.com",
      "protocol": "https:",
      "port": 443
    },
    "pathRewrite": {
      '^/': '/mashery-proxy-eu/liveapps', // add base path
    },
    "secure": true,
    "changeOrigin": true,
    "logLevel": "info",
    "headers": {
      "Origin": "https://oocto.api.mashery.com"
    }
  },
  "/clientstate/v1/states": {
    "target": {
      "host": "oocto.api.mashery.com",
      "protocol": "https:",
      "port": 443
    },
    "pathRewrite": {
      '^/': '/mashery-proxy-eu/liveapps', // add base path
    },
    "secure": true,
    "changeOrigin": true,
    "logLevel": "info",
    "headers": {
      "Origin": "https://oocto.api.mashery.com"
    }
  },
  "/webresource/": {
    "target": {
      "host": "oocto.api.mashery.com",
      "protocol": "https:",
      "port": 443
    },
    "pathRewrite": {
      '^/': '/mashery-proxy-eu/liveapps', // add base path
    },
    "secure": true,
    "changeOrigin": true,
    "logLevel": "info",
    "headers": {
      "Origin": "https://oocto.api.mashery.com"
    }
  },
  "/webresource/v1": {
    "target": {
      "host": "oocto.api.mashery.com",
      "protocol": "https:",
      "port": 443
    },
    "pathRewrite": {
      '^/': '/mashery-proxy-eu/liveapps', // add base path
    },
    "secure": true,
    "changeOrigin": true,
    "logLevel": "info",
    "headers": {
      "Origin": "https://oocto.api.mashery.com"
    }
  },
  "/collaboration/v1/": {
    "target": {
      "host": "oocto.api.mashery.com",
      "protocol": "https:",
      "port": 443
    },
    "pathRewrite": {
      '^/': '/mashery-proxy-eu/liveapps', // add base path
    },
    "secure": true,
    "changeOrigin": true,
    "logLevel": "info",
    "headers": {
      "Origin": "https://oocto.api.mashery.com"
    }
  }
}

module.exports = PROXY_CONFIG;
