import { BrowserModule } from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import { AppComponent } from './app.component';
import {CaseGuard, TcLiveappsLibModule} from '@tibco-tcstk/tc-liveapps-lib';
import {Location} from '@angular/common';
import { RouterModule } from '@angular/router';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
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
import {LogService, TcCoreLibModule} from '@tibco-tcstk/tc-core-lib';
import {LoginComponent} from './components/login/login.component';
import {HomeComponent} from './routes/home/home.component';
import {AppRoutingModule} from './app-routing.module';
import {StarterAppComponent} from './routes/starter-app/starter-app.component';
import {TcFormsLibModule} from '@tibco-tcstk/tc-forms-lib';
import {CaseComponent} from './routes/case/case.component';
import {TcHandsontableLibModule} from '@tibco-tcstk/tc-handsontable-lib';
import {TcSpotfirePlayLibModule} from '@tibco-tcstk/tc-spotfire-play-lib';
import {TcCheckWorkflowMonitorLibModule} from '@tibco-tcstk/tc-check-workflow-monitor-lib';
import {TcSpotfireLibModule} from '@tibco-tcstk/tc-spotfire-lib';
import {SettingsComponent} from './routes/settings/settings.component';
import { ConfigurationComponent } from './routes/configuration/configuration.component';
import { SplashComponent } from './components/splash/splash.component';
import { SplashPDComponent } from './components/splash-pd/splash-pd.component';
import {CasesearchComponent} from './routes/casesearch/casesearch.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    StarterAppComponent,
    HomeComponent,
    CaseComponent,
    SettingsComponent,
    ConfigurationComponent,
    SplashComponent,
    SplashPDComponent,
    CasesearchComponent
  ],
  imports: [
    AppRoutingModule,
    TcCoreLibModule,
    TcFormsLibModule,
    TcHandsontableLibModule,
    TcSpotfireLibModule,
    TcLiveappsLibModule.forRoot(),
    FlexLayoutModule,
    BrowserModule,
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
    TcSpotfirePlayLibModule,
    TcCheckWorkflowMonitorLibModule
  ],
  providers: [LogService],
  exports: [
  ],
  schemas: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
