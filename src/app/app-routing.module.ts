import {NgModule} from '@angular/core';
import {Routes, RouterModule, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {
  AuthGuard,
  GeneralConfigResolver,
  TcSharedStateService,
  TibcoCloudSettingsGeneralComponent,
  ConfigurationMenuConfigResolver,
  Claim, TibcoCloudSplashScreenComponent
} from 'tc-core-lib';
import {HomeComponent} from './routes/home/home.component';
import {StarterAppComponent} from './routes/starter-app/starter-app.component';
import {
  AllGroupsResolver,
  AllRolesResolver,
  ClaimsResolver, GroupsResolver,
  LiveAppsConfigHolder,
  LiveAppsService,
  LiveAppsSettingsComponent,
  LiveAppsSettingsRecentCasesComponent, LiveAppsSettingsRolesComponent,
  LiveAppsSettingsSummaryCardsComponent, RolesResolver
} from 'tc-liveapps-lib';
import {HttpClient} from '@angular/common/http';
import {share} from 'rxjs/operators';
import {LaConfigResolver} from 'tc-liveapps-lib';
import {CaseComponent} from './routes/case/case.component';
import {CaseGuard} from 'tc-liveapps-lib';
import {TibcoCloudErrorComponent} from 'tc-core-lib';
import {LiveAppsConfigResolver} from 'tc-liveapps-lib';
import {SettingsComponent} from './routes/settings/settings.component';
import {ServiceDetailsConfigResolver, SettingsCwmServicesComponent, UploadPageComponent} from 'tc-check-workflow-monitor-lib';
import {TibcoCloudConfigurationComponent} from 'tc-core-lib';
import {ConfigurationComponent} from './routes/configuration/configuration.component';
// HUGO: Removed these two lines to make the build work.
// import { PdSettingsAdministrationComponent, PdProcessMiningComponent, PdCaseViewComponent, SettingsSpotfireComponent, PdSettingsConfigurationComponent } from 'tc-process-discovery-lib';
//  { path: 'spotfire-settings', component: SettingsSpotfireComponent, resolve: { spotfireConfigHolder: SpotfireConfigResolver, claimsHolder: ClaimsResolver } },

import { PdSettingsAdministrationComponent, PdProcessMiningComponent, PdCaseViewComponent, PdSettingsConfigurationComponent } from 'tc-process-discovery-lib';
import { SpotfireConfigResolver } from 'tc-spotfire-lib';
import { SplashComponent } from './components/splash/splash.component';
import { SplashPDComponent } from './components/splash-pd/splash-pd.component';
import { LoginPrefillResolver } from 'tc-core-lib';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    resolve: {
      loginPrefill: LoginPrefillResolver
    }
  },
  {
    path: 'errorHandler/:errorCode/:errorMessage?',
    component: TibcoCloudErrorComponent
  },
  {
    // starterApp only provides the global nav bar at present - but will be a useful place to do stuff that applies to all routes
    // Note: although each route uses claimsResolver this doesnt actually result in multiple REST call to claims
    // because we cache at http level using an interceptor
    path: 'starterApp',
    component: StarterAppComponent,
    canActivate: [AuthGuard],
    resolve: {
      claims: ClaimsResolver,
      config: GeneralConfigResolver
    },
    children: [
      {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard],
        resolve: {
          claims: ClaimsResolver,
          laConfigHolder: LaConfigResolver,
          groups: GroupsResolver,
          roles: RolesResolver
        }
      },
      {
        path: 'splash',
        component: SplashComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'splashPD',
        component: SplashPDComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'case/:appId/:typeId/:caseRef',
        component: CaseComponent,
        canActivate: [AuthGuard, CaseGuard],
        resolve: {
          laConfigHolder: LaConfigResolver,
          claims: ClaimsResolver,
          groups: GroupsResolver,
          roles: RolesResolver
        }
      },
      {
        path: 'upload',
        component: UploadPageComponent,
        canActivate: [AuthGuard],
        resolve: {
          laConfigHolder: LaConfigResolver,
          claims: ClaimsResolver,
          serviceDetailsConfigResolver: ServiceDetailsConfigResolver
        }
      },
      {
        path: 'configuration', component: ConfigurationComponent, canActivate: [AuthGuard],
        resolve: { configurationMenuHolder: ConfigurationMenuConfigResolver },
        children: [
          {
            path: 'general-application-settings',
            component: TibcoCloudSettingsGeneralComponent,
            resolve: {
              generalConfigHolder: GeneralConfigResolver,
              claims: ClaimsResolver
            }
          },
          {
            path: 'general-application-roles',
            component: LiveAppsSettingsRolesComponent,
            resolve: {
              generalConfigHolder: GeneralConfigResolver,
              claims: ClaimsResolver,
              allRoles: AllRolesResolver,
              allGroups: AllGroupsResolver
            }
          },
          {
            path: 'live-apps-app-selection',
            component: LiveAppsSettingsComponent,
            resolve: {
              claims: ClaimsResolver,
              laConfigHolder: LaConfigResolver,
              generalConfigHolder: GeneralConfigResolver
            }
          },
          {
            path: 'live-apps-recent-cases',
            component: LiveAppsSettingsRecentCasesComponent,
            resolve: {
              claims: ClaimsResolver,
              laConfigHolder: LaConfigResolver,
              generalConfigHolder: GeneralConfigResolver
            }
          },
          {
            path: 'live-apps-summary-cards',
            component: LiveAppsSettingsSummaryCardsComponent,
            resolve: {
              claims: ClaimsResolver,
              laConfigHolder: LaConfigResolver,
              generalConfigHolder: GeneralConfigResolver
            }
          },
          { path: 'process-discovery-configuration', component: PdSettingsConfigurationComponent , resolve: { claims: ClaimsResolver } },
          { path: 'process-discovery-administration', component: PdSettingsAdministrationComponent, resolve: {} } ,
          {
            path: 'upload-services-settings',
            component: SettingsCwmServicesComponent,
            resolve: {
              serviceDetailsConfigResolver: ServiceDetailsConfigResolver
            }
          },
          {
            path: '**', redirectTo: '/starterApp/configuration/general-application-settings'
          }
        ]
      },
    ]
  },
  {
    path: '', redirectTo: '/starterApp/home', pathMatch: 'full'
  },
  {
    path: '**', redirectTo: '/starterApp/home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  // imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    LoginComponent,
    HomeComponent,
    ClaimsResolver,
    LiveAppsConfigResolver,
    LaConfigResolver,
    GeneralConfigResolver,
    ServiceDetailsConfigResolver,
    ConfigurationMenuConfigResolver,
    SpotfireConfigResolver,
    RolesResolver,
    AllRolesResolver,
    GroupsResolver,
    AllGroupsResolver,
    LoginPrefillResolver
  ]
})

export class AppRoutingModule {
}
