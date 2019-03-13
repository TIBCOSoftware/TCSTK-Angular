import { NgModule } from '@angular/core';
import { TcCoreLibModule } from 'tc-core-lib';
import { TcLiveappsLibModule } from 'tc-liveapps-lib';
import {
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule, MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatToolbarModule,
    MatListModule, MatMenuModule, MatOptionModule, MatSelectModule, MatTabsModule, MatTooltipModule, MatButtonToggleModule
} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ColorPickerModule } from 'ngx-color-picker';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { PdHomeComponent } from './components/pd-home/pd-home.component';
import { PdCaseCreatorsComponent } from './components/pd-case-creators/pd-case-creators.component';
import { PdCreatorSelectorComponent } from './components/pd-creator-selector/pd-creator-selector.component';
import { PdWidgetHeaderComponent } from './components/pd-widget-header/pd-widget-header.component';
import { PdProcessMiningComponent } from './components/pd-process-mining/pd-process-mining.component';
import { TcProcessDiscoveryLibRoutingModule } from './tc-process-discovery-routing.module';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './components/settings/settings.component';
import { SettingMenuEntryComponent } from './components/setting-menu-entry/setting-menu-entry.component';
import { SettingsLiveappsComponent } from './components/settings-liveapps/settings-liveapps.component';
import { SettingsIntegrationComponent } from './components/settings-integration/settings-integration.component';
import { SettingsSpotfireComponent } from './components/settings-spotfire/settings-spotfire.component';
import { SettingsGeneralComponent } from './components/settings-general/settings-general.component';
import { PdCaseViewComponent } from './components/pd-case-view/pd-case-view.component';
import { PdSettingsAdministrationComponent } from './components/pd-settings-administration/pd-settings-administration.component';
import {PdAdministrationCaseSummaryComponent} from './components/pd-administration-case-summary/pd-administration-case-summary.component';

@NgModule({
    declarations: [
        PdHomeComponent,
        PdCaseCreatorsComponent,
        PdCreatorSelectorComponent,
        PdWidgetHeaderComponent,
        PdProcessMiningComponent,
        SettingsComponent,
        SettingMenuEntryComponent,
        SettingsLiveappsComponent,
        SettingsIntegrationComponent,
        SettingsSpotfireComponent,
        SettingsGeneralComponent,
        PdCaseViewComponent,
        PdSettingsAdministrationComponent,
        PdAdministrationCaseSummaryComponent
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
        FormsModule,
        FlexLayoutModule,
        ColorPickerModule,
        ScrollingModule,
        ReactiveFormsModule,
        TcLiveappsLibModule,
        TcCoreLibModule,
        TcProcessDiscoveryLibRoutingModule
    ],
    exports: [ PdHomeComponent]
})
export class TcProcessDiscoveryLibModule { }
