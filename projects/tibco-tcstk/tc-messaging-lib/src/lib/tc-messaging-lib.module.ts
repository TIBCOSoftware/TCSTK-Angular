import { NgModule } from '@angular/core';
import { EftlMessageReceiverComponent } from './components/eftl-message-receiver/eftl-message-receiver.component';
import {BrowserModule} from '@angular/platform-browser';
import { EftlMessageSenderComponent } from './components/eftl-message-sender/eftl-message-sender.component';
import {MatButtonModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {TcCoreLibModule} from '@tibco-tcstk/tc-core-lib';
import {FlexLayoutModule} from '@angular/flex-layout';


@NgModule({
  declarations: [EftlMessageReceiverComponent, EftlMessageSenderComponent],
  imports: [
    TcCoreLibModule,
    FlexLayoutModule,
    BrowserModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule
  ],
  exports: [EftlMessageReceiverComponent, EftlMessageSenderComponent]
})
export class TcMessagingLibModule {

}
