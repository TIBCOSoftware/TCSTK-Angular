import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {TcLiveappsLibModule} from '@tibco-tcstk/tc-liveapps-lib';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  MatButtonModule, MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule, MatDialogModule,
  MatExpansionModule,
  MatFormFieldModule, MatIconModule, MatInputModule,
  MatListModule, MatMenuModule, MatOptionModule, MatSelectModule,
  MatTabsModule, MatToolbarModule, MatTooltipModule
} from '@angular/material';
import {
  LogService, OAuthInterceptor, ProxyInterceptor,
  SessionRefreshService,
  TcCoreConfig,
  TcCoreConfigService,
  TcCoreLibModule
} from '@tibco-tcstk/tc-core-lib';
import {TcFormsLibModule} from '@tibco-tcstk/tc-forms-lib';
import {LoginComponent} from './routes/login/login.component';
import {HomeComponent} from './routes/home/home.component';
import {StarterAppComponent} from './routes/starter-app/starter-app.component';
import {CaseComponent} from './routes/case/case.component';
import { ConfigurationComponent } from './routes/configuration/configuration.component';
import { SplashComponent } from './routes/splash/splash.component';
import { AppRoutingModule } from './app-routing.module';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TcSpotfireLibModule} from '@tibco-tcstk/tc-spotfire-lib';
import { AnalyticsViewComponent } from './analytics-view/analytics-view';
import { CasesViewComponent } from './cases-view/cases-view';
import {CaseOverviewComponent} from './routes/case-overview/case-overview.component';
import { CaseDetailsComponent } from './case-details/case-details.component';


/** This is the tc core configuration object
 * To use oauth you must also add the OAuthInterceptor to providers
 *  Note: Only HTTP calls that start with / will have oAuth token attached
 * To use proxy you must also add the ProxyInterceptor to providers
 *  Note: Only HTTP calls that start with / will be proxied
 *  Note: Enable TCE will request cookie for TCE API calls. This will only work if using the proxy
 */
const tcCoreConfig: TcCoreConfig = {
  oAuthLocalStorageKey: '',
  proxy_url: 'https://oocto.api.mashery.com/mashery-proxy',
  proxy_liveapps_path: 'liveapps',
  proxy_tce_path: 'tce',
  api_key: 'paha98eu8r7k3f2jeuaq32bh',
  api_key_param: 'api_key',
  enable_tce: false
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    StarterAppComponent,
    HomeComponent,
    CaseOverviewComponent,
    CaseComponent,
    ConfigurationComponent,
    SplashComponent,
    AnalyticsViewComponent,
    CasesViewComponent,
    CaseDetailsComponent
  ],
  imports: [
    AppRoutingModule,
    TcCoreLibModule.forRoot(tcCoreConfig),
    TcFormsLibModule,
    TcLiveappsLibModule.forRoot(),
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
    MatOptionModule,
    MatDialogModule,
    MatMenuModule,
    MatCardModule,
    MatTooltipModule,
    MatTabsModule,
    MatButtonToggleModule,
    ReactiveFormsModule,
    TcSpotfireLibModule
  ],
  providers: [
    LogService,
    // for proxied API calls
    // { provide: HTTP_INTERCEPTORS, useClass: ProxyInterceptor, multi: true },

    // for using oAuth
    // { provide: HTTP_INTERCEPTORS, useClass: OAuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(public sessionRefreshService: SessionRefreshService, public tcConfigService: TcCoreConfigService) {
    if (!tcConfigService.getConfig().oAuthLocalStorageKey) {
      // setup cookie refresh for every 10 minutes
      // note: if oauth in use then no need since key will be refreshed in local storage by session manager app
      const usingProxy = (this.tcConfigService.getConfig().proxy_url && this.tcConfigService.getConfig().proxy_url !== '') ? true : false;
      this.sessionRefreshService.scheduleCookieRefresh(600000, usingProxy);
    }
  }
}
