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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    StarterAppComponent,
    HomeComponent,
    CaseComponent,
    ConfigurationComponent,
    ShowcaseComponent,
    SplashComponent
  ],
  imports: [
    AppRoutingModule,
    TcCoreLibModule.forRoot(),
    TcFormsLibModule,
    TcLiveappsLibModule.forRoot(),
    TcMessagingLibModule,
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
    ReactiveFormsModule
  ],
  providers: [LogService],
  exports: [
  ],
  schemas: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
