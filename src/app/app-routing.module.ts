import { NgModule } from '@angular/core';
import {Routes, RouterModule, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import {AuthGuard, TcSharedStateService} from 'tc-core-lib';
import { HomeComponent } from './routes/home/home.component';
import { StarterAppComponent } from './routes/starter-app/starter-app.component';
import {Claim, ClaimsResolver, LiveAppsConfigHolder, LiveAppsService} from 'tc-liveapps-lib';
import {HttpClient} from '@angular/common/http';
import {share} from 'rxjs/operators';
import {LaConfigResolver} from 'tc-liveapps-lib';
import {CaseComponent} from './routes/case/case.component';
import {CaseGuard} from 'tc-liveapps-lib';
import {TibcoCloudErrorComponent} from 'tc-core-lib';
import {LiveAppsConfigResolver} from 'tc-liveapps-lib';



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
      }
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
    LaConfigResolver
    ]
})

export class AppRoutingModule {
  }
