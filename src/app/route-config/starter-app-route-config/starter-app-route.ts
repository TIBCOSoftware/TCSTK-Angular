import {HomeComponent} from '../../routes/home/home.component';
import {
  AuthGuard,
  ConfigurationMenuConfigResolver,
  GeneralConfigResolver, GeneralLandingPageConfigResolver,
} from '@tibco-tcstk/tc-core-lib';
import {
  AccessResolver,
  CaseGuard,
  ClaimsResolver,
  AllGroupsResolver,
  LaConfigResolver,
  LiveAppsConfigResolver, RoleGuard,
  RolesResolver,
  LiveAppsLandingPageComponent,
  RoleActiveResolver
} from '@tibco-tcstk/tc-liveapps-lib';
import {SplashComponent} from '../../routes/splash/splash.component';
import {CaseComponent} from '../../routes/case/case.component';
import {ConfigurationComponent} from '../../routes/configuration/configuration.component';
import {CONFIGURATION_ROUTE_CONFIG, CONFIGURATION_ROUTE_PROVIDERS } from './configuration-route-config/configuration-route-config';
import {FormResolver} from '@tibco-tcstk/tc-forms-lib';
import {ShowcaseComponent} from '../../routes/showcase/showcase.component';
import {MessagingConfigResolver} from '@tibco-tcstk/tc-messaging-lib';

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
      groups: AllGroupsResolver,
      roles: RolesResolver,
      access: AccessResolver,
      customFormDefs: FormResolver
    }
  },
  {
    path: 'splash',
    component: SplashComponent,
    canActivate: [AuthGuard],
    resolve: {
      landingPagesConfigHolder: GeneralLandingPageConfigResolver
    }
  },

    {
        path: 'splash2',
        component: LiveAppsLandingPageComponent,
        canActivate: [AuthGuard],
        resolve: {
            generalConfigHolder: GeneralConfigResolver,
            rolesHolder: RolesResolver,
            activeRoleHolder: RoleActiveResolver
        }
    },

  {
    path: 'case/:appId/:typeId/:caseRef',
    component: CaseComponent,
    canActivate: [AuthGuard, CaseGuard],
    resolve: {
      laConfigHolder: LaConfigResolver,
      claims: ClaimsResolver,
      groups: AllGroupsResolver,
      roles: RolesResolver,
      access: AccessResolver,
      customFormDefs: FormResolver
    }
  },
  {
    path: 'showcase',
    component: ShowcaseComponent,
    canActivate: [AuthGuard],
    resolve: {
      claims: ClaimsResolver,
      laConfigHolder: LaConfigResolver,
      messagingConfig: MessagingConfigResolver
    }
  },
  {
    path: 'configuration', component: ConfigurationComponent, canActivate: [AuthGuard, RoleGuard],
    resolve: {configurationMenuHolder: ConfigurationMenuConfigResolver},
    children: CONFIGURATION_ROUTE_CONFIG
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
  AllGroupsResolver,
  AccessResolver,
  FormResolver,
        RoleActiveResolver
  ],
  CONFIGURATION_ROUTE_PROVIDERS
];

