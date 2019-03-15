import {NgModule} from '@angular/core';
import {Routes, RouterModule, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {
  AuthGuard,
  GeneralConfigResolver,
  TcSharedStateService,
  TibcoCloudSettingsGeneralComponent
} from 'tc-core-lib';
import {HomeComponent} from './routes/home/home.component';
import {StarterAppComponent} from './routes/starter-app/starter-app.component';
import {Claim, ClaimsResolver, LiveAppsConfigHolder, LiveAppsService, LiveAppsSettingsComponent} from 'tc-liveapps-lib';
import {HttpClient} from '@angular/common/http';
import {share} from 'rxjs/operators';
import {LaConfigResolver} from 'tc-liveapps-lib';
import {CaseComponent} from './routes/case/case.component';
import {CaseGuard} from 'tc-liveapps-lib';
import {TibcoCloudErrorComponent} from 'tc-core-lib';
import {LiveAppsConfigResolver} from 'tc-liveapps-lib';
import {SettingsComponent} from './routes/settings/settings.component';
import {ServiceDetailsConfigResolver, SettingsCwmServicesComponent, UploadPageComponent} from 'tc-check-workflow-monitor-lib';





const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
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
      claims: ClaimsResolver
    },
    children: [
      {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard],
        resolve: {
          claims: ClaimsResolver,
          laConfigHolder: LaConfigResolver
        }
      },
      {
        path: 'case/:appId/:typeId/:caseRef',
        component: CaseComponent,
        canActivate: [AuthGuard, CaseGuard],
        resolve: {
          laConfigHolder: LaConfigResolver,
          claims: ClaimsResolver
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
        path: 'settings', component: SettingsComponent, canActivate: [AuthGuard],
        children: [
          {
            path: 'general-application-settings',
            component: TibcoCloudSettingsGeneralComponent,
            resolve: {
              generalConfigHolder: GeneralConfigResolver
            }
          },
          {
            path: 'live-apps-settings',
            component: LiveAppsSettingsComponent,
            resolve: {
              laConfigHolder: LaConfigResolver,
              generalConfigHolder: GeneralConfigResolver
            }
          },
          {
            path: 'upload-services-settings',
            component: SettingsCwmServicesComponent,
            resolve: {
              serviceDetailsConfigResolver: ServiceDetailsConfigResolver
            }
          },
          {
            path: '**', redirectTo: '/starterApp/settings/general-application-settings'
          }
        ]
      },
    ]
  },
  {
    path: '**', redirectTo: '/starterApp/home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    LoginComponent,
    HomeComponent,
    ClaimsResolver,
    LiveAppsConfigResolver,
    LaConfigResolver,
    GeneralConfigResolver,
    ServiceDetailsConfigResolver
  ]
})

export class AppRoutingModule {
}
