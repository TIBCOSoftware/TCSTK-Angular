import {LoginComponent} from '../components/login/login.component';
import {
  AuthGuard,
  ConfigurationMenuConfigResolver,
  GeneralConfigResolver,
  LoginPrefillResolver,
  TibcoCloudErrorComponent,
} from 'tc-core-lib';
import {StarterAppComponent} from '../routes/starter-app/starter-app.component';
import {
  AllGroupsResolver,
  AllRolesResolver,
  CaseGuard,
  ClaimsResolver,
  GroupsResolver,
  LaConfigResolver, LiveAppsConfigResolver,
  RolesResolver
} from 'tc-liveapps-lib';
import {HomeComponent} from '../routes/home/home.component';
import {ServiceDetailsConfigResolver} from 'tc-check-workflow-monitor-lib';
import {SpotfireConfigResolver} from 'tc-spotfire-lib';
import {STARTER_APP_ROUTES, STARTER_APP_PROVIDERS } from './starter-app-route-config/starter-app-route';

export const CORE_ROUTES = [
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
        children: STARTER_APP_ROUTES
      },
      {
        path: '', redirectTo: '/starterApp/home', pathMatch: 'full'
      },
      {
        path: '**', redirectTo: '/starterApp/home'
      }
    ];

export const CORE_PROVIDERS = [
  [
  LoginPrefillResolver,
  ClaimsResolver,
  GeneralConfigResolver
  ],
  STARTER_APP_PROVIDERS
];
