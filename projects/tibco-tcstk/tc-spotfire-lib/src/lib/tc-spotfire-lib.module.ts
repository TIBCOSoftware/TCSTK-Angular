import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CachingInterceptor, TcCoreLibModule } from '@tibco-tcstk/tc-core-lib';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { TcSpotfireConfigService } from './services/tc-spotfire-config.service';
import {TcSpotfireMarkingLiveappsConfigService} from './services/tc-spotfire-marking-liveapps-config.service';
import { SpotfireWrapperComponent } from './components/spotfire-wrapper/spotfire-wrapper.component';
import { SettingsSpotfireComponent } from './components/settings-spotfire/settings-spotfire.component';
import { SettingsSpotfireCreateCaseMappingComponent } from './components/settings-spotfire-create-case-mapping/settings-spotfire-create-case-mapping.component';
import { SpotfireViewerModule } from '@tibco/spotfire-wrapper';
import {
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatToolbarModule,
    MatListModule, MatMenuModule, MatOptionModule, MatSelectModule, MatTabsModule, MatTooltipModule, MatButtonToggleModule, MatExpansionModule, MatTableModule, MatStepperModule, MatRadioModule, MatSnackBarModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TcFormsLibModule } from '@tibco-tcstk/tc-forms-lib';


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
        MatListModule, MatMenuModule, MatOptionModule, MatSelectModule, MatTabsModule, MatTooltipModule, MatButtonToggleModule, MatExpansionModule, MatTableModule, MatStepperModule, MatRadioModule, MatSnackBarModule,
        TcFormsLibModule

    ],
    exports: [
        SpotfireWrapperComponent,
        SettingsSpotfireComponent
    ],
    entryComponents: [],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: CachingInterceptor, multi: true }
        // { provide: HTTP_INTERCEPTORS, useClass: MockingInterceptor, multi: true }
    ]
})
export class TcSpotfireLibModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: TcSpotfireLibModule,
            providers: [TcSpotfireConfigService, TcSpotfireMarkingLiveappsConfigService]
        };
    }
}
