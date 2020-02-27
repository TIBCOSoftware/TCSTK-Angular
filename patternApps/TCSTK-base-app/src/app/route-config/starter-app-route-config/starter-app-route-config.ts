import {HomeComponent} from '../../routes/home/home.component';
import {
  AuthGuard,
  ConfigurationMenuConfigResolver,
  GeneralConfigResolver,
  GeneralLandingPageConfigResolver,
} from '@tibco-tcstk/tc-core-lib';
import {
  AccessResolver,
  CaseGuard,
  ClaimsResolver,
  GroupsResolver,
  LaConfigResolver,
  LiveAppsConfigResolver, RoleActiveResolver,
  RoleGuard,
  RolesResolver
} from '@tibco-tcstk/tc-liveapps-lib';
import {SplashComponent} from '../../routes/splash/splash.component';
import {ConfigurationComponent} from '../../routes/configuration/configuration.component';
import {CONFIGURATION_ROUTE_CONFIG, CONFIGURATION_ROUTE_PROVIDERS } from './configuration-route-config/configuration-route-config';
import {FormResolver} from '@tibco-tcstk/tc-forms-lib';

export const HOME_ROUTE = 'splash';

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
    canActivate: [AuthGuard],
    resolve: {
      generalConfigHolder: GeneralConfigResolver,
      activeRoleHolder: RoleActiveResolver,
      landingPages: GeneralLandingPageConfigResolver
    }
  },
  {
    path: 'configuration', component: ConfigurationComponent, canActivate: [AuthGuard, RoleGuard],
    resolve: {configurationMenuHolder: ConfigurationMenuConfigResolver},
    children: CONFIGURATION_ROUTE_CONFIG
  },
  {
    path: '', redirectTo: '/starterApp/home', pathMatch: 'full'
  },
  {
    path: '**', redirectTo: '/starterApp/home'
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
  AccessResolver,
  GeneralLandingPageConfigResolver,
  RoleActiveResolver
  ],
  CONFIGURATION_ROUTE_PROVIDERS
];

