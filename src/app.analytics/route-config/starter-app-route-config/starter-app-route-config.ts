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
  GroupsResolver,
  LaConfigResolver,
  LiveAppsConfigResolver, RoleGuard,
  RolesResolver,
  RoleActiveResolver, FormConfigResolver
} from '@tibco-tcstk/tc-liveapps-lib';
import {CaseComponent} from '../../routes/case/case.component';
import {ConfigurationComponent} from '../../routes/configuration/configuration.component';
import {CONFIGURATION_ROUTE_CONFIG, CONFIGURATION_ROUTE_PROVIDERS } from './configuration-route-config/configuration-route-config';
import {FormResolver} from '@tibco-tcstk/tc-forms-lib';
import { SplashComponent } from 'src/app/routes/splash/splash.component';
import {CaseOverviewComponent} from '../../routes/case-overview/case-overview.component';
import {SpotfireConfigResolver} from '@tibco-tcstk/tc-spotfire-lib';


export const HOME_ROUTE = 'splash';

export const STARTER_APP_ROUTES =
  [
    {
      path: 'overview',
      component: CaseOverviewComponent,
      canActivate: [AuthGuard],
      resolve: {
        claims: ClaimsResolver,
        laConfigHolder: LaConfigResolver,
        groups: GroupsResolver,
        roles: RolesResolver,
        access: AccessResolver,
        customFormDefs: FormResolver,
        formConfig: FormConfigResolver
      }
    },
    {
      path: 'home',
      component: HomeComponent,
      canActivate: [AuthGuard],
      resolve: {
        claims: ClaimsResolver,
        laConfigHolder: LaConfigResolver,
        groups: GroupsResolver,
        roles: RolesResolver,
        access: AccessResolver,
        customFormDefs: FormResolver,
        formConfig: FormConfigResolver,
        spotfireConfigHolder: SpotfireConfigResolver
      }
    },
    {
      path: 'splash',
      component: SplashComponent,
      canActivate: [AuthGuard],
      resolve: {
        landingPagesConfigHolder: GeneralLandingPageConfigResolver,
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
        groups: GroupsResolver,
        roles: RolesResolver,
        access: AccessResolver,
        customFormDefs: FormResolver,
        formConfig: FormConfigResolver,
        spotfireConfigHolder: SpotfireConfigResolver
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
    GroupsResolver,
    AccessResolver,
    FormResolver,
    RoleActiveResolver,
    FormConfigResolver
  ],
  CONFIGURATION_ROUTE_PROVIDERS
];

