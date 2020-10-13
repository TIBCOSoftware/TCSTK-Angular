const PROXY_CONFIG = {
  "/idm/v3/login-oauth": {
    "target": {
      "host": "eu.liveapps.cloud.tibco.com",
      "protocol": "https:",
      "port": 443
    },
    "secure": true,
    "changeOrigin": true,
    "logLevel": "info",
    "cookieDomainRewrite": {
      "*": "localhost"
    },
    "cookiePathRewrite": {
      "*": "/"
    },
    "headers": {
      "Origin": "https://eu.liveapps.cloud.tibco.com",
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
    "cookiePathRewrite": {
      "*": "/"
    }
  },
  "/idm/v2/login-oauth": {
    "target": {
      "host": "eu.liveapps.cloud.tibco.com",
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
      "host": "eu.liveapps.cloud.tibco.com",
      "protocol": "https:",
      "port": 443
    },
    "secure": true,
    "changeOrigin": true,
    "logLevel": "info",
    "cookieDomainRewrite": {
      "*": "localhost"
    },
    "onProxyReq": addOauthHeader
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
    "cookieDomainRewrite": {
      "*": "localhost"
    }
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
    "cookieDomainRewrite": {
      "*": "localhost"
    },
    "onProxyReq": addOauthHeader
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
    "cookieDomainRewrite": {
      "*": "localhost"
    },
    "onProxyReq": addOauthHeader
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
    "cookieDomainRewrite": {
      "*": "localhost"
    },
    "onProxyReq": addOauthHeader
  },
  "/work/": {
    "target": {
      "host": "eu.liveapps.cloud.tibco.com",
      "protocol": "https:",
      "port": 443
    },
    "secure": true,
    "changeOrigin": true,
    "logLevel": "info",
    "headers": {
      "Origin": "https://eu.liveapps.cloud.tibco.com"
    },
    "onProxyReq": addOauthHeader
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
    "headers": {
      "Origin": "https://eu.liveapps.cloud.tibco.com"
    },
    "onProxyReq": addOauthHeader
  },
  "/organisation/v1/": {
    "target": {
      "host": "eu.liveapps.cloud.tibco.com",
      "protocol": "https:",
      "port": 443
    },
    "secure": true,
    "changeOrigin": true,
    "logLevel": "info",
    "headers": {
      "Origin": "https://eu.liveapps.cloud.tibco.com"
    },
    "onProxyReq": addOauthHeader
  },
  "/apps": {
    "target": {
      "host": "eu.liveapps.cloud.tibco.com",
      "protocol": "https:",
      "port": 443
    },
    "secure": true,
    "changeOrigin": true,
    "logLevel": "info",
    "headers": {
      "Origin": "https://eu.liveapps.cloud.tibco.com"
    },
    "onProxyReq": addOauthHeader
  },
  "/case": {
    "target": {
      "host": "eu.liveapps.cloud.tibco.com",
      "protocol": "https:",
      "port": 443
    },
    "secure": true,
    "changeOrigin": true,
    "logLevel": "info",
    "headers": {
      "Origin": "https://eu.liveapps.cloud.tibco.com"
    },
    "onProxyReq": addOauthHeader
  },
  "/case/v1/cases": {
    "target": {
      "host": "eu.liveapps.cloud.tibco.com",
      "protocol": "https:",
      "port": 443
    },
    "secure": true,
    "changeOrigin": true,
    "logLevel": "info",
    "headers": {
      "Origin": "https://eu.liveapps.cloud.tibco.com"
    },
    "onProxyReq": addOauthHeader
  },
  "/case/v1/types": {
    "target": {
      "host": "eu.liveapps.cloud.tibco.com",
      "protocol": "https:",
      "port": 443
    },
    "secure": true,
    "changeOrigin": true,
    "logLevel": "info",
    "headers": {
      "Origin": "https://eu.liveapps.cloud.tibco.com"
    },
    "onProxyReq": addOauthHeader
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
    "headers": {
      "Origin": "https://eu.liveapps.cloud.tibco.com"
    },
    "onProxyReq": addOauthHeader
  },
  "/process/v1/": {
    "target": {
      "host": "eu.liveapps.cloud.tibco.com",
      "protocol": "https:",
      "port": 443
    },
    "secure": true,
    "changeOrigin": true,
    "logLevel": "info",
    "headers": {
      "Origin": "https://eu.liveapps.cloud.tibco.com"
    },
    "onProxyReq": addOauthHeader
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
    "headers": {
      "Origin": "https://eu.liveapps.cloud.tibco.com"
    },
    "onProxyReq": addOauthHeader
  },
  "/pageflow/v1/": {
    "target": {
      "host": "eu.liveapps.cloud.tibco.com",
      "protocol": "https:",
      "port": 443
    },
    "secure": true,
    "changeOrigin": true,
    "logLevel": "info",
    "headers": {
      "Origin": "https://eu.liveapps.cloud.tibco.com"
    },
    "onProxyReq": addOauthHeader
  },
  "/event/v1/": {
    "target": {
      "host": "eu.liveapps.cloud.tibco.com",
      "protocol": "https:",
      "port": 443
    },
    "secure": true,
    "changeOrigin": true,
    "logLevel": "info",
    "headers": {
      "Origin": "https://eu.liveapps.cloud.tibco.com"
    },
    "onProxyReq": addOauthHeader
  },
  "/clientstate/v1/states": {
    "target": {
      "host": "eu.liveapps.cloud.tibco.com",
      "protocol": "https:",
      "port": 443
    },
    "secure": true,
    "changeOrigin": true,
    "logLevel": "info",
    "headers": {
      "Origin": "https://eu.liveapps.cloud.tibco.com"
    },
    "onProxyReq": addOauthHeader
  },
  "/webresource/": {
    "target": {
      "host": "eu.liveapps.cloud.tibco.com",
      "protocol": "https:",
      "port": 443
    },
    "secure": true,
    "changeOrigin": true,
    "logLevel": "info",
    "headers": {
      "Origin": "https://eu.liveapps.cloud.tibco.com"
    },
    "onProxyReq": addOauthHeader
  },
  "/webresource/v1": {
    "target": {
      "host": "eu.liveapps.cloud.tibco.com",
      "protocol": "https:",
      "port": 443
    },
    "secure": true,
    "changeOrigin": true,
    "logLevel": "info",
    "headers": {
      "Origin": "https://eu.liveapps.cloud.tibco.com"
    },
    "onProxyReq": addOauthHeader
  },
  "/collaboration/v1/": {
    "target": {
      "host": "eu.liveapps.cloud.tibco.com",
      "protocol": "https:",
      "port": 443
    },
    "secure": true,
    "changeOrigin": true,
    "logLevel": "info",
    "headers": {
      "Origin": "https://eu.liveapps.cloud.tibco.com"
    },
    "onProxyReq": addOauthHeader
  }
}

// Add the authorization header to request using the value from the TCSTKSESSION cookie
function addOauthHeader(proxyReq, req) {
  // check for existing auth header
  let authHeaderExists = false;
  Object.keys(req.headers).forEach(function (key) {
    if (key.toLowerCase() === 'authorization') {
      authHeaderExists = true;
    }
  });
  if (authHeaderExists === false) {
    Object.keys(req.headers).forEach(function (key) {
      if (key === 'cookie') {
        log('DEBUG', req.headers[key]);
        cookies = req.headers[key].split('; ');
        cookies.forEach((cook => {
          if (cook.startsWith('TCSTKSESSION=')) {
            const authKey = cook.replace('TCSTKSESSION=', '');
            proxyReq.setHeader('Authorization', 'Bearer ' + authKey);
            // log('DEBUG', 'Added auth header');
          }
        }))
      }
    });
  }
}

//Re-usable function to substract cookie
function getCookie(req, cookieName){
  let re = 'NOT_FOUND';
  log('INFO','Getting ' + cookieName + ' Cookie...');
  Object.keys(req.headers).forEach(function (key) {
    // console.log('KEY: ', key ,' VALUE:' ,proxyRes.headers[key]);
    if(key == 'set-cookie'){
      let cookieHeaderArray = req.headers[key];
      cookieHeaderArray.forEach((cookieHeader) => {
        //console.log('Header: ' + cookieHeader);
        if(cookieHeader.startsWith(cookieName)) {
          let tempCookie = cookieHeader.substring(
            cookieHeader.lastIndexOf(cookieName + '=') + cookieName.length + 1,
            cookieHeader.indexOf(";")
          );
          if(tempCookie != '') {
            log('DEBUG','Cookie FOUND (' + cookieName + '): ' + tempCookie);
            log('INFO','Successfully got ' + cookieName + ' Cookie !');
            re = tempCookie;
          } else {
            log('ERROR','EMPTY Cookie returned !!');
          }
        }
      });
    }
  });
  return re;
}

// Function for logging
const debug = false;
function log(level, message){
  if((debug && level == 'DEBUG') || level != 'DEBUG') {
    console.log('[PROXY INTERCEPTOR] (' + level + '): ' + message);
  }
}

try {
  const propReader = require('properties-reader');
  if (propReader) {
    const tcProp = propReader('tibco-cloud.properties');
    if (tcProp) {
      const cloudProps = tcProp.path();
      if (cloudProps.CloudLogin && cloudProps.CloudLogin.OAUTH_Token && cloudProps.CloudLogin.OAUTH_Token.trim() != '') {
        for (let endpoint in PROXY_CONFIG) {
          //console.log('ENDPOINT: ' , endpoint);
          //console.log(PROXY_CONFIG[endpoint]['headers']);
          let token = cloudProps.CloudLogin.OAUTH_Token;
          const key = 'Token:';
          if (token.indexOf(key) > 0) {
            token = token.substring(token.indexOf(key) + key.length);
          }
          if (PROXY_CONFIG[endpoint] && PROXY_CONFIG[endpoint]['headers']) {
            PROXY_CONFIG[endpoint]['headers']['Authorization'] = "Bearer " + token;
            console.log('Added OAUTH to: ' + endpoint);
          }
        }
      }
    }
  }
} catch (err) {
  console.warn('No oauth token found in tibco-cloud.properties');
}

module.exports = PROXY_CONFIG;
