import { NgModule } from '@angular/core';
import { TcCoreLibModule } from '@tibco-tcstk/tc-core-lib';
import { TcLiveappsLibModule } from '@tibco-tcstk/tc-liveapps-lib';
import {
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule, 
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatToolbarModule,
    MatListModule, MatMenuModule, MatOptionModule, MatSelectModule, MatTabsModule, MatTooltipModule, MatButtonToggleModule, MatExpansionModule, MatTableModule, MatStepperModule, MatRadioModule, MatSnackBarModule, MatSlideToggleModule, MatProgressBarModule
} from '@angular/material';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ColorPickerModule } from 'ngx-color-picker';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { PdProcessMiningComponent } from './components/pd-process-mining/pd-process-mining.component';
import { TcProcessDiscoveryLibRoutingModule } from './tc-process-discovery-routing.module';
import { CommonModule } from '@angular/common';

import { SettingsIntegrationComponent } from './components/settings-integration/settings-integration.component';
import { PdCaseViewComponent } from './components/pd-case-view/pd-case-view.component';
import { PdSettingsAdministrationComponent } from './components/pd-settings-administration/pd-settings-administration.component';
import { TcSpotfireLibModule } from '@tibco-tcstk/tc-spotfire-lib';
import { PdSettingsConfigurationComponent } from './components/pd-settings-configuration/pd-settings-configuration.component';
import { PdNewDatasourceComponent } from './components/pd-new-datasource/pd-new-datasource.component';
import { ProcesDiscoveryChangeDatasourceDialogComponent } from './components/proces-discovery-change-datasource-dialog/proces-discovery-change-datasource-dialog.component';
import { SelectedRoleGuard } from './guards/selectedRole.guard';
import { PdCreatorSelectorComponent } from './components/pd-creator-selector/pd-creator-selector.component';
import { PdCaseComponent } from './components/pd-case/pd-case.component';
@NgModule({
    declarations: [
        PdProcessMiningComponent,
        SettingsIntegrationComponent,
        PdCaseViewComponent,
        PdSettingsAdministrationComponent,
        PdSettingsConfigurationComponent,
        PdNewDatasourceComponent,
        ProcesDiscoveryChangeDatasourceDialogComponent,
        PdCreatorSelectorComponent,
        PdCaseComponent
    ],
    imports: [
        CommonModule,
        MatIconModule,
        HttpClientModule,
        BrowserAnimationsModule,
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
        MatExpansionModule,
        MatTableModule,
        MatStepperModule,
        DragDropModule,
        MatRadioModule,
        MatSnackBarModule,
        MatSlideToggleModule,
        MatProgressBarModule,
        FormsModule,
        FlexLayoutModule,
        ColorPickerModule,
        ScrollingModule,
        ReactiveFormsModule,
        TcLiveappsLibModule,
        TcCoreLibModule,
        TcSpotfireLibModule,
        TcProcessDiscoveryLibRoutingModule
    ],
    providers: [ SelectedRoleGuard ],
    exports: [ ],
    entryComponents: [ ProcesDiscoveryChangeDatasourceDialogComponent ]
})
export class TcProcessDiscoveryLibModule { }
