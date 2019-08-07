### TIBCO Cloud™ Starters Toolkit -- Angular Libraries

# Overview

This Repository contains Angular.io components and sample code for creating TIBCO Cloud™ Starter applications. More Details here on the [TIBCO Cloud™ Starters Toolkit Site](https://tibcosoftware.github.io/TCSToolkit/)

Quick Guide and deep dive Developer Documentations can be found [here](https://tibcosoftware.github.io/TCSTK-Angular/)

# Repo Contents

This repo contains angular libraries which can be used to create custom UI for TIBCO Cloud™ Services such as Live Apps.

Typically you wont be using this repo but instead will use the TIBCO Cloud™ Starters Toolkit - Command Line Interface to generate applications. This will pull the libraries from npm:

[TIBCO Cloud™ Starters Command Line Interface Repo](https://github.com/TIBCOSoftware/tcstk-cloud-cli)

However, if required you can pull this repo and run a version of the sample Case Manager Application. This can be useful for debugging and extending the libraries.

# Pre requisites

In order to use the applications you will need to create a TIBCO Cloud™ Live Apps Subscription. You can create a free trial account here:
[TIBCO Cloud™ Live Apps](https://www.tibco.com/products/tibco-cloud-live-apps)

You will need to obtain your Client Id API key from the TIBCO Cloud™ Settings pages:
[TIBCO Cloud™ Settings](https://account.cloud.tibco.com/manage/settings/advanced)

Click Display Client Id to get the key.

[Getting a Client ID](https://www.youtube.com/embed/MuzQDo1RPxU)

# Steps to run this repo with a sample application

1) Clone the repo using your IDE of choice
2) Run npm install
3) Run the appropriate serve command for your region (eu/us/au):
  
  eg) npm run serve_eu
  
4) Open https://localhost:4200 in a browser, enter username/password and Client Id key to login


/*
* Copyright © 2019. TIBCO Software Inc.
* This file is subject to the license terms contained
* in the license file that is distributed with this file.
 */
