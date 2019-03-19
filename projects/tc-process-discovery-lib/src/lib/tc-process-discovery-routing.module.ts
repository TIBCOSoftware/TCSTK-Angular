import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClaimsResolver } from 'tc-liveapps-lib';
import { LaConfigResolver } from 'tc-liveapps-lib';
import { PdProcessMiningComponent } from './components/pd-process-mining/pd-process-mining.component';
import { PdSettingsConfigurationComponent } from './components/pd-settings-configuration/pd-settings-configuration.component';
import { PdSettingsAdministrationComponent } from './components/pd-settings-administration/pd-settings-administration.component';
import { PdHomeComponent } from './components/pd-home/pd-home.component';

const routes: Routes = [
    {
        // starterApp only provides the global nav bar at present - but will be a useful place to do stuff that applies to all routes
        // Note: although each route uses claimsResolver this doesnt actually result in multiple REST call to claims
        // because we cache at http level using an interceptor
        path: 'starterApp2',
        children: [
            {
                path: 'pd',
                children: [
                    { path: 'home', component: PdHomeComponent},
                    { path: 'process-discovery-administration', component: PdSettingsAdministrationComponent },
                ]
            },
            {
                path: 'configuration',
                children: [
                    { path: 'process-discovery-configuration', component: PdSettingsConfigurationComponent},
                    { path: 'process-discovery-administration', component: PdSettingsAdministrationComponent },
                ]
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [
    ]
})

export class TcProcessDiscoveryLibRoutingModule {
}
