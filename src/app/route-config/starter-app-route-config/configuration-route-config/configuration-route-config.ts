import {GeneralConfigResolver, TibcoCloudSettingsGeneralComponent} from '@tibco-tcstk/tc-core-lib';
import {
  AllGroupsResolver,
  AllRolesResolver,
  ClaimsResolver, LaConfigResolver,
  LiveAppsSettingsComponent, LiveAppsSettingsRecentCasesComponent,
  LiveAppsSettingsRolesComponent, LiveAppsSettingsSummaryCardsComponent
} from '@tibco-tcstk/tc-liveapps-lib';
import {PdSettingsAdministrationComponent, PdSettingsConfigurationComponent} from '@tibco-tcstk/tc-process-discovery-lib';
import {ServiceDetailsConfigResolver, SettingsCwmServicesComponent} from '@tibco-tcstk/tc-check-workflow-monitor-lib';

export const CONFIGURATION_ROUTE_CONFIG = [
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
];

export const CONFIGURATION_ROUTE_PROVIDERS = [
  GeneralConfigResolver,
  ClaimsResolver,
  AllRolesResolver,
  AllGroupsResolver,
  ServiceDetailsConfigResolver
]