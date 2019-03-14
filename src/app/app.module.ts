import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {CaseGuard, TcLiveappsLibModule} from 'tc-liveapps-lib';
import {Location} from '@angular/common';
import { RouterModule } from '@angular/router';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatTabsModule} from '@angular/material';
import {LogService, TcCoreLibModule} from 'tc-core-lib';
import {LoginComponent} from './components/login/login.component';
import {HomeComponent} from './routes/home/home.component';
import {AppRoutingModule} from './app-routing.module';
import {StarterAppComponent} from './routes/starter-app/starter-app.component';
import {TcFormsLibModule} from 'tc-forms-lib';
import {CaseComponent} from './routes/case/case.component';
import {TcHandsontableLibModule} from 'tc-handsontable-lib';
import {TcProcessDiscoveryLibModule} from 'tc-process-discovery-lib';
import {TcSpotfirePlayLibModule} from 'tc-spotfire-play-lib';
import {TcSpotfireLibModule} from 'tc-spotfire-lib';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    StarterAppComponent,
    HomeComponent,
    CaseComponent

  ],
  imports: [
    AppRoutingModule,
    TcCoreLibModule,
    TcFormsLibModule,
    TcHandsontableLibModule,
    TcSpotfireLibModule,
    TcProcessDiscoveryLibModule,
    TcLiveappsLibModule.forRoot(),
    FlexLayoutModule,
    BrowserModule,
    FormsModule,
    MatTabsModule,
    ReactiveFormsModule,
    TcSpotfirePlayLibModule
  ],
  providers: [LogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
