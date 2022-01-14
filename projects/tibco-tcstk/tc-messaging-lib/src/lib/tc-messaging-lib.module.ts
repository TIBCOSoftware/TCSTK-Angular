import { NgModule } from '@angular/core';
import { EftlMessageReceiverComponent } from './components/eftl-message-receiver/eftl-message-receiver.component';
import {DomSanitizer} from '@angular/platform-browser';
import { EftlMessageSenderComponent } from './components/eftl-message-sender/eftl-message-sender.component';

import {MatButtonModule} from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatIconRegistry } from '@angular/material/icon';
import {FormsModule} from '@angular/forms';
import {TcCoreLibModule} from '@tibcosoftware/tc-core-lib';
import {FlexLayoutModule} from '@angular/flex-layout';
import {EftlMessagingSettingsComponent} from './components/eftl-messaging-settings/eftl-messaging-settings.component';
import {CommonModule} from '@angular/common';


@NgModule({
  declarations: [
    EftlMessageReceiverComponent,
    EftlMessageSenderComponent,
    EftlMessagingSettingsComponent
  ],
  imports: [
    TcCoreLibModule,
    FlexLayoutModule,
    CommonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatExpansionModule,
    MatSelectModule,
    MatTooltipModule
  ],
  exports: [
    EftlMessageReceiverComponent,
    EftlMessageSenderComponent,
    EftlMessagingSettingsComponent
  ]
})
export class TcMessagingLibModule {
  constructor (private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {

    this.matIconRegistry.addSvgIconLiteral(
      'tcs-messaging-sm-icon',
      this.domSanitizer.bypassSecurityTrustHtml('<svg width="44px" height="44px" viewBox="0 0 44 44" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n' +
        '    <defs></defs>\n' +
        '    <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n' +
        '        <g id="ic-messaging" fill="#0081CB">\n' +
        '            <g id="Combined-Shape">\n' +
        '                <path d="M22,0 C34.131,0 44,9.869 44,22 C44,34.131 34.131,44 22,44 C9.869,44 0,34.131 0,22 C0,9.869 9.869,0 22,0 Z M22,1.5 C33.304,1.5 42.5,10.696 42.5,22 C42.5,33.304 33.304,42.5 22,42.5 C10.696,42.5 1.5,33.304 1.5,22 C1.5,10.696 10.696,1.5 22,1.5 Z M33.7501621,10.3244216 C33.590579,10.1307483 33.3555369,10.0132214 33.1034471,10.001048 C32.8513574,9.98887471 32.6058876,10.0831978 32.4280406,10.2605768 C32.1104164,10.5795119 32.0768748,11.0873815 32.3627074,11.434628 C33.5681626,12.8906363 34.2258692,14.7034246 34.2258692,16.6167467 C34.2258692,18.5297799 33.5681626,20.342857 32.3627074,21.7988654 C32.0768748,22.1443785 32.1104164,22.6557148 32.4280406,22.9726277 C32.6061963,23.1493619 32.8514771,23.2432677 33.1033264,23.231161 C33.3551756,23.2190543 33.5901227,23.1020634 33.7501621,22.9090718 C36.749946,19.2626952 36.749946,13.9690648 33.7501621,10.3244216 Z M30.2408379,12.4431449 C30.0585159,12.273221 29.8122565,12.1874055 29.5626798,12.206823 C29.313103,12.2262405 29.0833913,12.3490874 28.9300913,12.5451232 C28.6603004,12.8906363 28.6853836,13.3814614 28.9887162,13.6920187 L28.9857995,13.6951965 C30.5998786,15.3057614 30.5998786,17.927732 28.9857995,19.5382968 C28.6232588,19.9158768 28.6652587,20.5274581 29.0753409,20.8524599 C29.4232984,21.129506 29.9278804,21.1058169 30.2408379,20.7917929 L30.2425879,20.7935263 C30.2451443,20.7912529 30.2472253,20.7885047 30.2487129,20.7854373 L30.2504629,20.7854373 L30.2504629,20.7839929 C31.36171,19.6720531 31.9745001,18.1906224 31.9745001,16.6167467 C31.9745001,15.0379598 31.3596683,13.5550846 30.2425879,12.4399671 L30.2408379,12.4431449 Z M15.0683774,20.6877923 L15.0683774,20.6875034 C15.3384601,20.3419903 15.3127935,19.8514542 15.0094609,19.5406079 L15.0141276,19.537719 C13.3982984,17.9254209 13.3982984,15.3051836 15.0141276,13.6943299 L15.0126692,13.6928854 C15.37521,13.3170388 15.3335017,12.7051686 14.9231278,12.3801667 C14.5751704,12.1028318 14.0705884,12.1253653 13.7576308,12.4408338 L13.7561725,12.4391004 C13.7536043,12.4414337 13.751437,12.4441658 13.7497559,12.4471893 L13.7482975,12.4471893 L13.7482975,12.4486338 C12.6367588,13.5608624 12.0239687,15.0405598 12.0239687,16.6161689 C12.0239687,18.1946669 12.6385088,19.6775421 13.7564642,20.7926596 L13.7593808,20.7897707 C13.9415612,20.9592762 14.1874579,21.0448358 14.4366413,21.025423 C14.6858247,21.0060101 14.9151926,20.8834247 15.0683774,20.6877923 Z M11.5704282,10.2597101 L11.5704282,10.259999 C11.3926246,10.0832593 11.1476009,9.98932074 10.8959969,10.0014317 C10.6443928,10.0135426 10.4097201,10.1305713 10.2500566,10.3235549 C7.24998112,13.9681981 7.24998112,19.2635619 10.2500566,22.9064718 C10.4089562,23.100584 10.6437762,23.2185101 10.895775,23.2307503 C11.1477737,23.2429905 11.3931161,23.148387 11.5704282,22.9706055 C11.8898024,22.6531147 11.9233439,22.1452451 11.636053,21.7977098 C10.4305978,20.3417014 9.77434955,18.5292021 9.77434955,16.61588 C9.77434955,14.7028468 10.4305978,12.8886141 11.636053,11.4326057 C11.9233439,11.0882482 11.8898024,10.5769119 11.5704282,10.2597101 Z M23.441814,20.9740829 L23.4421056,20.9740829 C25.0946846,20.3786794 26.2817649,18.8019148 26.2817649,16.9515708 C26.2817649,14.5890239 24.3561866,12.6679017 21.9901927,12.6679017 C19.6241989,12.6679017 17.6986206,14.5890239 17.6986206,16.9515708 C17.6986206,18.8091371 18.8944508,20.3905239 20.5569465,20.9807273 L14.5317122,34.8876296 C14.3578793,35.2906319 14.5430871,35.7609457 14.9487944,35.93428 C15.3495434,36.1096366 15.8220421,35.9215689 15.997625,35.5188554 L17.8386202,31.2681199 L21.5675688,33.7202229 C21.6220099,33.7549963 21.6819517,33.780483 21.7449017,33.7956233 C21.8394015,33.8557125 21.9473178,33.8903794 22.0575676,33.8903794 C22.180355,33.8904358 22.2999744,33.8517852 22.3991083,33.7800232 L26.093932,31.1170301 L28.0008437,35.5188554 C28.1260765,35.809672 28.414016,35.9987829 28.7332168,35.9998582 C28.8419701,36.0000265 28.9495596,35.9776901 29.049091,35.93428 C29.45509,35.7606568 29.6402978,35.2923652 29.4661733,34.8879185 L23.441814,20.9740829 Z M22.0155677,32.6241721 L22.015276,32.6241721 L18.413202,30.2555585 L21.9925261,27.7289217 L25.4353504,30.1593579 L22.0155677,32.6241721 Z M19.985573,26.3116247 L19.985573,26.3113358 L20.9848204,27.0173843 L19.1047419,28.3442586 L19.985573,26.3116247 Z M21.9989427,21.6627979 L23.537772,25.2149961 L21.9925261,26.3058469 L20.4574884,25.2219295 L21.9989427,21.6627979 Z M20.0325312,16.9512819 C20.0325312,15.8728535 20.9107372,14.9969374 21.9899011,14.9969374 C23.0690649,14.9969374 23.949021,15.8731424 23.949021,16.9515708 C23.949021,18.0268215 23.0687733,18.9030265 21.9896094,18.9030265 C20.9104455,18.9030265 20.0325312,18.0268215 20.0325312,16.9512819 Z M24.8989768,28.3578364 L23.0002318,27.0173843 L24.0093958,26.3044024 L24.8989768,28.3578364 Z"></path>\n' +
        '            </g>\n' +
        '        </g>\n' +
        '    </g>\n' +
        '</svg>')
    );
  }

}
