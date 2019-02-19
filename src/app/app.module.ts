import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {TcLiveappsLibModule} from 'tc-liveapps-lib';
import {Location} from '@angular/common';
import { RouterModule } from '@angular/router';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatTabsModule} from '@angular/material';
import {TcCoreLibModule} from 'tc-core-lib';
import {LoginComponent} from './components/login/login.component';
import {HomeComponent} from './components/home/home.component';
import {AppRoutingModule} from './app-routing.module';
import {StarterAppComponent} from './components/starter-app/starter-app.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    StarterAppComponent,
    HomeComponent
  ],
  imports: [
    AppRoutingModule,
    TcCoreLibModule,
    TcLiveappsLibModule.forRoot(),
    FlexLayoutModule,
    BrowserModule,
    FormsModule,
    MatTabsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
