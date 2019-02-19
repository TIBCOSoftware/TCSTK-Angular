import { NgModule } from '@angular/core';
import {TibcoCloudNavbarComponent} from './components/tibco-cloud-navbar/tibco-cloud-navbar.component';
import {
  TibcoCloudMultipleSubscriptionComponent
  } from './components/tibco-cloud-multiple-subscription/tibco-cloud-multiple-subscription.component';
import {TibcoCloudLoginComponent} from './components/tibco-cloud-login/tibco-cloud-login.component';
import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule, MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule, MatMenuModule, MatOptionModule, MatSelectModule, MatTooltipModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ScrollingModule} from '@angular/cdk/scrolling';

@NgModule({
  declarations: [
    TibcoCloudNavbarComponent,
    TibcoCloudLoginComponent,
    TibcoCloudMultipleSubscriptionComponent
  ],
  imports: [
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
    FormsModule,
    FlexLayoutModule,
    ScrollingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    TibcoCloudNavbarComponent,
    TibcoCloudLoginComponent,
    TibcoCloudMultipleSubscriptionComponent
  ]
})
export class TcCoreLibModule { }
