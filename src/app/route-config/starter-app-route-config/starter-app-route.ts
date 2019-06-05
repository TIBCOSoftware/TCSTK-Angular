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
  LiveAppsConfigResolver, RoleGuard,
  RolesResolver
} from '@tibco-tcstk/tc-liveapps-lib';
import {SplashComponent} from '../../components/splash/splash.component';
import {SplashPDComponent} from '../../components/splash-pd/splash-pd.component';
import {CaseComponent} from '../../routes/case/case.component';
import {ConfigurationComponent} from '../../routes/configuration/configuration.component';
import {CONFIGURATION_ROUTE_CONFIG, CONFIGURATION_ROUTE_PROVIDERS } from './configuration-route-config/configuration-route-config';
import {FormResolver} from '@tibco-tcstk/tc-forms-lib';

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
      access: AccessResolver,
      customFormDefs: FormResolver
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
      access: AccessResolver,
      customFormDefs: FormResolver
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
  FormResolver
  ],
  CONFIGURATION_ROUTE_PROVIDERS
];

