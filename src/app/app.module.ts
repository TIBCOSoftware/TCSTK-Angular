import { BrowserModule } from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule} from '@angular/core';

import { AppComponent } from './app.component';
import {CaseGuard, CredentialsService, TcLiveappsLibModule} from '@tibco-tcstk/tc-liveapps-lib';
import {Location, CurrencyPipe, DatePipe} from '@angular/common';
import { RouterModule } from '@angular/router';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';


import {
  CachingInterceptor,
  LogService,
  SessionRefreshService,
  TcCoreLibModule
} from '@tibco-tcstk/tc-core-lib';
import {TcMessagingLibModule} from '@tibco-tcstk/tc-messaging-lib';
import {LoginComponent} from './routes/login/login.component';
import {HomeComponent} from './routes/home/home.component';
import {AppRoutingModule} from './app-routing.module';
import {StarterAppComponent} from './routes/starter-app/starter-app.component';
import {TcFormsLibModule} from '@tibco-tcstk/tc-forms-lib';
import {CaseComponent} from './routes/case/case.component';
import { ConfigurationComponent } from './routes/configuration/configuration.component';
import { ShowcaseComponent } from './routes/showcase/showcase.component';
import { SplashComponent } from './routes/splash/splash.component';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {ProxyInterceptor, OAuthInterceptor, TcCoreConfig, TcCoreConfigService} from '@tibco-tcstk/tc-core-lib';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TcEventsLibModule} from '@tibco-tcstk/tc-events-lib';
import {TcScribeLibModule} from '@tibco-tcstk/tc-scribe-lib';
import {TcPrimengLibModule} from '@tibco-tcstk/tc-primeng-lib';
import { SettingsLandingComponent } from './routes/settings-landing/settings-landing.component';
import { SettingsSpotfireComponent } from './routes/settings-spotfire/settings-spotfire.component';
import { TcSpotfireLibModule } from '@tibco-tcstk/tc-spotfire-lib';
import { LoginOauthComponent } from './routes/login-oauth/login-oauth.component';
import { TcTscLibModule} from '@tibco-tcstk/tc-tsc-lib';
import { TcTcmdLibModule} from '@tibco-tcstk/tc-tcmd-lib';
import { TcLiveappsConfig } from '@tibco-tcstk/tc-liveapps-lib';
import {TableModule} from 'primeng/table';

// import {TcAgGridModule} from '@tibco-tcstk/tc-ag-grid';

/** This is the tc core configuration object
 * To use oauth you must also add the OAuthInterceptor to providers
 *  Note: Only HTTP calls that start with / will have oAuth token attached
 * To use proxy you must also add the ProxyInterceptor to providers
 *  Note: Only HTTP calls that start with / will be proxied
 *  Note: Enable TCE will request cookie for TCE API calls. This will only work if using the proxy
 */
const tcCoreConfig: TcCoreConfig = {
  disableFormLibs: false,
  // for test mode ONLY you can enter an oAuth key as the local storage key as long as it starts CIC~
  // do NOT use this for production code - instead enter the local storage key where external app will save oauth key.
  // oauth keys should NEVER be saved in code for production or when checked into source control!
  // oAuthLocalStorageKey: 'TC_DEV_KEY',
  oAuthLocalStorageKey: '',
  proxy_url: '',
  proxy_liveapps_path: '',
  proxy_tce_path: '',
  api_key: '',
  api_key_param: 'api_key',
  enable_tce: false
}

/*
// can be used to defer initialization of TcAppDefService
const tcLiveappsConfig: TcLiveappsConfig = {
  defer: true
}*/

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    StarterAppComponent,
    HomeComponent,
    CaseComponent,
    ConfigurationComponent,
    ShowcaseComponent,
    SplashComponent,
    SettingsLandingComponent,
    SettingsSpotfireComponent,
    LoginOauthComponent
  ],
  imports: [
    AppRoutingModule,
    TcCoreLibModule.forRoot(tcCoreConfig),
    TcFormsLibModule,
    TcLiveappsLibModule.forRoot(),
    TcSpotfireLibModule,
    TcMessagingLibModule,
    TcEventsLibModule,
    TcScribeLibModule,
    TableModule,
    TcPrimengLibModule,
    TcTscLibModule,
    TcTcmdLibModule,
    FlexLayoutModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatTabsModule,
    MatExpansionModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatSelectModule,
    // MatOptionModule,
    MatDialogModule,
    MatMenuModule,
    MatCardModule,
    MatTooltipModule,
    MatTabsModule,
    MatButtonToggleModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'en-US' },
    LogService,
    CurrencyPipe,
    DatePipe,
    // for proxied API calls
    //  { provide: HTTP_INTERCEPTORS, useClass: ProxyInterceptor, multi: true },

    // for using oAuth
    // { provide: HTTP_INTERCEPTORS, useClass: OAuthInterceptor, multi: true }
  ],
  exports: [
  ],
  schemas: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(public sessionRefreshService: SessionRefreshService, public tcConfigService: TcCoreConfigService, private credentialsService: CredentialsService) {
      // note: if oauth in use then no need since key will be refreshed in local storage by session manager app
      if (!credentialsService.isOauth()) {
        // setup cookie refresh for every 10 minutes
        const usingProxy = (this.tcConfigService.getConfig().proxy_url && this.tcConfigService.getConfig().proxy_url !== '') ? true : false;
        this.sessionRefreshService.scheduleCookieRefresh(600000, usingProxy);
      }
    }
}
