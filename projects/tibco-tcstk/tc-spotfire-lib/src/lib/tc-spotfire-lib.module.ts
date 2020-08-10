import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {CachingInterceptor, TcCoreLibModule} from '@tibco-tcstk/tc-core-lib';
import {ModuleWithProviders, NgModule} from '@angular/core';
import {TcSpotfireConfigService} from './services/tc-spotfire-config.service';
import {TcSpotfireMarkingLiveappsConfigService} from './services/tc-spotfire-marking-liveapps-config.service';
import {SpotfireWrapperComponent} from './components/spotfire-wrapper/spotfire-wrapper.component';
import {SettingsSpotfireComponent} from './components/settings-spotfire/settings-spotfire.component';
import {SettingsSpotfireCreateCaseMappingComponent} from './components/settings-spotfire-create-case-mapping/settings-spotfire-create-case-mapping.component';
import {SpotfireViewerModule} from '@tibco/spotfire-wrapper';
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
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatStepperModule} from '@angular/material/stepper';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {TcFormsLibModule} from '@tibco-tcstk/tc-forms-lib';

@NgModule({
  declarations: [
    SpotfireWrapperComponent,
    SettingsSpotfireComponent,
    SettingsSpotfireCreateCaseMappingComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    TcCoreLibModule,
    SpotfireViewerModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatToolbarModule,
    MatListModule,
    MatMenuModule,
    MatSelectModule,
    MatTabsModule,
    MatTooltipModule,
    MatButtonToggleModule,
    MatExpansionModule,
    MatTableModule,
    MatStepperModule,
    MatRadioModule,
    MatSnackBarModule,
    TcFormsLibModule

  ],
  exports: [
    SpotfireWrapperComponent,
    SettingsSpotfireComponent
  ],
  entryComponents: [],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: CachingInterceptor, multi: true}
    // { provide: HTTP_INTERCEPTORS, useClass: MockingInterceptor, multi: true }
  ]
})
export class TcSpotfireLibModule {
  static forRoot(): ModuleWithProviders<TcSpotfireLibModule> {
    return {
      ngModule: TcSpotfireLibModule,
      providers: [TcSpotfireConfigService, TcSpotfireMarkingLiveappsConfigService]
    };
  }
}
