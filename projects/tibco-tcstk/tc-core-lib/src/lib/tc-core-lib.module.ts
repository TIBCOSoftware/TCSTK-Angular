import {ModuleWithProviders, NgModule, setTestabilityGetter} from '@angular/core';
import {TibcoCloudNavbarComponent} from './components/tibco-cloud-navbar/tibco-cloud-navbar.component';
import {TibcoCloudLoginComponent} from './components/tibco-cloud-login/tibco-cloud-login.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { DomSanitizer} from '@angular/platform-browser';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule, MatIconRegistry} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSelectModule} from '@angular/material/select';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {TcSharedStateService} from './services/tc-shared-state.service';
import {RequestCacheService} from './services/request-cache.service';
import {CachingInterceptor} from './interceptors/caching-interceptor';
import {AuthErrorInterceptor} from './interceptors/authentication-error-interceptor';
import {EllipsisPipe} from './pipes/ellipsis.pipe';
import {DurationSincePipe} from './pipes/duration-since.pipe';
import {HighlightPipe} from './pipes/highlight.pipe';
import {OrderByDatePipe} from './pipes/order-by-date.pipe';
import {ReversePipe} from './pipes/reverse.pipe';
import {TibcoCloudWidgetHeaderComponent} from './components/tibco-cloud-widget-header/tibco-cloud-widget-header.component';
import {TibcoCloudMenuBarComponent} from './components/tibco-cloud-menu-bar/tibco-cloud-menu-bar.component';
import {TcButtonsHelperService} from './services/tc-buttons-helper.service';
import {TibcoCloudErrorComponent} from './components/tibco-cloud-error/tibco-cloud-error.component';
import {OnCreateDirective} from './directives/on-create.directive';
import {TcGeneralConfigService} from './services/tc-general-config.service';
import {TibcoCloudTableComponent} from './components/tibco-cloud-table/tibco-cloud-table.component';
import {TibcoCloudSelectTableComponent} from './components/tibco-cloud-select-table/tibco-cloud-select-table.component';
import {TibcoCloudSettingMenuEntryComponent} from './components/tibco-cloud-setting-menu-entry/tibco-cloud-setting-menu-entry.component';
import {TibcoCloudSettingsGeneralComponent} from './components/tibco-cloud-settings-general/tibco-cloud-settings-general.component';
import {TibcoCloudConfigurationComponent} from './components/tibco-cloud-configuration/tibco-cloud-configuration.component';
import {ActivatedRoute, ActivationEnd, NavigationEnd, Router, RouterModule, RouterStateSnapshot} from '@angular/router';
import {TibcoCloudSplashScreenComponent} from './components/tibco-cloud-splash-screen/tibco-cloud-splash-screen.component';
import {CommonModule, Location} from '@angular/common';
import {TibcoCloudSettingLandingComponent} from './components/tibco-cloud-setting-landing/tibco-cloud-setting-landing.component';
import { TibcoCloudUploadDialogComponent } from './components/tibco-cloud-upload-dialog/tibco-cloud-upload-dialog.component';
import {TibcoCloudNewElementComponent} from './components/tibco-cloud-new-element/tibco-cloud-new-element.component';
import {MessageTopicService} from './common/tc-core-topic-comm';
import {TcVisibilityService} from './services/tc-visibility.service';
import {LegacyIframeService} from './services/legacy-iframe.service';
import {TcCoreConfig, TcCoreConfiguration, TcCoreConfigurationService} from './interfaces/tc-core-configuration';
import {TcCoreConfigService} from './services/tc-core-config-service';
import { DisableDirective } from './directives/disable.directive';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {BytesPipe} from './pipes/bytes.pipe';
import { TibcoCloudHelpSideBarComponent } from './components/tibco-cloud-help-side-bar/tibco-cloud-help-side-bar.component';
import { UrlPrepare } from './pipes/url-prepare.pipe';
import { TibcoCloudVideoCarouselComponent } from './components/tibco-cloud-video-carousel/tibco-cloud-video-carousel.component';
import { TibcoCloudVideoComponent } from './components/tibco-cloud-video/tibco-cloud-video.component';
import { TibcoCloudHelpArchiveComponent } from './components/tibco-cloud-help-archive/tibco-cloud-help-archive.component';

@NgModule({
  declarations: [
    TibcoCloudNavbarComponent,
    TibcoCloudLoginComponent,
    EllipsisPipe,
    DurationSincePipe,
    HighlightPipe,
    OrderByDatePipe,
    ReversePipe,
    BytesPipe,
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
    TibcoCloudNewElementComponent,
    TibcoCloudUploadDialogComponent,
    DisableDirective,
    TibcoCloudHelpSideBarComponent,
    UrlPrepare,
    TibcoCloudVideoCarouselComponent,
    TibcoCloudVideoComponent,
    TibcoCloudHelpArchiveComponent
  ],
  imports: [
    RouterModule,
    HttpClientModule,
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatDialogModule,
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
    MatProgressSpinnerModule,
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
    TibcoCloudMenuBarComponent,
    EllipsisPipe,
    DurationSincePipe,
    HighlightPipe,
    OrderByDatePipe,
    ReversePipe,
    BytesPipe,
    UrlPrepare,
    TibcoCloudWidgetHeaderComponent,
    TibcoCloudErrorComponent,
    OnCreateDirective,
    TibcoCloudTableComponent,
    TibcoCloudSelectTableComponent,
    TibcoCloudSettingMenuEntryComponent,
    TibcoCloudSettingsGeneralComponent,
    TibcoCloudConfigurationComponent,
    TibcoCloudSplashScreenComponent,
    TibcoCloudNewElementComponent,
    TibcoCloudUploadDialogComponent,
    TibcoCloudHelpSideBarComponent,
    TibcoCloudVideoCarouselComponent,
    DisableDirective,
    TibcoCloudVideoComponent,
    TibcoCloudHelpArchiveComponent
  ],
  providers: [
    RequestCacheService,
    TcVisibilityService,
    TcButtonsHelperService,
    LegacyIframeService,
    // comment this line to disable the CachingInterceptor
    {provide: HTTP_INTERCEPTORS, useClass: CachingInterceptor, multi: true},
    // error handling interceptor
    {provide: HTTP_INTERCEPTORS, useClass: AuthErrorInterceptor, multi: true}
    // uncomment this line to use the mock service interceptor
    // { provide: HTTP_INTERCEPTORS, useClass: MockingInterceptor, multi: true }
  ],
  entryComponents: [TibcoCloudNewElementComponent, TibcoCloudUploadDialogComponent]
})

export class TcCoreLibModule {

  private ms: MessageTopicService;
  private li: LegacyIframeService;
  private path: string;

  static forRoot(config?: TcCoreConfiguration): ModuleWithProviders<TcCoreLibModule> {
    return {
      ngModule: TcCoreLibModule,
      providers: [
        TcCoreConfigService,
        { provide: TcCoreConfigurationService, useValue: config ? config : undefined },
        TcSharedStateService,
        TcGeneralConfigService,
        LegacyIframeService
      ]
    };
  }

  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer, private location: Location, private router: Router, private routeSnapshot: ActivatedRoute, private messageService: MessageTopicService, private legacyIFrameService: LegacyIframeService) {
    this.ms = messageService;
    // subscribe to route changes
    this.router.events.subscribe((value) => {
      if (value instanceof ActivationEnd) {
        if (value.snapshot) {
          if (value.snapshot.routeConfig && value.snapshot.routeConfig.path) {
            this.path = this.path === '' ? value.snapshot.routeConfig.path : [value.snapshot.routeConfig.path, this.path].join('/');
          }
        }
      }

      if (value instanceof NavigationEnd) {
        // save the path, and clear it.
        let finalPath;
        finalPath = this.path.split('/').filter(seg => {
          return !seg.startsWith(':');
        });
        finalPath = finalPath.join('/');
        // remove trailing '/';
        if (finalPath.endsWith('/')) {
          finalPath = finalPath.slice(0, finalPath.length - 1);
        }
        this.path = '';
        this.ms.sendMessage('integratedHelp', finalPath);
      }

      if (value instanceof NavigationEnd) {
        this.ms.sendMessage('help', value.url);
      }
    });

    // This service is used to handle async iframe loading
    this.li = legacyIFrameService;
    this.li.workitemStatus.subscribe();
    this.li.processStatus.subscribe();

    // register all the default Icon SVGs used by this module
    this.matIconRegistry.addSvgIconLiteral('ic-docs-icon',
      this.domSanitizer.bypassSecurityTrustHtml('<svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="🎨-Color" transform="translate(-2.000000, -2.000000)" fill="#0081CB"><path d="M16,2 L8,2 C6.8954305,2 6,2.8954305 6,4 L6,17 C6,18.1045695 6.8954305,19 8,19 L20,19 C21.1045695,19 22,18.1045695 22,17 L22,8 L16,2 Z M8.5,10 L12.5,10 C12.7761424,10 13,10.2238576 13,10.5 C13,10.7761424 12.7761424,11 12.5,11 L8.5,11 C8.22385763,11 8,10.7761424 8,10.5 C8,10.2238576 8.22385763,10 8.5,10 Z M17.5,17 L8.5,17 C8.22385763,17 8,16.7761424 8,16.5 C8,16.2238576 8.22385763,16 8.5,16 L17.5,16 C17.7761424,16 18,16.2238576 18,16.5 C18,16.7761424 17.7761424,17 17.5,17 Z M17.5,15 L8.5,15 C8.22385763,15 8,14.7761424 8,14.5 C8,14.2238576 8.22385763,14 8.5,14 L17.5,14 C17.7761424,14 18,14.2238576 18,14.5 C18,14.7761424 17.7761424,15 17.5,15 Z M17.5,13 L8.5,13 C8.22385763,13 8,12.7761424 8,12.5 C8,12.2238576 8.22385763,12 8.5,12 L17.5,12 C17.7761424,12 18,12.2238576 18,12.5 C18,12.7761424 17.7761424,13 17.5,13 Z M5,5 L5,18 C5,19.1045695 5.8954305,20 7,20 L7,20 L18,20 L17.9945143,20.1492623 C17.9181651,21.1841222 17.0543618,22 16,22 L16,22 L4,22 C2.8954305,22 2,21.1045695 2,20 L2,20 L2,7 C2,5.8954305 2.8954305,5 4,5 L4,5 L5,5 Z M16,3 L21.08,8 L16,8 L16,3 Z"></path></g></g></svg>'))
    this.matIconRegistry.addSvgIconLiteral('ic-open-external',
      this.domSanitizer.bypassSecurityTrustHtml('<svg width="21px" height="20px" viewBox="0 0 21 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="🎨-Color" transform="translate(-1.738095, -2.000000)" fill="#0081CB"><path d="M20.8670203,22 L3.10982472,22 C2.49720148,22 2,21.5097894 2,20.9057798 L2,3.39825695 C2,2.79424741 2.49720148,2.30403677 3.10982472,2.30403677 L10.4568644,2.30403677 C11.0694876,2.30403677 11.5666891,2.79424741 11.5666891,3.39825695 L11.5666891,3.39825695 C11.5666891,4.00226649 11.0694876,4.49247713 10.4568644,4.49247713 L4.21964944,4.49247713 L4.21964944,19.8115596 L19.7571955,19.8115596 L19.7571955,13.3895814 C19.7571955,12.7855719 20.254397,12.2953612 20.8670203,12.2953612 L20.8670203,12.2953612 C21.4796435,12.2953612 21.976845,12.7855719 21.976845,13.3895814 L21.976845,20.9057798 C21.976845,21.5097894 21.4796435,22 20.8670203,22 M13.9694596,11.7044823 L19.3332425,6.41502199 L19.2355779,8.75555895 C19.2211502,9.09804987 19.34878,9.44491766 19.6162478,9.70862473 C20.1145591,10.2010238 20.9180722,10.2108718 21.4063951,9.72832069 C21.6339091,9.50509977 21.7526604,9.21294299 21.7659783,8.91640932 L21.9990415,3.32932108 C22.0123594,2.98792439 21.8869492,2.63996237 21.6194814,2.37625531 C21.3531235,2.11254824 20.9990894,1.98780714 20.6528241,2.00093778 L14.9871689,2.23181824 C14.6852966,2.24385466 14.3889734,2.36312466 14.1625691,2.58634558 C13.6742462,3.06780246 13.682015,3.85782943 14.182546,4.35132273 C14.4511235,4.61612401 14.8018282,4.74086511 15.1480935,4.72664025 L17.5220086,4.62925466 L12.1582257,9.918715 C11.6699028,10.4001719 11.6787814,11.1912931 12.1793123,11.6836922 C12.6798433,12.1771855 13.4811367,12.1859392 13.9694596,11.7044823"></path></g></g></svg>'))
    this.matIconRegistry.addSvgIconLiteral('ic-oval-clear',
      this.domSanitizer.bypassSecurityTrustHtml('<svg width="9px" height="9px" viewBox="0 0 9 9" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><circle id="Oval" stroke="#0081CB" cx="4.5" cy="4.5" r="4"></circle></g></svg>'))
    this.matIconRegistry.addSvgIconLiteral('ic-oval-filled',
      this.domSanitizer.bypassSecurityTrustHtml('<svg width="9px" height="9px" viewBox="0 0 9 9" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><circle id="Oval" stroke="#0081CB" fill="#0081CB" cx="4.5" cy="4.5" r="4"></circle></g></svg>'))
    this.matIconRegistry.addSvgIconLiteral('ic-minimize',
      this.domSanitizer.bypassSecurityTrustHtml('<svg width="25px" height="25px" viewBox="0 0 25 25" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">' +
      '<g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">' +
      '<path d="M0.833333333,19.6904762 L5.97619048,19.6904762 L5.97619048,24.8333333 L9.4047619,24.8333333 L9.4047619,16.2619048 L0.833333333,16.2619048 L0.833333333,19.6904762 Z M5.97619048,5.97619048 L0.833333333,5.97619048 L0.833333333,9.4047619 L9.4047619,9.4047619 L9.4047619,0.833333333 L5.97619048,0.833333333 L5.97619048,5.97619048 Z M16.2619048,24.8333333 L19.6904762,24.8333333 L19.6904762,19.6904762 L24.8333333,19.6904762 L24.8333333,16.2619048 L16.2619048,16.2619048 L16.2619048,24.8333333 Z M19.6904762,5.97619048 L19.6904762,0.833333333 L16.2619048,0.833333333 L16.2619048,9.4047619 L24.8333333,9.4047619 L24.8333333,5.97619048 L19.6904762,5.97619048 Z" id="Shape" fill="#0081CB" fill-rule="nonzero"></path>' +
      '</g>'+
      '</svg>'))
    this.matIconRegistry.addSvgIconLiteral('ic-maximize',
      this.domSanitizer.bypassSecurityTrustHtml('<svg width="25px" height="25px" viewBox="0 0 25 25" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">' +
      '<g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">' +
          '<polygon id="Path" points="-20 -20 80 -20 80 80 -20 80"></polygon>' +
          '<path d="M4.26190476,16.2619048 L0.833333333,16.2619048 L0.833333333,24.8333333 L9.4047619,24.8333333 L9.4047619,21.4047619 L4.26190476,21.4047619 L4.26190476,16.2619048 Z M0.833333333,9.4047619 L4.26190476,9.4047619 L4.26190476,4.26190476 L9.4047619,4.26190476 L9.4047619,0.833333333 L0.833333333,0.833333333 L0.833333333,9.4047619 Z M21.4047619,21.4047619 L16.2619048,21.4047619 L16.2619048,24.8333333 L24.8333333,24.8333333 L24.8333333,16.2619048 L21.4047619,16.2619048 L21.4047619,21.4047619 Z M16.2619048,0.833333333 L16.2619048,4.26190476 L21.4047619,4.26190476 L21.4047619,9.4047619 L24.8333333,9.4047619 L24.8333333,0.833333333 L16.2619048,0.833333333 Z" id="Shape" fill="#0081CB" fill-rule="nonzero"></path>' +
      '</g>' +
      '</svg>'))

    this.matIconRegistry.addSvgIconLiteral('ic-help-left-chevron',
      this.domSanitizer.bypassSecurityTrustHtml('<svg width="9px" height="14px" viewBox="0 0 9 14" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Group" transform="translate(4.500000, 7.000000) scale(-1, 1) translate(-4.500000, -7.000000) " fill="#0081CB" fill-rule="nonzero"><path d="M8.99264045,6.96574786 L1.34219101,13.7559473 C1.03544944,14.0281695 0.53758427,14.0281695 0.23005618,13.7559473 C-0.0766853933,13.4830271 -0.0766853933,13.0411895 0.23005618,12.7682692 L6.76837079,6.96574786 L0.261516854,1.19184473 C-0.0452247191,0.918924501 -0.0452247191,0.477086895 0.261516854,0.204166667 C0.569044944,-0.0680555556 1.06691011,-0.0680555556 1.37365169,0.204166667 L8.99264045,6.96574786 Z" id="path-1"></path></g></g></svg>'))
    this.matIconRegistry.addSvgIconLiteral('ic-help-right-chevron',
      this.domSanitizer.bypassSecurityTrustHtml('<svg width="9px" height="14px" viewBox="0 0 9 14" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Group" fill="#0081CB" fill-rule="nonzero"><path d="M8.00345,6.98565 L1.19455,13.79525 C0.92155,14.06825 0.47845,14.06825 0.20475,13.79525 C-0.06825,13.52155 -0.06825,13.07845 0.20475,12.80475 L6.02385,6.98565 L0.23275,1.19525 C-0.04025,0.92155 -0.04025,0.47845 0.23275,0.20475 C0.50645,-0.06825 0.94955,-0.06825 1.22255,0.20475 L8.00345,6.98565 Z" id="path-1"></path></g></g></svg>')
    )
    this.matIconRegistry.addSvgIconLiteral(
      'ic-burger-menu',
     this.domSanitizer.bypassSecurityTrustHtml('<svg class="svg-content" fill="#727272" height="100%" viewBox="0 0 24 24" width="100%" xmlns="http://www.w3.org/2000/svg" fit="" preserveAspectRatio="xMidYMid meet" focusable="false">\n' +
        '    <path d="M0 0h24v24H0z" fill="none"></path>\n' +
        '    <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>\n' +
        '</svg>')
    )
    this.matIconRegistry.addSvgIconLiteral(
      'ic-error-handler',
      this.domSanitizer.bypassSecurityTrustHtml(('<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\n' +
        '\t viewBox="0 0 350 350" style="enable-background:new 0 0 350 350;" xml:space="preserve">\n' +
        '<style type="text/css">\n' +
        '\t.st0{fill:#F4F4F4;}\n' +
        '\t.st1{fill:#E5E5E5;stroke:#9B9B9B;stroke-width:2.3664;stroke-miterlimit:10;}\n' +
        '\t.st2{fill:#E5E5E5;stroke:#9B9B9B;stroke-width:3;stroke-miterlimit:10;}\n' +
        '\t.st3{fill:#E5E5E5;stroke:#9B9B9B;stroke-width:2.7161;stroke-miterlimit:10;}\n' +
        '\t.st4{fill:#E5E5E5;stroke:#9B9B9B;stroke-width:2.87;stroke-miterlimit:10;}\n' +
        '\t.st5{fill:#9B9B9B;}\n' +
        '\t.st6{fill:#FFFFFF;}\n' +
        '\t.st7{font-family:\'TimesNewRomanPS-BoldItalicMT\';}\n' +
        '\t.st8{font-size:97.6336px;}\n' +
        '\t.st9{fill:#979797;}\n' +
        '</style>\n' +
        '<g>\n' +
        '\t<circle class="st0" cx="173.9" cy="172.7" r="138.7"/>\n' +
        '\t<path class="st1" d="M178.3,209.6c2.3,4.8-7,20-24.5,26.3c-17.6,6.3-36.8,1.2-39.1-3.6c-0.4-0.9,6.5-10.6,12.4-9.9\n' +
        '\t\tc5.9,0.7,10.6-4.1,17.8-5.3S176,204.8,178.3,209.6z"/>\n' +
        '\t<ellipse class="st2" cx="93" cy="232.8" rx="32.1" ry="23.7"/>\n' +
        '\t<circle class="st2" cx="102.3" cy="156.4" r="65.9"/>\n' +
        '\t<ellipse class="st3" cx="68.2" cy="256.4" rx="19" ry="14"/>\n' +
        '\t<ellipse class="st4" cx="121.9" cy="256.4" rx="27" ry="11"/>\n' +
        '\t<ellipse class="st5" cx="104.7" cy="148.6" rx="10.2" ry="3.6"/>\n' +
        '\t<path class="st5" d="M153.4,225.7"/>\n' +
        '\t<circle class="st6" cx="142.1" cy="147.5" r="12.1"/>\n' +
        '\t<path class="st5" d="M139.9,142.7c2.4-1.3,5.3,0.3,6.3,3.5c1.1,3.3-0.1,7-2.5,8.3c-2.4,1.3-5.3-0.3-6.3-3.5S137.4,144,139.9,142.7z\n' +
        '\t\t"/>\n' +
        '\t<path class="st5" d="M155.6,151.3c0.5,0.2,0.9,0.5,1.4,0.6c4.2,1.7,6.1,5.1,5.4,9.5c-1.3,8.8-2.5,17.6-3.7,26.5\n' +
        '\t\tc-0.2,1.5-0.3,3-0.7,4.5c-0.2,0.6-1,1.1-1.6,1.6c-0.3-0.7-1.1-1.3-1-1.9c1.3-10,2.6-20.1,4.1-30.1c0.5-3.6-0.2-6-2.6-7.2\n' +
        '\t\tc-1.4-0.7-2.4-0.9-3.6,0.8c-5.6,8-17.3,8.2-23.2,0.5c-4-5.3-4-12.5,0.2-17.8c4-5.2,11-6.9,17.1-4.3c6,2.6,9.5,8.8,8.6,15.4\n' +
        '\t\tC155.8,150,155.7,150.5,155.6,151.3z M129.9,145.8c-0.8,6.4,3.7,12.3,10.1,13.1c6.5,0.9,12.4-3.7,13.3-10.1\n' +
        '\t\tc0.9-6.3-3.8-12.3-10.1-13.2C136.8,134.7,130.8,139.3,129.9,145.8z"/>\n' +
        '\t<g>\n' +
        '\t\t<path class="st5" d="M197.4,160.4c1.8-1.4,2.6-2.3,3.6-2.8c3.4-1.6,6.9-3.3,10.5-4.5c11-3.8,20.4-10,28.7-18.1\n' +
        '\t\t\tc3.2-3.2,3.6-3,6,0.6c3,4.4,7.3,6.9,12.2,8.3c22.1,6.2,44.2,12.1,66.3,18.3c2.2,0.6,4.2,2.1,6.3,3.1c-1.6,1.5-3.1,3.3-4.9,4.4\n' +
        '\t\t\tc-10,6-20.1,11.8-30.1,17.8c-2.6,1.6-4.9,1.9-7.9,1c-28.1-8.6-56.3-16.9-84.5-25.4C201.7,162.6,200,161.6,197.4,160.4z\n' +
        '\t\t\t M323.1,166.4c-17.2-4.7-33.4-9-49.6-13.7c-10.9-3.2-23-3.9-31-14.2c-9.5,10.5-21.7,15.9-35,21c1.8,0.7,2.7,1.1,3.6,1.4\n' +
        '\t\t\tc25.1,7.5,50.3,15,75.4,22.6c3.5,1.1,6.1,0.9,9.2-1C304.6,177.1,313.5,172.1,323.1,166.4z"/>\n' +
        '\t\t<path class="st5" d="M200.9,176.1c5.1,1.5,9.8,2.9,14.5,4.3c24.4,7.3,48.8,14.7,73.3,21.9c1.6,0.5,3.9,0.1,5.4-0.7\n' +
        '\t\t\tc10.6-6,21-12.2,31.5-18.4c0.8-0.5,1.8-1.1,2.7-1.1c0.8,0,2.1,0.5,2.4,1.1c0.3,0.6-0.2,2-0.8,2.4c-1.9,1.4-3.9,2.5-5.9,3.7\n' +
        '\t\t\tc-9.9,5.8-19.9,11.7-29.9,17.5c-1.1,0.6-2.8,0.9-4,0.5c-29.3-8.7-58.5-17.5-87.8-26.2c-0.7-0.2-1.6-0.3-2-0.7\n' +
        '\t\t\tc-0.7-0.7-1.6-1.8-1.4-2.5C198.9,177.2,200.2,176.6,200.9,176.1z"/>\n' +
        '\t\t<path class="st5" d="M291.5,198.7c-6.7-2-13.1-3.9-19.4-5.8c-23.2-7-46.5-14-69.7-20.9c-0.5-0.1-1.1-0.1-1.4-0.4\n' +
        '\t\t\tc-0.9-0.9-1.6-1.8-2.4-2.8c1.2-0.5,2.6-1.6,3.6-1.3c5.3,1.3,10.6,3,15.9,4.6c23.7,7.1,47.4,14.3,71.1,21.3c1.4,0.4,3.4,0,4.7-0.7\n' +
        '\t\t\tc10.3-5.9,20.6-12,30.8-18c0.4-0.2,0.8-0.7,1.3-0.7c1.5-0.1,3.1-0.1,4.6-0.1c-0.7,1.3-1.1,3.1-2.3,3.8c-9.2,5.6-18.6,11-27.9,16.5\n' +
        '\t\t\tc-2.3,1.4-4.6,2.8-7,4.1C292.8,198.5,292,198.6,291.5,198.7z"/>\n' +
        '\t\t<path class="st6" d="M323.1,166.4c-9.6,5.6-18.6,10.7-27.3,16.1c-3.1,1.9-5.8,2.1-9.2,1c-25.1-7.7-50.2-15.1-75.4-22.6\n' +
        '\t\t\tc-0.9-0.3-1.8-0.7-3.6-1.4c13.2-5.1,25.5-10.4,35-21c8,10.3,20.1,11,31,14.2C289.7,157.4,305.9,161.7,323.1,166.4z"/>\n' +
        '\t</g>\n' +
        '\t<g>\n' +
        '\t\t<path class="st5" d="M219.9,202.9c-18.4,0-33.5-15.1-33.4-33.5c0-18.4,15.1-33.5,33.5-33.4c18.4,0.1,33.5,15.1,33.4,33.5\n' +
        '\t\t\tC253.4,187.9,238.3,202.9,219.9,202.9z M219.8,194.2c13.6,0.1,24.9-11,25-24.6c0.1-13.5-11-24.9-24.6-25.1\n' +
        '\t\t\tc-13.6-0.2-25,11-25.1,24.6C195,182.8,206,194.1,219.8,194.2z"/>\n' +
        '\t\t<path class="st5" d="M198.6,200.6c-3,3-10.2,10.7-13.2,13.6c-4.4,4.1-10.9,2.2-12.2-3.6c-0.5-2.2,0-4.4,1.5-5.9\n' +
        '\t\t\tc4.9-5,9.9-9.8,14.1-13.9C192,194,195.3,197.3,198.6,200.6"/>\n' +
        '\t\t<path class="st6" d="M219.8,194.2c-13.8-0.1-24.8-11.4-24.7-25.1c0.1-13.6,11.5-24.7,25.1-24.6c13.6,0.2,24.8,11.5,24.6,25.1\n' +
        '\t\t\tC244.7,183.2,233.4,194.4,219.8,194.2z M216.5,187.5c0.1,0.2,0.1,0.4,0.2,0.6c0.8,0.1,1.6,0.3,2.4,0.2c7.2-0.9,12.9-4.2,16.7-10.6\n' +
        '\t\t\tc1.6-2.7,2.5-5.6,2.1-8.7c-0.1-0.9-0.8-2.2-1.5-2.4c-0.8-0.3-2.2,0.2-2.8,0.8c-1.1,1.1-1.9,2.6-2.6,4c-0.9,1.8-1.4,3.8-2.4,5.6\n' +
        '\t\t\tc-2.1,3.8-5.6,6.3-9.2,8.5C218.3,186.1,217.4,186.8,216.5,187.5z"/>\n' +
        '\t\t<path class="st5" d="M216.5,187.5c0.9-0.7,1.9-1.4,2.8-2c3.6-2.2,7.1-4.7,9.2-8.5c1-1.8,1.5-3.8,2.4-5.6c0.7-1.4,1.5-2.9,2.6-4\n' +
        '\t\t\tc0.6-0.6,2-1.1,2.8-0.8c0.7,0.3,1.4,1.5,1.5,2.4c0.4,3.1-0.5,6-2.1,8.7c-3.7,6.4-9.4,9.7-16.7,10.6c-0.8,0.1-1.6-0.1-2.4-0.2\n' +
        '\t\t\tC216.6,187.9,216.5,187.7,216.5,187.5z"/>\n' +
        '\t</g>\n' +
        '\t<text transform="matrix(0.996 -8.927000e-02 8.927000e-02 0.996 264.2169 166.3981)" class="st5 st7 st8">?</text>\n' +
        '\t<path class="st5" d="M148.7,182.4c1.7-1.8,4-1.6,5.6,0.1c5.8,6.2,0.1,16.1-7.6,16.7c-8,0.6-15.1-1.9-21.6-6.1\n' +
        '\t\tc-2.1-1.3-3.6-3.7-5.4-5.5c-0.3-0.3-1.2-0.6-1.5-0.4c-4.8,3.4-10.3,4-15.9,4c-4.7,0-9.1-0.8-13.4-3c-6-3-7.1-10.5-4.3-15.1\n' +
        '\t\tc2-3.3,5.7-4,8.5-1.4c-3.4-0.5-4.8,0.1-5.3,3c-0.2,1.3,0,3.3,0.7,3.9c1,0.7,3,0.8,4.2,0.3c5.2-1.8,10.2-4.1,15.5-5.7\n' +
        '\t\tc3.9-1.2,7.9-0.6,10.7,2.9c1.1,1.4,2.4,1.5,4,0.7c4.2-2.1,9.8-0.9,13.2,2.4c3.4,3.4,6.8,6.9,10.5,10c1,0.9,3.2,1.1,4.6,0.7\n' +
        '\t\tc1.7-0.4,2.4-2.8,1.9-4.7C152.4,183.3,151.1,182.5,148.7,182.4z"/>\n' +
        '\t<g>\n' +
        '\t\t<path class="st9" d="M150.9,117.3c0,0,0.1,0,0.1,0l0,0L150.9,117.3z"/>\n' +
        '\t\t<g>\n' +
        '\t\t\t<path class="st5" d="M182.9,108c-8.4-4.2-22.9-7.8-31.3-12.1c-3.3-1.7-5.8-3.9-7.3-7c-3.2-6.9-8.2-12.5-15.8-16.3\n' +
        '\t\t\t\tc-3-1.5-6-3.1-9-4.8c-1.6-0.9-3.2-1.6-4.9-2.3c-1.5-0.6-1.5-0.6-1.5-0.6c-1.7-0.5-3.2-0.9-3.3-0.9c0,0,0,0-0.1,0\n' +
        '\t\t\t\tc-6.7-0.1-13.4,0-20.1,0.4C83.9,64.8,78,65.3,72.4,67c-10.1,2.9-18.9,9.4-27.3,15.7C41.9,85,41.9,85,41.9,85\n' +
        '\t\t\t\tc-3.3,2.7-6.4,5.4-6.8,5.9c0,0,0,0-0.4,0.5c-1.5,1.6-2.8,3.3-3.9,5c-4.6,6.8-6.5,14.2-5.2,22.3c1.3,7.9,3.2,15.7,4.9,23.5\n' +
        '\t\t\t\tc1.1,4.8-0.1,9.3-2.1,13.8c-1.3,2.9-5.1,8.2-6.4,11.1c-1.1,2.4-2.4,4.8-3.6,7.2c-0.4,0.7-1,1.3-1.2,2c-0.2,0.8-0.5,2.3-0.1,2.5\n' +
        '\t\t\t\tc0.9,0.4,2.2,0.3,3.3,0.2c0.5,0,1.1-0.4,1.5-0.6c3-1.8,8.7-5.9,11.7-7.6c2.7-1.6,2.7-1.6,2.7-1.6c4.2-2.6,31.5-15.3,60.6-28.1\n' +
        '\t\t\t\ts53.1-23.4,53.3-23.5s0.6-0.2,0.6-0.3s0.1,0,0.1,0c0,0,0.6-0.2,1.3-0.4c0,0,0,0,0.8-0.1c7.5-1,21-2.6,28.5-3.6\n' +
        '\t\t\t\tc1.7-0.2,3.3-0.7,3.7-2.4C185.8,109,184.1,108.6,182.9,108z"/>\n' +
        '\t\t</g>\n' +
        '\t</g>\n' +
        '\t<g>\n' +
        '\t\t<g>\n' +
        '\t\t\t<path class="st5" d="M69.4,67.1c-0.6-1.3-1.2-3-0.7-4.5c0.2-0.5,1.7-2.2,2.3-1.3c0.2,0.2-1.7,2.4-1.9,2.7c-0.6,1-1,2-1,3.1\n' +
        '\t\t\t\tc0,1.9,3,1.9,3,0c0-2.3,3-3.6,2.9-6c-0.1-2-2.3-3.1-4.1-2.8c-1.8,0.3-3.4,1.6-4,3.2c-0.9,2.4-0.1,4.9,0.8,7.1\n' +
        '\t\t\t\tC67.6,70.4,70.2,68.9,69.4,67.1L69.4,67.1z"/>\n' +
        '\t\t</g>\n' +
        '\t</g>\n' +
        '\t<g>\n' +
        '\t\t<g>\n' +
        '\t\t\t<path class="st5" d="M67.7,66.9c-3.9-1-7.3-3.4-11.3-3.8c-2.5-0.2-6.3,0.3-7.5,2.9c-3,6.4,13.9,5,16.4,5.1c1.9,0.1,1.9-2.9,0-3\n' +
        '\t\t\t\tc-2.4-0.1-4.8-0.1-7.3-0.2c-1,0-2,0-3-0.1c-1.5-0.1-3.6-0.1-1.8-1.4c1.8-1.4,5.8,0.4,7.5,1.1c2,0.8,4,1.7,6.1,2.3\n' +
        '\t\t\t\tC68.8,70.3,69.6,67.4,67.7,66.9L67.7,66.9z"/>\n' +
        '\t\t</g>\n' +
        '\t</g>\n' +
        '</g>\n' +
        '</svg>\n'))
    );
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

    this.matIconRegistry.addSvgIconLiteral(
      'splash-default-icon',
      this.domSanitizer.bypassSecurityTrustHtml(
        '<svg version="1.1" id = "Layer_1" xmlns = "http://www.w3.org/2000/svg" xmlns: xlink = "http://www.w3.org/1999/xlink" x = "0px" y = "0px"\n' +
        'viewBox = "0 0 64 64" style = "enable-background:new 0 0 64 64;" xml: space = "preserve" >\n' +
        '<style type="text/css" >\n' +
        '.st0{ fill: #333333; }\n' +
        '.st1{ fill: #FBAE17; }\n' +
        '</style>\n' +
        '<g>\n' +
        '<path class="st0" d = "M15.3,26.2H8.9c-0.6,0-1-0.4-1-1s0.4-1,1-1h6.4c0.6,0,1,0.4,1,1S15.9,26.2,15.3,26.2z" />\n' +
        '<path class="st0" d = "M15.3,30.3H8.9c-0.6,0-1-0.4-1-1s0.4-1,1-1h6.4c0.6,0,1,0.4,1,1S15.9,30.3,15.3,30.3z" />\n' +
        '<path class="st0" d = "M15.3,34.4H8.9c-0.6,0-1-0.4-1-1c0-0.6,0.4-1,1-1h6.4c0.6,0,1,0.4,1,1C16.3,34,15.9,34.4,15.3,34.4z" />\n' +
        '<path class="st0" d = "M15.3,38.5H8.9c-0.6,0-1-0.4-1-1s0.4-1,1-1h6.4c0.6,0,1,0.4,1,1S15.9,38.5,15.3,38.5z" />\n' +
        '<path class="st0" d = "M15.3,42.6H8.9c-0.6,0-1-0.4-1-1s0.4-1,1-1h6.4c0.6,0,1,0.4,1,1S15.9,42.6,15.3,42.6z" />\n' +
        '<g>\n' +
        '<path class="st0" d = "M57.4,9.5H6.9c-1.1,0-2,0.9-2,2V62c0,1.1,0.9,2,2,2h50.5c1.1,0,2-0.9,2-2V11.5C59.4,10.4,58.5,9.5,57.4,9.5z M6.9,19.5h10.8V62H6.9V19.5z M57.4,62H19.7V19.5h37.7V62z M57.4,17.5H6.9v-6h50.5V17.5z"/>\n' +
        '</g>\n' +
        '<path class= "st0" d = "M11.6,15.4H10c-0.6,0-1-0.4-1-1s0.4-1,1-1h1.6c0.6,0,1,0.4,1,1S12.2,15.4,11.6,15.4z" />\n' +
        '<path class="st0" d = "M16.8,15.4h-1.6c-0.6,0-1-0.4-1-1s0.4-1,1-1h1.6c0.6,0,1,0.4,1,1S17.4,15.4,16.8,15.4z" />\n' +
        '<path class="st0" d = "M21.9,15.4h-1.6c-0.6,0-1-0.4-1-1s0.4-1,1-1h1.6c0.6,0,1,0.4,1,1S22.5,15.4,21.9,15.4z" />\n' +
        '<g>\n' +
        '<path class="st0" d = "M52.2,25.9v6.2H24.5v-6.2L52.2,25.9L52.2,25.9z M53.2,23.9H23.5c-0.6,0-1,0.4-1,1v8.2c0,0.6,0.4,1,1,1h29.6c0.6,0,1-0.4,1-1v-8.2C54.2,24.4,53.7,23.9,53.2,23.9L53.2, 23.9z"/>\n' +
        '</g>\n' +
        '<g>\n' +
        '<rect x="24.8" y = "39.5" class= "st1" width = "5" height = "5" />\n' +
        '<path class="st0" d = "M30.8,37.5h-7c-0.6,0-1,0.4-1,1v7c0,0.6,0.4,1,1,1h7c0.6,0,1-0.4,1-1v-7C31.8,38,31.3,37.5,30.8,37.5zM29.8,44.5h-5v-5h5V44.5z"/>\n' +
        '</g>\n' +
        '<g>\n' +
        '<rect x="35.9" y = "39.5" class= "st1" width = "5" height = "5" />\n' +
        '<path class="st0" d = "M41.9,37.5h-7c-0.6,0-1,0.4-1,1v7c0,0.6,0.4,1,1,1h7c0.6,0,1-0.4,1-1v-7C42.9,38,42.5,37.5,41.9,37.5zM40.9,44.5h-5v-5h5V44.5z"/>\n' +
        '</g>\n' +
        '<g>\n' +
        '<rect x="47.1" y = "39.5" class= "st1" width = "5" height = "5" />\n' +
        '<path class="st0" d = "M53.1,37.5h-7c-0.6,0-1,0.4-1,1v7c0,0.6,0.4,1,1,1h7c0.6,0,1-0.4,1-1v-7C54.1,38,53.6,37.5,53.1,37.5zM52.1,44.5h-5v-5h5V44.5z"/>\n' +
        '</g>\n' +
        '<g>\n' +
        '<rect x="24.8" y = "51" class= "st1" width = "5" height = "5" />\n' +
        '<path class="st0" d = "M30.8,49h-7c-0.6,0-1,0.4-1,1v7c0,0.6,0.4,1,1,1h7c0.6,0,1-0.4,1-1v-7C31.8,49.5,31.3,49,30.8,49z M29.8,56h-5v-5h5V56z"/>\n' +
        '</g>\n' +
        '<g>\n' +
        '<rect x="35.9" y = "51" class= "st1" width = "5" height = "5" />\n' +
        '<path class="st0" d = "M41.9,49h-7c-0.6,0-1,0.4-1,1v7c0,0.6,0.4,1,1,1h7c0.6,0,1-0.4,1-1v-7C42.9,49.5,42.5,49,41.9,49z M40.9,56h-5v-5h5V56z"/>\n' +
        '</g>\n' +
        '<g>\n' +
        '<rect x="47.1" y = "51" class= "st1" width = "5" height = "5" />\n' +
        '<path class="st0" d = "M53.1,49h-7c-0.6,0-1,0.4-1,1v7c0,0.6,0.4,1,1,1h7c0.6,0,1-0.4,1-1v-7C54.1,49.5,53.6,49,53.1,49z M52.1,56h-5v-5h5V56z"/>\n' +
        '</g>\n' +
        '</g>\n' +
        '</svg>\n'
      )
    );

  }
}

