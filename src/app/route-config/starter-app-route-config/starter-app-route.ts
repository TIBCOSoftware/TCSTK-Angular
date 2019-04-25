import {HomeComponent} from '../../routes/home/home.component';
import {AuthGuard, ConfigurationMenuConfigResolver, GeneralConfigResolver, TibcoCloudSettingsGeneralComponent} from 'tc-core-lib';
import {
  AllGroupsResolver,
  AllRolesResolver,
  CaseGuard,
  ClaimsResolver,
  GroupsResolver,
  LaConfigResolver, LiveAppsSettingsComponent, LiveAppsSettingsRecentCasesComponent,
  LiveAppsSettingsRolesComponent, LiveAppsSettingsSummaryCardsComponent,
  RolesResolver
} from 'tc-liveapps-lib';
import {SplashComponent} from '../../components/splash/splash.component';
import {SplashPDComponent} from '../../components/splash-pd/splash-pd.component';
import {CaseComponent} from '../../routes/case/case.component';
import {ServiceDetailsConfigResolver, SettingsCwmServicesComponent, UploadPageComponent} from 'tc-check-workflow-monitor-lib';
import {ConfigurationComponent} from '../../routes/configuration/configuration.component';
import {PdSettingsAdministrationComponent, PdSettingsConfigurationComponent} from 'tc-process-discovery-lib';

export const STARTER_APP_ROUTES =
[
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
    resolve: {configurationMenuHolder: ConfigurationMenuConfigResolver},
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
      {path: 'process-discovery-configuration', component: PdSettingsConfigurationComponent, resolve: {claims: ClaimsResolver}},
      {path: 'process-discovery-administration', component: PdSettingsAdministrationComponent, resolve: {}},
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
];
