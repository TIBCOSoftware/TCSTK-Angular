import {HomeComponent} from '../../routes/home/home.component';
import {
  AuthGuard,
  ConfigurationMenuConfigResolver,
  GeneralConfigResolver,
} from '@tibco-tcstk/tc-core-lib';
import {
  AccessResolver,
  CaseGuard,
  ClaimsResolver,
  GroupsResolver,
  LaConfigResolver,
  LiveAppsConfigResolver, LiveAppsReportingCockpitComponent, RoleGuard,
  RolesResolver
} from '@tibco-tcstk/tc-liveapps-lib';
import {SplashComponent} from '../../components/splash/splash.component';
import {SplashPDComponent} from '../../components/splash-pd/splash-pd.component';
import {CaseComponent} from '../../routes/case/case.component';
import {ServiceDetailsConfigResolver, UploadPageComponent} from '@tibco-tcstk/tc-check-workflow-monitor-lib';
import {ConfigurationComponent} from '../../routes/configuration/configuration.component';
import {CONFIGURATION_ROUTE_CONFIG, CONFIGURATION_ROUTE_PROVIDERS } from './configuration-route-config/configuration-route-config';
import {ReportingComponent} from '../../routes/reporting/reporting.component';

export const HOME_ROUTE = 'home';

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
      roles: RolesResolver,
      access: AccessResolver
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
      roles: RolesResolver,
      access: AccessResolver
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
    path: 'configuration', component: ConfigurationComponent, canActivate: [AuthGuard, RoleGuard],
    resolve: {configurationMenuHolder: ConfigurationMenuConfigResolver},
    children: CONFIGURATION_ROUTE_CONFIG
  },
  {
    path: 'reporting', component: ReportingComponent, canActivate: [AuthGuard],
    resolve: {
      laConfigHolder: LaConfigResolver,
      claims: ClaimsResolver,
    }
  }
];

export const STARTER_APP_PROVIDERS = [
  [
  ClaimsResolver,
  LiveAppsConfigResolver,
  LaConfigResolver,
  GeneralConfigResolver,
  ConfigurationMenuConfigResolver,
  RolesResolver,
  GroupsResolver,
  AccessResolver
  ],
  CONFIGURATION_ROUTE_PROVIDERS
];

