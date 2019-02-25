# Overview

This repo contains Angular 7 components and sample code for creating cloud starter applications using existing components on top of Tibco Cloud Services. More Details here on [TIBCO Cloud™ Starters Development Kit Docs](https://tibcosoftware.github.io/TCSDK-Docs/)

# Documents

![alt text](screenshots/Documents.png)

# Notes

![alt text](screenshots/Notes.png)

# Case Search

![alt text](screenshots/Case-search.png)

# Favorite Cases

![alt text](screenshots/Favorites.png)

# Recent Cases

![alt text](screenshots/Recent.png)

# Summary Cards

![alt text](screenshots/Summary.png)

# Card Config

![alt text](screenshots/Card-config.png)

# Navbar

![alt text](screenshots/Navbar.png)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.1.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

ng serve --proxy-config proxy.conf.prod.json --ssl true --source-map

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

To build prod:

ng build --base-href /webresource/apps/<appname>/ --deploy-url /webresource/apps/<appname>/ --prod

where <appname> is the UI appname you will deploy to WRP
## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further Angular CLI help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
