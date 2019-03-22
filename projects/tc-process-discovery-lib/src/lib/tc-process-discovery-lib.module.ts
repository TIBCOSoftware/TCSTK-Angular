import { NgModule } from '@angular/core';
import {TcCoreLibModule} from 'tc-core-lib';
import { TcLiveappsLibModule } from 'tc-liveapps-lib';
import {
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule, 
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatToolbarModule,
    MatListModule, MatMenuModule, MatOptionModule, MatSelectModule, MatTabsModule, MatTooltipModule, MatButtonToggleModule, MatExpansionModule
} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ColorPickerModule } from 'ngx-color-picker';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { PdHomeComponent, PdChangeDatasourceDialog } from './components/pd-home/pd-home.component';
import { PdProcessMiningComponent } from './components/pd-process-mining/pd-process-mining.component';
import { TcProcessDiscoveryLibRoutingModule } from './tc-process-discovery-routing.module';
import { CommonModule } from '@angular/common';

import { SettingsIntegrationComponent } from './components/settings-integration/settings-integration.component';
import { SettingsSpotfireComponent } from './components/settings-spotfire/settings-spotfire.component';
import { PdCaseViewComponent } from './components/pd-case-view/pd-case-view.component';
import { PdSettingsAdministrationComponent } from './components/pd-settings-administration/pd-settings-administration.component';
import { TcSpotfireLibModule } from 'tc-spotfire-lib';
import { PdSettingsConfigurationComponent } from './components/pd-settings-configuration/pd-settings-configuration.component';
import { PdHomeCockpitComponent } from './components/pd-home-cockpit/pd-home-cockpit.component';
import { PdNewDatasourceComponent } from './components/pd-new-datasource/pd-new-datasource.component';


@NgModule({
    declarations: [
        PdHomeComponent,
        PdProcessMiningComponent,
        SettingsIntegrationComponent,
        SettingsSpotfireComponent,
        PdCaseViewComponent,
        PdSettingsAdministrationComponent,
        PdChangeDatasourceDialog,
        PdSettingsConfigurationComponent,
        PdHomeCockpitComponent,
        PdNewDatasourceComponent
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
    exports: [ PdHomeComponent ],
    entryComponents: [ PdChangeDatasourceDialog ]
})
export class TcProcessDiscoveryLibModule { }
