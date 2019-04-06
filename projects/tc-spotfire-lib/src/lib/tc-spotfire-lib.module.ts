import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CachingInterceptor, TcCoreLibModule } from 'tc-core-lib';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { TcSpotfireConfigService } from './services/tc-spotfire-config.service';
import { McSpotfireWrapperComponent } from './components/mc-spotfire-wrapper/mc-spotfire-wrapper.component';
import { SettingsSpotfireComponent } from './components/settings-spotfire/settings-spotfire.component';
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


@NgModule({
    declarations: [
        McSpotfireWrapperComponent,
        SettingsSpotfireComponent
    ],
    imports: [
        FormsModule, ReactiveFormsModule,
        TcCoreLibModule,
        SpotfireViewerModule, MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatDialogModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatToolbarModule,
        MatListModule, MatMenuModule, MatOptionModule, MatSelectModule, MatTabsModule, MatTooltipModule, MatButtonToggleModule, MatExpansionModule, MatTableModule, MatStepperModule, MatRadioModule, MatSnackBarModule

    ],
    exports: [
        McSpotfireWrapperComponent,
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
            providers: [TcSpotfireConfigService]
        };
    }
}
