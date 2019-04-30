import {ModuleWithProviders, NgModule} from '@angular/core';
import {TibcoCloudNavbarComponent} from './components/tibco-cloud-navbar/tibco-cloud-navbar.component';
import {
  TibcoCloudMultipleSubscriptionComponent
} from './components/tibco-cloud-multiple-subscription/tibco-cloud-multiple-subscription.component';
import {TibcoCloudLoginComponent} from './components/tibco-cloud-login/tibco-cloud-login.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserModule, DomSanitizer} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatDialogModule, MatExpansionModule,
  MatFormFieldModule,
  MatIconModule, MatIconRegistry,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatOptionModule,
  MatPaginatorModule,
  MatSelectModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule, MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {TcSharedStateService} from './services/tc-shared-state.service';
import {RequestCacheService} from './services/request-cache.service';
import {CachingInterceptor} from './interceptors/caching-interceptor';
import {AuthGuard} from './guards/auth.guard';
import {TcCoreCommonFunctions} from './common/tc-core-common-functions';
import {AuthErrorInterceptor} from './interceptors/authentication-error-interceptor';
import {EllipsisPipe} from './pipes/ellipsis.pipe';
import {DurationSincePipe} from './pipes/duration-since.pipe';
import {HighlightPipe} from './pipes/highlight.pipe';
import {OrderByDatePipe} from './pipes/order-by-date.pipe';
import {ReversePipe} from './pipes/reverse.pipe';
import { TibcoCloudWidgetHeaderComponent } from './components/tibco-cloud-widget-header/tibco-cloud-widget-header.component';
import { TibcoCloudMenuBarComponent } from './components/tibco-cloud-menu-bar/tibco-cloud-menu-bar.component';
import {TcButtonsHelperService} from './services/tc-buttons-helper.service';
import {TibcoCloudErrorComponent} from './components/tibco-cloud-error/tibco-cloud-error.component';
import { OnCreateDirective } from './directives/on-create.directive';
import {TcGeneralConfigService} from './services/tc-general-config.service';
import {TibcoCloudTableComponent} from './components/tibco-cloud-table/tibco-cloud-table.component';
import { TibcoCloudSelectTableComponent } from './components/tibco-cloud-select-table/tibco-cloud-select-table.component';
import {TibcoCloudSettingMenuEntryComponent} from './components/tibco-cloud-setting-menu-entry/tibco-cloud-setting-menu-entry.component';
import {TibcoCloudSettingsGeneralComponent} from './components/tibco-cloud-settings-general/tibco-cloud-settings-general.component';
import { TibcoCloudConfigurationComponent } from './components/tibco-cloud-configuration/tibco-cloud-configuration.component';
import {RouterModule} from '@angular/router';
import {TibcoCloudSplashScreenComponent} from './components/tibco-cloud-splash-screen/tibco-cloud-splash-screen.component';
import {CommonModule, Location} from '@angular/common';
import { TibcoCloudSettingLandingComponent } from './components/tibco-cloud-setting-landing/tibco-cloud-setting-landing.component';
import { TibcoCloudNewElementComponent } from './components/tibco-cloud-new-element/tibco-cloud-new-element.component';

export const TC_NAVBAR_URL = { url: 'https://account.cloud.tibco.com/tsc-ws-content/tsc-universal-header/globalNavbar.js', type: 'application/javascript' };

@NgModule({
  declarations: [
    TibcoCloudNavbarComponent,
    TibcoCloudLoginComponent,
    TibcoCloudMultipleSubscriptionComponent,
    EllipsisPipe,
    DurationSincePipe,
    HighlightPipe,
    OrderByDatePipe,
    ReversePipe,
    TibcoCloudWidgetHeaderComponent,
    TibcoCloudMenuBarComponent,
    TibcoCloudErrorComponent,
    OnCreateDirective,
    TibcoCloudTableComponent,
    TibcoCloudSelectTableComponent,
    TibcoCloudSettingMenuEntryComponent,
    TibcoCloudSettingsGeneralComponent,
    TibcoCloudConfigurationComponent,
    TibcoCloudSplashScreenComponent,
    TibcoCloudSettingLandingComponent,
    TibcoCloudNewElementComponent
  ],
  imports: [
    RouterModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatOptionModule,
    MatDialogModule,
    MatMenuModule,
    MatCardModule,
    MatTooltipModule,
    MatTabsModule,
    MatExpansionModule,
    MatButtonModule,
    MatCheckboxModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatSelectModule,
    MatOptionModule,
    MatDialogModule,
    MatMenuModule,
    MatCardModule,
    MatTooltipModule,
    MatTabsModule,
    MatButtonToggleModule,
    FormsModule,
    FlexLayoutModule,
    ScrollingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    CommonModule
  ],
  exports: [
    TibcoCloudNavbarComponent,
    TibcoCloudLoginComponent,
    TibcoCloudMultipleSubscriptionComponent,
    TibcoCloudMenuBarComponent,
    EllipsisPipe,
    DurationSincePipe,
    HighlightPipe,
    OrderByDatePipe,
    ReversePipe,
    TibcoCloudWidgetHeaderComponent,
    TibcoCloudErrorComponent,
    OnCreateDirective,
    TibcoCloudTableComponent,
    TibcoCloudSelectTableComponent,
    TibcoCloudSettingMenuEntryComponent,
    TibcoCloudSettingsGeneralComponent,
    TibcoCloudConfigurationComponent,
    TibcoCloudSplashScreenComponent,
    TibcoCloudNewElementComponent
  ],
  providers: [
    RequestCacheService,
    TcButtonsHelperService,
    AuthGuard,
    // comment this line to disable the CachingInterceptor
    { provide: HTTP_INTERCEPTORS, useClass: CachingInterceptor, multi: true },
    // error handling interceptor
    { provide: HTTP_INTERCEPTORS, useClass: AuthErrorInterceptor, multi: true }
    // uncomment this line to use the mock service interceptor
    // { provide: HTTP_INTERCEPTORS, useClass: MockingInterceptor, multi: true }
  ],
  entryComponents: [ TibcoCloudNewElementComponent ]
})

export class TcCoreLibModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: TcCoreLibModule,
      providers: [ TcSharedStateService, TcGeneralConfigService ]
    };
  }
  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer, private location: Location) {

    this.matIconRegistry.addSvgIconLiteral(
      'ic-documentation',
      this.domSanitizer.bypassSecurityTrustHtml('<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">\n' +
        '    <g fill="#C8D4E8" fill-rule="evenodd">\n' +
        '        <path d="M33.6 14.4v-12l12.194 12.05L33.6 14.4zm3.6 12H15.6a1.2 1.2 0 0 1 0-2.4h21.6a1.2 1.2 0 0 1 0 2.4zm0 4.8H15.6a1.2 1.2 0 0 1 0-2.4h21.6a1.2 1.2 0 0 1 0 2.4zm0 4.8H15.6a1.2 1.2 0 0 1 0-2.4h21.6a1.2 1.2 0 0 1 0 2.4zM15.6 19.2h9.6a1.2 1.2 0 0 1 0 2.4h-9.6a1.2 1.2 0 0 1 0-2.4zM33.6 0H14.405A4.804 4.804 0 0 0 9.6 4.805v31.24c0 2.655 2.15 4.755 4.805 4.755H43.2c2.652 0 4.8-2.098 4.8-4.75V14.4L33.6 0z"/>\n' +
        '        <path d="M12.006 43.2C9.35 43.2 7.2 41.074 7.2 38.42V7.2H4.806A4.804 4.804 0 0 0 0 12.005v31.24C.001 45.9 2.151 48 4.806 48H33.6c2.65 0 4.8-2.098 4.8-4.75v-.05H12.006z"/>\n' +
        '    </g>\n' +
        '</svg>\n')
    );
    this.matIconRegistry.addSvgIconLiteral(
      'ic-community',
      this.domSanitizer.bypassSecurityTrustHtml('<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">\n' +
        '    <path fill="#C8D4E8" fill-rule="evenodd" d="M24 17.6A6.3 6.3 0 1 1 24 5a6.3 6.3 0 0 1 0 12.6zm-1.68 2.1h3.36a8.82 8.82 0 0 1 8.82 8.82V42.8h-21V28.52a8.82 8.82 0 0 1 8.82-8.82zM9.3 21.8a4.2 4.2 0 1 1 0-8.4 4.2 4.2 0 0 1 0 8.4zm29.4 0a4.2 4.2 0 1 1 0-8.4 4.2 4.2 0 0 1 0 8.4zm-27.3 6.72v7.98H3v-8.4a4.2 4.2 0 0 1 4.2-4.2h4.2a4.2 4.2 0 0 1 1.218.21 8.715 8.715 0 0 0-1.218 4.41zm29.4-4.62a4.2 4.2 0 0 1 4.2 4.2v8.4h-8.4v-7.98a8.715 8.715 0 0 0-1.218-4.41 4.2 4.2 0 0 1 1.218-.21h4.2z"/>\n' +
        '</svg>\n')
    );
    this.matIconRegistry.addSvgIconLiteral(
      'ic-graph',
      this.domSanitizer.bypassSecurityTrustHtml('<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">\n' +
        '    <path fill="#C8D4E8" fill-rule="evenodd" d="M45 15.818H3V8a2 2 0 0 1 2-2h38a2 2 0 0 1 2 2v7.818zm0 1.637V40a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V17.455h42zm-8.83 6.891l-5.863 6.03c-.4-.33-.908-.529-1.46-.529-.896 0-1.674.52-2.065 1.28l-4.936-2.82v-.02c0-1.325-1.045-2.4-2.333-2.4-1.289 0-2.334 1.075-2.334 2.4 0 .194.023.382.065.562l-5.558 4.446a2.286 2.286 0 0 0-1.507-.568c-1.288 0-2.333 1.075-2.333 2.4 0 1.326 1.045 2.4 2.333 2.4 1.29 0 2.334-1.074 2.334-2.4 0-.3-.054-.587-.152-.852l5.443-4.354a2.298 2.298 0 0 0 1.709.766c.859 0 1.61-.477 2.015-1.189l4.987 2.85c.051 1.279 1.075 2.3 2.331 2.3 1.289 0 2.333-1.075 2.333-2.4 0-.318-.06-.621-.168-.899l5.983-6.154c.348.211.753.332 1.185.332 1.29 0 2.334-1.074 2.334-2.4 0-1.325-1.045-2.4-2.334-2.4-1.288 0-2.333 1.075-2.333 2.4 0 .445.118.862.323 1.22zM7 10.091a.77.77 0 0 0-.77.77v.915c0 .425.345.77.77.77h30.282V10.09H7zm31.538 0v2.454H41a.77.77 0 0 0 .77-.769v-.916a.77.77 0 0 0-.77-.77h-2.462z"/>\n' +
        '</svg>\n')
    );
    this.matIconRegistry.addSvgIconLiteral(
      'tibco-labs',
      this.domSanitizer.bypassSecurityTrustHtml('<svg version="1.0" xmlns="http://www.w3.org/2000/svg"\n' +
        ' width="2318.000000pt" height="3059.000000pt" viewBox="0 0 2318.000000 3059.000000"\n' +
        ' preserveAspectRatio="xMidYMid meet">\n' +
        '<metadata>\n' +
        '</metadata>\n' +
        '<g transform="translate(0.000000,3059.000000) scale(0.100000,-0.100000)"\n' +
        'fill="#ef3862" stroke="none">\n' +
        '<path d="M14320 25534 c-440 -54 -849 -265 -1124 -580 -465 -531 -521 -1285\n' +
        '-141 -1871 165 -254 380 -443 660 -583 157 -78 280 -122 435 -154 l105 -22 5\n' +
        '-800 c5 -731 6 -802 22 -830 26 -47 77 -95 123 -115 22 -9 439 -142 928 -295\n' +
        '488 -152 887 -280 887 -283 0 -3 -512 -127 -1138 -275 -2688 -636 -2578 -610\n' +
        '-2624 -642 -24 -16 -56 -52 -73 -79 -27 -43 -30 -57 -30 -130 0 -73 3 -87 30\n' +
        '-130 17 -27 48 -62 70 -77 28 -20 175 -70 485 -167 2686 -842 3194 -1002 3199\n' +
        '-1006 2 -3 2 -7 0 -9 -2 -2 -389 -79 -859 -171 -470 -92 -866 -173 -881 -181\n' +
        '-51 -26 -92 -68 -115 -119 l-24 -50 0 -1666 c0 -916 -2 -1668 -5 -1671 -3 -3\n' +
        '-47 3 -97 14 -1402 287 -3147 375 -4738 238 -2256 -195 -4136 -813 -5161\n' +
        '-1697 -361 -312 -627 -666 -772 -1028 -166 -413 -321 -1206 -396 -2030 -55\n' +
        '-592 -74 -1082 -74 -1835 0 -1060 50 -2003 169 -3180 35 -350 90 -836 99 -877\n' +
        'l5 -23 7880 0 7879 0 6 33 c14 84 37 241 64 447 226 1685 280 3231 160 4575\n' +
        '-87 980 -280 1896 -545 2582 -340 882 -1170 1613 -2448 2157 -402 172 -894\n' +
        '338 -1369 462 l-147 39 2 1594 3 1594 1261 247 c693 136 1274 255 1291 263\n' +
        '122 64 170 221 106 348 -17 31 -45 66 -68 84 -33 25 -381 137 -1908 615 -1027\n' +
        '322 -1867 587 -1867 590 0 3 834 202 1853 444 1018 241 1868 447 1888 457 50\n' +
        '25 104 91 119 144 7 24 11 74 8 109 -3 52 -10 74 -33 107 -63 89 -8 69 -1375\n' +
        '497 l-1275 400 -3 661 -2 661 22 4 c13 3 61 13 108 22 209 40 487 161 670 291\n' +
        '52 38 144 118 205 178 277 277 436 617 464 994 62 811 -516 1531 -1365 1702\n' +
        '-87 17 -151 22 -314 24 -113 2 -221 1 -240 -1z m868 -14495 c567 -61 1069\n' +
        '-331 1440 -774 197 -235 352 -537 426 -834 61 -241 60 -214 64 -1016 2 -490 0\n' +
        '-772 -7 -835 -47 -407 -207 -794 -461 -1115 -93 -117 -260 -279 -382 -371\n' +
        '-364 -272 -741 -409 -1202 -435 -120 -7 -1475 -9 -4026 -7 -3565 4 -3853 5\n' +
        '-3949 21 -511 84 -913 292 -1262 653 -306 317 -503 718 -576 1174 -16 104 -18\n' +
        '185 -18 850 0 799 2 828 60 1061 194 768 787 1370 1548 1569 98 26 246 53 347\n' +
        '63 19 2 1805 5 3968 5 2700 1 3963 -1 4030 -9z"/>\n' +
        '<path fill="black" d="M7760 8744 c-305 -82 -516 -554 -470 -1053 33 -365 187 -659 397\n' +
        '-763 62 -30 75 -33 163 -33 82 0 103 4 150 26 109 52 202 150 275 291 94 181\n' +
        '137 372 137 608 0 485 -210 875 -501 930 -68 13 -83 12 -151 -6z"/>\n' +
        '<path fill="black" d="M14425 8746 c-100 -25 -184 -83 -262 -181 -279 -349 -297 -1041 -37\n' +
        '-1431 66 -101 138 -167 224 -208 59 -28 74 -31 160 -31 85 0 101 3 155 30 127\n' +
        '63 259 229 324 410 59 164 76 269 76 485 0 211 -12 300 -62 447 -53 161 -147\n' +
        '313 -237 387 -102 83 -236 119 -341 92z"/>\n' +
        '<path fill="black" d="M18250 13800 l0 -70 140 0 140 0 0 -365 0 -365 75 0 75 0 0 365 0\n' +
        '365 135 0 135 0 0 70 0 70 -350 0 -350 0 0 -70z"/>\n' +
        '<path fill="black" d="M19120 13435 l0 -435 75 0 75 0 0 312 0 313 136 -204 137 -205 21 27\n' +
        'c11 15 73 105 136 201 63 96 118 175 123 175 4 1 7 -138 7 -309 l0 -310 75 0\n' +
        '75 0 0 435 0 435 -83 0 -82 0 -129 -200 c-71 -111 -132 -203 -135 -205 -4 -2\n' +
        '-65 87 -137 198 l-130 202 -82 3 -82 3 0 -436z"/>\n' +
        '</g>\n' +
        '</svg>')
    );
  }

  /*loadNavbarJS() {
    const jsUrls = [
      TC_NAVBAR_URL
    ];
    for (let i = 0; i < jsUrls.length; i++) {
      const node = document.createElement('script');
      node.src = jsUrls[i].url;
      node.type = jsUrls[i].type;
      node.async = false;
      node.charset = 'utf-8';
      document.head.appendChild(node);
    }
  }*/
}

